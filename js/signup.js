function sendData()
{
    var n = document.querySelector('#name').value;
    var pass1 = document.querySelector('#password').value;
    var pass2 = document.querySelector('#confirmpassword').value;
    var e = document.querySelector('#email').value;
    var m = document.querySelector('#mobileno').value;
    var span = document.querySelector('#validationmessage');

    if(pass1 !== pass2)
    {
        span.innerHTML = 'password not matches';
        return;
    }

    if(n === '' || pass1 === '' || pass2 === '' || e === '' || m ==='')
        span.innerHTML = "Fill fields";

    else
    {
        var obj = {name : n, email : e, mobileno : m, password : pass1, confirmpassword : pass2};
        
        fetch("http://localhost:5000/signup", 
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
            if(data.msg === "phoneno must have 10 digit" || data.msg === "pass & confirmpass must be same" || data.msg === "email id already used")
                span.innerHTML = data.msg;
            else
                window.location = "verify.html";
        })
        .catch((err) =>
        {
            console.log("Error Type", err);
        });
    }
}