var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // OPEN CAMERA
    openCamera: function(){
        navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
            destinationType: Camera.DestinationType.DATA_URL });

        // ON SUCCESS > MOSTRA IMAGEM
        function onSuccess(imageData) {

            // (temporarily print img at profile posts)
            var item = {
                'user_nickname':    'y_lumberjack', 
                'category':         'TEST', 
                'name_challenge':   'Open the camera!', 
                'description':      'this post was a test using camera',
                'view_count':       0, 
                'like_count':       0, 
                'dislike_count':    0, 
                'post_date':        null
            }
            var $div = $('<div class="col s6">').append(
                $('<img data-user="'+item.user_nickname+'" data-category="'+item.category+'" data-challenge="'+item.name_challenge+'" data-description="'+item.description+'" data-views="'+item.view_count+'" data-likes="'+item.like_count+'" data-dislikes="'+item.dislike_count+'" data-date="'+item.post_date+'">')
                    .attr('src',"data:image/jpeg;base64," + imageData)
            ).prependTo('#test5 .default_page .profile_posts');
            $('#test5').click().click();
            
        }
        function onFail(message) {
            alert('Camera failed because: ' + message);
        }
    },
    // ON DEVICE READY! (only triggered with emulator/smarthone)
    onDeviceReady: function() {
    }
};

app.initialize();

