const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config/config.json');

const Commands = require('./logic/Commands');
let commands;

//This is not sustainable. The bot has to establish this storage every time it
//loses a connection. Mongodb could be a great solution to this..
//Perhaps this project will have it one day...
const local_guilds = [];

process.on('kill', function() {
    client.destroy();
});

//Ctrl + C event
process.on('SIGINT', function() {
    client.destroy();
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.guilds.array().map(guild => {
        const adminChannelName = `${client.user.username}-setup`;
        guild.createChannel(adminChannelName, {
            type: 'text',
            position: 0
        }).then(settingsChannel => {
            settingsChannel.send("Hello! You've successfully connected me to your Discord! Can you link me to the 'lfg' channel?").then(res => {
                const responseCollector = settingsChannel.createMessageCollector(message => {
                    return (guild.owner.id === message.author.id) 
                }, { time: 180000 });
                
                responseCollector.on('collect', collected => {
                    if (collected.mentions && collected.mentions.channels.array().length == 1) {
                        local_guilds.push({
                            id: collected.guild.id,
                            lfg_channel: collected.mentions.channels.array()[0].parent
                        });
                        responseCollector.stop();
                    }     
                });

                responseCollector.on('end', () => {
                    if (local_guilds.find(searchGuild => searchGuild.id === guild.id)) {
                        settingsChannel.send("All set! This channel will be removed in 30 seconds");
                        const channelDeleteTimeout = client.setTimeout(() => {
                            settingsChannel.delete();
                            clearTimeout(channelDeleteTimeout);
                        }, 30000);
                    } else {
                        settingsChannel.send("Something failed to setup, I never recieved a response. Lfg function will no longer work.");
                    }
                    
                });
            }).catch(err => {
                console.log("Error sending initiation message: ", err);
            });
        }).catch(err => {
            console.log("Error creating initiation channel: ", err);
        });
    });
    commands = new Commands({
        client,
        guilds: local_guilds
    });
});

client.on('message', msg => {
    if (msg.content.indexOf(`!${config.command_trigger}`) === 0) {
        for (let i = 0; i < config.commands.length; i++) {
            const command = config.commands[i];

            const commandString = `!${config.command_trigger} ${command.trigger}`;

            if (msg.content.indexOf(commandString) === 0) {
                const gameString = msg.content.substring(commandString.length).trim();

                commands.lfg(gameString, msg.guild);
            }
        }
    } 
});

try {
    client.login(process.env.DISCORD_TOKEN);
} catch(e) {
    console.log("Failed to start, token was not provided at process.env.DISCORD_TOKEN");
}
