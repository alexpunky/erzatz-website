this.erzatz = this.erzatz||{};

(function(Erzatz)
{
    "use strict";

    Erzatz.Overlay = function() {

        this.open = openOverlay;
        this.close = closeOverlay;
        this.isOpen = isOpen;
        this.loadContent = loadContent;
        this.isAvailable = true;

        function openOverlay()
        {
            this.available = false;
           $('.content-overlay').toggleClass('visible');
        }

        function closeOverlay()
        {
            this.available = false;
            $('.content-wrapper').removeClass('visible');
        }

        function isOpen()
        {
            return $('.content-overlay').hasClass('visible');
        }

        function loadContent(url)
        {
            return $.ajax({
                url: "assets/content/" + url
            }).done(function(data) {
                $('#content').html(data);
            });
        }

        //Initialize transition events
        $('.content-overlay').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function (e) {
                if ($(this).hasClass('visible')) {
                    $(this).find('.content-wrapper').addClass('visible');
                }
                else {
                    this.available = true;
                }
            });

        $('.content-wrapper').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function (e) {
                if (!$(this).hasClass('visible')) {
                    $(this).closest('.content-overlay').removeClass('visible');
                }
                else {
                    this.available = true;
                }
            });

    };

})(this.erzatz);