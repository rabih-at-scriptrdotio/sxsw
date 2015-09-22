##SendNotifications

This is a simple demo that combines a kinoma device, scriptr.io and a weather API.
* On the Kinoma device, the end user is invited to selected one way to obtain weather information (tweet or email). The device issues a request towards scriptr.io passing the selected channel and the value of a hardcoded "location" parameter (new york by default, in the "requestText" property)
* On the scriptr.io side, the provided script invokes the weather API asking for weather forecasts for the given location and sends the obtained information using the received channel.

###Components

* /: the project contains Kinoma application files (.module, .project, .application.xml) 
* /src: contains the main.js file, implementing the UI interface and invocation of back-end logic
* /server-side: contains the sendNotification.js file to be deployed on your scriptr.io account

###How to deploy and configure

* Check-out the Kinoma scripts into a new project in Kinoma Studio (or copy/paste them in the project's structure)
* Check-out (or copy/paste) the "sendNotification.js" file into your scriptr.io workbench (if you do copy/paste, kindly remove the .js extension)
* In (Kinoma project)/src/main.js, make sur to replace the TOKEN variable with your scriptr.io authentication token
* In (scriptr.io)/sendNotificaiton, make sure to specify your email in the sendMail instruction, as well as specify your twitter app credentials if you intend to tweet

###How it works

* Launch the application on the Kinoma device
* Select a notification mode on the screen
* check your email or twitter account depending on the chosen mode (the Kinoma console also displays scriptr.io's execution logs)

