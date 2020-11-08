module.exports = (client, message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
  
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.run(client, message, args);
};

