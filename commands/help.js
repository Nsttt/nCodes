const Discord = require('discord.js');

exports.run = (client, message) => {
  message.channel.send(
    new Discord.MessageEmbed()
      .setColor('#ED2553')
      .setThumbnail('https://i.imgur.com/8h5mC8c.png')
      .setTitle('Docs')
      .setURL('https://github.com/nsttt/n-codes-bot')
      .addFields(
        {
          name: 'Commands:',
          value: 'Here is a curated list of commands working at the moment.',
        },
        {
          name: '!n search code',
          value: 'Search a book details with the given code.',
          inline: true,
        },
        {
          name: '!n random',
          value: 'Search a random book and gives it details.',
          inline: true,
        },
        {
          name: '!n popular',
          value: 'Search the 5 most popular books from the front page.',
          inline: true,
        }
      )
      .setFooter('For more info look at the docs in the github page.')
  );
};
