$(document).ready(function () {

    $('#add-contact-form').submit(function (e) {
        e.preventDefault()

        let firstName = $('#first-name').val()
        let lastName = $('#last-name').val()
        let email = $('#email').val()
        let phone = $('#phone-number').val()
        let gender = $('input[name="contact-gender"]:checked').val();
        let nameTitle
        if (gender === 'male') {
            nameTitle = 'Mr'
        } else {
            nameTitle = 'Ms'
        }

        var form = new FormData();
        form.append("gender", gender);
        form.append("name_title", nameTitle);
        form.append("first_name", firstName);
        form.append("last_name", lastName);
        form.append("email", email);
        form.append("phone", phone);

        var settings = {
            "url": "https://webhook.site/d85b22f8-f835-410f-832f-97c099dd016b",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    })
})