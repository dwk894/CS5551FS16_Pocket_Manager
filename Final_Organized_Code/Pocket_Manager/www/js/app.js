angular.module('starter', ['ionic'])
.run(
    function($ionicPlatform) {
        $ionicPlatform.ready(
            function() {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            }
        );
    }
)

angular.module('register', ['ionic'])
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

$(
    function() {
        $('#takePhoto').click(
            function() {
                var options = {
                    quality: 100,
                    destinationType: navigator.camera.DestinationType.NATIVE_URI,
                    sourceType: navigator.camera.PictureSourceType.CAMERA,
                    encodingType: navigator.camera.EncodingType.JPEG,
                    mediaType: navigator.camera.MediaType.PICTURE,
                    allowEdit: true,
                    correctOrientation: true,
                    targetHeight: 360,
                    targetWidth: 360,
                    saveToPhotoAlbum: true
                };
                navigator.camera.getPicture(
                    function(imageUri) {
                        $('#defaultPicture').replaceWith("<img id = 'defaultPicture' src = '" + imageUri + "' style = 'width: calc(100% - 10px); height: auto; margin: 5px;'>");
                        sessionStorage.setItem('image', imageUri);
                    },
                    function(error) {
                        alert('Cannot open the device camera.  Please check your device.');
                    },
                    options
                );
            }
        );
    }
);

$(
    function() {
        $('#choosePhoto').click(
            function() {
                var options = {
                    quality: 100,
                    destinationType: navigator.camera.DestinationType.NATIVE_URI,
                    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
                    encodingType: navigator.camera.EncodingType.JPEG,
                    mediaType: navigator.camera.MediaType.PICTURE,
                    allowEdit: true,
                    correctOrientation: true,
                    targetHeight: 360,
                    targetWidth: 360
                };
                navigator.camera.getPicture(
                    function(imageUri) {
                        $('#defaultPicture').replaceWith("<img id = 'defaultPicture' src = '" + imageUri + "' style = 'width: calc(100% - 10px); height: auto; margin: 5px;'>");
                        sessionStorage.setItem('image',imageUri);
                    },
                    function(error) {
                        //alert('Cannot open the Gallery.  Please check your device.');
                    },
                    options
                );
            }
        );
    }
);

/*$(
    function() {
        $('#userName').keyup(
            function() {
                var userName = $('#userName').val().toLowerCase();
                if (userName === null || userName.length < 2 || userName.length > 10) {
                    $('#errorNote_userName').replaceWith("<p id = 'errorNote_userName'>Invalid username</p>");
                }
                else {
                    $('#errorNote_userName').replaceWith("<p id = 'errorNote_userName'></p>");
                    var i;
                    for (i = 0; i < userName.length; i++) {
                        if((userName.charCodeAt(i) >= 48 && userName.charCodeAt(i) <= 57) || (userName.charCodeAt(i) >= 65 && userName.charCodeAt(i) <= 90) || (userName.charCodeAt(i) >= 97 && userName.charCodeAt(i) <= 122)) {
                            continue;
                        }
                        else {
                            $('#errorNote_userName').replaceWith("<p id = 'errorNote_userName'>Invalid username</p>");
                            break;
                        }
                    }
                    $.ajax(
                        {
                            url: "https://api.mlab.com/api/1/databases/pm/collections/pmUsers/" + userName + "?apiKey=mwDHQOuAdZdk7Jj6kN7LUtt77QBcqfUC",
                            method: 'GET',
                            success: function(result) {
                                $('#errorNote_userName').replaceWith("<p id = 'errorNote_userName'>Username has already been used.  Please try another one.</p>");
                            },
                            error: function(error) {
                                $('#errorNote_userName').replaceWith("<p id = 'errorNote_userName'></p>");
                            }
                        }
                    );
                }
            }
        );
    }
);*/

