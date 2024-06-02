const axios = require('axios');

const Webhook = async (message) => {
    try {
        await axios.post(
            `${process.env.DISCORD_WEBHOOK}?wait=true`,
            {
                username: 'Technetic backend',
                avatar_url:
                    'https://cdn.discordapp.com/attachments/960919309075509278/1009037639766249492/ms-icon-310x310.png',
                content: '<@&892617641729081345>',
                embeds: [
                    {
                        color: 0x00ae86,
                        author: {
                            name: 'Backend Bot!',
                            url: 'https://github.com/vinitparekh17/nerds-media',
                            icon_url:
                                'https://cdn.discordapp.com/attachments/960919309075509278/1009037639766249492/ms-icon-310x310.png',
                        },
                        // embed title
                        // - link on 2nd row
                        title: 'Technetic backend logs',
                        url: 'https://github.com/vinitparekh17/nerds-media',
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/960919309075509278/1009037639766249492/ms-icon-310x310.png',
                        },
                        description: message,

                        footer: {
                            text: `Time ${new Date().toLocaleTimeString()} • Date: ${new Date().toLocaleDateString()}`,
                            icon_url:
                                'https://cdn.discordapp.com/attachments/960919309075509278/1009037639766249492/ms-icon-310x310.png',
                        },
                    },
                ],
            }
        );
    } catch (err) {
        console.log(err);
    }
};

module.exports = Webhook;
