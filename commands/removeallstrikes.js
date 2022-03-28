const db = require("../dbInterface.js");
exports.Parameters = {
    "<user(s)>": "users to clear strikes from"
}

exports.Function = async function(msg, bot, commandComponents) { 
    if (msg.mentions.length < 1) {
        return "You must mention one or more users to use the removeallstrikes command.";
    }
    for (let i = 0; i < msg.mentions.length; i++) {
        let mentionedUser = msg.mentions[i];
        if (mentionedUser.id == bot.user.id) {
            bot.createMessage(msg.channel.id, `(You can't unstrike me!)`);
        } else {
            db.DeleteKey(`${mentionedUser.id}`).then(() => {
                bot.createMessage(msg.channel.id, `Removed all strikes from <@${mentionedUser.id}>.`);
            }).catch((err) => {
                console.log("er");
                  bot.createMessage(msg.channel.id, "ERROR IN DELETEMESSAGE HTTP REQUEST: " + toString(err));
            });
        }
    }

    
    return;
}

