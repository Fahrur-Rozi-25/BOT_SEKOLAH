const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@queenanya/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const cron = require("node-cron");
const axios = require("axios");

const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const today = new Date().getDay(); // Menghasilkan nilai antara 0 (Minggu) hingga 6 (Sabtu)
const todayFormatted = daysOfWeek[today];

console.log(`Hari ini: ${todayFormatted}`);




module.exports = ivan = async (client, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[/]/gi.test(body) ? body.match(/^[/]/gi) : "";
    const isCmd2 = body.startsWith(prefix);
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };

    // Group
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";

    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    if (isCmd2 && !m.isGroup) {
      console.log(chalk.black(chalk.bgWhite("[ LOGS ]")), color(argsLog, "turquoise"), chalk.magenta("From"), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`));
    } else if (isCmd2 && m.isGroup) {
      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
        chalk.blueBright("IN"),
        chalk.green(groupName)
      );
    }

//     const cron = require("node-cron");

// // Menjadwalkan pengiriman pesan setiap 5 detik
// cron.schedule("*/1 * * * *", () => {
//   console.log("Pesan otomatis telah dikirim setiap 5 detik.");
//   return from("p")
// }, {
//   scheduled: true,
//   timezone: "Asia/Jakarta", // Sesuaikan dengan zona waktu Anda
// });


jadwal = (day) => {
  const url = `https://api-sekolah.arul251.repl.co/${day}`;

  axios.get(url)
  .then(response => {
    const data = response.data;

    console.log(data);

    // Membuat format teks WhatsApp dalam bentuk list
    const list = data.map(item => `*${item.subject} (${item.time})*`).join('\n');

    const message = `📚 *Daftar Jadwal Sekolah* 📚\n
    _*jadwal untuk hari ${day}*_
    \n${list},
`;

  m.reply(message);
  })
  .catch(error => {
    console.error(error);
  });
}


    if (isCmd2) {
      switch (command) {
        case "help":
        case "menu":
          m.reply(`*Whatsapp BOT*
            
*(ChatGPT)*
Cmd: ${prefix}ai 
Tanyakan apa saja kepada AI. 

*(DALL-E)*
Cmd: ${prefix}img
Membuat gambar dari teks

*(Source Code Bot)*
Cmd: ${prefix}sc
Menampilkan source code bot yang dipakai`)
          break;
          case "009":
          const url = `https://api-sekolah.arul251.repl.co/${todayFormatted}`;

          axios.get(url)
          .then(response => {
            const data = response.data;
        
            console.log(data);
        
            // Membuat format teks WhatsApp dalam bentuk list
            const list = data.map(item => `*${item.subject} (${item.time})*`).join('\n');
        
            const message = `📚 *Daftar Jadwal Sekolah* 📚\n
            _*hari ini ${todayFormatted}*_
            \n${list},
        `;
        
            m.reply(message);
          })
          .catch(error => {
            console.error(error);
          });

          break;
          case "jadwal":
            if (text == "senin") {

              await jadwal("Senin")

            } else if (text == "selasa") {
              m.reply("Selasa")
            }
          break;


          case "pr": case "script": case "scbot":
            try {
                if (!text) return reply("OK")
            } catch (error) {
                if (error.response) {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    console.log(`${error.response.status}\n\n${error.response.data}`);
                  } else {
                    console.log(error);
                    m.reply("Maaf, sepertinya ada yang error :"+ error.message);
                  }
            }
          break
          case "owner":
            m.reply("Saya Ownernya Pake Nanya..")
            break
        default: {
          if (isCmd2 && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (isCmd2 && !m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            } else if (argsLog || (isCmd2 && m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            }
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});