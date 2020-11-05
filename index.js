const Discord = require('discord.js');
const fs = require('fs')
const Enmap = require('enmap')

const client = new Discord.Client();
const config = require('./config.json');
client.config = config

// Client setup
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    //TODO: Change this to make possible other triggers for the same command.
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

// Ready
client.on('ready', () => {
  console.log(`Bot has started successfully`);
  client.user.setPresence({
    activity: {
      name: 'some hentai',
      type: 'WATCHING',
    },
    status: 'dnd',
  });
});

client.login(config.token);
