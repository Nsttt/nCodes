module.exports = (client, message) => {
  if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
  
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.run(client, message, args);
};

