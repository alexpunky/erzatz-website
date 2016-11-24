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
           $('#overlay').toggleClass('visible');
        }

        function closeOverlay()
        {
            this.available = false;
            $('#overlay-wrapper').removeClass('visible');
        }

        function isOpen()
        {
            return $('#overlay').hasClass('visible');
        }

        function loadContent(url)
        {
            return $.ajax({
                url: "assets/content/" + url
            }).done(function(data) {
                $('#overlay-content').html(data);
            });
        }

        //Initialize transition events
        $('#overlay').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function (e) {
                if ($(this).hasClass('visible')) {
                    $(this).find('#overlay-wrapper').addClass('visible');
                }
                else {
                    this.available = true;
                }
            });

        $('#overlay-wrapper').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function (e) {
                if (!$(this).hasClass('visible')) {
                    $(this).closest('#overlay').removeClass('visible');
                }
                else {
                    this.available = true;
                }
            });

    };

})(this.erzatz);