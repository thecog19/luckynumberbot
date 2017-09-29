var noodle = require('noodlejs');

var databasePopulate = function(){
  //http://horoscope.com/us/horoscopes/general/horoscope-archive.aspx?sign=2&laDate=20160928
 var start = "20160929"
 var endDate = genDateString(new Date)
 var dateArr = []
 var curr = start
 console.log("the end date is: " + endDate)
 while(endDate != curr){
 	curr = genDateString(getNextDate(curr))
 	getHoroscopesForDate(curr)
 }
}

var getHoroscopesForDate = function(dateString){
	var counter = 0
	var baseUrl = "http://horoscope.com/us/horoscopes/general/horoscope-archive.aspx?sign="
	while(counter < 13){
	  counter += 1
	  var url = baseUrl + counter + "&laDate=" + dateString
	  scrapeHoroscope(url)
	}
}

var scrapeHoroscope = function(url){
	noodle.query({  
    url: url,
    type: 'html',
    selector: 'div.horoscope-content',
    extract: 'text'
    }).then(function (results) {
      databaseAdd(results["results"][0]["results"][0].slice(15, -1), url)
      });

  }

var databaseAdd = function(text, url){
	console.log(text)
}

var getNextDate = function(dateStr){
	dateStrUpdate =  dateStr.slice(0,4) + "/" + dateStr.slice(4,6) + "/" + dateStr.slice(6,8)
	var curr = new Date(dateStrUpdate)
	return (new Date(curr.setDate(curr.getDate() + 1)))
} 

var genDateString = function(date){
 var month = date.getMonth() + 1
 var day = date.getDate()
 if(month < 10){
    month = "0" + month 
 }else{
 	month = month.toString()
 }

 if(day < 10){
  day = "0" + day 
 }else{
 	day = day.toString()
 }
 return date.getFullYear() + month + day
}

var trainMarkov = function(){

}

var outputMarkov = function(numSentences){

}

scrapeHoroscope("http://horoscope.com/us/horoscopes/general/horoscope-archive.aspx?sign=9&laDate=20161126")