var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

//var parseData = function(data, quantity) {
 // var items = [];
 // for(var i = 0; i < quantity; i++) {
    // Always upper case the description string
  //  var title = data.list[i].weather[0].main;
 //   title = title.charAt(0).toUpperCase() + title.substring(1);

    // Get date/time substring
 //   var time = data.list[i].dt_txt;
 //   time = time.substring(time.indexOf('-') + 1, time.indexOf(':') + 3);

    // Add to menu items array
 //   items.push({
 //     title:title,
 //     subtitle:time
 //   });
//  }

  // Finally return whole array
//  return items;
//};

// Show splash screen while waiting for data
var splashScreen = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'Downloading your Deere data...',
  font:'GOTHIC_28_BOLD',
  color:'white',
  textOverflow:'wrap',
  textAlign:'center',
	backgroundColor:'black'
});

// Add to splashWindow and show
splashScreen.add(text);
splashScreen.show();

// Make request to openweathermap.org

ajax(
  {
    url:'http://api.openweathermap.org/data/2.5/forecast?q=Effingham',
    type:'json'
  },
  function(data) {
    // Create an array of Menu items
    var menuItems = [
  {
    title: "Combine",
    subtitle: "Opperational"
  },
  {
    title: "Tractor 2203",
    subtitle: "Fuel Low"
  },
  {
    title: "Tractor 340",
    subtitle: "Opperational"
  }
];
				//parseData(data, 10);

    // Construct Menu to show to user
    var resultsMenu = new UI.Menu({
      sections: [{
        title: 'My Deere Fleet',
        items: menuItems
      }]
    });

    // Show the Menu, hide the splash
    resultsMenu.show();
    splashScreen.hide();
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);