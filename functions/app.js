$(document).ready(function() {
    $('.table-responsive-stack').each(function (i) {
       var id = $(this).attr('id');
       $(this).find("th").each(function(i) {
          $('#'+ id + ' td:nth-child(' + (i + 1) + ')').prepend('<span class="table-responsive-stack-thead">'+$(this).text() + ':</span> ');
          $('.table-responsive-stack-thead').hide();
        });
    });
    $('.table-responsive-stack').each(function() {
        var thCount = $(this).find("th").length; 
        var rowGrow = 100 / thCount + '%';
        $(this).find("th, td").css('flex-basis', rowGrow);   
    });
    function flexTable(){
        if ($(window).width() < 900) {
            $(".table-responsive-stack").each(function (i) {
                $(this).find(".table-responsive-stack-thead").show();
                $(this).find('thead').hide();
            });
        } else {
            $(".table-responsive-stack").each(function (i) {
                $(this).find(".table-responsive-stack-thead").hide();
                $(this).find('thead').show();
            });
        }
    }
    flexTable();  
    window.onresize = function(e) {
        flexTable();
    };
}); 