$(document).ready(function(){
  var body = document.getElementById("body");
  var locationName = document.getElementById("locationName");
  var currentReport = $("#currentReport");
  var futureReport = $("#futureReport");
  var unitsButton = $("#unitsButton");
  var unitsButtonText = document.getElementById("unitsButton");
  var icon1 = $("#icon1");
  var metricUnits = true;
  getLocation();
  var latitude;
  var longitude;
  var address;
  //changeUnits();
  
  function getLocation(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } 
    else{
      locationName.innerHTML += "<br/>Unable to retrieve your current location";
    }
  }//end getLocation
  
  function showPosition(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    showWeatherReport(latitude, longitude);
    
  }//end showPosition
  
  function showError(error){
    switch(error.code){
      case error.PERMISSION_DENIED:
        locationName.innerHTML = "User denied the request for geolocation";
        break;
        
      case error.POSITION_UNAVAILABLE:
        locationName.innerHTML = "Location information is unavailable";
        break;
      case error.TIMEOUT:
        locationName.innerHTML = "The request to get user permission timed out";
        break;
      case error.UNKNOWN_ERROR:
        locationName.innerHTML = "Unknown error occurred.";
        break;
     }
  }//end showError
  
  
  function showWeatherReport(latitude, longitude){
    var units;
    var textUnits;
    var windSpeed;
    if (metricUnits === true){
      units = "?units=si";
      textUnits = "&deg;C";
      windSpeed = " Km/h";
    }
      else{
        units = "?units=us";
        textUnits = "&deg;F";
        windSpeed = " Mi/h";
      }
  
    var googleGeolocate = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyAQ5muygvtopatMdujMuNks8iksUS4Yj4w";
      
    $.ajax({
      url: googleGeolocate,
      dataType: "json",
      success: function(data){
        address = data.results[0].address_components[0].long_name + " " + data.results[0].address_components[1].short_name + ", " + data.results[0].address_components[2].long_name + ", " + data.results[0].address_components[4].short_name + ", " + data.results[0].address_components[5].short_name; 
        
        locationName.innerHTML = "Your area being " + address + ", of course."
    }
    });
    
    var darkSky = "https://api.darksky.net/forecast/7ed88f283c897c983832fec1959d4715/"+ latitude + "," + longitude + units;
    
    
    $.ajax({
      url: darkSky,
      dataType: "jsonp",
      success: function(data){
  
        //I recognize its probably bad form to make so many individual
        //appendTo calls, but for the sake of simplicity in 
        //editing I'm doing it this way
        $("<p style='font-size: 30px'><strong>" + data.currently.temperature + textUnits + "</strong></p><br/>").appendTo($("#tempRow"));
        var skycons; //= new Skycons({"color": "yellow"});
        var weatherCond = data.currently.icon;
       
        switch(weatherCond){
          case "clear-day":
            skycons = new Skycons({"color": "yellow"});
            skycons.add("icon1", Skycons.CLEAR_DAY);
            skycons.play();
            document.body.backgroundImage =  "url('https://i.ytimg.com/vi/iberJfmeBE0/maxresdefault.jpg')";
            break;
          case "clear-night": 
            skycons = new Skycons({"color": "midnightblue"});
            skycons.add("icon1", Skycons.CLEAR_NIGHT);
            skycons.play();
            document.body.backgroundImage = "url('http://seattlebackpackersmagazine.com/wp-content/uploads/2014/07/Liberty-Bell-new-tech-101-flat-layers-em.jpg')";
            break;
          case "rain":
            skycons = new Skycons({"color": "navy"});
            skycons.add("icon1", Skycons.RAIN);
            skycons.play();
            document.body.backgroundImage = "url('https://www.chobirdokan.com/wp-content/uploads/Romantic-couple-rain-hd-wallpapers.jpg')";
            break;
          case "snow":
            skycons = new Skycons({"color": "white"});
            skycons.add("icon1", Skycons.SNOW);
            skycons.play();
            document.body.backgroundImage = "url('http://wallpaper-gallery.net/images/wallpaper-snow/wallpaper-snow-26.jpg')";
            break;
          case "sleet":
            skycons = new Skycons({"color": "lightblue"});
            skycons.add("icon1", Skycons.SLEET);
            skycons.play();
            document.body.backgroundImage = "url('http://fox41blogs.typepad.com/.a/6a0148c78b79ee970c017ee7f41dc1970d-pi')";
            break;
          case "wind":
            skycons = new Skycons({"color": "white"});
            skycons.add("icon1", Skycons.WIND);
            skycons.play();
            document.body.backgroundImage = "url('http://nnimgt-a.akamaihd.net/transform/v1/crop/frm/storypad-Q6Mu39cZKqCdkfBiLBBArJ/48297ec3-69fe-4d96-8967-f85cf8fc8ba8.jpg/r7_148_3018_1849_w1200_h678_fmax.jpg')";
            break;
          case "fog":
            skycons = new Skycons({"color": "grey"});
            skycons.add("icon1", Skycons.FOG);
            skycons.play();
            document.body.backgroundImage = "url('http://www.bahrainweather.gov.bh/documents/10716/11884/Fog.PNG/de9a3d1e-5e4f-4b5d-aee6-07e8fcca47f2?t=1407341540000')";
            break;
          case "cloudy":
            skycons = new Skycons({"color": "aliceblue"});
            skycons.add("icon1", Skycons.CLOUDY);
            skycons.play();
            document.body.backgroundImage = "url('http://wallpapercave.com/wp/SNh7WLs.jpg')";
            break;
          case "partly-cloudy-day": 
            skycons = new Skycons({"color": "aliceblue"});
            skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
            skycons.play();
            document.body.backgroundImage = "url('https://meccinteriors.files.wordpress.com/2013/08/8930591123_e065143f64_h-image-flickr.jpg')";
            break;
          case "partly-cloudy-night":
            skycons = new Skycons({"color": "aliceblue"});
            skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
            skycons.play();
            document.body.style.backgroundImage =  "url('http://quotesideas.com/wp-content/uploads/2015/03/highway-cloudy-night-wallpaper.jpeg')";
            break;
                          }
        $("<p style='margin-top: 10px'><strong>Conditions: </strong>" + data.currently.summary + "</p><br/>").appendTo($("#rowBelow"));
        $("<p style='margin-top: 10px'><strong>Wind Speed: </strong>" + data.currently.windSpeed + windSpeed + "</p><br/>").appendTo($("#rowBelow"));
        $("<p style='margin-top: 10px'><strong>Humidity: </strong>" + data.currently.humidity + "</p><br/>").appendTo($("#rowBelow"));
        
        
        $("<p><strong>Current Hourly Conditions:</strong> " + data.hourly.summary + "</p><br/>").appendTo(futureReport);
        $("<p style='margin-top: 10px'><strong>Today's Forecast: </strong>" + data.daily.data[0].summary + "</p><br/>").appendTo(futureReport);
        $("<p class='unitsToConvert' style='margin-top: 10px'><strong>Temp. Low: </strong>" + data.daily.data[0].temperatureMin + textUnits + "</p><br/>").appendTo(futureReport);
        $("<p class='unitsToConvert' style='margin-top: 10px'><strong>Temp. High: </strong>" + data.daily.data[0].temperatureMax + textUnits + "</p><br/>").appendTo(futureReport);
        
        $("<p><strong>Chance of Precipitation (" + data.daily.data[0].precipType + ") today: </strong>" + (data.daily.data[0].precipProbability * 100) + "%</p><br/>").appendTo(futureReport);
        
        
      }
    });  
  }//end showWeatherReport
  
  function changeUnits(){
    if (metricUnits === true){
      currentReport.slideUp();
      futureReport.slideUp();
      $("#tempRow").html("");
      $("#rowBelow").html("");
      $(".unitsToConvert").html("");
      futureReport.html("");
      unitsButtonText.innerHTML = "Fahrenheit";
      metricUnits = false;
      showWeatherReport(latitude, longitude);
      currentReport.slideDown();
      futureReport.slideDown();
    }
    else{
      currentReport.slideUp();
      futureReport.slideDown();
      $("#tempRow").html("");
      $("#rowBelow").html("");
      $(".unitsToConvert").html("");
      futureReport.html("");
      unitsButtonText.innerHTML = "Celsius";
      metricUnits = true;
      showWeatherReport(latitude, longitude);
      currentReport.slideDown();
      futureReport.slideDown();
    }
  }
     
    unitsButton.on("click", function(){
      changeUnits();
    });
    
   
  
});