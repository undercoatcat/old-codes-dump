 module.exports = {
  token: process.env.TOKEN,
  prefix: "p!",
  server: "https://discord.gg/N3EKVHk2sq",

  yes: "<:pokecheck:860561047340449813>",
  no: "<:pokex:860541016230723594>",

  owners: ["564853227393122307", //Unknown X
           "800765934926954507" //Ritesh
          ],

  special: ["564853227393122307", //Unknown X
            "800765934926954507" //Ritesh
           ],

  webhooks: {
    guild: {
      ID: '1155182234731556995',
      Token: 'yx2XD1Cr3njcVEFVz6EOyDFx9Qhgd8Z5xvV0-teYDKA6tZmbnSQ9kVyD6SjERc-fFOIa'
    },
    cmd: {
      ID: '866937669996904458',
      Token: 'QmLzzSqQ6ZI3co3ZawvNyGyw6QZenBnqOFv0trqwXWdNwYqTjZBBqW57EPgWAf61lruo'
    },
	   vote: {
		  ID: '871038525116669952',
		  Token: 'gYz28zsiQGiFjXXPqlkmjSaXiAWrXrVZj8rO4MeALjeaBxSRW9kW2dfoUdGRm93LpQIy'
	  }
  },
  cooldown: 100,
  
  topgg: {
	  auth: process.env.topauth,
	  token: process.env.toptoken
  }
};

