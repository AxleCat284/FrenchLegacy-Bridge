const config = require("../../../config.json");
const { EmbedBuilder } = require("discord.js");
const fs = require('fs');
const messages = require('../../../messages.json');

module.exports = {
  name: "gsetrank",
  description: "Définir les rangs d'un utilisateur",
  options: [
    {
      name: "user",
      description: "Pseudo Minecraft",
      type: 3,
      required: true,
    },
    {
      name: "rang",
      description: "Le rang auquel vous souhaitez attribuer à l'utilisateur",
      type: 3,
      required: true,
    },
  ],

  execute: async (interaction, client) => {
        // Si l'utilisateur n'a pas la permission d'utiliser la commande
        if (!(await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.roles.commandRole)) {
            return await interaction.reply({
                content: `${messages.permissionInsuffisante}`,
                ephemeral: true,
            });
        }
      const utilisateur = interaction.options.getString('user');
      const rang = interaction.options.getString("rang");
        bot.chat(`/g setrank ${utilisateur} ${rang}`);
        const embed = new EmbedBuilder()
          .setTitle(`${messages.commandeRéussi}`)
          .setDescription("Regarde dans <#1014148236132483112>")
          .setTimestamp()
          .setFooter({
            text: `${messages.footerhelp}`,
            iconURL: `https://media.discordapp.net/attachments/1073744026454466600/1076983462403264642/icon_FL_finale.png`,
          });
        await interaction.reply({ embeds: [embed] });
  },
};