$(function(){
    //------------------------------------------------------------------------------------ [ DEFAULT VARIABLES / FUNCTIONS ]
    window.localStorage.setItem('tab_history', 'none');
    window.localStorage.setItem('#test1', 'none');
    window.localStorage.setItem('#test2', 'none');
    window.localStorage.setItem('#test3', 'none');
    window.localStorage.setItem('#test4', 'none');
    window.localStorage.setItem('#test5', 'none');

    function get_visible_page(){
        if ($('.default_page').is(":visible"))  return ' .default_page';
        if ($('.profile_page').is(":visible"))  return ' .profile_page';
        if ($('.commnet_page').is(":visible"))  return ' .commnent_page';
        if ($('.post_page').is(":visible"))     return ' .post_page';
    }
    function get_visible_tab(){
        if($('#test1').is(":visible")) return '#test1';
        if($('#test2').is(":visible")) return '#test2';
        if($('#test3').is(":visible")) return '#test3';
        if($('#test4').is(":visible")) return '#test4';
        if($('#test5').is(":visible")) return '#test5';
    }
    //------------------------------------------------------------------------------------ [AJAX SET DATA]
    function set_profile(tab, data) {
        $(tab + ' .profile_avatar').attr('src', 'img/pic/'+data.nickname+'.jpg');
        $(tab + ' .profile_views').text(data.views);
        $(tab + ' .profile_followers').text(data.followers);
        $(tab + ' .profile_following').text(data.following);
        $(tab + ' .profile_badge').attr('src', 'img/badges/'+data.user_badge+'.png');
        $(tab + ' .profile_username').text(data.name);
        $(tab + ' .profile_description').text(data.description);
        $(tab + ' .titulo_do_mano').text(data.user_title);
        $(tab + ' .profile_level').text(data.lv);
        $(tab + ' .lv_percentage').css('width', data.xp+'0%');
    }
    function get_user_profile(user, clicked_tab){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/defy/get_user.php',
            data: { nickname: user },
            dataType: 'json',
            crossDomain: true,
            success: function (data) {
                var current_page = get_visible_page();          // VISIBLE TAB has VISIBLE PAGE
                clicked_tab = clicked_tab + current_page;       //eg. '#test5 .default_page'

                // LOGGED USER DATA
                set_profile(clicked_tab, data);

                // GET USER POSTS
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/defy/get_user_posts.php',
                    data: { nickname: user },
                    dataType: 'json',
                    crossDomain: true,
                    success: function (data) {
                        $.each(data, function(i, item) {
                            var $div = $('<div class="col s6">').append(
                                $('<img data-user="'+item.user_nickname+'" data-category="'+item.category+'" data-challenge="'+item.name_challenge+'" data-description="'+item.description+'" data-views="'+item.view_count+'" data-likes="'+item.like_count+'" data-dislikes="'+item.dislike_count+'" data-date="'+item.post_date+'">')
                                    .attr('src','img/posts/'+item.content+'.png')
                            ).prependTo(clicked_tab + ' .profile_posts');
                        });
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr + textStatus + errorThrown);
                    }
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr+textStatus+errorThrown);
            }
        });
    }
    //------------------------------------------------------------------------------------ [RETURN ACTIONS]
    function hide_all_show_one(current_tab, target_page){
        $(current_tab + ' .page').hide();
        $(current_tab + ' ' + target_page).show();

        var breadcumbs_txt = target_page + '<' + window.localStorage.getItem(current_tab);
        window.localStorage.setItem(current_tab, breadcumbs_txt);
    }
    function return_button(){
        // TAB 1
        if($('#test1').is(":visible")){
            // RETURN TO TIMELINE
            hide_all_show_one('#test1','.default_page');
            var breadcumbs_txt = window.localStorage.getItem('#test1');
            var return_to = breadcumbs_txt.split('<');
        }
        if($('#test2').is(":visible")){
            hide_all_show_one('#test2','.default_page');
        }
        if($('#test3').is(":visible")){
            hide_all_show_one('#test3','.default_page');
        }
        // TAB 4
        if($('#test4').is(":visible")){
            // RETURN TO NOTIFICATIONS (from post) WRONG: must have history log
            if ($('#test4 .post_page').is(":visible")) {
                $('#test4 .post_page').hide();
                $('#test4 .default_page').show();
            }
            if ($('#test4 .comment_page').is(":visible")){
                $('#test4 .comment_page').hide();
                $('#test4 .post_page').show();
            }
            if ($('#test4 .profile_page').is(":visible")) {
                $('#test4 .profile_page').hide();
                $('#test4 .default_page').show();
            }
            var tab4_history = window.localStorage.getItem('tab4_history');
            if (tab4_history == 'none')
                hide_all_show_one('#test4','.default_page');
        }
        // TAB 5
        if($('#test5').is(":visible")) {
            // RETURN TO PROFILE (from post)
            if ($('#test5 .post_page').is(":visible")) {
                $('#test5 .post_page').hide();
                $('#test5 .default_page').show();
            }
            // RETURN TO POST (from comment)
            if ($('#test5 .comment_page').is(":visible")) {
                $('#test5 .comment_page').hide();
                $('#test5 .post_page').show();
            }
        }
    }

    document.addEventListener("backbutton", return_button, false);  // DEVICE BACKBUTTON
    $('body').on('click','#return_button', return_button);          // BAK LINK AT HEADER
    $('#tab1, #tab2, #tab3, #tab4, #tab5').on('click', function(){                // RECLICK TAB
        var ref = $(this).attr('href');
        if ($(ref).is(':visible')) {                // (fix: only trigger when click tab twice)
            hide_all_show_one(ref, '.default_page');// (fix: tab click goes straight to default)
        }
        else {
            // BACK BUTTON REWINDS TABS
            var tab = $(this).attr('id') + '<' + window.localStorage.getItem('tab_history');
            window.localStorage.setItem('tab_history',tab);
            //alert(tab);
        }
    });

    //---------------------------------------------------------------------//
    // [SHOW MORE COMMENTS]
    $('body').on('click', '.more_comments, .option_comment', function(){
        $.get('page_comment.html', function(data){
            var current_tab = '';
            if($('#test1').is(":visible")) current_tab = '#test1';
            if($('#test2').is(":visible")) current_tab = '#test2';
            if($('#test3').is(":visible")) current_tab = '#test3';
            if($('#test4').is(":visible")) current_tab = '#test4';
            if($('#test5').is(":visible")) current_tab = '#test5';

            $(current_tab + ' .comment_page').html(data);
            hide_all_show_one(current_tab, '.comment_page');
        });
    });
    //---------------------------------------------------------------------//
    // [GO TO PROFILE]
    $('body').on('click', '.go_to_profile, .comment_page li', function(){
        $.get('page_profile.html', function(data){
            var current_tab = get_visible_tab();
            $(current_tab + ' .profile_page').html(data);

            var user_nickname = $(current_tab + ' .post_user').text();
            get_user_profile(user_nickname, current_tab);

            hide_all_show_one(current_tab, '.profile_page');
        });
    });

    //---------------------------------------------------------------------//
    // [GO TO POST] L8R CHANGE IMG TO VIDEO
    $('body').on('click', '.go_to_post, .childs_go_to_post img', function(){
        var source = $(this);
        if(content_url == undefined)
             source = $(this).next().children('img');

        var content_url = source.attr('src');
        var post_id     = source.data('id');
        var nickname    = source.data('user');
        var challenge   = source.data('challenge');
        var category    = source.data('category');
        var views       = source.data('views');
        var likes       = source.data('likes');
        var dislikes    = source.data('dislikes');
        var post_date   = source.data('date');
        var description = source.data('description');


        $.get('page_post.html', function(data){
            var current_tab = get_visible_tab();

            $(current_tab + ' .post_page').html(data);
            $(current_tab + ' .post_media').attr('src', content_url);
            $(current_tab + ' .post_description').text(description);
            $(current_tab + ' .post_user').text(nickname);
            $(current_tab + ' .dedicated_post').attr('data-id',post_id);
            $(current_tab + ' .post_challenge').text(category + ' || ' + challenge);
            $(current_tab + ' .post_views').text(views.toLocaleString() + ' views');
            $(current_tab + ' .dedicated_post_avatar').attr('src','img/pic/'+nickname+'.jpg');


            hide_all_show_one(current_tab, '.post_page');
        });
    });
    //---------------------------------------------------------------------//
    // [GO TO CHATROOMS]
    $('body').on('click','.go_to_chatrooms', function(){
        $.get('page_chatrooms.html', function(data) {
            $('.chatrooms_page').html(data);
            hide_all_show_one('#test1', '.chatrooms_page');
        });
    });
    //---------------------------------------------------------------------//
    // [FROM CHATROOMS > GO TO CHAT]
    $('body').on('click', '.chatrooms > div', function(){
        $.get('page_comment.html', function(data){
            var current_tab = '#test1';
            $(current_tab + ' .comment_page').html(data);
            hide_all_show_one(current_tab, '.comment_page');
        });
    });

    $('body').on('click', '.titulo_do_mano', function(){
        $.get('page_comment.html', function(data){
            var current_tab = '#test1';
            $(current_tab + ' .comment_page').html(data);
            hide_all_show_one(current_tab, '.comment_page');
        });
    })
    //---------------------------------------------------------------------//
    // [GO TO CHALLENGE LIST]
    $('body').on('click', '.childs_go_to_challenge_list .col', function(){
        var label = $(this).find('p').text();
        var color = $(this).attr('class').split(' ').pop();
        $.get('page_challenge_list.html', function(data){
            var current_tab = '#test3';
            var lastClass = $(current_tab + ' .challenge_list').attr('class').split(' ').pop();

            $(current_tab + ' .challenge_list').removeClass(lastClass).addClass(color).css('background-image','url("img/'+label+'.png")').html(data);
            $(current_tab + ' .fixed_top_bar').addClass(color);
            $('.challenge_type').text(label);
            hide_all_show_one(current_tab, '.challenge_list');
        });
    });
    $('body').on('click', '.childs_go_to_challenge_description', function(){
        $.get('page_challenge_description.html', function(data){
            var current_tab = '#test3';
            $(current_tab + ' .challenge_description').html(data);
            hide_all_show_one(current_tab, '.challenge_description');
        });
    });

    //---------------------------------------------------------------------//
    // [SIDENAV GO TO]
    $('body').on('click', '.go_to_achievements', function(){
        $.get('page_achievements.html', function(data){
            var current_tab = '';
            if($('#test1').is(":visible")) current_tab = '#test1';
            if($('#test2').is(":visible")) current_tab = '#test2';
            if($('#test3').is(":visible")) current_tab = '#test3';
            if($('#test4').is(":visible")) current_tab = '#test4';
            if($('#test5').is(":visible")) current_tab = '#test5';

            $(current_tab + ' .achievements_page').html(data);
            $('.drag-target').click();
            hide_all_show_one(current_tab, '.achievements_page');
        });
    });

    //------------------------------------------------------------------------------------ [ CLICK BUTTONS ]
    // LIKE & DISLIKE BUTTONS
    $('body').on('click', '.option_like', function(){
        $(this).toggleClass('active');
        $(this).siblings('.option_dislike').removeClass('active');
    });
    $('body').on('click', '.option_dislike', function(){
        $(this).toggleClass('active');
        $(this).siblings('.option_like').removeClass('active');
    });

    // PROFILE NAV
    $('body').on('click','.toggle_active a', function(){
        var target = $(this).attr('data-go');
        var current_tab = '';
        if($('#test1').is(":visible"))  current_tab = '#test1';
        if($('#test2').is(":visible"))  current_tab = '#test2';
        if($('#test4').is(":visible"))  current_tab = '#test4';
        if($('#test5').is(":visible"))  current_tab = '#test5';
        $(current_tab + ' a').removeClass('active');
        $(current_tab + ' .profile_tab').hide();
        $(current_tab + ' ' + target).show();
        $(this).addClass('active');
    });

    // SIDE NAV (três linhas no canto)
    $('.button-collapse').sideNav();
    $('.modal').modal();

    // PROFILE NAV
    $('body').on('click','.toggle_active a', function(){
        var target = $(this).attr('data-go');
        var current_tab = '';
        current_tab = '#test1';
        $(current_tab + ' a').removeClass('active');
        $(current_tab + ' .profile_tab').hide();
        $(current_tab + ' ' + target).show();
    });

    // CHANGE PROFILE TITLE [L8R ADD "UPDATE" AJAX]
    $('body').on('click','#profile_titles_modal .collection-item', function(){
        var selected_title = $(this).children('b').text();
        var current_page = get_visible_page();
        var current_tab = get_visible_tab() + current_page;
        $(current_tab + ' .titulo_do_mano ').text(selected_title);
        $('.modal-overlay').click();
    });


    // LOGOUT
    $('.go_to_logout').on('click',function(){
        window.location.href = "index.html";
    });

    //------------------------------------------------------------------------------------ [ EVERYTHING AJAX ]

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/defy/pesquisa_select.php',
        data: { data: 'Diego T. Yamaguchi' },
        dataType: 'json',
        crossDomain: true,
        success: function (data) {
            alert(data);
        },
        error: function ( errorThrown) {
            console.log(errorThrown);
        }
    });


    // GET USER PROFILE
    //var logged_user = 'y_lumberjack';
    var logged_user = 'DonaldDuck64';
    var tab = '#test5';
    get_user_profile(logged_user, tab);

});

