$(document).ready(function(){
  // var $body = $('body');
  // $body.html('');
  var container = $('.container')
  // console.log($('#container'));
  // console.log($body);
  console.log(streams.users)

  var renderTweet = function(tweet){
    // var $tweet = $('<div></div>');
    // console.log(tweet)
    // $tweet.text('@' + tweet.user + ': ' + tweet.message + 'sent:' + tweet.created_at);
    // $tweet.prependTo($body);
    var profilePic = "https://cdn.thinglink.me/api/image/733026482183471105/1240/10/scaletowidth";

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
    $('.fa-paper-plane-o').toggleClass('icon-hover');
    $('.right-icon').toggleClass('fa-plus');
    $('.right-icon').toggleClass('fa-arrow-left');

    for(var index = 0; index < currentLength; index++) {
      var tweet = tweets[index];
      renderTweet(tweet);
    }

    return setInterval(function(){
      if(tweets.length > currentLength) {
        renderTweet(tweets[tweets.length - 1]);
        console.log(tweets)
        currentLength += 1;
      }
    });
  };

  var generateAllTweets = function(){
    $('.header').text('TWITTLER FEED');
    return loadTweets(streams.home);
  };

  var generateUserTweets = function(tweets, user){
    $('.header').text('@' + user);
    return loadTweets(tweets);
  };

  currentSetInterval = generateAllTweets();

  $('.feed').on('click', '.name', function(){
    var name = $(this).text().slice(1);
    var tweets = streams.users[name];
    currentSetInterval = generateUserTweets(tweets, name);
  });

  $('h1').on('click', '.fa-paper-plane-o, .fa-arrow-left', function(){
    currentSetInterval = generateAllTweets();
  });
  
  // updateTweets(streams.home);
  // loadTweets(streams.user.shawndrost);



});
