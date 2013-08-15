/**
 * Galleria Classic Theme 2012-08-08
 * http://galleria.io
 *
 * Licensed under the MIT license
 * https://raw.github.com/aino/galleria/master/LICENSE
 *
 */

(function($) {

/*global jQuery, Galleria */

Galleria.addTheme({
    name: 'custom',
    author: 'Samuel Maura',
    css: 'galleria.custom.css',
    defaults: {
        swipe: true,
        trueFullscreen: true,
        showCounter: true, 
        responsive: true,
        autoplay: 15000,
        transition: "fade",
        thumbnails: false,
        imageCrop: true,
        thumbCrop: "height",
        easing: "galleriaOut", 
        // set this to false if you want to show the caption all the time:
        _toggleInfo: true,
         // Toggles the dock
         _hideDock: false,
         // Set this to true if you want to close the carousel when clicking on a thumbnail
         _closeOnClick: false,
         _myColor: 'white',
         _myDock: '<div class="custom-slideshow-dock"></div>',
         _myDockClass: '.custom-slideshow-dock' 
    },
    init: function(options) {

        Galleria.requires(1.28, 'This version of Classic theme requires Galleria 1.2.8 or later');
        
        this.$('container').css('background-color',options._myColor);
        //this.$('thumbnails-list').css("display","none");
        
        this.$('thumbnails-container').css("display","none");
        this.$('container').append(options._myDock);
        $(options._myDockClass).css('background-color','lightGray').css('height','35px').css('width','610px').css('position','absolute').css('left','10px').css('top','560px');
        
        this.$('image-nav').css('background-color','orange');
        //this.$('counter').css('background-color','orange').appendTo($(options._myDockClass));
        
        this.addElement('mystuff');
        this.appendChild('stage','mystuff');
        
        
        this.$('image-nav-left').css('outline','1px solid red');
        
        
        //this.$('container').css('display','none');
        
        //this.$('stage').css('width','100%');
        
        console.log('Galleria init called'); 
        
        // add some elements
        this.addElement('info-link','info-close');
        this.append({
            'info' : ['info-link','info-close']
        });

        // cache some stuff
        var info = this.$('info-link,info-close,info-text'),
            touch = Galleria.TOUCH,
            click = touch ? 'touchstart' : 'click';

        // show loader & counter with opacity
        this.$('loader,counter').show().css('opacity', 0.4);

        // some stuff for non-touch browsers
        if (! touch ) {
            this.addIdleState( this.get('image-nav-left'), { left:-50 });
            this.addIdleState( this.get('image-nav-right'), { right:-50 });
            this.addIdleState( this.get('counter'), { opacity:0 });
        }

        // toggle info
        if ( options._toggleInfo === true ) {
            info.bind( click, function() {
                info.toggle();
            });
        } else {
            info.show();
            this.$('info-link, info-close').hide();
        }

        // bind some stuff
        this.bind('thumbnail', function(e) {

            if (! touch ) {
                // fade thumbnails
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });

                if ( e.index === this.getIndex() ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6);
            }
        });

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }

            this.$('info').toggle( this.hasInfo() );

            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
        });

        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
        });
    }
});

}(jQuery));
