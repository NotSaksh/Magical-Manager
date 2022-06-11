const client = require("../index");
const { Client, Collection, Discord, Intents, MessageEmbed } = require("discord.js");
const fs = require('fs');
const {ocrSpace} = require('ocr-space-api-wrapper'); // Get a API key from this provider
const Canva = require('canvas')
const { setTimeout } = require('timers/promises');
const { createCanvas, loadImage} = require('canvas')
const axios = require("axios");

let codeAccessRole = "985115092955840512";
let codeAccessChannel = "985130855221563474";
let codeAccessLogs = "985131569930965023";
let channelName = "notsaksh";
let apiKey = "K88666050288957";

client.on("messageCreate", async(message) => {
if(message.channel.id !== codeAccessChannel) return;
if(message.author.bot || message.author.system) return;
try{
     
    let files = null;
    if (message.attachments.size > 0){
      if (message.attachments.every(attachIsImage)) {
        files = url
      }
    }
  
     function textIsImage(url) {
       return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

  if(!files) {
 const msg = await message.reply({ content: `**❌ You must provide a photo of your Sub-Proof!**` })
setTimeout(async ()=>{
  await msg.delete();
  await message.delete();
},5000)
    
  }

    const img = await Canva.loadImage(files);
    function attachIsImage(msgAttach) {
        url = msgAttach.url || null;
        imagename = msgAttach.name || `Unknown`;
        return url.indexOf(`png`, url.length - 3 ) !== -1 ||
        url.indexOf(`jpeg`, url.length - 4 ) !== -1 ||
        url.indexOf(`gif`, url.length - 3) !== -1 ||
        url.indexOf(`jpg`, url.length - 3) !== -1;
    }
    const canvas = Canva.createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
    

  const embed123 = new MessageEmbed()
  .setTitle('🌴 Role Successfully Added.')
  .setColor("BLUE")
  .setTimestamp()
  .setDescription(`Thank you for subscribing; you've been assigned a role <#980440125806874624>.`)
  .setFooter({ text: 'Magical Manager', iconURL: 'https://cdn.discordapp.com/attachments/983984416361685055/985127435781672960/7733-anime.png' });
  
const data = await ocrSpace(files, { apiKey: apiKey })// get your own API key
const text = data.ParsedResults[0].ParsedText.toLowerCase()
console.log(text)
if(text.toLowerCase().includes(channelName) && text.toLowerCase().includes('subscribed')){
  if(message.member.roles.cache.some(x => x.id == codeAccessRole)) return message.reply({ content: `**💡 You are already subscribed!**` }).then(m => setTimeout((m)=>m.delete(),15000));
    await axios({
      method: "put",
      url: `https://discord.com/api/v9/guilds/${message.guildId}/members/${message.member.id}/roles/${codeAccessRole}`,
      headers: {
        Authorization: `Bot ${client.token}`
      }
    });
    message.reply({embeds: [embed123]}).then(m => setTimeout((m)=>m.delete(),15000))
    message.react("✅")
    message.author.send("❤ **Thanks for subscribing to our channel. You now have access to the codes!**")
  
  let ch = client.channels.cache.get(codeAccessLogs)
    if(!ch) return;
      ch.send({ 
      content: `${message.author} (\`${message.author.tag}\`) | **Sent proof in <#${codeAccessChannel}>** \n \n **__User's Message Included:__** \n> ${message.content || `\`Nothing\``} \n\n _Their image is shown below! If it seems the image is fake, remove their role._`, 
      files: [{ attachment: canvas.toBuffer() }],
    })
  
    return message.member.roles.add(codeAccessRole)
} else {
  
  let errormessage = new MessageEmbed()
  .setTitle('🌴 Not Yet a Subscriber')
  .setColor("RED")
  .setTimestamp()
  .setDescription(`Sorry, But it appears that you have not subscribed.`)
.setFooter({ text: 'Magical Manager', iconURL: 'https://cdn.discordapp.com/attachments/983984416361685055/985127435781672960/7733-anime.png' });  
  await message.react("❌")
  return message.reply({embeds: [errormessage]}).then(m => setTimeout((m)=>m.delete(),15000))
}
  }catch(e){
  console.log(e)
  return message.reply({ content: `What Has occurred here? \n > \`${e.message}\`` }).then(m => timed_delete(message, m, 15000))
}
})

function timed_delete(m1, m2, time){
  if(!m1 || !m2 || !time) return;
  setTimeout(function(){
    m1.delete()
    m2.delete()
  }, time)
}