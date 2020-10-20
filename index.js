const Discord = require("discord.js");
const NanaAPI = require("nana-api");
const { DateTime } = require("luxon");

const config = require("./secret/config.json");

const client = new Discord.Client();
const nana = new NanaAPI();

// Client setup

// Guild join or leave
client.on("guildCreate", (guild) => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}).`);
});
client.on("guildDelete", (guild) => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

// Ready
client.on("ready", () => {
  console.log(`Bot has started successfully`);
  client.user.setActivity(`Serving fresh sources`);
});

// Commands
client.on("message", async (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "serve") {
    const code = args.join("");
    let bookData = {};

    nana
      .g(code)
      .then((g) => {
		bookData = g;
		console.log(g)
      })
      .then((createEmbed) => {
        const embed = new Discord.MessageEmbed(bookData)
          .setColor("#ED2553")
          .setAuthor(
            bookData.scanlator,
            "https://i.imgur.com/0A5xdvv.png",
            "https://nhentai.net/"
          )
          .setThumbnail(
            `https://t.nhentai.net/galleries/${bookData.media_id}/cover.jpg`
          )
          .setTitle(bookData.title.pretty)
          .setURL(`https://nhentai.net/g/${bookData.id}`)
          .addFields(
		{
            name: "Pages:",
            value: bookData.num_pages,
            inline: true,
          })
          .setTimestamp(DateTime.fromSeconds(bookData.upload_date))
          .setFooter(
            ` Favorites: ${bookData.num_favorites}`,
            "https://i.imgur.com/0A5xdvv.png"
          );
        message.channel.send(embed);
      })
      .catch(function (error) {
        throw error;
      });
  }
});

client.login(config.token);
