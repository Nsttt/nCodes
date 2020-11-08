const Discord = require('discord.js');
const NanaAPI = require('nana-api');
const { DateTime } = require('luxon');
const nana = new NanaAPI();

exports.run = (client, message, args) => {
  const code = args.join('');
  let bookData = {
    tags: [],
    artist: [],
    parody: [],
    bookGroup: [],
  };

  nana
    .g(code)
    .then((globalRes) => {
      globalRes.tags.map(({type}) => {
        switch (type) {
          case 'tag':
            bookData.tags.push(tag.name);
            break;
          case 'artist':
            bookData.artist.push(tag.name);
            break;
          case 'parody':
            bookData.parody.push(tag.name);
            break;
          case 'group':
            bookData.group.push(tag.name);
            break;
          default:
            null;
        }
      });
    return Promise.resolve(globalRes)
    })
    .then((globalRes) => {
      const embed = new Discord.MessageEmbed()
      // Color #ED2553 it's defined in multiple files. You can make a 'constants' route where you can define it only once
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
            value: bookData.artist.length ? bookArtist.join(', ') : 'Unknown',
            inline: true,
          },
          {
            name: 'Group:',
            value: bookData.group.length ? bookGroup.join(', ') : 'Unknown',
            inline: true,
          },
          {
            name: 'Parody:',
            value: bookData.parody.length ? bookParody.join(', ') : 'Unknown',
          }
        )
        .addFields(
          {
            name: 'Tags:',
            value: bookData.tags.length ? bookTags.sort().join(', ') : 'None',
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
