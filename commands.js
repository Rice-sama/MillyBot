exports.commands = {
  "help": {
    description: "gives you the command list.",
    process: function(bot,message){
      const prefix = require("./config.json").commandPrefix;
      var batch = ["__**Available commands:**__\n"];
      const commands = exports.commands;
      var commandsArr = Object.keys(commands);
      for(let i in commandsArr){
        if(commands[commandsArr[i]].usage){
          batch.push("**"+prefix+commandsArr[i]+"** "+commands[commandsArr[i]].usage+"\n \t*"+commands[commandsArr[i]].description+"*\n");
        } else {
          batch.push("**"+prefix+commandsArr[i]+"**\n \t*"+commands[commandsArr[i]].description+"*\n");
        }
      }
      message.author.send(batch);
      message.reply("Help sent to your private chat.");
    }
  },
  "ping": {
    description: "makes sure if the bot is alive.",
    process: function(bot,message){
      message.channel.send("pong!");
    }
  },
  "join": {
    description: "adds the bot to your voice channel.",
    process: function(bot,message){
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => { // Connection is an instance of VoiceConnection
            message.reply("I have successfully connected to the channel! \(>▽<)/");
          })
          .catch(console.log);
      } else {
        message.reply("You need to join a voice channel first! (・∧‐)ゞ");
      }
    }
  },
  "leave": {
    description: "removes the bot of the voice channel it's currently in.",
    process: function(bot,message,dispatcher){
      var vc = message.guild.members.find('id',bot.user.id).voiceChannel;
      if (vc) {
        if (dispatcher){
          dispatcher.end();
          dispatcher = undefined;
        }
        vc.leave();
        message.reply("Voice channel successfully left. ＼(´ヘ`)");
      } else {
        message.reply("I'm currently not in any voice channel. ╮(´ヘ`)╭");
      }
    }
  },
  "play": {
    usage: "<link>",
    description: "plays an online track in a voice channel.",
    process: function(bot,message,dispatcher){
      var lien = message.content.split(" ")[1];
      if(lien){
        if(lien.startsWith("https://www.youtube.com/watch?v=") || lien.startsWith("https://youtu.be/")) {
          if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
              .then(connection => { // Connection is an instance of VoiceConnection
                message.reply("I have successfully connected to the channel! \(>▽<)/");
                message.reply("Now playing the track. (〜￣△￣)〜");
                const ytdl = require("ytdl-core");
                const stream = ytdl(lien, { filter : 'audioonly' });
                const streamOptions = { seek: 0, volume: 1 };
                dispatcher = connection.playStream(stream, streamOptions);
              })
              .catch(console.log);
          } else {
            message.reply("You need to join a voice channel first! (・∧‐)ゞ");
          }
        } else {
          message.reply("Invalid link! (・∧‐)ゞ");
        }
      } // else if tag => search
    }
  },
  "pause": {
    description: "pauses the current track.",
    process: function(bot,message,dispatcher){
      var vcPresent = message.member.voiceChannel.members.find('id',bot.user.id);
      if (vcPresent) {
        if(dispatcher){
          dispatcher.pause();
          message.reply("Track paused.");
        } else {
          message.reply("Not playing any track. ╮(´ヘ`)╭");
        }
      } else if(!message.guild.members.find('id',bot.user.id).voiceChannel) {
        message.reply("I'm currently not in any voice channel. ╮(´ヘ`)╭");
      } else {
        message.reply("You must be in the same channel. ╮(´x `)");
      }
    }
  },
  "resume": {
    description: "resumes the paused track.",
    process: function(bot,message,dispatcher){
      var vcPresent = message.member.voiceChannel.members.find('id',bot.user.id);
      if (vcPresent) {
        if(dispatcher){
          dispatcher.resume();
          message.reply("Track resumed.");
        } else {
          message.reply("Not playing any track. ╮(´ヘ`)╭");
        }
      } else if(!message.guild.members.find('id',bot.user.id).voiceChannel) {
        message.reply("I'm currently not in any voice channel. ╮(´ヘ`)╭");
      } else {
        message.reply("You must be in the same channel. ╮(´x `)");
      }
    }
  },
  "stop": {
    description: "stops the current track.",
    process: function(bot,message,dispatcher){
      var vcPresent = message.member.voiceChannel.members.find('id',bot.user.id);
      if (vcPresent) {
        if(dispatcher){
          dispatcher.end();
          dispatcher = undefined;
          message.reply("Track ended.");
        } else {
          message.reply("Not playing any track. ╮(´ヘ`)╭");
        }
      } else if(!message.guild.members.find('id',bot.user.id).voiceChannel) {
        message.reply("I'm currently not in any voice channel. ╮(´ヘ`)╭");
      } else {
        message.reply("You must be in the same channel. ╮(´x `)");
      }
    }
  }/*,
  "roll": {
    usage: "<number>",
    description: "rolls from 0 to <number>",
    process: function(bot,message){
      var num = parseInt(message.split(" ")[1]);
      if(num!=NaN){
        message.reply("You rolled "+Math.floor(Math.random()*num));
      } else {
        message.reply("The number is invalid.");
      }
    }
  }*/
}
