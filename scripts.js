setIcon("clear-day");

function setData(pos) {
  var a = pos.coords.latitude;
  var b = pos.coords.longitude;
  var reqUrl = makeUrl(a, b);

  $.get({
    url: reqUrl,
    dataType:"jsonp",
    success: function(data){
            $(".city").text(data.timezone);
            setTime(data.currently.time*1000);
            setTemp(data);
            setIcon(data.currently.icon);

          }});
}

function setIcon(icon) {
  var icons = new Skycons({"color": "#1986d6"});
            icons.set("icon", icon);
            icons.play();
}
// ****************** IMPORTANT ******************
navigator.geolocation.getCurrentPosition(setData, function(e){
  console.log(e.code)
});
// ****************** IMPORTANT ******************

function makeUrl(lat, lon) {
  var url = "https://api.darksky.net/forecast/a3095ead1111eb7dbc4118020086c742/" + lat + "," +lon;
  return url;
}
//console.log(makeUrl(0, 0))

var dummyData = {"latitude":43.4706334,"longitude":-80.5350328,"timezone":"America/Toronto","offset":-5,
"currently":{"time":1483899089,"summary":"Clear","icon":"clear-day","nearestStormDistance":73,"nearestStormBearing":173,"precipIntensity":0,"precipProbability":0,"temperature":11.9,"apparentTemperature":-3.16,"dewPoint":5.5,"humidity":0.75,"windSpeed":13.14,"windBearing":307,"visibility":9.6,"cloudCover":0.14,"pressure":1032.3,"ozone":416.82},

"daily":{"summary":"Mixed precipitation throughout the week, with temperatures rising to 48°F on Thursday.","icon":"snow","data":[

//Sunday (Today)

{"time":1483851600,"summary":"Snow (under 1 in.) in the morning and evening.","icon":"snow","sunriseTime":1483880140,"sunsetTime":1483913067,"moonPhase":0.36,"precipIntensity":0.0027,"precipIntensityMax":0.0132,"precipIntensityMaxTime":1483862400,"precipProbability":0.47,"precipType":"snow","precipAccumulation":1.236,"temperatureMin":3.96,"temperatureMinTime":1483923600,"temperatureMax":12.17,"temperatureMaxTime":1483862400,"apparentTemperatureMin":-7.76,"apparentTemperatureMinTime":1483923600,"apparentTemperatureMax":-2.99,"apparentTemperatureMaxTime":1483862400,"dewPoint":5.22,"humidity":0.83,"windSpeed":9.13,"windBearing":289,"visibility":6.13,"cloudCover":0.6,"pressure":1030.64,"ozone":409.4}]}}

function FtoC(t) {
  //Deduct 32, then multiply by 5, then divide by 9
  return (5*(t - 32)/9).toFixed(1);
}

function CtoF (t){
  //Multiply by 9, then divide by 5, then add 32
  return ((9*t/5) + 32).toFixed(1);
}

function toggleTemp() {
  var t = $(this);
  var newTemp = "";
  var temp = t.html().toString().slice(0, -2);
  if ("C" === t.html().toString().slice(-1)) {
    newTemp = "" + CtoF(Number(temp)) + "ºF";
  }
  else {
    newTemp = "" + FtoC(Number(temp)) + "ºC";
  }
  $(this).text(newTemp);
}

$(".toggleTemp").click(function() {
  $(".temp").each(toggleTemp)
});

function convertTime(t) {
  var hours = Number(t.slice(0,2));
  var period = " AM";
  if (hours > 11) period = " PM";
  hours = ((hours + 11)%12 + 1);

  return hours + t.slice(2) + period;
}

//var data = dummyData.currently.time*1000);
function setTime(data){
  var ds = (new Date(data)).toString();
  var time = convertTime(ds.substring(16, 21));
  var day = ds.substring(0, 3);
  var date = ds.substring(8,10);
  var month = ds.substring(4,7);

  $(".date").text(day + " " + month + " " + date);
  $(".time").text(time);
  //console.log(day, month, date, time);
}

//setTime(dummyData.currently.time*1000);

// data = dummyData.currently;
function setTemp(data) {
  var currently = data.currently;
  var today = data.daily.data[0];
  $(".summary").text(currently.summary);
  $(".actual").text((currently.temperature).toFixed(1) + "ºF");
  $(".feels").text((currently.apparentTemperature).toFixed(1) + "ºF");

  $(".min").text((today.temperatureMin).toFixed(1)+ "ºF");
  $(".max").text((today.temperatureMax).toFixed(1)+ "ºF");
}

//setTemp(dummyData);
