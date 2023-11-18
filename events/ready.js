const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { TOKEN } = require("../config.json");
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const mustifixdb = require("croxydb")
const PARTIALS = Object.values(Partials);

const {  Monitor } = require("uprobot.js");
const { uptime } = require('os');


// Değişkeler - Mustifix
var version = "2.3"

const monitor = new Monitor(mustifixdb);

const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"]
  },
  partials: PARTIALS,
  retryLimit: 3
});

module.exports = async (client) => {
	
	
  let kanal = "1175484778007506954";//Ba�lang�� mesaj�n� g�nderece�i kanal�n ID si
  let startingAt = Math.ceil( Date.now()/1000);
 
  let message = new EmbedBuilder()
  .setColor("00ffd9").setTitle("Uptime Sistemi Başlatıldı!")
  .setDescription(`> <:uptime:1172211861261918308> Bot Aktif Oldu! \n\n > <:tarih:1172211850600009810> Son Başlama Zamanı <t:${startingAt}:R>`).setFooter({"text":`-----| VERSİON ${version} |-----`})
  
  
   

  const rest = new REST({ version: "10" }).setToken(process.env.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }
// Mustifix - Paylaşılması yasaktır!!
  console.log(`${client.user.tag} Aktif!`);
  
	let links = await mustifixdb.get("uptimeLinks");
	let text = ""
	if(links.length<5){
	text = `Kimse beni kullanmak istemiyor mu ? Sadece ${links.length} link kayıt edilmiş.`}
	else {
		text = `Beni sevenler de varmış galiba :) Toplamda ${links.length} link kayıt edilmiş`
	}
	let gamingList = ["Desinger By. Worex","Kalitenin Adresi!", "Tamamen Ücretsiz!",text,"Uptime işi bizde!"]
	

setInterval(()=>{
	client.user.setActivity(gamingList[Math.ceil(Math.random()*gamingList.length)-1])
  },30000);
  
 monitor.start()

};