$(document).ready(function() {
    // console.dir($(".markdown-body"));
    var glob_id=1;
    $(".markdown-body").children().each(function (i, elt) {
        if (elt.tagName.startsWith("H") ) {
            $(elt).attr("id", glob_id);
            if (elt.tagName == "H1") {
                $(".menu-markdown").append("<div data-id=\""+glob_id+"\" class=\"titre\">" + elt.innerHTML + "</div>");
            }
            else if (elt.tagName == "H2") {
                $(".menu-markdown").append("<div data-id=\""+glob_id+"\">" + elt.innerHTML + "</div>");
            } else {
                $(".menu-markdown").append("<div data-id=\""+glob_id+"\">&nbsp;&nbsp;&nbsp;&nbsp;" + elt.innerHTML + "</div>");
            }
            
            // console.dir(elt);
        }
        glob_id++;
    });
    $(".menu-markdown").mouseover(function() {
        $(".menu-markdown").width("auto");
        $(".menu-markdown").height("auto");
        $(".menu-markdown>img").hide();
    });
    $(".menu-markdown").mouseleave(function() {
        $(".menu-markdown").width(35);
        $(".menu-markdown").height(31);
        $(".menu-markdown>img").show();
    });
    $(".menu-markdown>div").click(function() {
        var id = $(this).data("id");
        $('html, body').animate({
            scrollTop: $("#"+id).offset().top
        }, 600);
        $(".menu-markdown").width(35);
        $(".menu-markdown").height(31);
        $(".menu-markdown>img").show();
    });
});