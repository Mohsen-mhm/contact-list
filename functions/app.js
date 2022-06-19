$(document).ready(function () {
    getData(1)
    const contactListBody = $('.contact-list-body')
    const pageOne = $('.page-one')
    const pageTwo = $('.page-two')

    pageOne.click(function (e) {
        e.preventDefault()
        pageOne.addClass('active')
        pageTwo.removeClass('active')
        getData(1)
        contactListBody.empty()
    })
    pageTwo.click(function (e) {
        e.preventDefault()
        pageTwo.addClass('active')
        pageOne.removeClass('active')
        getData(2)
        contactListBody.empty()
    })
    
    function getData(num){
        $.ajax({
            url: 'https://randomuser.me/api?page=' + num + '&results=10&seed=erfan',
            dataType: 'json',
            success: function (data) {
                const incomingData = data.results
                $('.contact-number').text(incomingData.length)
                incomingData.forEach(e => {
                    const trElem = $('<tr></tr>')
                    const contactImg = $('<td class="d-flex align-items-center table-responsive" style="flex-basis: 16.6667%;"><img src="' + e.picture.large + '" alt="Profile" class="w-25 rounded-5 hero-avatar"></td>')
                    const contactName = $('<td class="table-responsive" style="flex-basis: 16.6667%;">' + e.name.title + '. ' + e.name.first + ' ' + e.name.last + '</td>')
                    const contactGender = $('<td class="table-responsive" style="flex-basis: 16.6667%;">' + e.gender + '</td>')
                    const contactEmail = $('<td class="table-responsive" style="flex-basis: 16.6667%;">' + e.email + '</td>')
                    const contactPhone = $('<td class="table-responsive" style="flex-basis: 16.6667%;">' + e.phone + '</td>')
                    const contactOptions = $('<td class="table-responsive" style="flex-basis: 16.6667%;"><button class="btn btn-danger me-2" style="flex-basis: 16.6667%;"><i class="fas fa-trash"></i></button><button class="btn btn-primary" id="edit-contact-btn"><i class="fas fa-pencil"></i></button></td>')
    
                    trElem.append(contactImg, contactName, contactGender, contactEmail, contactPhone, contactOptions)
                    contactListBody.append(trElem)
                })
            }
        })
    }

    $(".add-contact-btn").click(function () {
        location.replace('../pages/add-contact/add-contact.html')
    })
    $("#edit-contact-btn").click(function () {
        location.replace('../pages/edit-contact/edit-contact.html')
    })

    $('.table-responsive-stack').each(function (i) {
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