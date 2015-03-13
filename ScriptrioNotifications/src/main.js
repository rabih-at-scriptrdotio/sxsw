//@module
/*
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

// scriptr.io parameters
var SCRIPT_URL = "https://api.scriptr.io/sendNotification?apsws.responseType=json"; // The URL of the scriptr.io script  
var TOKEN = "VTA1MUQ4RkNBRDpzY3JpcHRyOjExOTAxMTQ3NjY1MDgxMTkyRDA4N0IwMTA4RTVFMzBF"; // Replace with your scriptr.io auth token

var THEME = require('themes/flat/theme');
var BUTTONS = require('controls/buttons');

var background = Container( {}, { left: 0, right: 0, top: 0, bottom: 0, skin: THEME.whiteSkin } );

var myLabeledButton = BUTTONS.LabeledButton( { name : "Send" }, { 
	width: 90, left: 50, top: 130, height: 30,
	behavior: BUTTONS.LabeledButtonBehavior({
		onTap: function(button) {
		
			trace("Asking scriptr.io to send weather notificationt through " + myRadioGroup.behavior.data.selected + "\n");
			
			// Create a scriptr.io invocation handler using a Kinoma container
	      	var container = new Container();
		    var containerBehavior = new Behavior();
		    containerBehavior.onComplete = function(container, message, data) {
		     	trace("Response from scriptr.io " + data + "\n");
		    };
		        
		    container.behavior = containerBehavior;
	       	
	       	// Send the audio peaks to scriptr.io for processing using a Kinoma Message instance
	        var message = new Message(SCRIPT_URL);
	        message.method = "POST";
	        message.requestText =  "channel=" + myRadioGroup.behavior.data.selected + "&apsws.time=" + new Date().getTime();
	        message.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        message.setRequestHeader("Content-Length", message.requestText.length);
	        message.setRequestHeader("Authorization", "bearer " + TOKEN);
		    container.invoke(message, Message.TEXT);	        
		}
	})
});

var myRadioGroup = BUTTONS.RadioGroup( { buttonNames : "tweet,email,push", selected:"tweet"}, { 
	top: 20, left: 20, width: 120,
	behavior: BUTTONS.RadioGroupBehavior({
		onRadioGroupButtonSelected: function(group, buttonName) {
			trace("Radio button named " + buttonName + " was selected \n");
			myRadioGroup.behavior.data.selected = buttonName;
		},
		
	})
});


application.add( background );
application.add( myRadioGroup );
application.add( myLabeledButton );