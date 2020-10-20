const Discord = require("discord.js");
const NanaAPI = require("nana-api");

const client = new Discord.client();
const nana = new NanaAPI();

const embed = new Discord.MessageEmbed()
  .setColor("#ED2553")
  .setAuthor(
    scanlator,
    "./static/icon.png",
    "https://nhentai.net/artist/" + scanlator
  )
  .setThumbnail(images.cover)
  .setTitle(title.pretty)
  .setURL("https://nhentai.net/g/" + id)
  .addFields(
    { name: 'Pages:', value: upload_date, inline: true },
  )
  .setTimestamp()
  .setFooter("Favorites: " + num_favorites, "./static/heart-solid.svg");
