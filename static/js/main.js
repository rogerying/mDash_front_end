$(document).ready(function () {
    function forCookie() {
        if(localStorage.getItem('Cookie') == 'YES, I AGREE') {
            $('.section-cookies').addClass('d-none');
        } else {
            $('.section-cookies').removeClass('d-none');
        }

        $('.section-cookies .btn-white').click(function () {
            localStorage.setItem('Cookie', 'YES, I AGREE');
            $('.section-cookies').addClass('d-none');
        });
    }

    function openMenu() {
        $('.section-header .nav-item').click(function () {
            var thisElement = $(this).find('ul');

            if(thisElement.hasClass('open')) {
                thisElement.removeClass('open');
            } else {
                thisElement.addClass('open');
            }
        });

        $(document).mouseup(function (e){
            var div = $('.section-header .nav-item ul');
            if (!div.is(e.target)
                && div.has(e.target).length === 0) {
                div.removeClass('open');
            }
        });
    }
    function openLeftMenu() {
        $('.my-account-page .left-menu-content .mobile-left-menu').click(function () {
            var thisElement = $(this).parent().find('ul');

            if(thisElement.hasClass('open')) {
                thisElement.removeClass('open');
            } else {
                thisElement.addClass('open');
            }
        });

        $(document).mouseup(function (e){
            var div = $('.my-account-page .left-menu-content ul');
            if (!div.is(e.target)
                && div.has(e.target).length === 0) {
                div.removeClass('open');
            }
        });
    }

    function closePopup() {
        $('.section-popup .btn-close').click(function () {
            $('.section-popup').addClass('d-none');
        });
    }
    function customSelect() {
        $('.block-custom-select').click(function () {
            var thiSelect = $(this);

            if(thiSelect.hasClass('open')) {
                thiSelect.removeClass('open');
                return false;
            } else {
                thiSelect.addClass('open');
                return false;
            }
        });

        $('.block-custom-select .item').click(function () {
            var thisItem = $(this);
            var selectBlock = thisItem.parents('.block-custom-select');

            selectBlock.find('.item').removeClass('active');
            thisItem.addClass('active');

            selectBlock.find('.active-selected').html(thisItem.html());
            selectBlock.find('.form-control').val(thisItem.text());

            selectBlock.removeClass('open');
            return false;
        });

        $(document).mouseup(function (e){
            var div = $('.block-custom-select');
            if (!div.is(e.target)
                && div.has(e.target).length === 0) {
                div.removeClass('open');
            }
        });
    }

    function activeOrder() {
        $('.active-order-page .btn-green.change').click(function () {
            $('.active-order-page .btn-green.change').addClass('d-none');
            $('.active-order-page .btn-green.save').removeClass('d-none');
            $('.active-order-page .box-detail .form-control').prop('disabled', false);
        });
        $('.active-order-page .btn-green.save').click(function () {
            $('.active-order-page .btn-green.change').removeClass('d-none');
            $('.active-order-page .btn-green.save').addClass('d-none');
            $('.active-order-page .box-detail .form-control').prop('disabled', true);
        });
    }

    function heightForElements (elements, maxHeight) {
        elements.css('height', 'auto');
        elements.each(function( index ) {
            var thisElement = $( this );
            if(thisElement.height()>maxHeight) {maxHeight= thisElement.height();}
        });
        elements.height(maxHeight);
    }

    function maxHeightElements() {
        var maxHeight_inElement = 0;
        var maxHeight_element = 0;
        var maxHeight_element1 = 0;

        heightForElements($('.home-page .block-item-why'), maxHeight_inElement);
        heightForElements($('.home-page .section-1 .block-with-info'), maxHeight_element);
        heightForElements($('.home-page .section-1 .block-3 .col-lg-3'), maxHeight_element1);
        maxHeightInAccount();
    }

    function maxHeightInAccount() {
        var block1 = $('section.section-page.my-account-page.my-account-overview-page .mb-50 .card-statistics');
        var block2 = $('section.section-page.my-account-page.my-account-overview-page .mb-50 .card-1');
        var maxHeight = 0;

        if(block1.outerHeight() > block2.outerHeight()) {
            maxHeight = block1.outerHeight();
        } else {
            maxHeight = block2.outerHeight();
        }

        block1.height(maxHeight);
        block2.height(maxHeight);
    }

    maxHeightElements();
    $(window).resize(function(){maxHeightElements();});
    setTimeout(maxHeightElements, 1000);
    setTimeout(maxHeightElements, 5000);
    setTimeout(maxHeightElements, 9000);
    setTimeout(maxHeightElements, 13000);

    forCookie();
    openMenu();
    openLeftMenu();
    closePopup();
    customSelect();
    activeOrder();
});