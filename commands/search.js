exports.run = (client, message, args) => {
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
};
