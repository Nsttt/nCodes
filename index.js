const Discord = require('discord.js');
const NanaAPI = require('nana-api');
const { DateTime } = require('luxon');

const config = require('./config.json');

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
client.user.setActivity(`serving fresh sources`);
});

// Commands
client.on('message', async (message) => {
if (!message.content.startsWith(config.prefix) || message.author.bot) return;

const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if (command === 'search' || command === 's') {
  const code = args.join('');
  let bookData = {};

  let bookTags = [];
  let bookArtist = [];
  let bookParody = [];
  let bookGroup = [];

  nana
    .g(code)
    .then((g) => {
      bookData = g;
    })
    .then(() => {
      bookData.tags.forEach((tag) => {
        switch (tag.type) {
          case 'tag':
            bookTags.push(tag.name);
            break;
          case 'artist':
            bookArtist.push(tag.name);
            break;
          case 'parody':
            bookParody.push(tag.name);
            break;
          case 'group':
            bookGroup.push(tag.name);
            break;
          default:
            null;
        }
      });
    })
    .then(() => {
      const embed = new Discord.MessageEmbed()
        .setAuthor('Here is your book.')
        .setColor('#ED2553')
        .setThumbnail(
          `https://t.nhentai.net/galleries/${bookData.media_id}/cover.jpg`
        )
        .setTitle(bookData.title.pretty)
        .setURL(`https://nhentai.net/g/${bookData.id}`)
        .addFields(
          {
            name: 'Artist:',
            value: bookArtist.length ? bookArtist.join(', ') : 'Unknown',
            inline: true,
          },
          {
            name: 'Group:',
            value: bookGroup.length ? bookGroup.join(', ') : 'Unknown',
            inline: true,
          },
          {
            name: 'Parody:',
            value: bookParody.length ? bookParody.join(', ') : 'Unknown',
          }
        )
        .addFields(
          {
            name: 'Tags:',
            value: bookTags.length ? bookTags.sort().join(', ') : 'None',
          },
          {
            name: 'Pages:',
            value: bookData.num_pages,
          }
        )
        .setTimestamp(DateTime.fromSeconds(bookData.upload_date))
        .setFooter(
          ` Favorites: ${bookData.num_favorites}`,
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png'
        );
      message.channel.send(embed);
    });
}

if (command === 'r' || command === 'random') {
  let rBookData = {};

  let rBookTags = [];
  let rBookArtist = [];
  let rBookParody = [];
  let rBookGroup = [];

  nana
    .random()
    .then((g) => {
      rBookData = g;
    })
    .then(() => {
      rBookData.tags.forEach((tag) => {
        switch (tag.type) {
          case 'tag':
            rBookTags.push(tag.name);
            break;
          case 'artist':
            rBookArtist.push(tag.name);
            break;
          case 'parody':
            rBookParody.push(tag.name);
            break;
          case 'group':
            rBookGroup.push(tag.name);
            break;
          default:
            null;
        }
      });
    })
    .then(() => {
      const embed = new Discord.MessageEmbed()
        .setAuthor('Here is your random book.')
        .setColor('#ED2553')
        .setThumbnail(
          `https://t.nhentai.net/galleries/${rBookData.media_id}/cover.jpg`
        )
        .setTitle(rBookData.title.pretty)
        .setURL(`https://nhentai.net/g/${rBookData.id}`)
        .addFields(
          {
            name: 'Artist:',
            value: rBookArtist.length ? rBookArtist.join(', ') : 'Unknown',
            inline: true,
          },
          {
            name: 'Group:',
            value: rBookGroup.length ? rBookGroup.join(', ') : 'Unknown',
            inline: true,
          },
          {
            name: 'Parody:',
            value: rBookParody.length ? rBookParody.join(', ') : 'Unknown',
          }
        )
        .addFields(
          {
            name: 'Tags:',
            value: rBookTags.length ? rBookTags.sort().join(', ') : 'None',
          },
          {
            name: 'Pages:',
            value: rBookData.num_pages,
          }
        )
        .setTimestamp(DateTime.fromSeconds(rBookData.upload_date))
        .setFooter(
          ` Favorites: ${rBookData.num_favorites}`,
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png'
        );
      message.channel.send(embed);
    });
}
});

client.login(config.token);
