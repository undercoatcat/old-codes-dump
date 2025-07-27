module.exports = {
	logChannel: '',
	bugchannelid: '',
	feedbackchannelid: '',
	tradechannelid: '',
	suggestionchannelid: '',
	
	token: process.env.token,
 
	prefix: 'p!',

	banAppeal: '',
	owners: [
    '800765934926954507' /*Ritesh*/,
    '564853227393122307' /*unknown x*/,
    '772408057929662485' /*dont see who is this*/
	],
	mongo_atlas: {
    username: "PokeSword",
    password: process.env.pass,
    cluster: "PokeCluster",
    shard: {
      one: "pokecluster-shard-00-00.f5ql3.mongodb.net:27017",
      two: "pokecluster-shard-00-01.f5ql3.mongodb.net:27017",
      three: "pokecluster-shard-00-02.f5ql3.mongodb.net:27017"
    }
},
	/*webhooks: {
		cmd: {
			ID: '',
			Token:
				''
		},
		guild: {
			ID: '',
			Token:
				''
    }
  },*/
	dbl: {
		authorization: 'test'
	},
	cooldown: 3000
};