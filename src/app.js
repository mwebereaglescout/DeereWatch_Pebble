var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');
var menuItems;

var parseFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    // extraplates data
    var name = data[i].name;
    var id = data[i].id;
    var pow  = data[i].power;
		var eHours  = data[i].engineHours;
		var error  = data[i].errors;
    
    // Add to menu items array
		if(pow == "1"){
			pow = "Powered on";
		}
		else
			pow = "Powered off";
		if(error != "none"){
			items.push({
				title:name,
				subtitle:error,
				name:name,
    	  id:id,
				pow:pow,
				eHours:eHours,
				error:error,
    		});
		}
		else{
			items.push({
				title:name,
				subtitle:pow,
				name:name,
   		  id:id,
				pow:pow,
				eHours:eHours,
				error:error,
    	});	
		}
	//end of for loop
  }

  // Finally return whole array
  return items;
};

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

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
splashWindow.add(text);
splashWindow.show();

// Make request to openweathermap.org
ajax(
  {
    url:'http://jacksampson.info/farmdata.php',
    type:'json'
  },
  function(data) {
    // Create an array of Menu items
     menuItems = parseFeed(data,4);

    // Construct Menu to show to user
    var resultsMenu = new UI.Menu({
      sections: [{
        title: 'My Fleet',
        items: menuItems
      }]
    });
		// Add a click listener for select button click
		resultsMenu.on('select', function(event) {

  // Show a card with clicked item details
			menuItems[event.itemIndex].eHours = Math.round(menuItems[event.itemIndex].eHours*10)/10;

	var titleText =  menuItems[event.itemIndex].name;
	var bodyText =  "___________________" + "\n"+ menuItems[event.itemIndex].pow+ "\n" +
			"Engine run hours = "+ menuItems[event.itemIndex].eHours+ "\n" +
			"Errors = "+ menuItems[event.itemIndex].error;
			
	var detailCard = new UI.Card({
    title: titleText,
    body: bodyText
  });
			
  //Make and Show the new Card

  detailCard.show();
});

    // Show the Menu, hide the splash
		Vibe.vibrate('short');
    resultsMenu.show();
    splashWindow.hide();
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);
