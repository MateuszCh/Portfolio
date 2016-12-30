/**
 * Created by Mateusz Chybiorz on 2016-12-16.
 */
(function($) {
    //jquery objects
    var $slides = $(".slides");
    var $body = $("body");
    var $afters = $(".next");
    var $before = $(".previous");
    var $nextAndPrevious = $(".next, .previous");
    //variables declarations
    var $nextSlider;
    var color;
    var $lastSlider;
    var $targetSlider;
    //get visible slider and set $targetSlider variable
    function setCurrentSlider() {
        $($slides).each(function () {
            if(!($(this).hasClass("moveLeft") || $(this).hasClass("moveRight"))){
                $targetSlider = $(this);
            }
        });
    }
    //hide all next and previous spans and fade in spans of visible slider
    function hideNextAndPrevious() {
        if (window.matchMedia("(min-width: 1200px)").matches) {
            $($nextAndPrevious).hide(1);
            setTimeout(function () {
                var idi = $($nextSlider).attr("id");
                $("#" + idi + " span").fadeIn(1000);
            }, 1000);
        }
    }
    //make next slider visible
    function next() {
        setCurrentSlider();
        if($($targetSlider).next()[0]){
            $nextSlider = $($targetSlider).next()[0];
            $lastSlider = $($nextSlider).next()[0];
            if(!$lastSlider){
                $lastSlider = $(".slides")[0];
            }
        } else {
            $nextSlider = $slides[0];
            $lastSlider = $slides[1];
        }
        hideNextAndPrevious();
        $($nextSlider).show(1);
        $($targetSlider).hide(1);
        $($lastSlider).hide(1);
        color = $($nextSlider).data("color");
        $body.removeClass("light").removeClass("dark").addClass(color);
        $($targetSlider).addClass("moveLeft");
        $($nextSlider).removeClass("moveRight");
        $($lastSlider).removeClass("moveLeft").addClass("moveRight");
    }
    //make previous slider visible
    function previous() {
        setCurrentSlider();
        if($($targetSlider).prev()[0]){
            $nextSlider = $($targetSlider).prev()[0];
            $lastSlider = $($nextSlider).prev()[0];
            if(!$lastSlider){
                $lastSlider = $(".slides")[2];
            }
        } else {
            $nextSlider = $slides[2];
            $lastSlider = $slides[1];
        }
        hideNextAndPrevious();
        $($nextSlider).show(1);
        $($targetSlider).hide(1);
        $($lastSlider).hide(1);
        color = $($nextSlider).data("color");
        $body.removeClass("light").removeClass("dark").addClass(color);
        $($targetSlider).addClass("moveRight");
        $($nextSlider).removeClass("moveLeft");
        $($lastSlider).removeClass("moveRight").addClass("moveLeft");
    }
    //event listeners
    $afters.on("click", function () {
        next();
    });
    $before.on("click", function () {
        previous();
    });
    $body.swipe({swipeLeft: next, swipeRight: previous, allowPageScroll: "auto"});
    $(document).on("keydown", function (e) {
        var code = e.which;
        if(code == 37){
            previous();
        } else if (code == 39){
            next();
        }
    });
    $(document).ready(function () {
        $($slides[1]).hide().addClass("moveRight");
        $($slides[2]).hide().addClass("moveLeft");
        //show touch icon on mobile indicating gesture on screen to change visible content
        if (window.matchMedia("(max-width: 1199px)").matches) {
            var $handTouchIcon = $('<div class="infoForMobile"><div><img src="images/handTouchIconGrey.png" alt=""></div></div>');
            $($body).append($handTouchIcon);
            $(".infoForMobile").fadeTo(500, 1, function () {
                $(".infoForMobile img").addClass("startAnimation");
            });
            setTimeout(function () {
                $(".infoForMobile").fadeOut(1000, function () {
                    $(this).remove();
                });
            }, 2500);
        }
    });
})(jQuery);