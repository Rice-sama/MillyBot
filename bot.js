//-----------require

const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const ytdl = require("ytdl-core");
const texts = require("./texts.json");
const cmd = require("./commands.js");

//------------const/var

const bot = new Discord.Client();
const prefix = config.commandPrefix
const commands = cmd.commands;
var dispatcher;
var playlist = [];

//------------main

function checkMessage(message,isEdit){

//------------commands

  if(message.content.startsWith(prefix)){
    var sub = message.content.substring(prefix.length);
    var command = sub.split(" ")[0];
    if(commands[command]){
      commands[command].process(bot,message,dispatcher);
    } else {
      message.reply("Command not recognized. /(- ‸ -)\ ");
    }
  }

//----------reactions

  else if(texts[message.content]){
    message.channel.send(texts[message.content]);
  }
}

bot.on('ready', () => {
  console.log(bot.user.username+" is ready!");
  /*for (var i = 0; bot.guilds; i++) {
    console.log(bot.guilds[i]);
      bot.guilds[i].defaultChannel.sendMessage("*Hello everyone! "+bot.user.username+" is now online!*")
      .then((message => message.delete(5000)));
  };*/
});

bot.on("disconnected", function () {
	console.log("Disconnected!");
	process.exit(1); //exit node.js with an error
});

bot.on("message", (msg) => checkMessage(msg, false));
bot.on("messageUpdate", (oldMessage, newMessage) => {
	checkMessage(newMessage,true);
});

if(config.bot_token){
	console.log("logging in with token");
	bot.login(config.bot_token);
} else {
  console.log("'bot_token is missing.");
}
