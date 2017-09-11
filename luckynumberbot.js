var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var bot_token = process.env.BOT_CODE || '';
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.hour = 9
rule.minute = 15

var rtm = new RtmClient(bot_token);
let idList = []
// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it

console.log("Server going live!")
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {

  for (const im of rtmStartData.ims) {
  	idList.push(im["id"])
  }
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  for(const specID of idList){
  	  randNum = getRandomIntInclusive(1,560)
	  rtm.sendMessage("Your lucky number today is " + randNum, specID).catch((err)=>{
	  	console.log(err)
	  });
	}
});

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

var job = schedule.scheduleJob(rule, ()=>{
	console.log("scheduled job")
	rtm.start()
})