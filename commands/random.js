const Discord = require('discord.js');
const NanaAPI = require('nana-api');
const { DateTime } = require('luxon');
const nana = new NanaAPI();

exports.run = (client, message) => {
  let bookData = {
    tags: [],
    artist: [],
    parody: [],
    group: [],
  };

  nana
    .random()
    .then((globalRes) => {
      globalRes.tags.map((type) => {
        switch (type.type) {
          case 'tag':
            bookData.tags.push(type.name);
            break;
          case 'artist':
            bookData.artist.push(type.name);
            break;
          case 'parody':
            bookData.parody.push(type.name);
            break;
          case 'group':
            bookData.group.push(type.name);
            break;
          default:
            null;
        }
      });
      return Promise.resolve(globalRes);
    })
    .then((globalRes) => {
      const embed = new Discord.MessageEmbed()
        .setColor('#ED2553')
        .setThumbnail(
          //TODO: Make available changes between jpg & png
          `https://t.nhentai.net/galleries/${globalRes.media_id}/cover.jpg`
        )
        .setTitle(globalRes.title.pretty)
        .setURL(`https://nhentai.net/g/${globalRes.id}`)
        .addFields(
          {
            name: 'Artist:',
            value: bookData.artist.length
              ? bookData.artist.join(', ')
              : 'Unknown',
            inline: true,
          },
          {
            name: 'Group:',
            value: bookData.group.length
              ? bookData.group.join(', ')
              : 'Unknown',
            inline: true,
          },
          {
            name: 'Parody:',
            value: bookData.parody.length
              ? bookData.parody.join(', ')
              : 'Unknown',
          }
        )
        .addFields(
          {
            name: 'Tags:',
            value: bookData.tags.length
              ? bookData.tags.sort().join(', ')
              : 'None',
          },
          {
            name: 'Pages:',
            value: globalRes.num_pages,
          }
        )
        .setTimestamp(DateTime.fromSeconds(globalRes.upload_date))
        .setFooter(
          ` Favorites: ${globalRes.num_favorites}`,
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png'
        );
      message.channel.send(embed);
    });
};
