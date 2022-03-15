exports.Parameters = {
    "<user(s)>": "users to clear strikes from",
    "(strikes)": "number of strikes to clear"
}

exports.Function = function(msg, bot, commandComponents) {
    let unstruckUsers = []; 
    if (msg.mentions.length < 1) {
        return "You must mention one or more users to use the removestrike command.";
    }

    let regexFindStrikesToRemove = /\d+/g;

    for (let i = 0; i < msg.mentions.length; i++) {
        let mentionedUser = msg.mentions[i];
        if (mentionedUser.id == bot.user.id) {
            unstruckUsers.push("(You can't strike me!)");
        } else {
            unstruckUsers.push(mentionedUser.id);
        }
    }

    

    //Convert unstruck users to mention strings and return message.
    struckUsers.forEach((user, idx) => {
        struckUsers[idx] = `<@${user}>`; 
       })
       return "Removed strikes from " + struckUsers.join(",\n") + ".";
}