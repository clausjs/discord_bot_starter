# discord_bot_starter
A javascript project to get started with writing discord bots. The only functionality provided out of the box is an LFG feature which allows users to use a command to create voice channels, which when joined will create text channels with associated names. When the channels clear of users, they will be deleted

## Description

An out-of-the-box working discord bot that has been designed to be modular and easy to add commands.
Comes pre-equipped [LFG](https://imgur.com/a/YD5F483) function [what does this mean?](#whatsanLFGfunction?)

## Getting Started

1. Clone the project
1. `cd discord_bot_starter` where 'discord_bot_starter' is whatever you named the project/directory.
1. `npm i`
1. `DISCORD_TOKEN=<your_token_here> node index.js`. Follow the instructions [here](#prerequisites) for more info.

### Prerequisites

First you must create a developer account with Discord at the Discord [developer portal](https://discordapp.com/login?redirect_to=%2Fdevelopers%2Fapplications%2F).

After logging in, create a new bot by clicking [New Application](https://imgur.com/a/cB7j55L).
Give it a name and click 'Create'. On the next screen make note of the 'CLIENT ID', you will need this soon.

One the next screen you can configure the bots icon, name, and description. For now click "Bot" on the menu to the left and then 'Add Bot'. This will turn this 'application' into a bot user, which is how your bot will interact with your server.

Once the application is a bot user you will see a menu which allows you to configure the bot's permissions. At the very least, for the LFG function to work this bot must have [permissions](https://imgur.com/a/4vs2L5G) to see/message/and add/remove channels. Once you have configured the permissions to your liking and make note of the 'PERMISSIONS INTEGER' at the bottom of the checkboxes you will need this soon as well. You will also need to copy the bot's token for later in order to run the application (after all the below steps).

Once the bot is configured to your liking and has the minimium permissions id from above you are ready to add the bot to your Discord server. Navigate to the following URL: `https://discordapp.com/api/oauth2/authorize?client_id=<CLIENT ID>&scope=bot&permissions=<PERMISSIONS INTEGER>` where `<CLIENT ID>` is the client id recorded above and `<PERMISSIONS INTEGER>` is the permissions integer from above. If the url is correct you should be presented with a login form. Log in with the user who owns the server you intend to add it to, and you will be presented with a dropdown containing all your servers. Select the server you want to add the bot to and continue. When you are presented with a success message you should see the bot listed as offline on your server.

### Installing

When the bot first starts up and connects to the server a channel will be added called `<bot_name>-setup`. The bot expects a category channel to be created so it knows where to look for channels that can be added or removed, the first question it asks will be for a link to the main channel in that category. For instance, say your setup looks like [this](https://imgur.com/a/JMYGBAE) the bot wants you to link to '#looking-for-games'. If the interaction is successful, the bot will [let you know](https://imgur.com/a/zSjAbxq) and the setup channel will be automatically deleted soon after.

### Configuring

The bot can be configured to use any trigger phrase that's preferred with a simple config file. Inside config/config.json you can change the 'command_trigger' value to be whatever should follow the exclamation mark. For instance, if the json file contains `"command_trigger": "test"` then `!test` would trigger the bot. The same is true for the actual command which by default is `lfg`. This can be done by editing the command information here:

```
"commands": [
    {
        "trigger": "lfg",
        "logic": "lfg"
    }
]
```

**DO NOT CHANGE** the `"logic": "lfg"` portion or the bot will break. The `trigger` value can be changed to whatever you want to trigger the lfg command.

## Running the tests

COMING SOON

<!-- ### Break down into end to end tests

Explain what these tests test and why

```
Give an example
``` -->

<!-- ### And coding style tests

Explain what these tests test and why

```
Give an example
``` -->

<!-- ## Deployment

Add additional notes about how to deploy this on a live system -->

## Built With

* [Discord.js](https://github.com/discordjs/discord.js) - A helpful Discord node adapter.

<!-- ## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/clausjs/discord_bot_starter/tags). 

## Authors

* **Joseph Claus** - *Initial work*

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

# What's an LFG function?

A user can create voice channels on the fly using this command. When the voice channel is joined, a corresponding text channel [will be created](https://imgur.com/a/FQjboSt). When the channel is done being used (e.g. every user who has joined has left) the channels will be cleaned up and deleted. 

## License

This project is licensed under the GNU License - see the [LICENSE.md](LICENSE.md) file for details

<!-- ## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc -->
