$(document).ready(function(){
  // var $body = $('body');
  // $body.html('');
  var container = $('.container')
  // console.log($('#container'));
  // console.log($body);
  // console.log(streams.users)

  var renderTweet = function(tweet){
    // var $tweet = $('<div></div>');
    // console.log(tweet)
    // $tweet.text('@' + tweet.user + ': ' + tweet.message + 'sent:' + tweet.created_at);
    // $tweet.prependTo($body);
    var profilePic = tweet.pic;

    var message = $('<div></div>').addClass('tweet').text(tweet.message);
    var nameDate = $('<div></div>').addClass('name-date')
                                  .append('<span class="name">@' + tweet.user + '</span>')
                                  .append('<span class="date">' + tweet.created_at + '</span>');
    var txtBox = $('<div></div>').addClass('box txt').append(nameDate).append(message);
    var img = $('<img></img>').attr('src', profilePic);
    var picBox = $('<div></div>').addClass('box pic').append(img);
    var tweetBox = $('<div></div>').addClass('tweet-box').append(picBox).append(txtBox);

    if(!$('.tweet-box').first().hasClass('contrast')) {
      tweetBox.addClass('contrast');
    }

    $('.feed').prepend(tweetBox);
    tweetBox.hide().slideDown('slow');
  };

  var currentSetInterval;

  var loadTweets = function(tweets){
    var index = tweets.length - 1;
    var currentLength = tweets.length;

    if(currentSetInterval) {
      clearInterval(currentSetInterval);
    }

    $('.feed').empty();
    // $('.fa-paper-plane-o').toggleClass('icon-hover');
    // $('.right-icon').toggleClass('fa-plus');
    // $('.right-icon').toggleClass('fa-arrow-left');
    
    

    for(var index = 0; index < currentLength; index++) {
      var tweet = tweets[index];
      renderTweet(tweet);
    }

    return setInterval(function(){
      if(tweets.length > currentLength) {
        renderTweet(tweets[tweets.length - 1]);
        currentLength += 1;
      }
    });
  };

  var boxTitle = $('.box-title');
  var feed = $('.feed');
  var arrowIcon = $('.fa-arrow-left');
  var plusIcon = $('.fa-plus');
  var inputBox = $('input');

  var generateAllTweets = function(){
    boxTitle.text('TWITTLER FEED');
    arrowIcon.hide();
    plusIcon.show();
    return loadTweets(streams.home);
  };

  var generateUserTweets = function(tweets, user){
    boxTitle.text('@' + user);
    arrowIcon.show();
    plusIcon.hide();
    return loadTweets(tweets);
  };

  $('.right-list').text('@' + visitor);
  currentSetInterval = generateAllTweets();

  feed.on('click', '.name', function(){
    var name = $(this).text().slice(1);
    var tweets = streams.users[name];
    currentSetInterval = generateUserTweets(tweets, name);
  });

  $('.fa-paper-plane-o, .fa-arrow-left').on('click', function(){
    currentSetInterval = generateAllTweets();
  });

  $('i').parent().on('click', function(){
    // $('input').toggleClass('show').slideDown('slow');
    // $('input').toggleClass('hidden').slideDown('slow');
    currentSetInterval = generateAllTweets();
  });
  
  plusIcon.on('click', function(){
    // $('input').toggleClass('show').slideDown('slow');
    // $('input').toggleClass('hidden').slideDown('slow');
    feed.toggleClass('with-textbox');
    inputBox.slideToggle();
    event.stopPropagation();
  });


  inputBox.keypress(function(key){
    if(key.which === 13) {
      var newTweet = $(this).val();
      writeTweet(newTweet);
      // clear input after posting tweet
      inputBox.val("");
    }
  })

  // updateTweets(streams.home);
  // loadTweets(streams.user.shawndrost);



});
