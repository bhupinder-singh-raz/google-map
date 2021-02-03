function logout()
{
    localStorage.clear();
    alert("You are successfully logout");
    window.location = "login.html";
}



$(document).ready(function()
{
    $(".grid-container").load("location.html");
    setInterval(function()
    {
        $('.grid-container').load("location.html");
    }, 1000);
})