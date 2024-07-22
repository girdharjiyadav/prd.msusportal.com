
$(document).ready(function () {
    $('#loader').hide();
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("SignupForm").style.display = "none";
    document.getElementById("SignupEmail").style.display = "none";
    document.getElementById("otpForm").style.display = "none";
    document.getElementById("newPasswordForm").style.display = "none";
});

function validEmail(email) {
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return regex.test(email);
}

function SignUpForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("SignupForm").style.display = "block";
    document.getElementById("SignupEmail").style.display = "none";
    document.getElementById("otpForm").style.display = "none";
}

function SignInForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("SignupForm").style.display = "none";
    document.getElementById("SignupEmail").style.display = "none";
    document.getElementById("otpForm").style.display = "none";
}

function SIgnInEmailForm(type) {
    document.getElementById("SignupEmail").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("SignupForm").style.display = "none";
    document.getElementById("otpForm").style.display = "none";
    document.getElementById("formType").innerHTML = type
}

function otpForm(type) {
    $('#loader').show();
    //document.getElementById("SignupEmail").style.display = "none";
   // document.getElementById("loginForm").style.display = "none";
   // document.getElementById("SignupForm").style.display = "none";
   
    var registrationemail = document.getElementById("registrationemail").value;
    var type = document.getElementById("formType").innerHTML;
    if (validEmail(registrationemail)) {
        $.ajax({
            'url': 'api/authController/sendOTP',
            'type': 'GET',
            'contentType': 'application/json',
            data: {
                emailId: registrationemail,
                type: type,
            },
            success: function (data) {
                if (data.success) {
                    $('#loader').hide();
                    Toast.fire({
                        icon: 'success',
                        title: '',
                        text: data.message,
                    })
                    document.getElementById("otpForm").style.display = "block";
                    document.getElementById("SignupEmail").style.display = "none";
                    document.getElementById("loginForm").style.display = "none";
                    document.getElementById("SignupForm").style.display = "none";
                }
                else {
                    $('#loader').hide();
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
        $('#loader').hide();
        Toast.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Enter Valid E-Mail ID',
        })
    }

}



function verifyOtp() {
    $('#loader').show();

    var otp1 = document.getElementById("box1").value;
    var otp2 = document.getElementById("box2").value;
    var otp3 = document.getElementById("box3").value;
    var otp4 = document.getElementById("box4").value;
    var otp5 = document.getElementById("box5").value;
    var otp6 = document.getElementById("box6").value;
    var Otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    var email = document.getElementById("registrationemail").value;

    $.ajax({
        'url': 'api/authController/verifyOtp',
        'type': 'GET',
        'contentType': 'application/json',
        data: {
            emailId: email,
            OTP: Otp
        },
        success: function (data) {
            if (data.success) {
                $('#loader').hide();
                Toast.fire({
                    icon: 'success',
                    title: 'Oops...',
                    text: data.message,
                })
                document.getElementById("otpForm").style.display = "none";
                document.getElementById("SignupEmail").style.display = "none";
                document.getElementById("loginForm").style.display = "none";
               

                if (document.getElementById("formType").innerHTML == "F") {
                    document.getElementById("newPasswordForm").style.display = "block";
                   
                } else
                {
                    document.getElementById("SignupForm").style.display = "block";
                }
            }
            else {
                $('#loader').hide();
                Toast.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message,
                })
            }
        }
    })

}

function Nextitem(values, nextinput) {
    if (values.value.length = values.getAttribute('maxlength')) {
        otp_input[nextinput].focus();
    }
}




function addregistration() {
    $('#loader').show();
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("registrationemail").value;
    var password = document.getElementById("password").value;
    if (validEmail(email)) {
        $.ajax({
            'url': 'api/authController/AddRegistration',
            'type': 'GET',
            'contentType': 'application/json',
            data: {
                firstname: firstname,
                lastname: lastname,
                emailId: email,
                password: password
            },
            success: function (data) {
                if (data.success) {
                    $('#loader').hide();
                    Toast.fire({
                        icon: 'success',
                        title: '',
                        text: data.message,
                    })
                    window.location.replace("Index");
                    clearData();
                }
                else {
                    $('#loader').hide();
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
        $('#loader').hide();
        Toast.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Enter Valid E-Mail ID',
        })
    }
}




function updatePassword(){
    $('#loader').show();
    var password = document.getElementById("updatepasswordLabel").value;
    var email = document.getElementById("registrationemail").value;
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
                    $('#loader').hide();
                    Toast.fire({
                        icon: 'success',
                        title: '',
                        text: data.message,
                    })
                    window.location.replace("Index");
                    //location.reload();
                }
                else {
                    $('#loader').hide();
                    Toast.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message,
                    })
                }
            }
        })
    }
  

function Login() {
   $('#loader').show();
    var email = document.getElementById("loginemail").value;
    var password = document.getElementById("loginpassword").value;
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
                if (data.success) {
                   $('#loader').hide();
                    Toast.fire({
                        icon: 'success',
                        title: '',
                        text: data.message,
                    })
                    window.location.replace("Home");
                }
                else {
                   $('#loader').hide();
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
        $('#loader').hide();
        Toast.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Enter Valid E-Mail ID',
        })
    }
}

function clearData() {
    document.getElementById("firstname").value ="";
    document.getElementById("lastname").value="";
    document.getElementById("email").value="";
    document.getElementById("password").value="";
}

