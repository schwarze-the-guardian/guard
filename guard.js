const { Client, MessageEmbed } = require("discord.js");
const client = new Client({ignoreDirect: true, ignoreRoles: true, ignoreEveryone: true});
client.setMaxListeners(50);
const request = require("request");  
const ayarlar = require('./ayarlar.json');


const dokunma = ['751009000669184041'];
const sunucu = '';

////////////////////////////////////////////////////////////BOTU ODAYA SOKAR////////////////////////////////////////////////////
   

const luizban = '826149049928646666'
const luizkick = '826149049928646666'
const luizrol = '826149049928646666'
const luizkanal = '826149049928646666'
const luizsunucu = '826149049928646666'
const luizwebhook = '826149049928646666'
const luizurl = '826149049928646666'
const luizbotkoruma = '826149049928646666' 
const botroles = ["836692590627651615","838032108744212490","846100695064117299","408785106942164992"]; 
const arr = ["ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_NICKNAMES"];

//--------------------------BOT DURUM MESAJI - SES KANALI--------------------------\\

client.on("ready", async () => {
client.user.setPresence({ activity: { name: "Sander Shield" }, status: "idle" });
})


client.on("ready", () => {
  let odayagir = ayarlar.odayagir
  client.channels.cache.get(odayagir).join();
  }); 

//--------------------------BOT DURUM MESAJI - SES KANALI--------------------------\\




//-----------------------------------BAN KORUMA--------------------------------\\

client.on("guildBanAdd", async (guild, user) => {
const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" });
const log = logs.entries.first();
if (!log) return;
const target = log.target;
const id = log.executor.id;
if (!dokunma.includes(id)) {
let uye = guild.members.cache.get(id);
let kullanici = guild.members.cache.get(client.user.id);
if (kullanici.roles.highest.position <= uye.roles.highest.position) return;
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanici.roles.highest.position)}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Sunucudan ??ye Yasaklad?????? ????in Yasakland??.", days: 7});
guild.members.unban(target.id);
let yaz?? = 'Luiz Ban Korumas??'
const luizembed = new MessageEmbed()
.setAuthor(yaz??, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`), **${target.tag}** (\`${target.id}\`) kullan??c??s??n?? yasaklad??. \n\n ${uye} ??yesini sunucudan \`yasaklad??m\` **${target.tag}** ??yesinin ban??n?? kald??rd??m. `)
.setColor('#c43636')
.setFooter(``)
client.channels.cache.get(luizban).send(luizembed)
} else { };});

//-----------------------------------BAN KORUMA--------------------------------\\


//-----------------------------------KICK KORUMA--------------------------------\\

client.on("guildMemberRemove", async (uye) => {
let guild = uye.guild;
const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
const log = logs.entries.first();
if (!log) return;
const target = log.target;
const id = log.executor.id;
if (!dokunma.includes(id)) {
if (uye.id === target.id) {
let user = guild.members.cache.get(id);
let kullanici = guild.members.cache.get(client.user.id);
if (kullanici.roles.highest.position <= uye.roles.highest.position) return;
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanici.roles.highest.position)}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)})});
user.ban({reason: "Sunucudan ??ye Att?????? ????in Yasakland??.", days: 7});
let yaz?? = 'Luiz Kick Korumas??'
const luizembed = new MessageEmbed()
.setAuthor(yaz??, guild.iconURL({dynamic:true}))
.setDescription(`${user} (\`${user.id}\`), **${target.tag}** (\`${target.id}\`) kullan??c??s??n?? att??. \n\n ${user} ??yesini sunucudan \`yasaklad??m.\``)
.setColor('#c43636')
.setFooter(``)
client.channels.cache.get(luizkick).send(luizembed)
} else { };
} else { };});

//-----------------------------------KICK KORUMA--------------------------------\\






//-----------------------------------WEBHOOK KORUMA--------------------------------\\
client.on("webhookUpdate", async (channel) => {
let guild = channel.guild;
guild.fetchAuditLogs().then(async (logs) => {
if (logs.entries.first().action === `WEBHOOK_CREATE`) {
let yetkili = logs.entries.first().executor;
let id = logs.entries.first().executor.id;
if (!dokunma.includes(id)) {
let uye = guild.members.cache.get(id);
let kullanic = guild.members.cache.get(client.user.id);
if (kullanic.roles.highest.position < uye.roles.highest.position) return;
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanic.roles.highest.position)}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Webhooklar?? De??i??tirmekten(a??mak-silmek-d??zenlemek) yasakland??.", days: 7});
let yaz?? = 'Luiz Webhook Korumas??'
const luizembed = new MessageEmbed()
.setAuthor(yaz??, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Webhook Olu??turdu.\n\n ${uye} ??yesini sunucudan \`yasaklad??m.\``)
.setColor('#c43636')
.setFooter(``)
client.channels.cache.get(luizwebhook).send(luizembed)
} else { };
} else { };})});
//-----------------------------------WEBHOOK KORUMA--------------------------------\\







