/**
 * Created by Mateusz Chybiorz on 2016-12-16.
 */
$(function() {
    var $headers = $(".headerToSlide");
    var $slides = $(".slides");
    var $body = $("body");
    var $nextSlider;
    var color;
    var $lastSlider;
    var $targetSlider;
    var $afters = $(".next");
    var $before = $(".previous");
    var $nextAndPrevious = $(".next, .previous");
    $($slides[1]).hide().addClass("moveRight");
    $($slides[2]).hide().addClass("moveLeft");
    function setCurrentSlider() {
        $($slides).each(function () {
            if(!($(this).hasClass("moveLeft") || $(this).hasClass("moveRight"))){
                $targetSlider = $(this);
            }
        });
    }
    function hideNextAndPrevious() {
        if (window.matchMedia("(min-width: 1200px)").matches) {
            $($nextAndPrevious).hide(1);
            setTimeout(function () {
                $($nextAndPrevious).fadeIn(500);
            }, 1000);
        }
    }
    function next() {
        hideNextAndPrevious();
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
        $($nextSlider).show(1);
        $($targetSlider).hide(1);
        $($lastSlider).hide(1);
        color = $($nextSlider).data("color");
        $body.removeClass("light").removeClass("dark").addClass(color);
        $($targetSlider).addClass("moveLeft");
        $($nextSlider).removeClass("moveRight");
        $($lastSlider).removeClass("moveLeft").addClass("moveRight");
    }
    function previous() {
        hideNextAndPrevious();
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
        $($nextSlider).show(1);
        $($targetSlider).hide(1);
        $($lastSlider).hide(1);
        color = $($nextSlider).data("color");
        $body.removeClass("light").removeClass("dark").addClass(color);
        $($targetSlider).addClass("moveRight");
        $($nextSlider).removeClass("moveLeft");
        $($lastSlider).removeClass("moveRight").addClass("moveLeft");
    }
    $afters.on("click", function () {
        setCurrentSlider();
        next();
    });
    $before.on("click", function () {
        setCurrentSlider();
        previous();
    });
    $headers.swipe( {
        swipe:function(event, direction) {
            setCurrentSlider();
            switch(direction){
                case "left":
                    next();
                    break;
                case "right":
                    previous();
                    break;
            }
        }
    });
    $(document).on("keydown", function (e) {
        setCurrentSlider();
        var code = e.which;
        if(code == 37){
            previous();
        } else if (code == 39){
            next();
        }
    });
});