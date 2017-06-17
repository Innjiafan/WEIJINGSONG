

'use strict';


$(function() {
    function resize(event) {
        var currentWidth = $(window).width();
        var isSmallScreen = currentWidth < 768;
        $("#main_id>.carousel-inner>.item").each(function (index,element) {
            var $element = $(element);
            var imgSrc = isSmallScreen?$element.data('image-xs'):$element.data('image-lg');
            $element.css('backgroundImage', 'url("' + imgSrc + '")');
            if(isSmallScreen){
                $(element).html('<img src="'+imgSrc+'"/>');
            }else{
                $element.empty();
            }
        })

    }

    // tab栏宽度适应
    var $tabs = $('.nav-tabs');
    $tabs.each(function(i, item) {
        var $tab = $(this);
        var width = 20;
        $tab.children().each(function(ci, citem) {
            width += $(citem).width();
        });
        if (width > $tab.parent().width()) {
            $tab.css('width', width);
            $tabs.parent().css('overflow-x', 'scroll');
        } else {
            $tab.css('width', 'auto');
            $tabs.parent().css('overflow-x', 'hidden');
        }
    });
    //xx该事件被触发时执行的函数
    $(window).on('resize',resize).trigger('resize');
    // 提示框效果
    $('[data-toggle="tooltip"]').tooltip();
    // 新闻点击切换
    $('.news-nav a').click(function(e) {
        // e.preventDefault();
        // e.stopPropagation();
        // 不要阻止默認事件
        $('.news-title').text($(this).data('title'));

    });
    var OFFSET = 50;
    $('.carousel').each(function (i,item) {
        var startX,endX;
        item.addEventListener('touchstart',function(e){
            startX = e.touches[0].clientX;
            e.preventDefault();
        });
        item.addEventListener('touchmove', function(e) {
            endX = e.touches[0].clientX;
            e.preventDefault();
        });
        item.addEventListener('touchend', function(e) {
            var offsetX = endX - startX;
            if (offsetX > OFFSET) {
                // 上一张
                $(this).carousel('prev');
            } else if (offsetX < -OFFSET) {
                // 上一张
                $(this).carousel('next');
            }
            e.preventDefault();
        });
    })
});