//-----------------------------------KANAL KORUMA--------------------------------\\

client.on("channelCreate", async (channel) => {
const guild = channel.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `CHANNEL_CREATE`) {
const id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.position < uye.roles.highest.position) return;
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanici.roles.highest.position)}).map(x => {
console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Kanal Olu??turmaktan Yasakland??.", days: 7});
let yaz?? = 'Luiz Kanal Korumas??'
const luizembed = new MessageEmbed()
.setAuthor(yaz??, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Kanal olu??turdu.\n\n ${uye} ??yesini sunucudan \`yasaklad??m.\``)
.setColor('#c43636')
.setFooter(``)
client.channels.cache.get(luizkanal).send(luizembed)
} else { };} else { };});});

//-----------------------------------KANAL KORUMA--------------------------------\\






//-----------------------------------KANAL KORUMA--------------------------------\\

client.on("channelDelete", async (channel) => {
const guild = channel.guild;
guild.fetchAuditLogs().then(async (logs) => {
if (logs.entries.first().action === `CHANNEL_DELETE`) {
const id = logs.entries.first().executor.id;
if (!dokunma.includes(id)) {
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.position < uye.roles.highest.position)
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanici.roles.highest.position)}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)})});
uye.ban({reason: "Kanal Silmekten Yasakland??.", days: 7});
let yaz?? = 'Luiz Kanal Korumas??'
const luizembed = new MessageEmbed()
.setAuthor(yaz??, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) ${channel.name} Kanal??n?? Sildi.\n\n ${uye} ??yesini sunucudan \`yasaklad??m.\``)
.setColor('#c43636')
.setFooter(``)
client.channels.cache.get(luizkanal).send(luizembed)
} else { };
} else { };
})});

//-----------------------------------KANAL KORUMA--------------------------------\\




//-----------------------------------ROL KORUMA--------------------------------\\
client.on("roleDelete", async (role) => {
const guild = role.guild;
let sil = guild.roles.cache.get(role.id);
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `ROLE_DELETE`) {
const id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.position < uye.roles.highest.position)
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanici.roles.highest.position)}).map(x => {console.log(x.name); x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Rol Silmekten Yasakland??.", days: 7});
let yaz?? = 'Luiz Rol Korumas??'
const luizembed = new MessageEmbed()
.setAuthor(yaz??, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) ${role.name} Rol??n?? Sildi.\n\n ${uye} ??yesini sunucudan \`yasaklad??m.\``)
.setColor('#acaa37')
.setFooter(``)
client.channels.cache.get(luizrol).send(luizembed)
} else { };
} else { };});});
//-----------------------------------ROL KORUMA--------------------------------\\





//-----------------------------------ROL KORUMA--------------------------------\\
client.on("roleUpdate", async (oldRole, newRole) => {
let guild = newRole.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `ROLE_UPDATE`) {
let id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
if(!arr.some(a => oldRole.permissions.has(a)) && arr.some(a => newRole.permissions.has(a))) {
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.position < uye.roles.highest.position) return;
guild.roles.cache.filter(r => { return ( arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanici.roles.highest.position)}).map(x => {
console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});
});
uye.ban({reason: "Rol G??ncellemekten Yasakland??.", days: 7});
let yaz?? = 'Luiz Rol Korumas??'
const luizembed = new MessageEmbed()
.setAuthor(yaz??, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) ${newRole.name} Rol??ne Yetki Verdi.\n\n ${uye} ??yesini sunucudan \`yasaklad??m.\``)
.setColor('#378fac')
.setFooter(``)
client.channels.cache.get(luizrol).send(luizembed)
} else { };
} else { };
} else { };
});
});
//-----------------------------------ROL KORUMA--------------------------------\\





//-----------------------------------ROL KORUMA--------------------------------\\
client.on("roleCreate", async (role) => {
let guild = role.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `ROLE_CREATE`) {
let id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
let uye = guild.members.cache.get(id);
let kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.position < uye.roles.highest.position) return;
guild.roles.cache.filter(r => {return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanici.roles.highest.position)}).map(q => {
console.log(q.name);
q.edit({permissions: q.permissions.remove(arr)});});
uye.ban({reason: "Rol Olu??turmaktan Yasakland??"});
role.delete();
let yaz?? = 'Luiz Rol Korumas??'
const luizembed = new MessageEmbed()
.setAuthor(yaz??, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Rol Olu??turuldu.\n\n ${uye} ??yesini sunucudan \`yasaklad??m.\``)
.setColor('#37ac6c')
.setFooter(``)
client.channels.cache.get(luizrol).send(luizembed)
} else { };
} else { };});});
//-----------------------------------ROL KORUMA--------------------------------\\






