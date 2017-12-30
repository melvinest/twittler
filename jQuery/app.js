$(document).ready(function(){

  var $titleBox = $('.box-title');
  var $feed = $('.feed');
  var $arrowIcon = $('.fa-arrow-left');
  var $plusIcon = $('.fa-plus');
  var $inputBox = $('input');
  var $rightList = $('.right-list');

  // variable that stores the address of the currently running setInterval function
  var currentSetInterval;

  // function that renders the tweet to the webpage
  var renderTweet = function(tweet){
    var profilePic = tweet.pic;
    var tweetTime = getTweetTime(tweet.created_at);

    var $message = $('<div></div>').addClass('tweet').text(tweet.message);
    var $nameAndDate = $('<div></div>').addClass('name-date')
                                  .append('<span class="name">@' + tweet.user + '</span>')
                                  .append('<span class="date" data-time =' + String(tweetTime[0]) + '>' + tweetTime[1] + '</span>');
    var $txtBox = $('<div></div>').addClass('box txt').append($nameAndDate).append($message);
    var $img = $('<img></img>').attr('src', profilePic);
    var $picBox = $('<div></div>').addClass('box pic').append($img);
    var $tweetBox = $('<div></div>').addClass('tweet-box').append($picBox).append($txtBox);

    if(!$('.tweet-box').first().hasClass('contrast')) {
      $tweetBox.addClass('contrast');
    }

    $feed.prepend($tweetBox);
    $tweetBox.hide().slideDown('slow');
  };


  // function that loops through list of tweets and assigns required data to run renderTweet
  var loadTweets = function(tweets){
    var index = tweets.length - 1;
    var currentLength = tweets.length;

    if(currentSetInterval) {
      clearInterval(currentSetInterval);
    }

    $feed.empty();

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

  // function that generate all tweets
  var generateAllTweets = function(){
    $titleBox.text('TWITTLER FEED');
    $arrowIcon.hide();
    $plusIcon.show();
    return loadTweets(streams.home);
  };

  // function that renders tweets for a specific user
  var generateUserTweets = function(tweets, user){
    $titleBox.text('@' + user);
    $arrowIcon.show();
    $plusIcon.hide();
    return loadTweets(tweets);
  };

  // function that calculates the time elapsed since the tweet was created
  var getTweetTime = function(time){
    var conversionFactors = [
      ['min', 60000], //seconds
      ['hr', 60], //minutes
      ['day', 24], //hours
      ['month', 30], //days
      ['year', 12] // months
    ]

    var timeDifference = new Date() - time;
    var convertedTime = timeDifference;

    for(var i = 0; i < conversionFactors.length; i++) {
      convertedTime /= conversionFactors[i][1]
      if(Math.floor(convertedTime / conversionFactors[i + 1][1]) < 1) {
        if(Math.round(convertedTime) === 0 && conversionFactors[i][0] === 'min') {
          return [time - 0, 'a while ago'];
        }
        return [time - 0, String(Math.round(convertedTime)) + ' ' + conversionFactors[i][0]];
      }
    }    
  }

  $rightList.text('@' + visitor);
  currentSetInterval = generateAllTweets();

  // use setInterval to update elapsed time since the tweets were created
  setInterval(function(){
    var $dates = $('.date');
    var updatedTime;

    for(var i = 0; i < $dates.length; i++) {
      updatedTime = getTweetTime($($dates[i]).data('time'))[1];
      $($dates[i]).text(updatedTime);
    }
  });

  $feed.on('click', '.name', function(){
    var name = $(this).text().slice(1);
    var tweets = streams.users[name];
    currentSetInterval = generateUserTweets(tweets, name);
  });

  $('.fa-paper-plane-o, .fa-arrow-left').on('click', function(){
    currentSetInterval = generateAllTweets();
    event.stopPropagation();
  });

  $('ul').parent().on('click', 'i', function(){
    currentSetInterval = generateAllTweets();
  });
  
  $plusIcon.on('click', function(){
    $feed.toggleClass('with-textbox');
    $inputBox.slideToggle();
    event.stopPropagation();
  });

  $inputBox.keypress(function(key){
    if(key.which === 13) {
      var newTweet = $(this).val();
      writeTweet(newTweet);
      // clear input after posting tweet
      $inputBox.val('');
    }
  });

  $rightList.on('click', function(){
    var name = $(this).text().slice(1);
    var tweets = streams.users[name];
    currentSetInterval = generateUserTweets(tweets, name);
  });

});
