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
uye.ban({reason: "Sunucudan Üye Yasakladığı İçin Yasaklandı.", days: 7});
guild.members.unban(target.id);
let yazı = 'Luiz Ban Koruması'
const luizembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`), **${target.tag}** (\`${target.id}\`) kullanıcısını yasakladı. \n\n ${uye} üyesini sunucudan \`yasakladım\` **${target.tag}** üyesinin banını kaldırdım. `)
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
user.ban({reason: "Sunucudan Üye Attığı İçin Yasaklandı.", days: 7});
let yazı = 'Luiz Kick Koruması'
const luizembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${user} (\`${user.id}\`), **${target.tag}** (\`${target.id}\`) kullanıcısını attı. \n\n ${user} üyesini sunucudan \`yasakladım.\``)
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
uye.ban({reason: "Webhookları Değiştirmekten(açmak-silmek-düzenlemek) yasaklandı.", days: 7});
let yazı = 'Luiz Webhook Koruması'
const luizembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Webhook Oluşturdu.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
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
uye.ban({reason: "Kanal Oluşturmaktan Yasaklandı.", days: 7});
let yazı = 'Luiz Kanal Koruması'
const luizembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Kanal oluşturdu.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
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
uye.ban({reason: "Kanal Silmekten Yasaklandı.", days: 7});
let yazı = 'Luiz Kanal Koruması'
const luizembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) ${channel.name} Kanalını Sildi.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
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
uye.ban({reason: "Rol Silmekten Yasaklandı.", days: 7});
let yazı = 'Luiz Rol Koruması'
const luizembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) ${role.name} Rolünü Sildi.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
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
uye.ban({reason: "Rol Güncellemekten Yasaklandı.", days: 7});
let yazı = 'Luiz Rol Koruması'
const luizembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) ${newRole.name} Rolüne Yetki Verdi.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
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
uye.ban({reason: "Rol Oluşturmaktan Yasaklandı"});
role.delete();
let yazı = 'Luiz Rol Koruması'
const luizembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Rol Oluşturuldu.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
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
uye.ban({ reason: "Sunucuya Bot Getirdiği İçin Yasaklandı.", days: 7 });
member.ban({ reason: "Sunucuya Bot İzinsiz Çekildi.", days: 7 })
let yazı = 'Luiz Bot Koruması'
const luizembed = new MessageEmbed()
.setAuthor(yazı, guild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucuya ${member} Botunu Ekledi.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
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
uye.ban({reason: "Url'yi Değiştirdiği İçin Yasaklandı.", days: 7});
let yazı = 'Luiz Url Koruması'
const luizembed = new MessageEmbed()
.setAuthor(yazı, newGuild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucunun Urlsini Değiştirdi.\n\n Sunucunun Urlsini \`${newGuild.vanityURLCode}\` Olarak Değiştirdi, ${uye} üyesini sunucudan \`yasakladım.\``)
.setColor('#c43636')
.setFooter(``)
client.channels.cache.get(luizurl).send(luizembed)
} else { };
} else if (oldGuild.name !== newGuild.name) {
if(!dokunma.includes(id)) {
newGuild.setName(oldGuild.name);
uye.ban({reason: "Sunucunun İsmini Değiştirdiği İçin Yasaklandı", days: 7});
newGuild.roles.cache.filter(r => { return (arr.some(a => r.permissions.has(a)) && !botroles.includes(r.id) && r.position < kullanici.roles.highest.position)}).map(x => { console.log(x.name);
x.edit({permissions: x.permissions.remove(arr)});
let yazı = 'Luiz Sunucu Koruması'
const luizembed = new MessageEmbed()
.setAuthor(yazı, newGuild.iconURL({dynamic:true}))
.setDescription(`${uye} (\`${uye.id}\`) Sunucu Ayarlarını Güncelledi.\n\n ${uye} üyesini sunucudan \`yasakladım.\``)
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

            let bölgeler = ['europe', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "koruma-log")

           sChannel.send(`Sunucu'ya Vuruyorlar \nSunucu Bölgesini Değiştirdim \n __**${yenibölge}**__ :tik: __**Sunucu Pingimiz**__ :`+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log(" bölge:" + g.region))
           .then(g => msg.channel.send("bölge **"+ g.region  + " olarak değişti")) 
           .catch(console.error);
}});

client.login(ayarlar.token)
//---------------------------------DDOS KORUMASI-----------------------------\\
