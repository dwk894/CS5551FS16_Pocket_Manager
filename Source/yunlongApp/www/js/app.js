// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})



////function searchitem
//  var text =$("#wishitem").val().replace(/\s/g,"%20");
//
//  $.getJSON(
//    "http://open.api.ebay.com/shopping?callname=FindItems&requestencoding=NV&responseencoding=JSON&appid=yunlongl-s-PRD-a9f3034fd-7c6e9430&siteid=0&SortOrderType=BestMatch&QueryKeywords="+ text +"&version=713",
//    function(result){
//      var intro = result["Item"]
//      $.each(
//      intro,
//        function(key,value){
//          $("#result").replaceWith("<div id = 'result'><p class = 'smalltitle'>" + text + "</p><p class = 'category'>"+ intro[key]["PrimaryCategoryName"] +"</p><img src="+ intro[key]["GalleryURL"] +"><P class='price'>"+ intro[key]["ConvertedCurrentPrice"]["value"] +"</p>")
//        }      
//      );      
//    }    
//  );  
//}


//$(
//    function() {
//        $("#searchitem").keyup(
//            function(event) {
//                if (event.which == 13) {
//                    search_eBay();
//                }
//            }
//        );
//    }
//);


function searchitem(){
    // "replace(/\s/g, '%20')" means "replace each space character to '%20' character".
    var queryString = $("#wishitem").val().toLowerCase().replace(/\s/g, "%20");
    
    if (queryString == null || queryString.length === 0) {
        $("#e").replaceWith("<div id='e'><p class='err'>Please input item name.</p></div>");
        $("#result").replaceWith("<div id='result'></div>");
    }
  
    else {
        $("#e").replaceWith("<div id='e'><p class='noErr'><br></p></div>");
        
        // ebay AppID
        var appID = "yunlongl-s-PRD-a9f3034fd-7c6e9430";

        // API setup
        var parameter = {
            baseUri: "http://svcs.ebay.com/services/search/FindingService/v1",
            OPERATION_NAME: "findItemsByKeywords",
            SERVICE_VERSION: "1.0.0",
            SECURITY_APPNAME: appID,
            GLOBAL_ID: "EBAY-US",
            keywords: queryString,
            RESPONSE_DATA_FORMAT: "JSON",
            numPerPage: "3"
        };

        // Final query uri
        var uri = parameter.baseUri
                  + "?OPERATION-NAME=" + parameter.OPERATION_NAME
                  + "&SERVICE-VERSION=" + parameter.SERVICE_VERSION
                  + "&SECURITY-APPNAME=" + parameter.SECURITY_APPNAME
                  + "&GLOBAL-ID=" + parameter.GLOBAL_ID
                  + "&keywords=" + parameter.keywords
                  + "&RESPONSE-DATA-FORMAT=" + parameter.RESPONSE_DATA_FORMAT
                  + "&paginationInput.entriesPerPage=" + parameter.numPerPage
                  
                  //[IMPORTANT!] Add the following for JSONP!
                  + "&callback=?";

        // Get JSON result from the GET service.
        $.getJSON(
            uri,

            //JSON result is automatically put in the 'response' variable.
            function(response) {

                // Get the name of the item.
                var name = response["findItemsByKeywordsResponse"][0]["searchResult"][0]["item"][0]["title"];

                // Get the image of the item.
                var imageUri = response["findItemsByKeywordsResponse"][0]["searchResult"][0]["item"][0]["galleryURL"];

                // Get the price of the item.
                var price = response["findItemsByKeywordsResponse"][0]["searchResult"][0]["item"][0]["sellingStatus"][0]["currentPrice"][0]["__value__"];

                // Get the eBay link of the item.
                var ebayLink = response["findItemsByKeywordsResponse"][0]["searchResult"][0]["item"][0]["viewItemURL"];

                // Show result in the web page.
                $("#result").replaceWith(
                    "<div id='result'><p class='resultTitle'>Item information</p><table style='margin:0px auto;'><tr><td style='vertical-align:top;'><img src='"
                    + imageUri +
                    "' style='height:150px;width:auto;'></td><td style='vertical-align:top;'><p class='narrative'><b>Name:</b> "
                    + name +
                    "<br><br><b>Price:</b> <b style='color:red;'>$"
                    + price +
                    "</b><br><br><a style='color:black;'><b>item link:</b></a><a href='"
                    + ebayLink +
                    "' target='_blank'>"
                    + ebayLink +
                    "</a></p></td></tr></table><center><br><input type='button' id='suggest_button' name='suggest_button' onclick='getsuggest();' value='Get suggestion'> </center></div>"
                );
               
  if( price < 40 ){
    
    var decision = "you can buy it, if you really want it.";
    var suggestion = "This item's price is $" + price + ", you can buy it now with your current budget.";
    $("#d").replaceWith(
    "<div id='d' style='visibility: hidden''> <b>Suggestion:</b>"
      + decision +
      "</div>"
    );
    $("#s").replaceWith(
     "<div id='s'style='visibility: hidden'>"
      + suggestion +
      "</div>"
    );

  }
              if( price > 40 & price < 300 ){
    
    var decision = "you can buy it, but maybe you'd better wait for a right time.";
    var suggestion = "This item's price is $" + price + ", you can buy it, but it is not a suitable time to buy it rightnow, based on your current budget, the suggested time for buying it is supposed to be next month.";
    $("#d").replaceWith(
    "<div id='d' style='visibility: hidden''> <b>Suggestion:</b>"
      + decision +
      "</div>"
    );
    $("#s").replaceWith(
     "<div id='s'style='visibility: hidden'>"
      + suggestion +
      "</div>"
    );

  }
              
               if( price > 300 ){
    
    var decision = "It's not a good idea to buy it.";
    var suggestion = "This item's price is $" + price + ", it's too expensive for your current budget which is generated based on your monthly income. if you buy it now , that will cause a set of consequence, influencing your daily life, doing damage to food or living budget.";
    $("#d").replaceWith(
    "<div id='d' style='visibility: hidden''> <b>Suggestion:</b>"
      + decision +
      "</div>"
    );
    $("#s").replaceWith(
     "<div id='s'style='visibility: hidden'>"
      + suggestion +
      "</div>"
    );

  }
              
              
              
              
            }
        );
    }
}

function getsuggest(){
  
  d.style.visibility = 'visible';
   s.style.visibility = 'visible';
}



