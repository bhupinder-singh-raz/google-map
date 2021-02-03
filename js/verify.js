function check()
{
    var email = document.querySelector('#email').value;
    var otp = document.querySelector('#otp').value;
    var span = document.querySelector('#validationmessage');

    console.log(email);
    console.log(otp);

    if(email === '')
        span.innerHTML = "Fill fields";

    if(email !== '' && otp !== '')
    {
        var obj = {email : email, otp : otp};

        // api call    
        fetch("https://swiggytrackingsystem.herokuapp.com/signup/verify", 
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

            if(data.msg === "wrong otp")
                span.innerHTML = data.msg;
            else
                window.location = "login.html";
        })
        .catch((err) =>
        {
            console.log("Error Type", err);
        });
    }
    
}


function resendOtp()
{
    var e = document.querySelector('#email').value;
    var obj = {email : e};
    console.log(obj);

    // api call    
    fetch("https://swiggytrackingsystem.herokuapp.com/resendotp", 
    {
        method: 'POST',
        mode: 'cors', 
        headers: 
        {
            'Accept': 'application/json',
            'Content-type':'application/json' 
        },
        body: JSON.stringify(obj),
    })
    .then((res) => res.json())
    .then((data) =>                                 // receive response from server
    {   
        console.log(data.msg);   
    })
    .catch((err) =>
    {
        console.log("Error Type", err);
    });
}