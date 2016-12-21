/**
 * Created by Mateusz Chybiorz on 2016-12-16.
 */
$(function() {
    var $headers = $(".headerToSlide");
    var $slides = $(".slides");
    $($slides[1]).addClass("moveRight");
    $($slides[2]).addClass("moveLeft");
    $headers.swipe( {
        swipe:function(event, direction) {
            var $targetSlider = $(this).parent().parent()[0];
            var $body = $("body");
            var $nextSlider;
            var color;
            var $lastSlider;
            switch(direction){
                case "left":
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
                    break;
                case "right":
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
                    break;
            }
        }
    });
});