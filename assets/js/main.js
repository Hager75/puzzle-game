

function validateFullName(evt) {
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[a-zA-Z ]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
function validateName(name) {
    var re = /^^[a-zA-Z ]*[a-zA-Z][a-zA-Z ]*$/;
    return re.test(String(name).toLowerCase());
}

function validateEmail(email) {
    var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// login btn

$(".login-btn").on('click', function () {
    var fullname = $("#fullname").val();
    var email = $("#email").val();
    var valid = true;
    $('.invalid-feedback').remove();

    /* validate name */
    if (fullname == null || fullname == "") {
        $('#fullname').closest('.form-group').append('<div class="invalid-feedback">Full name field is required.</div>');
        valid = false;
    } else if (fullname.length < 2) {
        $('#fullname').closest('.form-group').append('<div class="invalid-feedback">Full name must be at least 2 characters.</div>');
        valid = false;
    } else if (!validateName(fullname)) {
        $('#fullname').closest('.form-group').append('<div class="invalid-feedback">Full name format is not valid.</div>');
        valid = false;
    }

    // Email
    if (email == null || email == "") {
        $('#email').closest('.form-group').append('<div class="invalid-feedback">Email field is required.</div>');
        valid = false;
    } else if (!validateEmail(email)) {
        $('#email').closest('.form-group').append('<div class="invalid-feedback">Email is not valid.</div>');
        valid = false;
    }

    if (valid) {
        $('#login-page').fadeOut();
        $('#start-page').fadeIn();
    }
});









