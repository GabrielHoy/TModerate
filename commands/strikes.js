const db = require("../dbInterface.js");
const fs = require("fs");
const infractions = JSON.parse(fs.readFileSync("infractions.json").toString().trim());
exports.Parameters = {
    "<user>": "user to list given strikes"
}

exports.Function = function(msg, bot, commandComponents) {
    let struckUsers = []; 
    if (msg.mentions.length < 1) {
        return "You must mention someone to use the strikes command.";
    }
    let mentionedUser = msg.mentions[0];

    db.GetKey(`${mentionedUser.id}`).then((strikes) => {
        if (!strikes) {
            bot.createMessage(msg.channel.id, `${mentionedUser.mention} has no strikes.`);
            return;
        }
        bot.createMessage(msg.channel.id, "Got strike data for <@" + mentionedUser.id + ">:\n" + JSON.stringify(strikes));
        return;
    }).catch((err) => {
        console.log(err);
        console.log("err^");
        bot.createMessage(msg.channel.id, "ERROR: " + toString(err));
        return;
    });
    return;
}