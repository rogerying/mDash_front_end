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

    function aboutPage() {
        $('.about-page .section-2-3 .btn-submit').click(function () {
            $('.about-page .popup-chat').removeClass('d-none');
        });
        $('.about-page .btn-close').click(function () {
            $('.about-page .popup-chat').addClass('d-none');
        });
    }

    function uploadImg() {
        $('#imgFile').change(function () {
            var input = $(this)[0];
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#blah').attr('src', e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
        });
    }

    function forPaymentPage() {
        $('.payment-page .card-promotions #checkbox_for_promotions').change(function () {
            var checkbox_for_promotions = $(this);
            var price_updated_total = $('.payment-page .card-promotions .price-updated-total');
            console.log(checkbox_for_promotions.prop("checked"));

            $.ajax({
                type:     "post",
                data:     {id: 0},
                cache:    false,
                url:      "doIt.php",
                dataType: "text",
                error: function (request, error) {
                    console.log(arguments);
                    alert(" Can't do because: " + error);
                    if(checkbox_for_promotions.prop("checked") === true) {
                        checkbox_for_promotions.prop("checked", false);
                    } else {
                        checkbox_for_promotions.prop("checked", true);
                    }
                },
                success: function () {
                    if(checkbox_for_promotions.prop("checked") === true) {
                        checkbox_for_promotions.prop("checked", true);
                        price_updated_total.text('$123');
                    } else {
                        checkbox_for_promotions.prop("checked", false);
                        price_updated_total.text('$321');
                    }
                }
            });
        });
    }

    function forNewOrder() {

        function step1() {
            function step1GreenBtn() {

                var val_country_ID = $('.new-order-page .block-step-1 select[name=countryID]').val();
                var val_item_quantity = $('.new-order-page .block-step-1 input[name=item_quantity]').val();

                if((val_country_ID != '') && (val_item_quantity != '')) {
                    $('.new-order-page .block-step-1 .btn-conf').removeClass('btn-grey').addClass('btn-green');
                }
            }

            $('.new-order-page .block-step-1 select[name=countryID]').change(function () {
                step1GreenBtn();
            });
            $('.new-order-page .block-step-1 input[name=item_quantity]').change(function () {
                step1GreenBtn();
            });

            $('.new-order-page .block-step-1 .btn-conf').click(function () {
                var step2 = $('.new-order-page .block-step-2');
                var step3 = $('.new-order-page .block-step-3');
                var val_country_ID = $('.new-order-page .block-step-1 select[name=countryID]').val();
                var val_item_quantity = $('.new-order-page .block-step-1 input[name=item_quantity]').val();
                var info_msg_error = $('.new-order-page .block-step-1 .block-info-msg.error');
                var info_msg_confirmed = $('.new-order-page .block-step-1 .block-info-msg.confirmed');
                var val_item_quantity_int = parseInt(val_item_quantity);

                $.ajax({
                    type:     "post",
                    data:     {id: 0},
                    cache:    false,
                    url:      "doIt.php",
                    dataType: "text",
                    error: function (request, error) {
                        console.log(arguments);
                        alert(" Can't do because: " + error);

                        info_msg_error.removeClass('d-none');
                        info_msg_error.find('span').text(error);
                    },
                    success: function () {
                        info_msg_confirmed.removeClass('d-none');
                        info_msg_confirmed.find('span').text('Confirmed!');

                        step2.removeClass('d-none');
                        step3.removeClass('d-none');
                    }
                });
            });

        }

        function step2() {
            function step2_1() {
                $('.new-order-page .block-step-2 .tab-pane-1 .btn-search').click(function () {
                    var val_show_category = $('.new-order-page .block-step-2 .tab-pane-1 select[name=show_category]').val();
                    var block_pagination_results = $('.new-order-page .block-step-2 .tab-pane-1 .results');
                    var block_pagination = $('.new-order-page .block-step-2 .tab-pane-1 .block-pagination-main');

                    $.ajax({
                        type:     "post",
                        data:     {id: 0},
                        cache:    false,
                        url:      "doIt.php",
                        dataType: "text",
                        error: function (request, error) {
                            console.log(arguments);
                            alert(" Can't do because: " + error);
                        },
                        success: function () {
                            var table_tr = '<tr>' +
                                '<td>ID8HFE9374</td>' +
                                '<td>[WILL CONSIDER ADDING STEP TO CODE]</td>' +
                                '<td>[PRICE]</td>' +
                                '<td>' +
                                '<div class="btn btn-submit btn-select selected">Selected</div>' +
                                '</td>' +
                                ' <td>' +
                                '<a href="#" class="btn btn-submit btn-view">' +
                                '<img src="/static/img/popout.png" srcset="/static/img/popout@2x.png 2x, /static/img/popout@3x.png 3x">' +
                                '</a>' +
                                '</td>' +
                                '</tr>';

                            $('.new-order-page .block-step-2 .tab-pane-1 .table tbody')
                                .html('')
                                .append(table_tr);

                            block_pagination_results.text('Results: ' + 6);
                            block_pagination.find('span').text('Page '+ 1 +' of ' +3);
                        }
                    });
                });

                //Click next button
                $('.new-order-page .block-step-2 .tab-pane-1 .block-pagination-main .next').click(function () {
                    var block_pagination_results = $('.new-order-page .block-step-2 .tab-pane-1 .results');
                    var block_pagination = $('.new-order-page .block-step-2 .tab-pane-1 .block-pagination-main');

                    $.ajax({
                        type:     "post",
                        data:     {id: 0},
                        cache:    false,
                        url:      "doIt.php",
                        dataType: "text",
                        error: function (request, error) {
                            console.log(arguments);
                            alert(" Can't do because: " + error);
                        },
                        success: function () {
                            var table_tr = '<tr>' +
                                '<td>ID8HFE9374</td>' +
                                '<td>[WILL CONSIDER ADDING STEP TO CODE]</td>' +
                                '<td>[PRICE]</td>' +
                                '<td>' +
                                '<div class="btn btn-submit btn-select selected">Selected</div>' +
                                '</td>' +
                                ' <td>' +
                                '<a href="#" class="btn btn-submit btn-view">' +
                                '<img src="/static/img/popout.png" srcset="/static/img/popout@2x.png 2x, /static/img/popout@3x.png 3x">' +
                                '</a>' +
                                '</td>' +
                                '</tr>';

                            $('.new-order-page .block-step-2 .tab-pane-1 .table tbody')
                                .html('')
                                .append(table_tr);

                            block_pagination_results.text('Results: ' + 6);
                            block_pagination.find('span').text('Page '+ 1 +' of ' +3);
                        }
                    });
                });

                //Click next prev
                $('.new-order-page .block-step-2 .tab-pane-1 .block-pagination-main .prev').click(function () {
                    var block_pagination_results = $('.new-order-page .block-step-2 .tab-pane-1 .results');
                    var block_pagination = $('.new-order-page .block-step-2 .tab-pane-1 .block-pagination-main');

                    $.ajax({
                        type:     "post",
                        data:     {id: 0},
                        cache:    false,
                        url:      "doIt.php",
                        dataType: "text",
                        error: function (request, error) {
                            console.log(arguments);
                            alert(" Can't do because: " + error);
                        },
                        success: function () {
                            var table_tr = '<tr>' +
                                '<td>ID8HFE9374</td>' +
                                '<td>[WILL CONSIDER ADDING STEP TO CODE]</td>' +
                                '<td>[PRICE]</td>' +
                                '<td>' +
                                '<div class="btn btn-submit btn-select selected">Selected</div>' +
                                '</td>' +
                                ' <td>' +
                                '<a href="#" class="btn btn-submit btn-view">' +
                                '<img src="/static/img/popout.png" srcset="/static/img/popout@2x.png 2x, /static/img/popout@3x.png 3x">' +
                                '</a>' +
                                '</td>' +
                                '</tr>';

                            $('.new-order-page .block-step-2 .tab-pane-1 .table tbody')
                                .html('')
                                .append(table_tr);

                            block_pagination_results.text('Results: ' + 6);
                            block_pagination.find('span').text('Page '+ 1 +' of ' +3);
                        }
                    });
                });

            }

            function step2_2() {
                $('.new-order-page .block-step-2 .tab-pane-2 .btn-search').click(function () {
                    var val_search_category = $('.new-order-page .block-step-2 .tab-pane-2 select[name=search_category]').val();
                    var val_search_text = $('.new-order-page .block-step-2 .tab-pane-2 input[name=search_text]').val();
                    var block_pagination_results = $('.new-order-page .block-step-2 .tab-pane-2 .results');
                    var block_pagination = $('.new-order-page .block-step-2 .tab-pane-2 .block-pagination-main');

                    $.ajax({
                        type:     "post",
                        data:     {id: 0},
                        cache:    false,
                        url:      "doIt.php",
                        dataType: "text",
                        error: function (request, error) {
                            console.log(arguments);
                            alert(" Can't do because: " + error);
                        },
                        success: function () {
                            var table_tr = '<tr>' +
                                '<td>ID8HFE9374</td>' +
                                '<td>[WILL CONSIDER ADDING STEP TO CODE]</td>' +
                                '<td>[PRICE]</td>' +
                                '<td>' +
                                '<div class="btn btn-submit btn-select selected">Selected</div>' +
                                '</td>' +
                                ' <td>' +
                                '<a href="#" class="btn btn-submit btn-view">' +
                                '<img src="/static/img/popout.png" srcset="/static/img/popout@2x.png 2x, /static/img/popout@3x.png 3x">' +
                                '</a>' +
                                '</td>' +
                                '</tr>';

                            $('.new-order-page .block-step-2 .tab-pane-2 .table tbody')
                                .html('')
                                .append(table_tr);

                            block_pagination_results.text('Results: ' + 6);
                            block_pagination.find('span').text('Page '+ 1 +' of ' +3);
                        }
                    });
                });

                //Click next button
                $('.new-order-page .block-step-2 .tab-pane-2 .block-pagination-main .next').click(function () {
                    var block_pagination_results = $('.new-order-page .block-step-2 .tab-pane-2 .results');
                    var block_pagination = $('.new-order-page .block-step-2 .tab-pane-2 .block-pagination-main');

                    $.ajax({
                        type:     "post",
                        data:     {id: 0},
                        cache:    false,
                        url:      "doIt.php",
                        dataType: "text",
                        error: function (request, error) {
                            console.log(arguments);
                            alert(" Can't do because: " + error);
                        },
                        success: function () {
                            var table_tr = '<tr>' +
                                '<td>ID8HFE9374</td>' +
                                '<td>[WILL CONSIDER ADDING STEP TO CODE]</td>' +
                                '<td>[PRICE]</td>' +
                                '<td>' +
                                '<div class="btn btn-submit btn-select selected">Selected</div>' +
                                '</td>' +
                                ' <td>' +
                                '<a href="#" class="btn btn-submit btn-view">' +
                                '<img src="/static/img/popout.png" srcset="/static/img/popout@2x.png 2x, /static/img/popout@3x.png 3x">' +
                                '</a>' +
                                '</td>' +
                                '</tr>';

                            $('.new-order-page .block-step-2 .tab-pane-2 .table tbody')
                                .html('')
                                .append(table_tr);

                            block_pagination_results.text('Results: ' + 6);
                            block_pagination.find('span').text('Page '+ 1 +' of ' +3);
                        }
                    });
                });

                //Click next prev
                $('.new-order-page .block-step-2 .tab-pane-2 .block-pagination-main .prev').click(function () {
                    var block_pagination_results = $('.new-order-page .block-step-2 .tab-pane-2 .results');
                    var block_pagination = $('.new-order-page .block-step-2 .tab-pane-2 .block-pagination-main');

                    $.ajax({
                        type:     "post",
                        data:     {id: 0},
                        cache:    false,
                        url:      "doIt.php",
                        dataType: "text",
                        error: function (request, error) {
                            console.log(arguments);
                            alert(" Can't do because: " + error);
                        },
                        success: function () {
                            var table_tr = '<tr>' +
                                '<td>ID8HFE9374</td>' +
                                '<td>[WILL CONSIDER ADDING STEP TO CODE]</td>' +
                                '<td>[PRICE]</td>' +
                                '<td>' +
                                '<div class="btn btn-submit btn-select selected">Selected</div>' +
                                '</td>' +
                                ' <td>' +
                                '<a href="#" class="btn btn-submit btn-view">' +
                                '<img src="/static/img/popout.png" srcset="/static/img/popout@2x.png 2x, /static/img/popout@3x.png 3x">' +
                                '</a>' +
                                '</td>' +
                                '</tr>';

                            $('.new-order-page .block-step-2 .tab-pane-2 .table tbody')
                                .html('')
                                .append(table_tr);

                            block_pagination_results.text('Results: ' + 6);
                            block_pagination.find('span').text('Page '+ 1 +' of ' +3);
                        }
                    });
                });
            }
            function step2_3() {
                $('.new-order-page .block-step-2 .tab-pane-3 .btn-search').click(function () {
                    var val_asin_search = $('.new-order-page .block-step-2 .tab-pane-3 input[name=asin_search]').val();

                    $.ajax({
                        type:     "post",
                        data:     {id: 0},
                        cache:    false,
                        url:      "doIt.php",
                        dataType: "text",
                        error: function (request, error) {
                            console.log(arguments);
                            alert(" Can't do because: " + error);
                        },
                        success: function () {
                            var table_tr = '<tr>' +
                                '<td>ID8HFE9374</td>' +
                                '<td>[WILL CONSIDER ADDING STEP TO CODE]</td>' +
                                '<td>[PRICE]</td>' +
                                '<td>' +
                                '<div class="btn btn-submit btn-select selected">Selected</div>' +
                                '</td>' +
                                ' <td>' +
                                '<a href="#" class="btn btn-submit btn-view">' +
                                '<img src="/static/img/popout.png" srcset="/static/img/popout@2x.png 2x, /static/img/popout@3x.png 3x">' +
                                '</a>' +
                                '</td>' +
                                '</tr>';

                            $('.new-order-page .block-step-2 .tab-pane-3 .table tbody')
                                .html('')
                                .append(table_tr);
                        }
                    });
                });
            }

            step2_1();
            step2_2();
            step2_3();
        }

        step1();
        step2();

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

    aboutPage();
    forCookie();
    openMenu();
    openLeftMenu();
    closePopup();
    customSelect();
    activeOrder();
    uploadImg();
    forPaymentPage();

    forNewOrder();
});