$(
    function() {
        $('#registerSubmit').click(
            function() {
                var validate = true;
                var userName = $('#userName').val().toLowerCase();
                if (userName === null || userName.length < 2 || userName.length > 10) {
                    validate = false;
                    $('#errorNote_userName').replaceWith("<p id = 'errorNote_userName'>Invalid username</p>");
                }
                else {
                    var i;
                    var q = true;
                    for (i = 0; i < userName.length; i++) {
                        if((userName.charCodeAt(i) >= 48 && userName.charCodeAt(i) <= 57) || (userName.charCodeAt(i) >= 65 && userName.charCodeAt(i) <= 90) || (userName.charCodeAt(i) >= 97 && userName.charCodeAt(i) <= 122)) {
                            continue;
                        }
                        else {
                            validate = false;
                            q = false;
                            $('#errorNote_userName').replaceWith("<p id = 'errorNote_userName'>Invalid username</p>");
                            break;
                        }
                    }
                    $.ajax(
                        {
                            url: "https://api.mlab.com/api/1/databases/pm/collections/pmUsers/" + userName + "?apiKey=mwDHQOuAdZdk7Jj6kN7LUtt77QBcqfUC",
                            method: 'GET',
                            success: function(result) {
                                validate = false;
                                q = false;
                                $('#errorNote_userName').replaceWith("<p id = 'errorNote_userName'>Username has already been used.  Please try another one.</p>");
                                m = 1;
                                
                            },
                            error: function(error) {
                                if (q == true) {
                                    $('#errorNote_userName').replaceWith("<p id = 'errorNote_userName'></p>");
                                }
                                m = 1;
                            }
                        }
                    );
                }

                var password = $('#password').val();
                var p = true;
                if (password === null || password.length < 4 || password.length > 8) {
                    validate = false;
                    p = false;
                    $('#errorNote_password').replaceWith("<p id = 'errorNote_password'>Invalid password</p>");
                }
                else {
                    var i2;
                    for (i2 = 0; i2 < password.length; i2++) {
                        if ((password.charCodeAt(i2) >= 48 && password.charCodeAt(i2) <= 57) || (password.charCodeAt(i2) >= 65 && password.charCodeAt(i2) <= 90) || (password.charCodeAt(i2) >= 97 && password.charCodeAt(i2) <= 122)) {
                            continue;
                        }
                        else {
                            validate = false;
                            p = false;
                            $('#errorNote_password').replaceWith("<p id = 'errorNote_password'>Invalid password</p>");
                            break;
                        }
                    }
                    if (p == true) {
                        $('#errorNote_password').replaceWith("<p id = 'errorNote_password'></p>");
                    }
                }
                
                var password_2 = $('#password_2').val();
                if (password_2 !== password) {
                    validate = false;
                    $('#errorNote_password_2').replaceWith("<p id = 'errorNote_password_2'>Not consistent with the above password</p>");
                }
                else {
                    $('#errorNote_password_2').replaceWith("<p id = 'errorNote_password_2'></p>");
                }
                
                var hint = $('#hint').val();
                if (hint === null || hint.length === 0) {
                    validate = false;
                    $('#errorNote_password_3').replaceWith("<p id = 'errorNote_password_3'>Please enter a password hint.</p>");
                }
                else {
                    $('#errorNote_password_3').replaceWith("<p id = 'errorNote_password_3'></p>");
                }
                
                var email = $('#email').val();
                if (email === null || email.length === 0 || email.lastIndexOf('@') === -1) {
                    validate = false;
                    $('#errorNote_email').replaceWith("<p id = 'errorNote_email'>Please enter a valid email address.</p>");
                }
                else {
                    $('#errorNote_email').replaceWith("<p id = 'errorNote_email'></p>");
                }
                
                var fullName = $('#fullName').val();
                if (fullName === null || fullName.length === 0) {
                    validate = false;
                    $('#errorNote_name').replaceWith("<p id = 'errorNote_name'>Please enter your full name.</p>");
                }
                else {
                    $('#errorNote_name').replaceWith("<p id = 'errorNote_name'></p>");
                }
                
                var gender = $('input[name = gender]').val();
                var degree = $('input[name = degree]').val();
                
                var major = $('#major').val();
                if (major === null || major.length === 0) {
                    validate = false;
                    $('#errorNote_major').replaceWith("<p id = 'errorNote_major'>Please enter your major.</p>");
                }
                else {
                    $('#errorNote_major').replaceWith("<p id = 'errorNote_major'></p>");
                }
                
                var income = $('#income').val();
                if (income < 500 || income > 2000) {
                    validate = false;
                    $('#errorIncome').replaceWith("<p id = 'errorIncome'>Please give a number between 500 and 2,000.</p>");
                }
                else {
                    $('#errorIncome').replaceWith("<p id = 'errorIncome'></p>");
                }
                
                if (validate == true) {
                    var login_info = {
                        "_id": userName,
                        "password": password,
                        "hint": hint,
                        "email": email,
                        "name": fullName,
                        "gender": gender,
                        "degree": degree,
                        "major": major,
                        "income": income
                    };
                    $.ajax(
                        {
                            url: "https://api.mlab.com/api/1/databases/pm/collections/pmUsers?apiKey=mwDHQOuAdZdk7Jj6kN7LUtt77QBcqfUC",
                            data: JSON.stringify(
                                {
                                    "_id": userName,
                                    "password": password,
                                    "hint": hint,
                                    "email": email,
                                    "name": fullName,
                                    "gender": gender,
                                    "degree": degree,
                                    "major": major,
                                    "income": income
                                }
                            ),
                            type: "POST",
                            contentType: "application/json",
                            success: function(result) {
                                sessionStorage.setItem("logged_in", 'true');
                                sessionStorage.setItem('username', login_info._id);
                                sessionStorage.setItem('password', login_info.password);
                                sessionStorage.setItem('email', login_info.email);
                                sessionStorage.setItem('name', login_info.name);
                                sessionStorage.setItem('income', login_info.income);
                                
                                alert("You have logged in.");
                                goHome();
                                
                            },
                            error: function(error) {
                                alert("Cannot register.  Please try later.");
                            }
                        }
                    );
                    
                }
            }
        );
    }
);

function goHome() {
    window.location.href = '../index.html';
}