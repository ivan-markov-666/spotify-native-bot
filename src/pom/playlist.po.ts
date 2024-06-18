/**
 * @fileoverview               This file contains POM methods related to the all songs page.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the click method.
import click from '../methods/dsl/click'
// Import the convertDurationToMilliseconds, waitSongListeningTime and staticWait methods.
import { randomWait, staticWait } from '../methods/others/randomWait'
// Import the pomMessages and songDurationMessage methods.
import { pomMessages } from '../methods/others/messages'


// Define the locators.
const playButton = '//div[@data-testid="action-bar-row"]//button[@data-encore-id="buttonPrimary"]'


// Create a class for the all songs page.
class Playlists {
    /**
     * @description       This method will click over the playlist.
     * @param driver      Provide the driver instance.
     * @usage             await clickOverPlaylist({WebDriver})
     * @example           await clickOverPlaylist(driver)
     */
    async clickOverPlaylist(driver: WebDriver, playlistName: string) {
        try {
            // Print the message in the console and add it to the report.
            pomMessages(`+ CLICK over the playlist.`)
            // Wait for a period of time.
            await randomWait(3000, 7000)
            // Press the play button.
            await click(driver, `//p[@data-encore-id="listRowTitle"]/span[contains(text(), '${playlistName}')]/ancestor::div[@data-encore-id="listRow"]`)
            // Print the message in the console and add it to the report.
            pomMessages(`   > Click over the play button.`)

            // Press the play button.
            await click(driver, playButton)
            // Print the message in the console and add it to the report.
            pomMessages(`- The playlist is now playing.`)
            await randomWait(10700000, 10800000)
        } catch (error) {
            // Throw an error.
            throw new Error(`Error in clickOverPlaylist: ${error}`)
        }
    }
}
// Export the class.
export default Playlists