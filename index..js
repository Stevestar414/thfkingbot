const mineflayer = require('mineflayer')
let rawdata = fs.readFileSync('config.json');
let data = JSON.parse(rawdata);
var host = data["ip"];
var username = data["name"]

var bot = mineflayer.createBot({
  host: host,
  username: username
});


bot.once("spawn", () => {
  bot.chat("/login plokplok");
})

bot.on('chat', async (username, message) => {
    if (username === bot.username) return
    switch (message) {
      case 'digjesse':
        dig()
        break
        
      case 'stopdigjesse':
        stopdig()
        break
    }
})

async function dig() {
  if (bot.targetDigBlock) {
    bot.chat('already digging')
  }
  if (!bot.heldItem || !bot.heldItem.name.includes('pickaxe')) {
    var pickaxe = bot.inventory.items().filter(i => i.name.includes('pickaxe'))[0]; 
  if (pickaxe) await bot.equip(pickaxe, 'hand')
  }
  var block = bot.blockAtCursor(4);
  if (!block) return setTimeout (function () { dig(); }, 100);
  await bot.dig(block, 'ignore')
  dig()
}