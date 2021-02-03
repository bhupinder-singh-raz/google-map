function loc()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.watchPosition(gotPos, posFail);              // success, error, options
    }
    else    // if browser doesn't support geolocation
    {
        console.log("your browser doesn't support geolocation");
    }
}
    

function gotPos(position)
{
    console.log(`current latitude = ${position.coords.latitude}`);
    console.log(`current longitude = ${position.coords.longitude}`);

    // call api and update the latitude and longitude
    // api call    


    var a = {
        "id" : localStorage.getItem("id"), 
        "location" : 
        [{
            "longitude" : position.coords.longitude,
            "latitude" : position.coords.latitude
        }]
    };

    console.log(a);

    fetch("http://localhost:5000/update", 
    {
        method: 'PATCH',
        mode: 'cors', 
        headers: 
        {
            'Accept': 'application/json',
            'Content-type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(a),                  // send json to server
    })
    .then((res) => res.json())
    .then((data) =>                                 // receive response from server
    {   
        if(data.message === "token is not valid")
        {
            alert("Dear sir you are not authorized Please Login first");
            window.location = "login.html";            
        }

        console.log(data.msg);   
    })
    .catch((err) =>
    {
        console.log("Error Type", err);
    });
}

function posFail(err)
{
    console.log(err);
}

function logout()
{
    var b = {"id" : localStorage.getItem("id")};

    // api call (to make isavailable = 0)
    fetch("http://localhost:5000/logout", 
    {
        method: 'POST',
        mode: 'cors', 
        headers: 
        {
            'Accept': 'application/json',
            'Content-type':'application/json',
        },
        body: JSON.stringify(b),                  // send json to server
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

    localStorage.clear();
    alert("You are successfully logout");
    window.location = "login.html";
}