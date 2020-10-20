const Discord = require("discord.js");
const NanaAPI = require("nana-api");
const { DateTime } = require("luxon");
const Keyv = require('keyv');

const config = require('./secret/config.json');

const globalPrefix = '!n';
const client = new Discord.Client();
const nana = new NanaAPI();

const prefixes = new Keyv();
prefixes.on('error', err => console.error('Keyv connection error:', err));

// const embed = new Discord.MessageEmbed()
//   .setColor("#ED2553")
//   .setAuthor(
//     scanlator,
//     "./static/icon.png",
//     "https://nhentai.net/artist/" + scanlator
//   )
//   .setThumbnail(images.cover)
//   .setTitle(title.pretty)
//   .setURL("https://nhentai.net/g/" + id)
//   .addFields({ name: "Pages:", value: num_pages, inline: true })
//   .setTimestamp(DateTime.toMillis(upload_date))
//   .setFooter("Favorites: " + num_favorites, "./static/heart-solid.svg");

const newSearch = (i) => {
  nana.g(i).then((g) => {

  })
}

// Client setup
client.on('message', async message => {
	if (message.author.bot) return;

	let args;
	// handle messages in a guild
	if (message.guild) {
		let prefix;

		if (message.content.startsWith(globalPrefix)) {
			prefix = globalPrefix;
		} else {
			// check the guild-level prefix
			const guildPrefix = await prefixes.get(message.guild.id);
			if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
		}

		// if we found a prefix, setup args; otherwise, this isn't a command
		if (!prefix) return;
		args = message.content.slice(prefix.length).trim().split(/\s+/);
	} else {
		// handle DMs
		const slice = message.content.startsWith(globalPrefix) ? globalPrefix.length : 0;
		args = message.content.slice(slice).split(/\s+/);
	}

	// get the first space-delimited argument after the prefix as the command
  const command = args.shift().toLowerCase();
  
  if (command === 'prefix') {
    // if there's at least one argument, set the prefix
    if (args.length) {
      await prefixes.set(message.guild.id, args[0]);
      return message.channel.send(`Successfully set prefix to \`${args[0]}\``);
    }
  
    return message.channel.send(`Prefix is \`${await prefixes.get(message.guild.id) || globalPrefix}\``);
  }
  
});



client.login(config.token)