//-----------------------------------BOT KORUMA--------------------------------\\
client.on("guildMemberAdd", async (member) => {
const guild = member.guild;
guild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `BOT_ADD`) {
const id = logs.entries.first().executor.id;
if(!dokunma.includes(id)) {
if(member.user.bot){
const uye = guild.members.cache.get(id);
const kullanici = guild.members.cache.get(client.user.id);
if(kullanici.roles.highest.position < uye.roles.highest.position) return;
guild.roles.cache.filter(r => { return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanici.roles.highest.position)}).map(x => { console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({ reason: "Sunucuya Bot Getirdi??i ????in Yasakland??.", days: 7 });
member.ban({ reason: "Sunucuya Bot ??zinsiz ??ekildi.", days: 7 })
let yaz?? = 'Luiz Bot Korumas??'
const luizembed = new MessageEmbed()
.setAuthor(yaz??, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucuya ${member} Botunu Ekledi.\n\n ${uye} ??yesini sunucudan \`yasaklad??m.\``)
.setColor('#5ba4cc')
.setFooter(``)
client.channels.cache.get(luizbotkoruma).send(luizembed)
} else { };
} else { };
} else { };});});
//-----------------------------------BOT KORUMA--------------------------------\\





//-----------------------------------SUNUCU KORUMA--------------------------------\\

client.on("guildUpdate", async (oldGuild, newGuild) => {
newGuild.fetchAuditLogs().then(async (logs) => {
if(logs.entries.first().action === `GUILD_UPDATE`) {
var yapan = logs.entries.first().executor;
let id = yapan.id;
const uye = newGuild.members.cache.get(id);
const kullanici = newGuild.members.cache.get(client.user.id);
if(oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
if(!dokunma.includes(id)) {
request({
method: "PATCH",
url: `https://discord.com/api/guilds/${newGuild.id}/vanity-url`,
headers: {
Authorization: `Bot ${client.token}`},
json: {code: `${oldGuild.vanityURLCode}`}});
newGuild.roles.cache.filter(r => { return(arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanici.roles.highest.position);}).map(x => {console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});});
uye.ban({reason: "Url'yi De??i??tirdi??i ????in Yasakland??.", days: 7});
let yaz?? = 'Luiz Url Korumas??'
const luizembed = new MessageEmbed()
.setAuthor(yaz??, newGuild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucunun Urlsini De??i??tirdi.\n\n Sunucunun Urlsini \`${newGuild.vanityURLCode}\` Olarak De??i??tirdi, ${uye} ??yesini sunucudan \`yasaklad??m.\``)
.setColor('#c43636')
.setFooter(``)
client.channels.cache.get(luizurl).send(luizembed)
} else { };
} else if (oldGuild.name !== newGuild.name) {
if(!dokunma.includes(id)) {
newGuild.setName(oldGuild.name);
uye.ban({reason: "Sunucunun ??smini De??i??tirdi??i ????in Yasakland??", days: 7});
newGuild.roles.cache.filter(r => { return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanici.roles.highest.position)}).map(x => { console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});
let yaz?? = 'Luiz Sunucu Korumas??'
const luizembed = new MessageEmbed()
.setAuthor(yaz??, newGuild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucu Ayarlar??n?? G??ncelledi.\n\n ${uye} ??yesini sunucudan \`yasaklad??m.\``)
.setColor('#c43636')
.setFooter(``)
client.channels.cache.get(luizsunucu).send(luizembed)});
} else { };
} else { };
} else { };});});

process.on("uncaughtExpection", function (err) {
  if (err) console.log(err);
});

//-----------------------------------SUNUCU KORUMA--------------------------------\\
//---------------------------------DDOS KORUMASI-----------------------------\\
client.on('message', msg => {

if(client.ping > 2500) {

            let b??lgeler = ['europe', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenib??lge = b??lgeler[Math.floor(Math.random() * b??lgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "koruma-log")

           sChannel.send(`Sunucu'ya Vuruyorlar \nSunucu B??lgesini De??i??tirdim \n __**${yenib??lge}**__ :tik: __**Sunucu Pingimiz**__ :`+ client.ping)
           msg.guild.setRegion(yenib??lge)
           .then(g => console.log(" b??lge:" + g.region))
           .then(g => msg.channel.send("b??lge **"+ g.region  + " olarak de??i??ti")) 
           .catch(console.error);
}});

client.login(ayarlar.token)
//---------------------------------DDOS KORUMASI-----------------------------\\
