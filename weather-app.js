if (Meteor.isClient) {
  Template.hello.weatherDisplay = function () {
    return Session.get('weather')
  };

  Template.hello.result = function () {
    console.log('before the async');
    Meteor.call('getWeather', 'london', function(err, result){
      console.log('inside the async');
      if (err){
        console.log(err);
      }
      Session.set('weather', result)
      console.log(result);
    });
    console.log('after the async');
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'getWeather': function(city){
      return Meteor.http.call('GET','http://api.openweathermap.org/data/2.5/weather?q=chicago');
    }
  });
}
