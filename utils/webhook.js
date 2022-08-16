const axios = require('axios');

const webhook = async (error) => {
    try {
        const res = await axios.post('https://discord.com/api/webhooks/1009035502860648548/XHlYidCgrSbeWHPJFuLy2vC9tGH6gugeewRs2cddH8kalyyRO3cjKnSgkx8959KOOjMQ',
            {
                "username": "Technetic backend",
                "avatar_url": "https://cdn.discordapp.com/attachments/960919309075509278/1009037639766249492/ms-icon-310x310.pn",
                "content": "<@&892617641729081345>",
                "embeds": [
                    {
                        "author": {
                            "name": "Technetic backend",
                            "url": "",
                            "icon_url": "https://cdn.discordapp.com/attachments/960919309075509278/1009037639766249492/ms-icon-310x310.pn"
                        },
                        "title": "Something went wrong",
                        "url": `https://stackoverflow.com`,
                        "description":`\`\`\`js\n${error}\`\`\``,
                        "color": '#ff0000',
                        "footer": {
                            "text": `Time: ${new Date().toLocaleTimeString()} | Date: ${new Date().toLocaleDateString()} | Server: ${process.env.NODE_ENV}`
                        }
                    }
                ]
            }
        );

        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = webhook;