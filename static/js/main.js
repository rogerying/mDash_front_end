$(document).ready(function () {
    function forCookie() {
        if (localStorage.getItem('Cookie') == 'YES, I AGREE') {
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

            if (thisElement.hasClass('open')) {
                thisElement.removeClass('open');
            } else {
                thisElement.addClass('open');
            }
        });

        $(document).mouseup(function (e) {
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

            if (thisElement.hasClass('open')) {
                thisElement.removeClass('open');
            } else {
                thisElement.addClass('open');
            }
        });

        $(document).mouseup(function (e) {
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

            if (thiSelect.hasClass('open')) {
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

        $(document).mouseup(function (e) {
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
                type: "post",
                data: {id: 0},
                cache: false,
                url: "doIt.php",
                dataType: "text",
                error: function (request, error) {
                    console.log(arguments);
                    alert(" Can't do because: " + error);
                    if (checkbox_for_promotions.prop("checked") === true) {
                        checkbox_for_promotions.prop("checked", false);
                    } else {
                        checkbox_for_promotions.prop("checked", true);
                    }
                },
                success: function () {
                    if (checkbox_for_promotions.prop("checked") === true) {
                        checkbox_for_promotions.prop("checked", true);
                        price_updated_total.text('$123'); // TODO this is where the price gets put back
                    } else {
                        checkbox_for_promotions.prop("checked", false);
                        price_updated_total.text('$321');
                    }
                }
            });
        });
    }

    function forNewOrder() {

        // create global variables for the page here

        function step1() {
            function step1GreenBtn() {

                var val_country_ID = $('.new-order-page .block-step-1 select[name=countryID]').val();
                var val_item_quantity = $('.new-order-page .block-step-1 input[name=item_quantity]').val();

                if ((val_country_ID != '') && (val_item_quantity != '')) {
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
                var val_country_ID = $('.new-order-page .block-step-1 select[name=countryID]').val();
                var val_item_quantity = $('.new-order-page .block-step-1 input[name=item_quantity]').val();
                var info_msg_error = $('.new-order-page .block-step-1 .block-info-msg.error');
                var info_msg_confirmed = $('.new-order-page .block-step-1 .block-info-msg.confirmed');
                var val_item_quantity_int = parseInt(val_item_quantity);

                $.ajax({
                    type: "POST",
                    data: {
                        'item_quantity': val_item_quantity_int,
                        'countryID': val_country_ID
                    },
                    url: "neworder_step_one",
                    cache: false,
                    dataType: "json",
                    error: function (request, error) {
                        console.log(arguments);
                        alert("There was an error: " + error);

                        info_msg_error.removeClass('d-none');
                        info_msg_error.find('span').text(error);
                    },
                    success: function (data) {
                        info_msg_confirmed.removeClass('d-none');
                        info_msg_confirmed.find('span').text('Confirmed!');

                        step2.removeClass('d-none');
                        alert(JSON.stringify(data));
                        $("#step2_store").text('You have chosen the ' + data.country + ' store.');
                        $("#price_range").text('Price (' + data.currency + ') from:');

                    }
                });
            });

        }

        // This is the search button of the popular tab
        function step2() {

            var show_popular_all_items = [];

            function step2_1() {
                $('.new-order-page .block-step-2 .tab-pane-1 .btn-search').click(function () {
                    var val_show_category = $('.new-order-page .block-step-2 .tab-pane-1 select[name=show_category]').val();
                    var val_price_range_from = $('.new-order-page .block-step-2 .tab-pane-1 input[name=price_range_from]').val();
                    var val_price_range_to = $('.new-order-page .block-step-2 .tab-pane-1 input[name=price_range_to]').val();
                    var val_country_ID = $('.new-order-page .block-step-1 select[name=countryID]').val();
                    var val_item_quantity = $('.new-order-page .block-step-1 input[name=item_quantity]').val();
                    var val_item_quantity_int = parseInt(val_item_quantity);
                    var val_price_range_from_int = parseInt(val_price_range_from);
                    var val_price_range_to_int = parseInt(val_price_range_to);
                    var block_pagination_results = $('.new-order-page .block-step-2 .tab-pane-1 .results');
                    var block_pagination = $('.new-order-page .block-step-2 .tab-pane-1 .block-pagination-main');

                    $.ajax({
                        type: "post",
                        data: {
                            'item_quantity': val_item_quantity_int,
                            'countryID': val_country_ID,
                            'show_category': val_show_category,
                            'price_range_low': val_price_range_from_int,
                            'price_range_high': val_price_range_to_int,
                        },
                        cache: false,
                        url: "neworder_step_two_popular",
                        dataType: "json",
                        error: function (request, error) {
                            console.log(arguments);
                            alert("There was an error: " + error);
                        },
                        success: function (data) {
                            // if (data.show_done == 'False') {
                            //     alert('Sorry, no items were found with that price range');
                            //     return;
                            // }
                            // var show_popular = list(data.show_popular);
                            alert(data.show_popular);
                            $('.new-order-page .block-step-2 .tab-pane-1 .table tbody').html('');

                            var table_th = '<tr>' +
                                '<th scope="col">ASIN #</th>' +
                                '<th scope="col">Product</th>' +
                                '<th scope="col">Price / Item</th>' +
                                '<th scope="col">Select Item</th>' +
                                '<th scope="col">View on Amazon</th>' +
                                '</tr>';

                            $('.new-order-page .block-step-2 .tab-pane-1 .table thead').html(table_th);

                            $.each(data.show_popular, function (i) {
                                //p.asin, p.productHeadline, p.averageSellPrice, p.productLink

                                var table_tr = '<tr>' +
                                    '<td>' + data.show_popular[i].asin + '</td>' +
                                    '<td>' + data.show_popular[i].productHeadline + '</td>' +
                                    '<td>' + data.currency + ' ' + data.show_popular[i].averageSellPrice + '</td>' +
                                    '<td>' +
                                    '<div id="' + data.countryID + ':' + data.item_quantity +
                                    ':' + data.show_popular[i].asin + ':' +
                                    data.show_popular[i].averageSellPrice + '" class="btn btn-submit btn-select" onclick="clickSelectItem()">Select</div>' +
                                    '</td>' +
                                    ' <td>' +
                                    '<a href="' + data.show_popular[i].productLink + '" class="btn btn-submit btn-view"' +
                                    'target="_blank">' +
                                    '<img src="/static/img/popout.png" srcset="/static/img/popout@2x.png 2x, /static/img/popout@3x.png 3x">' +
                                    '</a>' +
                                    '</td>' +
                                    '</tr>';


                                $('.new-order-page .block-step-2 .tab-pane-1 .table tbody').append(table_tr);
                            })
                            var pagination_main = '<div class="btn btn-link prev">' +
                                '<i class="la la-angle-left"></i>' +
                                '</div>' +
                                '<span id="' + data.show_pagination_current + '">Page ' + data.show_pagination_current + ' of ' + data.show_pagination_pages + '</span>' +
                                '<div class="btn btn-link next">' +
                                '<i class="la la-angle-right"></i>' +
                                '</div>';

                            var pagination_results = '<div class="results">Results: ' + data.show_results_num + '</div>';

                            block_pagination.html(pagination_main);
                            block_pagination_results.html(pagination_results);
                            // block_pagination_results.text('Results: ' + data.show_results_num);
                            // block_pagination.find('span').text('Page ' + data.show_pagination_current + ' of ' + data.show_pagination_pages);
                            alert('search complete')
                            show_popular_all_items = data.show_popular;
                        }
                    });
                });

                //Click next button
                $('.new-order-page .block-step-2 .tab-pane-1 .block-pagination-main .next').click(function () {
                    var block_pagination_results = $('.new-order-page .block-step-2 .tab-pane-1 .results');
                    var block_pagination = $('.new-order-page .block-step-2 .tab-pane-1 .block-pagination-main');

                    $.ajax({
                        type: "post",
                        data: {id: 0},
                        cache: false,
                        url: "doIt.php",
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
                                '<div class="btn btn-submit btn-select">Select</div>' +
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
                            block_pagination.find('span').text('Page ' + 1 + ' of ' + 3);
                        }
                    });
                });

                //Click next prev
                $('.new-order-page .block-step-2 .tab-pane-1 .block-pagination-main .prev').click(function () {
                    var block_pagination_results = $('.new-order-page .block-step-2 .tab-pane-1 .results');
                    var block_pagination = $('.new-order-page .block-step-2 .tab-pane-1 .block-pagination-main');

                    $.ajax({
                        type: "post",
                        data: {id: 0},
                        cache: false,
                        url: "doIt.php",
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
                                '<a class="btn btn-submit btn-select">Select</a>' +
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
                            block_pagination.find('span').text('Page ' + 1 + ' of ' + 3);
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
                        type: "post",
                        data: {id: 0},
                        cache: false,
                        url: "doIt.php",
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
                                '<div class="btn btn-submit btn-select">Select</div>' +
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
                            block_pagination.find('span').text('Page ' + 1 + ' of ' + 3);
                        }
                    });
                });

                //Click next button
                $('.new-order-page .block-step-2 .tab-pane-2 .block-pagination-main .next').click(function () {
                    var block_pagination_results = $('.new-order-page .block-step-2 .tab-pane-2 .results');
                    var block_pagination = $('.new-order-page .block-step-2 .tab-pane-2 .block-pagination-main');

                    $.ajax({
                        type: "post",
                        data: {id: 0},
                        cache: false,
                        url: "doIt.php",
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
                                '<div class="btn btn-submit btn-select">Select</div>' +
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
                            block_pagination.find('span').text('Page ' + 1 + ' of ' + 3);
                        }
                    });
                });

                //Click next prev
                $('.new-order-page .block-step-2 .tab-pane-2 .block-pagination-main .prev').click(function () {
                    var block_pagination_results = $('.new-order-page .block-step-2 .tab-pane-2 .results');
                    var block_pagination = $('.new-order-page .block-step-2 .tab-pane-2 .block-pagination-main');

                    $.ajax({
                        type: "post",
                        data: {id: 0},
                        cache: false,
                        url: "doIt.php",
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
                                '<div class="btn btn-submit btn-select">Select</div>' +
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
                            block_pagination.find('span').text('Page ' + 1 + ' of ' + 3);
                        }
                    });
                });
            }

            function step2_3() {
                $('.new-order-page .block-step-2 .tab-pane-3 .btn-search').click(function () {
                    var val_asin_search = $('.new-order-page .block-step-2 .tab-pane-3 input[name=asin_search]').val();

                    $.ajax({
                        type: "post",
                        data: {id: 0},
                        cache: false,
                        url: "doIt.php",
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
                                '<div class="btn btn-submit btn-select">Select</div>' +
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

            // select button
            function btnSelected() {
                $('.new-order-page .block-step-2 .btn-select').click(function () {
                    var step3 = $('.new-order-page .block-step-3');
                    $('.btn-select').removeClass('selected').text('Select');
                    $(this).addClass('selected').text('Selected');
                    var id = $(this).attr("id");

                    $.ajax({
                        type: "POST",
                        data: {'id': id},
                        cache: false,
                        url: "neworder_select__button_step_three",
                        dataType: "json",
                        error: function (request, error) {
                            console.log(arguments);
                            alert("There was an error: " + error);
                        },
                        success: function () {
                            var top_info = '<div class="clearfix">' +
                                '<p class="blue-text float-left">AMAZON COUNTRY</p>' +
                                '<p class="blue-text float-right">{country}</p>' +
                                '</div>' +
                                '<div class="clearfix">' +
                                '<p class="blue-text float-left">LINK/PRODUCT QUANTITY</p>' +
                                '<p class="blue-text float-right">{item_quantity}</p>' +
                                '</div>' +
                                '<div class="clearfix">' +
                                '<p class="blue-text float-left">PRODUCT NAME</p>' +
                                '<p class="blue-text float-right">{item.productHeadline}</p>' +
                                '</div>' +
                                '<div class="clearfix">' +
                                '<p class="blue-text float-left">ASIN #</p>' +
                                '<p class="blue-text float-right">{item.asin}</p>' +
                                '</div>' +
                                '<div class="clearfix">' +
                                '<p class="blue-text float-left">AMAZON PAGE</p>' +
                                '<p class="blue-text float-right">' +
                                '<a href="${item.productLink}" target="_blank" class="btn btn-link">Click here</a></p>' +
                                '</div>' +
                                '<div class="clearfix">' +
                                '<p class="blue-text float-left">LIST PRICE [CONSIDER]</p>' +
                                '<p class="blue-text float-right">{item.currency} {item_price}</p>' +
                                '</div>' +
                                '<div class="clearfix">' +
                                '<p class="blue-text float-left">PRIME</p>' +
                                '<p class="blue-text float-right">{item.orderType}</p>' +
                                '</div>' +
                                '<div class="clearfix">' +
                                '<p class="blue-text float-left">mDASH PRICE</p>' +
                                '<p class="blue-text float-right">{item.currency} {item_price}</p>' +
                                '</div>';

                            var bottom_info = '<div class="row">' +
                                '<p class="col-6 blue-text">Order Cost</p>' +
                                '<p class="col-6 grey-text">{item.currency} {item_total_cost}</p>' +
                                '</div>' +
                                '<div class="row">' +
                                '<p class="col-6 blue-text">Service Fee</p>' +
                                '<p class="col-6 grey-text">(To be calculated)</p>' +
                                '</div>';

                            $('.new-order-page .block-step-3 .top-info')
                                .html('')
                                .append(top_info);

                            $('.new-order-page .block-step-3 .bottom-info .col-12.col-lg-5.ml-auto')
                                .html('')
                                .append(bottom_info);

                            step3.removeClass('d-none');
                        }
                    });

                });
            }

            step2_1();
            step2_2();
            step2_3();

            btnSelected();
        }

        step1();
        step2();

    }


    function heightForElements(elements, maxHeight) {
        elements.css('height', 'auto');
        elements.each(function (index) {
            var thisElement = $(this);
            if (thisElement.height() > maxHeight) {
                maxHeight = thisElement.height();
            }
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

        if (block1.outerHeight() > block2.outerHeight()) {
            maxHeight = block1.outerHeight();
        } else {
            maxHeight = block2.outerHeight();
        }

        block1.height(maxHeight);
        block2.height(maxHeight);
    }

    maxHeightElements();
    $(window).resize(function () {
        maxHeightElements();
    });
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

function clickSelectItem() {
    var step3 = $('.new-order-page .block-step-3');
    $('.btn-select').removeClass('selected').text('Select');
    var target = event.target;
    // target.className += 'selected';
    target.textContent = 'Selected';
    // $(this).addClass('selected').text('Selected');
    var id = event.target.id;

    $.ajax({
        type: "POST",
        data: {'id': id},
        cache: false,
        url: "neworder_select__button_step_three",
        dataType: "json",
        error: function (request, error) {
            console.log(arguments);
            alert("There was an error: " + error);
        },
        success: function (data) {
            // TODO problem if text is too long, goes out of the box
            var top_info = '<div class="clearfix">' +
                '<p class="blue-text float-left">AMAZON COUNTRY</p>' +
                '<p class="blue-text float-right">' + data.country + '</p>' +
                '</div>' +
                '<div class="clearfix">' +
                '<p class="blue-text float-left">LINK/PRODUCT QUANTITY</p>' +
                '<p class="blue-text float-right">' + data.item_quantity + '</p>' +
                '</div>' +
                '<div class="clearfix">' +
                '<p class="blue-text float-left">PRODUCT NAME</p>' +
                '<p class="blue-text float-right">' + data.item.productHeadline + '</p>' +
                '</div>' +
                '<div class="clearfix">' +
                '<p class="blue-text float-left">ASIN #</p>' +
                '<p class="blue-text float-right">' + data.item.asin + '</p>' +
                '</div>' +
                '<div class="clearfix">' +
                '<p class="blue-text float-left">AMAZON PAGE</p>' +
                '<p class="blue-text float-right">' +
                '<a href="' + data.item.productLink + '" target="_blank" class="btn btn-link">Click here</a></p>' +
                '</div>' +
                '<div class="clearfix">' +
                '<p class="blue-text float-left">LIST PRICE [CONSIDER]</p>' +
                '<p class="blue-text float-right">' + data.currency + ' ' + data.item.highListPrice + '</p>' +
                '</div>' +
                '<div class="clearfix">' +
                '<p class="blue-text float-left">PRIME</p>' +
                '<p class="blue-text float-right">' + data.item.orderType + '</p>' +
                '</div>' +
                '<div class="clearfix">' +
                '<p class="blue-text float-left">mDASH PRICE</p>' +
                '<p class="blue-text float-right">' + data.currency + ' ' + data.item.averageSellPrice + '</p>' +
                '</div>';

            var bottom_info = '<div class="row">' +
                '<p class="col-6 blue-text">Order Cost</p>' +
                '<p class="col-6 grey-text">' + data.currency + ' ' + data.item_total_cost + '</p>' +
                '</div>' +
                '<div class="row">' +
                '<p class="col-6 blue-text">Service Fee</p>' +
                '<p class="col-6 grey-text">(To be calculated)</p>' +
                '</div>';

            var confirm_button = '<div class="clearfix block-btn">' +
                '<form action="/links/step_three_confirm/' + data.countryID + ':' + data.item_quantity +
                ':' + data.item.asin + ':' +
                data.item.averageSellPrice + '"' +
                'method="POST">' +
                '<button class="btn btn-submit btn-green float-right">' +
                'Confirm and Proceed to Payment' +
                '</button>' +
                '</form>' +
                '</div>';

            $('.new-order-page .block-step-3 .top-info')
                .html('')
                .append(top_info);

            $('.new-order-page .block-step-3 .bottom-info .col-12.col-lg-5.ml-auto')
                .html('')
                .append(bottom_info);

            $('.new-order-page .block-step-3 .block-btn')
                .html('')
                .append(confirm_button);

            step3.removeClass('d-none');
        }
    });

};