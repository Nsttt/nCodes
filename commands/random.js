exports.run = (client, message, args) => {
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
};
