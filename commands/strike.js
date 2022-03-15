exports.Parameters = {
    "<users>": "users to strike",
    "<infractions>": "Infraction to strike user for"
}

exports.Function = function(msg, bot, commandComponents) {
    let struckUsers = []; 
    if (msg.mentions.length < 1) {
        return "You must mention someone to use the strike command.";
    }
    for (let i = 0; i < msg.mentions.length; i++) {
        let mentionedUser = msg.mentions[i];
        if (mentionedUser.id == bot.user.id) {
            struckUsers.push("(You can't strike me!)");
        } else {
            struckUsers.push(mentionedUser.id);
        }
    }



    //Convert struck users to mention strings and return message.
    struckUsers.forEach((user, idx) => {
     struckUsers[idx] = `<@${user}>`; 
    })
    return "Struck " + struckUsers.join(",\n") + ".";
}