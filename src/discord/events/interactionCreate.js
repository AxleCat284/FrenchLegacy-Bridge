const Logger = require("../.././Logger");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      await interaction.deferReply({ ephemeral: false }).catch(() => {});

      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        Logger.discordMessage(`${interaction.user.username} - [${interaction.commandName}]`);

        bridgeChat = interaction.channelId;

        await command.execute(interaction, interaction.client);
      } catch (error) {
        console.log(error);
        
        await interaction.reply({
          content: `\`[⌛]\` ${interaction.member}, une erreur est survenue.`,
          ephemeral: true,
        });
      }
    }
  },
};
