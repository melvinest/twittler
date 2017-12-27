$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  var renderTweet = function(tweet){
    var $tweet = $('<div></div>');
    console.log(tweet)
    $tweet.text('@' + tweet.user + ': ' + tweet.message + 'sent:' + tweet.created_at);
    $tweet.prependTo($body);
  };

  var loadTweets = function(tweets){
    var index = tweets.length - 1;
    var currentLength = tweets.length;

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

  // var updateTweets = function(tweets){
  //   var currentLength = tweets.length;


  //   });
  // }
  console.log(streams.users)
  loadTweets(streams.home);
  // updateTweets(streams.home);

});
