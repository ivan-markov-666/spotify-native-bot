/**
 * @fileoverview    This file contains all the configurations for the bot.
 *                  This is the main configuration file. Please DO NOT touch config.js and config.json. They are generated automatically from this file and are used by the bot.
 */

/**
 * @description     The configuration for the bot.
 */
export const config = {
  /**
   * @description   The maximum time the bot will run before it stops.
   *                That configuration will affect every user.
   * @type          Integer number in milliseconds.
   * @example       For example, if we have ten users and the robotTimeOut is 1 hour, the bot will run for 1 hour for each user. The total time will be 10 hours.
  **/
  robotTimeOut: 12600000,
  /**
   * @description   A global time out for the bot.
   *                If the bot is stuck in a loop, it will stop after the globalTimeOut.
   * @type          Integer number in milliseconds.
   * @example       For example, if the bot is stuck in a loop, it will stop when the globalTimeOut period is reached.
   */
  globalTimeOut: 60000,
  /**
   * @description   A short time out for the bot.
   *                If the bot is stuck in a loop, it will stop after the smallTimeOut.
   * @type          Integer number in milliseconds.
   * @example       For example, if the bot is stuck in a loop, it will stop when the smallTimeOut period is reached.
   */
  smallTimeOut: 3000,
  /**
   * @description   Start or Stop the random wait time between each action.
   * @type          'true' or 'false'
   * @example       For example, if we want to wait a random time between each action, we set waitToggle to 'true'.
   */
  waitToggle: true,
  /**
   * @description   That config is used to set the percentage of random desition for listening to a song or not for the main artist.
   *                That config is for the main artist only.
   * @type          Integer number between 0 and 100.
   * @example       For example, if we want to listen to a song 80% of the time, we set randomPercentListenSong to 80.
   */
  randomPercentStremedArtist: 80,
  /**
   * @description   That config is used to set the percentage of random desition for listening to a song or not for other artists.
   *                That config is for other artists only.
   * @type          Integer number between 0 and 100.
   * @example       For example, if we want to listen to a song 80% of the time, we set randomPercentOtherArtist to 80.
   */
  randomPercentOtherArtist: 100,
  /**
   * @description   That config is used to set the browser to use.
   * @type          'chrome' only for now.
   * @example       For example, if we want to use Chrome, we set the browser to 'chrome'.
   */
  browser: 'chrome',
  /**
   * @description   That config is used to use or not a VPN.
   * @type          'true' or 'false'
   * @example       For example, if we want to use a VPN, we set vpn to 'true'.
   */
  vpn: false,
  /**
   * @description   That config is used to set the VPN connection, artists and blacklisted songs.
   * @type          Destination path. Provide the path of the folder contains the configuration.
   * @example       For example, `C:\\auth`.
   */
  authPath: `C:\\Users\\test657\\Desktop\\QA Course\\AutomationFrames\\selenium-types-script-2\\examples\\auth`,
  /**
   * @description   Provide the openvpn.exe path.
   * @type          Destination path. Provide the path of the openvpn.exe.
   * @example       For example, `C:\\Program Files\\OpenVPN\\bin\\openvpn.exe`.
   */
  openVpnPath: `C:\\Program Files\\OpenVPN\\bin\\openvpn.exe`
};

/**
 * @description   Messages to display in the console and the log file.
 */
export const debug = {
  /**
   * @description   debugMessage to display in the console and the log file.
   * @type          'true' or 'false'
   * @example       For example, if we want to display debugMessage, we set debugMessageToggle to 'true'.
   */
  debugMessageToggle: false,
  /**
   * @description   dslMessages to display in the console and the log file.
   * @type          'true' or 'false'
   * @example       For example, if we want to display dslMessages, we set dslMessagesToggle to 'true'.
   */
  dslMessagesToggle: false,
  /**
   * @description   pomMessages to display in the console and the log file.
   * @type          'true' or 'false'
   * @example       For example, if we want to display pomMessages, we set pomMessagesToggle to 'true'.
   */
  pomMessagesToggle: false,
  /**
   * @description   othersMesage to display in the console and the log file.
   * @type          'true' or 'false'
   * @example       For example, if we want to display othersMesage, we set othersMesageToggle to 'true'.
   */
  othersMesageToggle: false,
  /**
   * @description   testCaseMessage to display in the console and the log file.
   * @type          'true' or 'false'
   * @example       For example, if we want to display testCaseMessage, we set testCaseMessageToggle to 'true'.
   */
  testCaseMessageToggle: false,
  /**
   * @description   songDurationMessage to display in the console and the log file.
   *                That message will display the duration of the song.
   * @type          'true' or 'false'
   * @example       For example, if we want to display songDurationMessage, we set songDurationMessageToggle to 'true'.
   */
  songDurationMessageToggle: true,
  /**
   * @description   assertMessages to display in the console and the log file.
   *                That message will display the assert messages.
   * @type          'true' or 'false'
   * @example       For example, if we want to display assertMessages, we set assertMessagesToggle to 'true'.
   */
  assertMessagesToggle: false,
}