$(document).ready(function () {
    $('#empLoader').hide();

});

function empLogin(type) {

    $('#empLoader').show();
    var email = document.getElementById("emploginemail").value;
    var password = document.getElementById("emploginpassword").value;

    if (validEmail(email)) {
        var dataToSend = {
            emailId: email,
            password: password
        };
        $.ajax({
            url: 'api/authController/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dataToSend),

            success: function (data) {
                $('#empLoader').hide();
                if (data.success) {
                    type == "index" ? window.location.replace("Home") : window.location.replace("TaskList");
                    var cookies = getCookies();
                    Toast.fire({
                        icon: 'success',
                        title: '',
                        text: "Welcome  " + cookies['fullname'],
                    })
                  

                 
                }
                else {
                    $('#empLoader').hide();
                    Toast.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message,
                    })
                }
            }


        })
    }
    else {
        $('#empLoader').hide();
        Toast.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Enter Valid E-Mail ID',
        })
    }
}


function validEmail(email) {
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return regex.test(email);
}


//OTP SECTION 

function sendOTP() {
    $('#empLoader').show();

    var registrationemail = document.getElementById("registrationemail").value;
    if (validEmail(registrationemail)) {
        $.ajax({
            'url': 'api/authController/sendOTP',
            'type': 'GET',
            'contentType': 'application/json',
            data: {
                emailId: registrationemail,
                type: 'F',
            },
            success: function (data) {
                if (data.success) {
                    $('#empLoader').hide();
                    Toast.fire({
                        icon: 'success',
                        title: '',
                        text: data.message,
                    })
                    document.getElementById("registrationemailDiv").style.display = "block"
                    document.getElementById("otpdiv").style.display = "block"
                    document.getElementById("forgetPasswordDiv").style.display = "none"
                    document.getElementById("reforgetPasswordDiv").style.display = "none"

                    document.getElementById("sendOTPbtn").style.display = "none"
                    document.getElementById("VerifyOTPbtn").style.display = "block"
                    document.getElementById("UpdatePasswordbtn").style.display = "none"
                }
                else {
                    $('#empLoader').hide();
                    Toast.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message,
                    })
                    document.getElementById("registrationemailDiv").style.display = "block"
                    document.getElementById("otpdiv").style.display = "none"
                    document.getElementById("forgetPasswordDiv").style.display = "none"
                    document.getElementById("reforgetPasswordDiv").style.display = "none"

                    document.getElementById("sendOTPbtn").style.display = "block"
                    document.getElementById("VerifyOTPbtn").style.display = "none"
                    document.getElementById("UpdatePasswordbtn").style.display = "none"
                }
            }
        })
    }
    else {
        $('#empLoader').hide();
        Toast.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Enter Valid E-Mail ID',
        })
        document.getElementById("registrationemailDiv").style.display = "block"
        document.getElementById("otpdiv").style.display = "none"
        document.getElementById("forgetPasswordDiv").style.display = "none"
        document.getElementById("reforgetPasswordDiv").style.display = "none"

        document.getElementById("sendOTPbtn").style.display = "block"
        document.getElementById("VerifyOTPbtn").style.display = "none"
        document.getElementById("UpdatePasswordbtn").style.display = "none"
    }

}




function verifyOtp() {
    $('#empLoader').show();

    var email = document.getElementById("registrationemail").value;
    var otp = document.getElementById("forgetOTP").value;
    $.ajax({
        'url': 'api/authController/verifyOtp',
        'type': 'GET',
        'contentType': 'application/json',
        data: {
            emailId: email,
            OTP: otp
        },
        success: function (data) {
            if (data.success) {
                $('#empLoader').hide();
                Toast.fire({
                    icon: 'success',
                    title: 'Oops...',
                    text: data.message,
                })

                document.getElementById("registrationemailDiv").style.display = "block"
                document.getElementById("otpdiv").style.display = "none"
                document.getElementById("forgetPasswordDiv").style.display = "block"
                document.getElementById("reforgetPasswordDiv").style.display = "block"

                document.getElementById("sendOTPbtn").style.display = "none"
                document.getElementById("VerifyOTPbtn").style.display = "none"
                document.getElementById("UpdatePasswordbtn").style.display = "block"
            

            }
            else {
                $('#empLoader').hide();
                Toast.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                })

                document.getElementById("registrationemailDiv").style.display = "block"
                document.getElementById("otpdiv").style.display = "block"
                document.getElementById("forgetPasswordDiv").style.display = "none"
                document.getElementById("reforgetPasswordDiv").style.display = "none"

                document.getElementById("sendOTPbtn").style.display = "none"
                document.getElementById("VerifyOTPbtn").style.display = "block"
                document.getElementById("UpdatePasswordbtn").style.display = "none"
            }
        }
    })

}





function updatePassword() {
    $('#empLoader').show();
    var password = document.getElementById("forgetPassword").value;
    var reEnterpassword = document.getElementById("RenterforgetPassword").value;
    var email = document.getElementById("registrationemail").value;

    if (password != reEnterpassword) {
        alert("Password and Renter Password not match");
        $('#empLoader').hide();
        return;
    }

    $.ajax({
        'url': 'api/authController/UpdatePassword',
        'type': 'GET',
        'contentType': 'application/json',
        data: {
            password: password,
            emailId: email
        },
        success: function (data) {
            if (data.success) {
                $('#empLoader').hide();
                Toast.fire({
                    icon: 'success',
                    title: '',
                    text: data.message,
                })
                 window.location.replace("Index");
              
            }
            else {
                $('#empLoader').hide();
                Toast.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                })
                document.getElementById("registrationemailDiv").style.display = "block"
                document.getElementById("otpdiv").style.display = "none"
                document.getElementById("forgetPasswordDiv").style.display = "block"
                document.getElementById("reforgetPasswordDiv").style.display = "block"

                document.getElementById("sendOTPbtn").style.display = "none"
                document.getElementById("VerifyOTPbtn").style.display = "none"
                document.getElementById("UpdatePasswordbtn").style.display = "block"
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