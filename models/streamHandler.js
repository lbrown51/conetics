var Tweet = require('../models/Tweet');

module.exports = function(data, io){

  // When tweets get sent our way ...

    // Construct a new tweet object
    var tweet = {
      twid: data['id'],
      active: false,
      author: data['user']['name'],
      body: data['text'],
      date: data['created_at'],
      screenname: data['user']['screen_name']
    };
    console.log(tweet)
    // Create a new model instance with our object
    var tweetEntry = new Tweet(tweet);

    // Save 'er to the database
    tweetEntry.save(function(err) {
      if (!err) {
        // If everything is cool, socket.io emits the tweet.
        io.emit('tweet', tweet);
      }
    });


};
