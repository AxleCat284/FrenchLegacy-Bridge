const pointLb = require('../fonction_pour_bot/point-leaderboard');

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction, client) => {
        // Commande: points-leaderboard
        if (interaction.isButton()) {
            if (interaction.customId.includes("lb-points-")) {

                // Un bouton de l'interaction a �t� cliqu�: on change de page du leaderboard
                const pageSelected = interaction.customId.split('-')[2];
                const lbres = await pointLb.sendLeaderboardEmbed(pageSelected);

                if (lbres == null) {
                    return await interaction.followUp({
                        content: "Une erreur est survenue lors de l'�xecution de la requ�te vers la base de donn�e.",
                        ephemeral: true,
                    });
                }

                interaction.message.edit({ embeds: lbres[0], components: lbres[1] });

            }
        }
    }
}