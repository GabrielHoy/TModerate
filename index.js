/*
	Gabriel Hoy
	3/13/2022
*/
const fs = require("fs");
const Eris = require("eris");
const http = require("http");
const ffmpeg = require('ffmpeg');
const path = require('path');

let token = fs.readFileSync("token.txt").toString().trim();
const bot = new Eris(token);
let configuration = require("./config.js").config;


let commands = {}

function ReloadCommands() {
	commands = {};
	fs.readdirSync("./commands").forEach((file) => {
		let fileNameNoExt = file.split(".")[0];
		let command = require("./commands/" + file);
		commands[fileNameNoExt] = command;
	});
}
ReloadCommands();

bot.on("ready", () => {
	console.log("Bot started");
});

bot.on("error", (err) => {
	console.log(err);
});

function Sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function IsMemberStaff(member) {
	let isStaff = false;
	member?.roles?.forEach((roleId) => {
		let role = member.guild?.roles?.find((x) => x.id === roleId)
		if (role?.name == "Staff") {
			isStaff = true; 
		}
	});
	return isStaff;
}

function StaffSentMessage(msg) {
	
	
	let isCommand = msg?.content?.startsWith(configuration.prefix);
	if (isCommand) {
		let cmdMsg = msg.content.substring(configuration.prefix.length);
		let commandComponents = cmdMsg.split(" ");
		let command = commandComponents?.[0];
		if (commands[command]) {
			let commandOutput = commands[command].Function(msg, bot, commandComponents);
			if (typeof(commandOutput) == "string") { 
				bot.createMessage(msg.channel.id, commandOutput);
			}
		} else {
			bot.createMessage(msg.channel.id, `Command "${command}" was not found or does not exist.`);
		}
	}

}

bot.on("messageCreate", async (msg) => {
	if (msg.author.id == bot.user.id) return;
		try {
			 if (IsMemberStaff(msg.member)) {
				 StaffSentMessage(msg);
			 }
		} catch (err) {
			console.log(err);
		}
})

bot.connect();