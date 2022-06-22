$(document).ready(function () {
    getData(1)  //Get page 1 from API by default

    const contactListBody = $('.contact-list-body')
    const pageOne = $('.page-one')
    const pageTwo = $('.page-two')

    pageOne.click(function (e) {  //Show page 1 from API by click on pagination 1
        e.preventDefault()
        pageOne.addClass('active')
        pageTwo.removeClass('active')
        contactListBody.empty()
        getData(1)
    })
    pageTwo.click(function (e) {  //Show page 2 from API by click on pagination 2
        e.preventDefault()
        pageTwo.addClass('active')
        pageOne.removeClass('active')
        contactListBody.empty()
        getData(2)
    })

    function createTable(e) {  //Create table dynamically from API data
        let trElem = $('<tr></tr>')
        let contactImg = $('<td class="d-flex align-items-center table-responsive" style="flex-basis: 16.6667%;"><img src="' + e.picture.large + '" alt="Profile" class="w-25 rounded-5 hero-avatar"></td>')
        let contactName = $('<td class="table-responsive" style="flex-basis: 16.6667%;">' + e.name.title + '. ' + e.name.first + ' ' + e.name.last + '</td>')
        let contactGender = $('<td class="table-responsive" style="flex-basis: 16.6667%;">' + e.gender + '</td>')
        let contactEmail = $('<td class="table-responsive" style="flex-basis: 16.6667%;">' + e.email + '</td>')
        let contactPhone = $('<td class="table-responsive" style="flex-basis: 16.6667%;">' + e.phone + '</td>')
        let contactOptions = $('<td class="table-responsive options-btn" style="flex-basis: 16.6667%;"></td>')
        let deleteBtn = $('<button class="btn btn-danger me-2" style="flex-basis: 16.6667%;"><i class="fas fa-trash"></i></button>')
        let editBtn = $('<button class="btn btn-primary edit-contact-btn"><i class="fas fa-pencil"></i></button>')

        contactOptions.append(deleteBtn, editBtn)
        trElem.append(contactImg, contactName, contactGender, contactEmail, contactPhone, contactOptions)
        contactListBody.append(trElem)

        editBtn.click(function () {  //Change URL - load Edit page
            location.replace('../pages/edit-contact/edit-contact.html')
        })
        $('.add-contact-btn').click(function () {   //Change URL - load Add page
            location.replace('../pages/add-contact/add-contact.html')
        })
        deleteBtn.click(function () {  //Send delete contact request
            var settings = {
                "url": "https://webhook.site/d85b22f8-f835-410f-832f-97c099dd016b?id=10",
                "method": "DELETE",
                "timeout": 0,
            };
            $.ajax(settings).done(function (response) {
                console.log($.parseJSON(response));
            });
        })
    }

    $(".filter-search").on("keyup", function () {  //Filter contacts by searching
        var value = $(this).val().toLowerCase();
        $("#tableOne tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    function getData(num) {  //Get data from API
        $.ajax({
            url: 'https://randomuser.me/api?page=' + num + '&results=10&seed=erfan',
            dataType: 'json',
            success: function (data) {
                const incomingData = data.results
                $('.contact-number').text(incomingData.length)
                incomingData.forEach(e => {
                    createTable(e)
                })
            }
        })
    }

    $('.table-responsive-stack').each(function (i) {  //Get table responsive on tablet and mobile size
        const id = $(this).attr('id')
        $(this).find("th").each(function (i) {
            $('#' + id + ' td:nth-child(' + (i + 1) + ')').prepend('<span class="table-responsive-stack-thead">' + $(this).text() + ':</span> ');
            $('.table-responsive-stack-thead').hide()
        })
    })
    $('.table-responsive-stack').each(function () {
        const thCount = $(this).find("th").length
        const rowGrow = 100 / thCount + '%'
        $(this).find("th, td").css('flex-basis', rowGrow)
    })
    function flexTable() {
        if ($(window).width() < 900) {
            $(".table-responsive-stack").each(function (i) {
                $(this).find(".table-responsive-stack-thead").show()
                $(this).find('thead').hide()
            })
        } else {
            $(".table-responsive-stack").each(function (i) {
                $(this).find(".table-responsive-stack-thead").hide()
                $(this).find('thead').show()
            })
        }
    }
    flexTable()
    window.onresize = function (e) {
        flexTable()
    }
})