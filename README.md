soundOMeterDemo
=================
This is a simple IoT demo application that implements a collaboration among two Kinoma devices, scriptr.io and wot.io.
* A first Kinoma device runs an application that uses a sound sensor (e.g. the microphone) and sends the sound level
to a script on scriptr.io
* Depending on the received value of the sound level, the scriptr.io script determines an instruction to run on the 
second device (in the example, the instruction is merely the "face" to display on the second device's screen).
  * The selected instruction is then pushed to a wot.io channel, from which the second Kinoma devices 
reads.
  * If the sound level is too high, the script sends an email to a predefined user and also sends a tweet.
* The second Kinoma device receives the messages that are sent by scriptr.io, from the wot.io channel and executes 
the instruction it contains (in the default implementation, it displays a face - happy, neutral or sad - depending on the content of the message).

Components
==========

* audio-detect-scriptr: this is a Kinoma application project, based on the Kinoma [audio-detect](https://github.com/Kinoma/KPR-examples/tree/master/audio-detect) sample application. It represents the sound sensor that sends the values of the sound level to scriptr.io.
* SoundOMeter2: this is a Kinoma application project. It is the application that receives the instructions sent by scriptr.io through the wot.io channel and executes them.
* SoundOMeter2_backend: this is a scriptr.io project. Copy the two scripts that are contained in the project and deploy them to your scriptr.io account (you should normally deploy them in a folder called "demo").

How to deploy and configure
===========================

* Copy the scripts that are contained in the **SoundOMeter2_backend** project to your scriptr.io account. By default, the two scripts should be placed in a folder called "demo". Note that the "urlBuilderModule" script is a utility that facilitates the communication with wot.io. #Do not use the ".js" extension when naming your scripts on scriptr.io.
 * You can modify the SCR
* Import the **audio-detect-scriptr** project to Kinoma studio then run it from the IDE or from a Kinoma Create device. 
 * You can modify the SCRIPT_URL variable if needed in case you deployed the soundLevelManagement script in a folder that is not called "demo"
 * You can modify the SIGNIFICANT_LEVEL variable in order to increase/decrease the number of requests sent to scriptr.io
* Import the **SoundOMeter2** projext to Kinoma studio then run it from the IDE or from a Kinoma Create device.
 * Replace the value of the DEVICE_ID variable with a value of your owb
 * Replace the USER_ID variable with your wot.io user ID
 * Replace the TOKEN variable with your wot.io auth token


How it works
============

**Detection of sound level**

* When the DoorControllerApp (hereafter referred to as "controller") is launched, it starts sharing itself on the 
local network (so it can be discovered by a DoorControllerClientApp instance). It also triggers a call to Apstrata's GetDevice API (part of Device Management APIs) in order to retrieve data about the controller device, notably its type
that it displays on the screen instead of the aforementioned generic title)
* When the DoorControllerClientApp instance (hereafter referred to as "client") discovers the controller, it sends
it a message ("/credentials" handler), providing it with a username (the user of the client device), an authentication
token (identifying that user against Apstrata) and an instruction (open)
* The controller uses the received token and username to sign a call to Apstrata's GetUser API and retrieve the user's
profile (if token is valid). It displays a welcome message customized with the user's name obtained from the profile.

**Detection of intrusion attempts**

* onTouchBegan/onTouchEnded and onKeyDown events are consumed by specific handlers in the controller app. Once a
given threashold (pre-configured in the app) is reached, the controller invokes Apstrata's RunScript API in order to 
execute the "apstrata.kinoma.api.HandleIntrusionManagement" script, which triggers the instrusion management process.
