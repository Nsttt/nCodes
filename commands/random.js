const Discord = require('discord.js');
const NanaAPI = require('nana-api');
const { DateTime } = require('luxon');
const nana = new NanaAPI();

exports.run = (client, message) => {
  let BookData = {};

  let BookTags = [];
  let BookArtist = [];
  let BookParody = [];
  let BookGroup = [];

  nana
    .random()
    .then((g) => {
      BookData = g;
    })
    .then(() => {
      BookData.tags.forEach((tag) => {
        switch (tag.type) {
          case 'tag':
            BookTags.push(tag.name);
            break;
          case 'artist':
            BookArtist.push(tag.name);
            break;
          case 'parody':
            BookParody.push(tag.name);
            break;
          case 'group':
            BookGroup.push(tag.name);
            break;
          default:
            null;
        }
      });
    })
    .then(() => {
      const embed = new Discord.MessageEmbed()
        .setColor('#ED2553')
        .setThumbnail(
          //TODO: Make available changes between jpg & png
          `https://t.nhentai.net/galleries/${BookData.media_id}/cover.jpg`
        )
        .setTitle(BookData.title.pretty)
        .setURL(`https://nhentai.net/g/${BookData.id}`)
        .addFields(
          {
            name: 'Artist:',
            value: BookArtist.length ? BookArtist.join(', ') : 'Unknown',
            inline: true,
          },
          {
            name: 'Group:',
            value: BookGroup.length ? BookGroup.join(', ') : 'Unknown',
            inline: true,
          },
          {
            name: 'Parody:',
            value: BookParody.length ? BookParody.join(', ') : 'Unknown',
          }
        )
        .addFields(
          {
            name: 'Tags:',
            value: BookTags.length ? BookTags.sort().join(', ') : 'None',
          },
          {
            name: 'Pages:',
            value: BookData.num_pages,
          }
        )
        .setTimestamp(DateTime.fromSeconds(BookData.upload_date))
        .setFooter(
          ` Favorites: ${BookData.num_favorites}`,
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png'
        );
      message.channel.send(embed);
    });
};
