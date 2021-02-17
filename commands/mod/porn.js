const SubredditCommand = require('../../structures/commands/Subreddit');
const { list } = require('../../util/Util');
const subreddits = require('../../assets/json/lol');
const { truncateSync } = require('fs');

module.exports = class PornCommand extends SubredditCommand {
	constructor(client) {
		super(client, {
			name: 'porn',
			aliases: ['daddy', 'slide',"porn"],
			group: 'mod',
			memberName: 'porn',
			description: 'only bot owner shall know',
			details: `**Subreddits:** ${subreddits.join(', ')}`,
			clientPermissions: ['EMBED_LINKS'],
            nsfw: true,
            ownerOnly: true,
			postType: 'image',
			getIcon: true,
			credit: [
				{
					name: 'Overtime2005',
					url: 'https://github.com/Overtime2005',
					reason: 'Original Subreddit List'
				}
			],
			args: [
				{
					key: 'subreddit',
					prompt: `What subreddit do you want to get porn from? Either ${list(subreddits, 'or')}.`,
					type: 'string',
					oneOf: subreddits,
					default: () => subreddits[Math.floor(Math.random() * subreddits.length)],
					parse: subreddit => subreddit.toLowerCase()
				}
			]
		});
	}

	generateText(post, subreddit, icon) {
		return this.makeEmbed(post, subreddit, icon);
	}
};