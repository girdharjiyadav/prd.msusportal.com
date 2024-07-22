$(document).ready(function () {
    var cookies = getCookies();
    setImagePath("../../Files/CompanyLogo/"+cookies['companyLogo'])
});

Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function logOut(type) {
    $.ajax({
        url: "/api/Authcontroller/Logout",
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                type == "Index" ? window.location.replace("Index") : window.location.replace("EmpLogIn");
            }

        }
    })

}

function getCookies() {
    // Retrieve all cookies
    var cookies = document.cookie;

    // Split the string into individual cookies
    var cookieArray = cookies.split(';');

    // Create an object to store key-value pairs of cookies
    var cookieData = {};

    // Loop through each cookie and parse it into key-value pairs
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim(); // Trim any leading or trailing spaces
        var separatorIndex = cookie.indexOf('=');
        var cookieName = cookie.substring(0, separatorIndex);
        var cookieValue = decodeURIComponent(cookie.substring(separatorIndex + 1));
        cookieData[cookieName] = cookieValue;
    }

    // Return the object containing cookies
    return cookieData;

}

function setImagePath(newPath) {
    var logoImage = document.getElementById('logoImage');
    logoImage.setAttribute('src',newPath);
}
