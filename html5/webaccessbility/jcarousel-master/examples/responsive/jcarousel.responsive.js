(function($) {
    $(function() {
        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function() {
                var carousel = $(this),
                    width = carousel.innerWidth();

                if (width >= 600) {
                    width = width / 3;
                } else if (width >= 350) {
                    width = width / 2;
                }

                carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
            })
            .jcarousel({
                wrap: 'circular'
            })
            .on('jcarousel:animateend jcarousel:scrollend', function() {
                fixWebAccessbility($(this))
            })
            .jcarouselAutoscroll({
                interval: 5000
            });
        fixWebAccessbility(jcarousel);

        function fixWebAccessbility(carousel) {
            var items = carousel.jcarousel('items');
            var visible = carousel.jcarousel('visible');
            items.attr("aria-hidden", true).find('a').attr("tabindex", -1);
            visible.attr("aria-hidden", false).find('a').attr("tabindex", 0);
        }
        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            // .jcarouselPagination({
            //     perPage: 1,
            //     item: function(page) {
            //         return '<a href="#' + page + '">' + page + '</a>';
            //     }
            // });
    });
})(jQuery);