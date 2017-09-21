var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var fortuneArr = require("./fortunes")
var http = require('http');
var noodle = require('noodlejs');

var bot_token = process.env.BOT_CODE || '';
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.hour = 9
rule.minute = 14


var rtm = new RtmClient(bot_token);
let idList = []
let ignoredChannels = {}
var fortunes = fortuneArr.fortunes
var symbols = fortuneArr.symbols
// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it

console.log("Server going live!")
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  var userIDs  = []
  console.log(fortunes.length)
  for (const im of rtmStartData.ims) {
    idList.push(im["id"])
    userIDs.push(im["user"])
  }

  console.log("Currently subscribed members: ")
  for(const user of rtmStartData.users){
    if(userIDs.includes(user["id"])){
      console.log(user.name)
    }
  }

  // console.log("addingAPIStuff")
  // for(symbol of symbols){
  //   var body = []
  //   http.get("http://horoscope-api.herokuapp.com/")
  //         .on('error', (err) => {
  //             console.log(err.stack);
  //         })
  //         .on('data', (d) => {
  //             //the object returned is a feed that we need to reasabmble
  //             //console.log returns gibberish. (because its a data stream)
  //             body.push(d)
  //         })
  //         .on('end', ()=>{
  //             console.log(JSON.parse(Buffer.concat(body).toString()))
  //         });
  // }

});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  // idList = ['D71E7G4A3']
  
  for(const symbol of symbols){
    var url = 'https://www.astrology.com/horoscope/daily/' + symbol +".html"
    noodle.query({  
    url: url,
    type: 'html',
    selector: 'div.page-horoscope-text',
    extract: 'text'
    }).then(function (results) {
      if(fortunes.length > 12){
        fortunes = [results["results"][0]["results"][0]]
      }else{
        fortunes.push(results["results"][0]["results"][0])
      }
      });

  }

  var job = schedule.scheduleJob(rule, ()=>{
  console.log("getting ready to send out fortunes")
    for(const specID of idList){
      var counter = getRandomIntInclusive(0, fortunes.length - 1)
	  	randNum = getRandomIntInclusive(1,560)
      if(!ignoredChannels[specID]){
  		  rtm.sendMessage("Your lucky number today is " + randNum, specID).catch((err)=>{
  		  	console.log(err)
  		  });
        rtm.sendMessage(fortunes[counter], specID)
        // rtm.sendMessage("To unsubscribe type 'unsubscribe' in a message to me", specID)
      }
		}
  })
});

rtm.on('message', (message)=>{
  var text = message["text"]
  var textArr = text.split(" ")
  if(textArr.includes("unsubscribe") || textArr.includes("Unsubscribe")){
    rtm.sendMessage("You have been unsubscribed from luckynumberbot, to resubscribe, message me again", message["channel"])
    ignoredChannels[message["channel"]] = true
  }else{
    ignoredChannels[message["channel"]] = false
  }
})

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

rtm.start()