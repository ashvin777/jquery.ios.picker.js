! function (t) {
    var n = t.event.dispatch || t.event.handle,
        e = t.event.special,
        a = "D" + +new Date,
        l = "D" + (+new Date + 1);
    e.scrollstart = {
        setup: function (l) {
            var c, s = t.extend({
                    latency: e.scrollstop.latency
                }, l),
                i = function (t) {
                    var e = this,
                        a = arguments;
                    c ? clearTimeout(c) : (t.type = "scrollstart", n.apply(e, a)), c = setTimeout(function () {
                        c = null
                    }, s.latency)
                };
            t(this).bind("scroll", i).data(a, i)
        },
        teardown: function () {
            t(this).unbind("scroll", t(this).data(a))
        }
    }, e.scrollstop = {
        latency: 250,
        setup: function (a) {
            var c, s = t.extend({
                    latency: e.scrollstop.latency
                }, a),
                i = function (t) {
                    var e = this,
                        a = arguments;
                    c && clearTimeout(c), c = setTimeout(function () {
                        c = null, t.type = "scrollstop", n.apply(e, a)
                    }, s.latency)
                };
            t(this).bind("scroll", i).data(l, i)
        },
        teardown: function () {
            t(this).unbind("scroll", t(this).data(l))
        }
    }
}(jQuery);

(function ($) {

    $("head").append("<style type='text/css'>.picker-wrapper,.picker-wrapper *{box-sizing:border-box;-webkit-user-select:none;font-family:helvetica}.picker-wrapper{text-align:center;position:relative;height:210px;display:inline-block;line-height:30px;width:100%;font-size:20px}.picker-scroller{overflow:auto;height:100%;position:absolute;top:0;width:100%;padding-top:90px;padding-bottom:90px}.picker-up{position:absolute;top:0;z-index:2;background:rgba(256,256,256,0.8);width:100%;height:90px;border-bottom:1px solid lightgray}.picker-down{position:absolute;top:120px;z-index:2;background:rgba(256,256,256,0.8);width:100%;height:90px;border-top:1px solid lightgray}.clone-scroller{-webkit-box-shadow:inset 0 20px 24px 3px white,inset 0 -20px 24px 3px white;-ms-box-shadow:inset 0 10px 24px 3px white,inset 0 -20px 24px 3px white;-moz-box-shadow:inset 0 10px 24px 3px white,inset 0 -20px 24px 3px white;box-shadow:inset 0 10px 24px 3px white,inset 0 -20px 24px 3px white;z-index:5;overflow:auto;height:100%;position:absolute;top:0;width:100%;padding-top:90px;padding-bottom:90px}.clone-scroller .option{visibility:hidden}</style>");


    $.fn.picker = function (json, callback) {
        var options = json.data;
        var lineHeight = 30;
        $ele = $(this);
        $ele.empty();
        $ele.addClass("picker-wrapper");
        $ele.append('<div class="clone-scroller"></div>');
        $ele.append('<div class="picker-up"></div>');
        $ele.append('<div class="picker-down"></div>');
        $ele.append('<div class="picker-scroller"></div>');

        if (typeof json.lineHeight != "undefined") {
            lineHeight = json.lineHeight;
        }
        $.each(options, function (index, option) {
            $ele.find('.clone-scroller').append('<div class="option">' + option + '</div>');
            $ele.find('.picker-scroller').append('<div class="option">' + option + '</div>');
        });
        $ele.find('.clone-scroller').bind("scroll", function () {
            $(this).parent().find(".picker-scroller").scrollTop($(this).scrollTop());
            var scrollAmount = Math.round($(this).scrollTop() / lineHeight);
            if (callback){
                callback($($(this).parent().find(".picker-scroller").find(".option").get(scrollAmount)).html());
            }
        });
        $ele.find(".clone-scroller").bind("scrollstop", function (e) {
            var scrollAmount = Math.round($(this).scrollTop() / lineHeight) * lineHeight;
            $(this).parent().find(".picker-scroller").animate({
                scrollTop: scrollAmount
            }, 100);
        });

        /*setting css*/
        if (typeof json.lineHeight != "undefined") {
            $ele.css("height", (lineHeight * 7) + "px");
            $ele.css("line-height", lineHeight + "px");
            $ele.find('.clone-scroller').css({
                "padding-top": (lineHeight * 3) + "px",
                "padding-bottom": (lineHeight * 3) + "px"
            });
            $ele.find('.picker-scroller').css({
                "padding-top": (lineHeight * 3) + "px",
                "padding-bottom": (lineHeight * 3) + "px"
            });
            $ele.find(".picker-up").css("height", (lineHeight * 3) + "px");
            $ele.find(".picker-down").css("height", (lineHeight * 3) + "px");
            $ele.find(".picker-down").css("top", (lineHeight * 4) + "px");
        }
        // default selected
        if (typeof json.selected != "undefined") {
            $ele.find('.clone-scroller').scrollTop(lineHeight * json.selected);
            $ele.find('.picker-scroller').scrollTop(lineHeight * json.selected);
        }
    };
}(jQuery));