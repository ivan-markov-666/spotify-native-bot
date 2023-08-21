/**
 * @fileoverview               This file contains the method for getting the duration of the song and waiting for a period of time.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the getText method.
import getText from './getText'
// Import randomWait, convertDurationToMilliseconds, waitSongListeningTime methods.
import { randomWait, convertDurationToMilliseconds, waitSongListeningTime } from '../../methods/others/randomWait'
// Import the DSL messages.
import { dslMessages } from '../../methods/others/messages'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

/**
 * @description                 This method will get the duration of the song and wait for a period of time.
 * @param driver                Provide the driver instance.
 * @param locator               Provide the selector of the element.
 * @usage                       await songDuration({WebDriver}, {string})
 * @example                     await songDuration(driver, '.duration')
 */
export default async function songDuration(driver: WebDriver, locator: string) {
  try {
    // Print the message in the console and add it to the report.
    dslMessages(`+ ${currentFileName}:: GET DURATION of the song with selector '${locator}'`)
    // Get the duration of the song.
    const durationString = await getText(driver, locator)
    // Convert the duration to milliseconds.
    const duration = await convertDurationToMilliseconds(durationString)
    // Print the message in the console and add it to the report.
    dslMessages(`   > ${currentFileName}:: The duration of the song is '${durationString}'`)
    // Define the start of the waiting time.
    const start = waitSongListeningTime(duration)
    // Define the end of the waiting time.
    const end = duration - 1
    // Wait for a period of time.
    const waited = await randomWait(start, end)
    // Print the message in the console and add it to the report.
    dslMessages(`- ${currentFileName}:: Successfully WAITED for ${waited} milliseconds`)
  } catch (error) {
    // Throw an error.
    throw new Error(`Error in songDuration: ${error}`)
  }
}
