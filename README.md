# Spotify Bot for "harving" native streams.
- That repo contains a BOT for listening to Spotify songs with native streams.  
- The bot is using the browser to listen to the songs, to make the streams look more natural.  
- The bot can use VPN by providing a ovpn file and auth.txt file (described below).  
- The bot can simulate a real user, by taking a decision for randomly playing songs (described below). The selected songs that will be played are played at different times.  
- The minimum time that the song can be listen is set to 32 seconds (30 seconds is one stream for Spotify).   
- The bot can listen to a specific artist or to a specific song. The bot can switch between different artists, to make the streams look more natural. That approach will help your artist to get the "Fans also like" section on Spotify in the future.  
- It is a good idea to make a virtual machine image and configure every image with different users and VPNs. That way you can run the bot on multiple time on the same (or on different) machines. By that approach, you can make more streams.  

## Requirements
1. NodeJS v16.14.2 or later
2. PowerShell v5.1.22621.1778 or later

## Preconditions
1. Install Chrome browser: https://www.google.com/chrome/  
2. Install OpenVPN client: https://openvpn.net/community-downloads/  
3. Add openvpn.exe to the 'environment variables' ' path'.
4. Allow using PowerShell scripts on your machine:
   > Set-ExecutionPolicy RemoteSigned 
5. To run the PowerShell script `startBot.ps1`, you may encounter a security warning about running scripts that are not digitally signed. To bypass this policy for a single session (which is safer than changing the policy permanently), you can start the PowerShell script with the following command:
   > powershell -ExecutionPolicy Bypass -File .\startBot.ps1
   This command temporarily bypasses the execution policy for running the `startBot.ps1` script without changing your system's permanent security settings.
6. If you prefer to change the policy system-wide (not recommended for security reasons), you can set the execution policy to Unrestricted with this command (admin rights required):
   > Set-ExecutionPolicy Unrestricted
   Confirm with 'Y' or 'A' (Yes/All) when prompted. This allows all PowerShell scripts to run, which could potentially expose your system to malicious scripts. It is crucial to ensure that you trust the scripts you execute under this policy.






Разбирам, че искаш да подчертаеш, че потребителят може да избере един от двата подхода, а не да изпълнява и двата. Можем да преструктурираме описанието, за да разделим ясно двата метода и да обясним, че те са алтернативни. Ето как може да изглежда това в README.md файла:

```markdown
## Preconditions
1. Install Chrome browser: https://www.google.com/chrome/  
2. Install OpenVPN client: https://openvpn.net/community-downloads/  
3. Add openvpn.exe to the 'environment variables' ' path'.

## Installation
1. Clone the repo.
2. Run `npm install` in the repo's root directory to install dependencies.

## Configuration
1. To use the bot, you need to configure the "src\config\config.ts" file.  
Open the file and read the comments to understand what to do.  
2. Provide a credentials.json file with your Spotify credentials, ovpn file, and an auth.txt file. Those files are required to be used by the bot. You can provide only credentials.json (you can see the example file in examples\credentials.template.json) file if you don't want to use the VPN. You can see the example with that folder structure and files in the "examples\auth" folder. Every folder (located inside the "auth" folder) will be used as a different VPN connection. So you should provide a different ovpn file and auth.txt file for every folder.  
Make sure that you have the same folder structure as in the example folder.  
Lets see the example for the credentials.json file:  
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
With that example, we will run the bot 2 times.  
The first time will be run with the first credentials (Make sure that you provide the correct credentials in the credentials.json file).  
The bot will listen to the "Psysex" and "Iron Madness" artists. Because "Psysex" is the main artist, the bot will listen to that artist more than the other artists (see "randomPercentStremedArtist" and "randomPercentOtherArtist" in the config file). In the first example, we don't have any songs on the blacklist, so the bot can listen to any song from the artists. The blacklisted songs are the songs that the bot will not listen to. That list is applied to all artists. Make sure that you provide the correct song names in the blacklist, because the data is case-sensitive. For example, if the song name is "Solid Stigma" and you provide "solid stigma" in the blacklist, the bot will listen to that song, because the data is case sensitive!

The second time will be run with the second credentials. The bot will listen to "Psysex" only. Because we have blacklisted some songs, the bot will not listen to those songs. The bot will listen to any other song from the artist.  

## How to use the bot
1. First we need to edit the config file to meet our needs. 
2. Then we need to provide the credentials.json file with our credentials, ovpn file, and auth.txt file in a correct folder structure. We need to provide the path of that folder in the config file (see "authPath" in the config file).
3. Open PowerShell like administrator and navigate to the repo's root directory.
4. Running the PowerShell script  
To run the `startBot.ps1` script, you have two options, depending on your preference for security and convenience. Choose **one** of the following methods:
    - Option 1: Temporary Bypass of Execution Policy  
    For a single session without permanently changing your system's security settings, you can bypass the execution policy. This method is quicker and suitable for testing purposes:  
>   powershell -ExecutionPolicy Bypass -File .\startBot.ps1  
This command temporarily allows the script to run without changing the permanent execution policy.
    - Option 2: Signing the Script with a Self-Signed Certificate
For a more secure approach, especially if the script will be used regularly or distributed, consider signing the script with a self-signed certificate:  
Generate a self-signed certificate:
>   $cert = New-SelfSignedCertificate -DnsName "localhost" -CertStoreLocation "cert:\CurrentUser\My"  
Export the certificate to a file:  
> Export-PfxCertificate -Cert $cert -FilePath "C:\Path\To\YourProject\YourCert.pfx" -Password (ConvertTo-SecureString -String "YourPassword" -AsPlainText -Force)  
Import the certificate back into your certificate store:  
> Import-PfxCertificate -FilePath "C:\Path\To\YourProject\YourCert.pfx" -CertStoreLocation "Cert:\CurrentUser\My" -Password (ConvertTo-SecureString -String "YourPassword" -AsPlainText -Force)
Sign the script using your certificate:  
> Set-AuthenticodeSignature -FilePath "C:\Path\To\YourProject\startBot.ps1" -Certificate $cert
Revert the execution policy to its original secure setting (if it was changed):  
> Set-ExecutionPolicy RemoteSigned  
This method ensures that the script is verified as unaltered before each run, enhancing security.  
### Choose the method that best suits your needs and follow the respective steps.  
5. If you set to "true" for "debugMessageToggle", "dslMessagesToggle", "pomMessagesToggle", "othersMesageToggle", "testCaseMessageToggle", "songDurationMessageToggle", "assertMessagesToggle" in the config file, you will see some messages in the PowerShell window and those messages will be saved in the "logs" folder. You can see the logs in the "logs" folder. My suggestion is to set "songDurationMessageToggle" to "true" and set others to "false". Other toggles are for debugging purposes.  
- If the bot crashes or fails and the VPN connection is still active, you can stop the VPN connection by executing the "src\vpn\vpn.ps1" file in the PowerShell console.
- If you need to clear the logs, you can use the following script in the root folder of the project:
> npm run clear-log

### To Do
1. Add a report mechanism to generate expected streams based on the logs.
2. Add FE to configure and start the bot easily.

### License
This software is licensed under the MIT. See the LICENSE file in the top distribution directory for the full license text.
