const Discord = require('discord.js');
const Canvas = require('canvas')
const fs = require('fs').promises;
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILDS
    ]
});

client.on('ready', () => {
    console.log('ready');
    setInterval(changeBanner, 60000)
});

async function changeBanner() {
    const images = await fs.readdir('images');
    const image = `images/${images[Math.floor(Math.random() * images.length)]}`;
    const guild = client.guilds.cache.get('Server_Id');
    const number = await getVoiceMembers(guild);
    const banner = await editBanner(image, getVoiceMembers(guild));
    await guild.setBanner(banner);
}

function getVoiceMembers(guild) {
    let count = 0;
    guild.voiceStates.cache.each(() => count++)
    return count
}

async function editBanner(image, number) {
    const canvas = Canvas.createCanvas(1920, 1080);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage(image);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.font = '100px sans-serif';
    context.fillStyle = '#ffffff';
    context.fillText(`Total Mic: ${number}`, 100, 900);
    return canvas.toBuffer();
}

client.login("Token")
