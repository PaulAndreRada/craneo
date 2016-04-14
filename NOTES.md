Just did:
  Created the basic structure for the bot framework to scale in mode negative abilities
    searches the msg for a command and triggers the appropriate ability for that command.
      It does this by reading the commands array of objects

Todo:
  1-Make the bot.js script easier to read
    -change self to this
    -Change the name of the commands module to be the abiltity_index... ability nest
  2-Create support for mode heavy functions
    -build the context package
    -ex: sender: make note
         bot: what would you like your note to say?
         { bot expects only note info }  
         sender: [note info]
         { bot shows note with "tap to edit mark"}
         bot: Saved
         bot: Done with notes?
         { show options: "done" || "new note" }
  3-Create the sign up/log in features
  4-Create a feature to make the bot useful in the most basic way possible
  5-Create the designs for that bot
  6-Code the backend:
      Bot to Firebase
  7-Code the front-end:
      React + Redux + React native
