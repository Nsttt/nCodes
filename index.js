const Discord = require('discord.js');
const NanaAPI = require('nana-api');
const { DateTime } = require('luxon');

const config = require('./secret/config.json');

const client = new Discord.Client();
const nana = new NanaAPI();

// Client setup

// Guild join or leave
client.on('guildCreate', (guild) => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}).`);
});
client.on('guildDelete', (guild) => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

// Ready
client.on('ready', () => {
  console.log(`Bot has started successfully`);
  client.user.setActivity(`Serving fresh sources`);
});

// Commands
client.on('message', async (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'serve') {
    const code = args.join('');
    let bookData = {};
    let bookTagList = [];
    let bookCategory = {};
    let bookTags = [];
    let bookArtist = [];
    let bookLanguage = [];
    let bookParody = [];
    let bookGroup = [];

    nana
      .g(code)
      .then((g) => {
        bookData = g;
      })
      .then(() => {
        bookTagList = bookData.tags.forEach((tag) => {
          switch (tag) {
            case 'Tags':
              if (tag.type === 'tag') {
                bookTags.sort().push(tag.name);
              }
              break;
            case 'Artist':
              if (tag.type === 'artist') {
                bookArtist.push(tag.name);
              }
              break;
            case 'Language':
              if (tag.type === 'language') {
                bookLanguage.push(tag.name);
              }
              break;
            case 'Parody':
              if (tag.type === 'parodies') {
                bookParody.push(tag.name);
              }
              break;
            case 'Group':
              if (tag.type === 'group') {
                bookGroup.push(tag.name);
              }
              break;
            case 'Category':
              if (tag.type === 'category') {
                bookCategory.push(tag.name);
              }
              break;
          }
        });
      })
      .then(() => {
        console.log(bookData);
        const embed = new Discord.MessageEmbed()
          .setColor('#ED2553')
          .setAuthor(
            null,
            'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png',
            `https://nhentai.net/`
          )
          .setThumbnail(
            `https://t.nhentai.net/galleries/${bookData.media_id}/cover.jpg`
          )
          .setTitle(bookData.title.pretty)
          .setURL(`https://nhentai.net/g/${bookData.id}`)
          .addFields({
            name: 'Pages:',
            value: bookData.num_pages,
          })
          .addFields({
            name: 'Tags:',
            value: bookTagList.Tags.join(', '),
          })
          .setTimestamp(DateTime.fromSeconds(bookData.upload_date))
          .setFooter(
            ` Favorites: ${bookData.num_favorites}`,
            'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png'
          );
        message.channel.send(embed);
      });
  }
});

client.login(config.token);
