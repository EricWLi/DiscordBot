/*
 * DoorDash Discord Bot
 * Auto-responds to new tickets
 */

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

var regex = RegExp(config.regex);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.get(config.channelId);
console.log(`Listening for messages on server: ${channel.guild.name}, channel: ${channel.name}`);
});

client.on('message', msg => {
	if (msg.channel.id != config.channelId)
		return;
	
	if (regex.test(msg.content)) {
		console.log(`Message Received: ${msg.content}`);
		msg.channel.send(config.reply);
		console.log('Reply sent.');
		return;
	}
	
	if (config.debug)
		console.log(`DEBUG: ${msg.content}`);
});

client.login(config.token);