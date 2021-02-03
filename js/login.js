function check()
{
    var n = document.querySelector('#name').value;
    var pass = document.querySelector('#password').value;
    var span = document.querySelector('#validationmessage');

    console.log(n);
    console.log(pass);

    if(n === '' || pass === '' )
        span.innerHTML = "Fill fields";

    else
    {
        var obj = {name : n, password : pass};

        // api call    
        fetch("https://swiggytrackingsystem.herokuapp.com/login", 
        {
            method: 'POST',
            mode: 'cors', 
            headers: 
            {
                'Accept': 'application/json',
                'Content-type':'application/json' 
            },
            body: JSON.stringify(obj),                  // send json to server
        })
        .then((res) => res.json())
        .then((data) =>                                 // receive response from server
        {   
            console.log(data.msg);   

            if(data.msg === "wrong username and password" || data.msg === "please verify your email id" || data.msg === "First create your account")
                span.innerHTML = data.msg;
            else
            {
                if(data.msg.role === "deliveryboy")
                {
                    localStorage.setItem('role', data.msg.role);
                    localStorage.setItem('token', data.msg.token);
                    localStorage.setItem('id', data.msg.id);
                    window.location = "start.html";
                }
                else
                {
                    localStorage.setItem('role', data.msg.role);
                    localStorage.setItem('token', data.msg.token);
                    localStorage.setItem('id', data.msg.id);
                    window.location = "admin.html";
                }
            }
        })
        .catch((err) =>
        {
            console.log("Error Type", err);
        });
    }
    
}