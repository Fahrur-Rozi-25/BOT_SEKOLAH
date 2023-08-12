export const jadwal = (day) => {
    const url = `https://api-sekolah.arul251.repl.co/${day}`;

    axios.get(url)
    .then(response => {
      const data = response.data;
  
      console.log(data);
  
      // Membuat format teks WhatsApp dalam bentuk list
      const list = data.map(item => `*${item.subject} (${item.time})*`).join('\n');
  
      const message = `📚 *Daftar Jadwal Sekolah* 📚\n
      _*hari ini*_
      \n${list},
  `;
  
      m.reply(message);
    })
    .catch(error => {
      console.error(error);
    });
}