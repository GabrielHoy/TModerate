exports.Parameters = {
    "<user>": "user to list given strikes"
}

exports.Function = function(msg, bot, commandComponents) {
    let struckUsers = []; 
    if (msg.mentions.length < 1) {
        return "You must mention someone to use the strikes command.";
    }
    let mentionedUser = msg.mentions[0];
    

    

    return null;
}