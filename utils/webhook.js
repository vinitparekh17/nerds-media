const axios = require('axios');

const Webhook = async (message) => {
    try {
        // if(true) return;
        const res = await axios.post('https://discord.com/api/webhooks/1009035502860648548/XHlYidCgrSbeWHPJFuLy2vC9tGH6gugeewRs2cddH8kalyyRO3cjKnSgkx8959KOOjMQ'+'?wait=true', {
            username: "Technetic backend",
            avatar_url: "https://cdn.discordapp.com/attachments/960919309075509278/1009037639766249492/ms-icon-310x310.png",
            content: "<@&892617641729081345>",
            embeds: [
                {
                    color: 0x00AE86,
                    author: {
                        name: 'Backend Bot!',
                        url: 'https://github.com/vinitparekh17/Technetic-server',
                        icon_url: 'https://cdn.discordapp.com/attachments/960919309075509278/1009037639766249492/ms-icon-310x310.png',
                    },
                    // embed title
                    // - link on 2nd row
                    title: 'Technetic backend logs',
                    url:
                        'https://github.com/vinitparekh17/Technetic-server',
                    thumbnail: {
                        url:
                            'https://cdn.discordapp.com/attachments/960919309075509278/1009037639766249492/ms-icon-310x310.png',
                    },
                    description: message,

                    footer: {
                        text: `Time ${new Date().toLocaleTimeString()} • Date: ${new Date().toLocaleDateString()}`,
                        icon_url:
                            'https://cdn.discordapp.com/attachments/960919309075509278/1009037639766249492/ms-icon-310x310.png',
                    },
                },
            ],
        })
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

module.exports = Webhook;