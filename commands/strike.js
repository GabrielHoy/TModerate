const db = require("../dbInterface.js");
const fs = require("fs");
const { stringify } = require("querystring");
const { match } = require("assert");
const configuration = require("../config.js").config;
const infractions = JSON.parse(fs.readFileSync("infractions.json").toString().trim());
exports.Parameters = {
    "<users>": "users to strike",
    "<infractions>": "Infraction to strike user for"
}

function StripMentionString(str)
{
    return str.replace(/<*@*!*>*/g, "");
}

function GetInfractionFromMessage(msg)
{
    let infraction = msg.content;
    return infraction.replace(/(?:<@!?)?(\d+)>?/g, "").replace(new RegExp(`^${configuration.prefix}strike`), "").trim();
}

exports.Function = function(msg, bot, commandComponents) {
    if (msg.mentions.length < 1) {
        return "You must mention someone to use the strike command.";
    }
    try {
        if (!(msg.content.match(/(?:<@!?)?(\d+)>?/g))) {
            return "You must specify User(s) or Discord ID(s) to strike.";
        }
    } catch (e) {
        return "You must specify User(s) or Discord ID(s) to strike.";
    }
    if (commandComponents.length < 2) {
        return "You must specify an infraction to strike the user for.";
    }

    let strikedUsers = [];

    let infraction = GetInfractionFromMessage(msg);

    msg.content.match(/(?:<@!?)?(\d+)>?/).forEach((matchedUser) => {
        let userId = StripMentionString(matchedUser);
        if (!strikedUsers.find(user => user == userId)) {
            strikedUsers.push(userId);
            if (userId == bot.user.id) {
                bot.createMessage(msg.channel.id, `(You can't strike me!)`);
            } else {
                db.GetKey(`${userId}`).then((strikeData) => {
                    if (!strikeData) {
                        strikeData = [];
                    }
    
                    strikeData.push("Test Infraction");
                    db.SetKey(`${userId}`, strikeData).then(() => {
                        bot.createMessage(msg.channel.id, `Struck <@${userId}>.`);
                    }).catch((err) => {
                        console.log("ERR in SetKey for strike");
                        console.log(err);
                        bot.createMessage(msg.channel.id, `ERRSK: ${err}`);
                    });
                }).catch((err) => {
                    console.log("ERR in GetKey for strike");
                    console.log(err);
                    bot.createMessage(msg.channel.id, `ERRGK: ${err}`);
                });
            }
        }
    });
    return 'pass';
    for (let i = 0; i < msg.mentions.length; i++) {
        let mentionedUser = msg.mentions[i];
        if (mentionedUser.id == bot.user.id) {
            bot.createMessage(msg.channel.id, `(You can't strike me!)`);
        } else {
            db.GetKey(`${mentionedUser.id}`).then((strikeData) => {
                if (!strikeData) {
                    strikeData = [];
                }

                strikeData.push("Test Infraction");
                db.SetKey(`${mentionedUser.id}`, strikeData).then(() => {
                    bot.createMessage(msg.channel.id, `Struck <@${mentionedUser.id}>.`);
                }).catch((err) => {
                    console.log("ERR in SetKey for strike");
                    console.log(err);
                    bot.createMessage(msg.channel.id, `ERRSK: ${err}`);
                });
            }).catch((err) => {
                console.log("ERR in GetKey for strike");
                console.log(err);
                bot.createMessage(msg.channel.id, `ERRGK: ${err}`);
            });
            
        }
    }
    

}