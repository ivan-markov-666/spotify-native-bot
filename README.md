# Spotify Bot for "harving" nativly streams.
That repo contains a BOT for listening Spotify songs with native streams.  
The bot is using the browser to listen to the songs, to make the streams look more natural.  
The bot can use VPN by providing a ovpn file and auth.txt file (described below).  
The bot can simulate a real user, by taking a decision for randomly playing songs (described below). The selected songs that will be played are played for different time.  
The minimum time that the song can be listen is set to 32 seconds (30 seconds is one stream for Spotify).   
The bot can listen to a specific artist or to a specific song. The bot can switch between different artists, to make the streams look more natural. That approach will help your artist to get "Fans also like" section in Spotify in the future.  
It a good idea to make virtual machine image and configure every image with different users and vpns. That way you can run the bot on multiple time on the same (or on different) machine. By that approach you can make more streams.  

## Requirements
1. NodeJS v16.14.2 or later
2. PowerShell v5.1.22621.1778 or later

## Preconditions
1. Install Chrome browser: https://www.google.com/chrome/  
2. Install OpenVPN client: https://openvpn.net/community-downloads/  
3. Add openvpn.exe to the 'environment variables' ' path'.
4. Allow using PowerShell scripts on your machine:
> Set-ExecutionPolicy RemoteSigned 

## Installation
1. Clone the repo.
2. Run `npm install` in the repo's root directory to install dependencies.

## Configuration
1. To use the bot, you need to configure the "src\config\config.ts" file.  
Open the file and read the comments to understand what to do.  
2. Provide a credentials.json file with your Spotify credentials, ovpn file and auth.txt file. Those files are required to be used by the bot. You can provide only credentials.json (you can see example file in examples\credentials.template.json) file if you don't want to use the VPN. You can see example with that folder structure and files in the "examples\auth" folder. Every folder (located inside "auth" folder) will be used as a different VPN connection. So you should provide a different ovpn file and auth.txt file for every folder.  
Make sure that you have the same folder structure as in the example folder.  
Lets see example for the credentials.json file:  
```json
[
      {
      "userName": "Spotify username",
      "password": "Spotify password",
      "artist": ["Psysex", "Iron Madness"],
      "mainArtist": "Psysex",
      "blacklist": []
  },
  {
      "userName": "Spotify username",
      "password": "Spotify password",
      "artist": ["Psysex"],
      "mainArtist": "Psysex",
      "blacklist": ["Kalashnikov", "The Enemy Side", "Hunted"]
  }
]
```
With that example we will run the bot 2 times.  
First time will be runned with the first credentials (Make sure that you provide the correct credentials in the credentials.json file).  
The bot will listen to the "Psysex" and "Iron Madness" artists. Because "Psysex" is the main artist, the bot will listen that artist more than the other artists (see "randomPercentStremedArtist" and "randomPercentOtherArtist" in the config file). In the first example we don't have any songs in the blacklist, so the bot can listen to any song from the artists. The blacklisted songs are the songs that the bot will not listen to. That list is applied to all artists. Make sure that you provide the correct song names in the blacklist, because the data is case sensitive. For example if the song name is "Solid Stigma" and you provide "solid stigma" in the blacklist, the bot will listen to that song, because the data is case sensitive!

Second time will be runned with the second credentials. The bot will listen to "Psysex" only. Because we have blacklisted some songs, the bot will not listen to those songs. The bot will listen to any other song from the artist.  

## How to use the bot
1. First we need to edit the config file to meet our needs. 
2. Then we need to provide the credentials.json file with our credentials, ovpn file and auth.txt file in correct folder structure. We need to provide the path of that folder in the config file (see "authPath" in the config file).
3. Open PowerShell like administrator and navigate to the repo's root directory.
4. Run the following command:
> .\startBot.ps1
5. If you set to "true" for "debugMessageToggle", "dslMessagesToggle", "pomMessagesToggle", "othersMesageToggle", "testCaseMessageToggle", "songDurationMessageToggle", "assertMessagesToggle" in the config file, you will see some messages in the PowerShell window and those messages will be saved in the "logs" folder. You can see the logs in the "logs" folder. My suggestion is to set "songDurationMessageToggle" to "true" and set others to "false". Other toggles are for debugging purposes.  
- If the bot crashed or fails and the VPN connection is still active, you can stop the VPN connection by executing the "src\vpn\vpn.ps1" file in the PowerShell console.
- If you need to clear the logs, you can use the following script in root folder of the project:
> npm run clear-log

### To Do
1. Add report mechanism to generate expected streams based on the logs.
2. Add FE to configure and start the bot easily.

### License
This software is licensed under the MIT. See the LICENSE file in the top distribution directory for the full license text.