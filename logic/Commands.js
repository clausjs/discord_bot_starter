class Commands {
    constructor(params) {
        this.client = params.client;
        this.guilds = params.guilds;

        this.bindCorrectContext();

        this.client.on('voiceStateUpdate', this.voiceUpdated);

        this.channels = [];
    }
    bindCorrectContext() {
        this.voiceUpdated = this.voiceUpdated.bind(this);
        this.lfg = this.lfg.bind(this);
    }
    lfg(game, guild) {
        const internal_guild = this.guilds.find(iterGuild => iterGuild.id === guild.id);
        if (guild && internal_guild) {
            const lfg = internal_guild.lfg_channel;
            guild.createChannel(game, {
                type: 'voice',
                position: 99,
                permissionOverwrites: lfg.permissionOverwrites,
                parent: lfg
            }).then(newChannel => {
                this.channels.push(newChannel);
            }).catch(err => {
                console.log("Error creating lfg channel: ", err);
            });
        }
    }
    voiceUpdated(oldUser, newUser) {
        const guild = oldUser.guild;
        const internal_guild = this.guilds.find(iterGuild => iterGuild.id === oldUser.guild.id);
        
        if (guild && internal_guild) {
            const joinedChannel = newUser.voiceChannel;
            const leftChannel = oldUser.voiceChannel;
            if (joinedChannel && joinedChannel.parent && joinedChannel.parent.id === internal_guild.lfg_channel.id) {
                const lfg = internal_guild.lfg_channel;
                const textChannelName = this.stripSpacesAndSpecialCharacters(joinedChannel.name);
                const textChannel = guild.channels.find(channel => channel.name === textChannelName);

                if (!textChannel) {
                    guild.createChannel(textChannelName, {
                        type: 'text', 
                        permissionOverwrites: lfg.permissionOverwrites
                    }).then(channel => {
                        channel.setParent(lfg);
                    }).catch(err => {
                        console.log("Error creating a text channel for an lfg channel: ", err);
                    });
                    return;
                }
            }

            if (leftChannel && leftChannel.parent && leftChannel.parent.id === internal_guild.lfg_channel.id && leftChannel.members.array().length === 0) {
                const textChannelName = this.stripSpacesAndSpecialCharacters(leftChannel.name);
                const textChannel = guild.channels.find(channel => channel.name === textChannelName);

                if (textChannel) {
                    leftChannel.delete().then(res => {
                        textChannel.delete();
                    }).catch(err => {
                        console.log("Error deleting channels: ", err);
                    });
                    return;
                }
            }
        }
    }
    /**
     * Strips spaces and special characters from a given string
     * @param {string} channelName The channel name to convert 
     * (remove spaces and replace with dashes, remove all other special characters) 
     */
    stripSpacesAndSpecialCharacters(channelName) {
        return channelName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/gm, "");
    }
}

module.exports = Commands;