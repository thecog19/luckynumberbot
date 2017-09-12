var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var bot_token = process.env.BOT_CODE || '';
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.hour = 14
rule.minute = 43


var rtm = new RtmClient(bot_token);
let idList = []
// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it

console.log("Server going live!")
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {

  for (const im of rtmStartData.ims) {
  	console.log(im)
  	idList.push(im["id"])
  }
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  idList = ['D71E7G4A3']
  var job = schedule.scheduleJob(rule, ()=>{
  var fortunes = ["Your fortune today is:  Your thoughts are emotionally charged, but you'll find that this can be used to your advantage. You have a great deal of knowledge at your disposal, and you aren't afraid to throw in a little drama just for the fun of it. Your dramatic flair will take you far on a day like today. Don't hesitate to get exactly what you want.", 
                  "- The fast-paced frenzy of the day is just what you need to jump-start your brain and get it moving in the right direction. Take control of the fire within and keep it strong all day. You'll find that there's a more personal aspect to your thoughts, and you can think more rationally about your emotions. Your heart and your head are working well together.", 
                  "Charge ahead and use your emotions to fuel your fire. You have plenty of mental acumen today that can help break through any puzzle. New beginnings are underway in many areas of your life. There's no reason to delay any longer than you already have. Take this opportunity to live up to your full potential and make things happen for yourself.", 
                  "Be a bit selfish today. You have every right to look out for number one. Sensitivity to other people's emotions and issues is noble, but it may leave you emotionally drained. Think rationally about your emotions and have the courage to say no to people once in a while. You're a giver and a saint. This is the perfect day to do some giving back - to yourself.", 
                  "Much of your focus is internal, but today it would behoove you to turn some of that energy outward. Take this opportunity to make a leap of faith in the right direction. You have a great deal of bite behind your words. Don't underestimate your power and bravery. Just be careful that you don't start arguments over petty issues that aren't worth losing friends over.",
                  "This month will be complicated. Make sure to use the full moon to your advantage by accomplishing some spring cleaning in your life and also your bad habits. Make an effort to be more kind to those around you even as you reach your breaking point this month. Reflect on your past and the foundation you've built for yourself.",
                  "This month will be busy and your social life will skyrocket! Be careful of what drama you decide to get involved in, think twice about that subtweet. Use your intense emotions for good this month. You might be a little forgetful this month, don't buy anything too expensive, and make sure to clearly communicate with those around you. There will be some signs of an awakening later on, keep your eyes open for them!",
                  "You're always busy, but it's ramping up a little bit this month! You love home so make sure that you're carrying comforting items with you. The work you do this month will help you achieve your goals for the next six months. Let people contribute to your happiness this month, they will come to be an important part of your life. Reach out to others for help when you find yourself stuck.",
                  "Long-distance travel could be in your future. Don't give anyone your full trust without doing the work to make sure they're worthy of it. You might feel a little bit stuck this month, but use this time as a research period of sorts before making any big decisions. Leave some time for yourself to try something new or spend time with friends. Avoid drama at all costs, and make sure to resolve whatever issues you've been having with any of the male figures (especially your father) in your life.",
                  "Prepare for this month to be intense. You're focused on one person or project, but you're alert and observant. Epiphanies are headed your way and they could lead to big transformations in your love life, financial status, and career. Consider making a vision board and thinking about some of the bigger goals you want to achieve in the next six months. Keep doing things you love and watch the positivity flow into your life!",
                  "Spring cleaning is here! This is the perfect time to get organized, start a new workout routine, or remember to take your vitamins in the morning. This month will leave a lot of time for reflection on the past, take that time and don't brush it off, what you accomplish this month will help you for the rest of the year. Pay special attention to your closest relationships at the end of the month, reflect on how well you're being fulfilled in them.",
                  "It's spring and the possibilities are endless! With how optimistic you are, this might be your favorite season. Be present in the moment at all times this month. This month is a good time to start making new, healthy, habits. Just make sure you stick to it! It's not about being a smaller size, it's about doing something good for yourself. If you feel better on the inside, it will radiate outward.",
                  "You've had a busy year so far. Don't worry though, this month is all about down time. You might hit a couple of rough spots, but remember to dance it off, keep your head up, and smile big. The end of the month could bring about a child, or brainchild. You'll be entering a more public role in your life around this time. Make sure you really want to be in this position though, take your time and think on it. This could impact a lot of things down the road.",
                  "It's time to socialize! Reach out in your community to people you might not have thought about talking to before. You're likely to draw some good friends into your circle this month. It could get a little overwhelming by the end of it all though, don't be scared to take some time for yourself at home and don't overbook your schedule! Start mapping out where you see yourself in the next six months. Where will you live? Where will you work? This is the time to start planning!",
                  "It's time to start making your dreams a reality! You've changed a lot in the past year, and now you can start building your life to reflect the new person you've become. Make sure to take a break from the serious work and have some lighthearted fun. The end of the month could create the start of an important professional relationship. Take it slow, work on a couple of smaller projects together, there's plenty of time to work with this new person.",
                  "A productive kind of energy will bring money and possessions to the very front of your mind today. You may need to make a serious decision as a result, but it's one you've seen coming for a while, so not to worry. If you need extra cash, you might also consider taking on a part-time job, maybe even something that involves a hobby. It might actually be fun.",
                  "Recently, you placed your trust in someone the rest of the world had completely abandoned -- and as it turned out, you were absolutely right. Now you're being asked to lend your support to someone with a similar track record. Forget what anyone tries to tell you about logic, statistics or typical behavior and don't feel obligated one way or the other. Let your intuition guide you like it did last time.",
                  "Every now and then, you need to spend some time alone, thinking about what's really important to you. Take that time now -- you really shouldn't let anyone convince you otherwise. Cancel your appointments and sit down quietly in a place you know you won't be disturbed. Take your time. When you're done, you'll want to share your thoughts with the ones you love. Call them -- they'll be glad to hear from you.",
                  "Your family members have a big surprise in store for you -- a very big surprise. Does that mean you should worry about what's coming or head for the hills? Certainly not. Really, your only option is to hold on tight and ride the ride -- which may actually be rather fun. Oh, and when this all goes down, pretend to be surprised.",
                  "That emotional mood you were in yesterday hasn't gone anywhere just yet. You want to sit down with the person you love best and tell them all about it. So what's the problem? They'll be delighted, and you know it. If you're afraid of getting hurt, try to figure out where that's coming from. Chances are it's something from the past -- not the present -- that's convinced you revealing your feelings makes you emotionally vulnerable",
                  "Getting you into the car for a long-distance trip -- or on a bus, a plane or a space shuttle, for that matter -- has never been much of a challenge. But once you've set down roots, you hate to move. Well, prepare yourself, because today's unsettling energy could bring this urge your way. If you've been thinking about a change anyway, take a deep breath and put some of those thoughts down on paper. Anything's possible, right?",
                  "After days of wondering what to do -- while pretending you have everything under strict control -- you're suddenly ready to admit you don't quite know what to do. Should you let go and buy what you want, or tighten up that belt and leave it alone? You can't do this alone. Ask the advice of a trusted friend, someone who has no agenda.",
                  "Fasten your seatbelt and put your tray-table in the upright position. Some serious turbulence is en route, and bracing yourself before it happens is the only way to get through it. Even if you don't emerge from the experience totally unscathed, you'll definitely be a lot better off than some of your unprepared friends. You can try warning them, by the way, but don't expect them to take you seriously.",
                  "ou have every right to use all of your skills -- not just your intelligence -- when working toward a goal. Today's the day to pull out your secret weapon: your brilliant charm! Flash that smile and tell people just how wonderful you think they are. Folks enjoy being recognized for their unique contributions. You know how to boost someone's ego appropriately, without flirtation and manipulation.",
                  "Someone's not happy with one or more of your habits. Your first clue? The all-too-frequent lectures on self-discipline, willpower and just saying no. You'd think they would know you well enough to understand that these tactics don't work well on you -- and if they keep it up, you'll only become more determined to have your way. Just try to find a balance between the wisdom of what they're saying and your own need for independence.",
                  "Today, you will clash with some fucking bullshit code. It will be trying, but remember, the logs are your friend. Do not despair, reach out to the other R&D memebers. If all else fails, curse salesforce and go home early, secure in the knowledge that tomorrow will bring new revelations and a new understanding of the problem you are facing. "
                  ]
    for(const specID of idList){
      var counter = getRandomIntInclusive(0, fortunes.length - 1)
	  	  randNum = getRandomIntInclusive(1,560)
		  rtm.sendMessage("Your lucky number today is " + randNum, specID).catch((err)=>{
		  	console.log(err)
		  });
      rtm.sendMessage(fortunes[counter], specID)
		}
  })
});

rtm.on(CLIENT_EVENTS.RTM.IM, (message)=>{
	console.log("ahahahah")
	console.log(message)
})

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

rtm.start()