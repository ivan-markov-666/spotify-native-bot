/**
 * @fileoverview               This file contains POM methods related to the all songs page.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the click method.
import click from '../methods/dsl/click'
// Import the getText method.
import getText from '../methods/dsl/getText'
// Import the isElementExist method.
import { isElementExist } from '../methods/dsl/element'
// Import the getElements method.
import getElements from '../methods/dsl/elements'
// Import the hoverAndClick method.
import hoverAndClick from '../methods/dsl/hoverAndClick'
// Import the scrollToElement method.
import { scrollToElement } from '../methods/dsl/scroll'
// Import the getRandomBoolean method.
import { getRandomBoolean } from '../methods/others/randomDecisions'
// Import the convertDurationToMilliseconds, waitSongListeningTime and staticWait methods.
import { convertDurationToMilliseconds, waitSongListeningTime, staticWait } from '../methods/others/randomWait'
// Import the pomMessages and songDurationMessage methods.
import { pomMessages, songDurationMessage } from '../methods/others/messages'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

// Define the locators.
const allPlayButtons = '//*[@data-testid="play-button"]/following::div//*[@*="gridcell"]/div/button'
const validateSongIsPlaying = `//*[@data-testid="play-button"]/following::div//*[@*="gridcell"]/div/button[@aria-label="Pause"]`;
const allSongsTime = `//*[@*="play-button"]/following::div//*[@*="gridcell"]/following-sibling::*[@*="3"]/div`;
const currentSongTime = `//div[@role="gridcell"]/div[@data-encore-id="text"]`;
const backwardSong_buttonElement = `//*[@*="control-button-skip-back"]`;

// Create a class for the all songs page.
class AllSongs {
  /**
   * @description       This method will scroll to the bottom of the page.
   * @param driver      Provide the driver instance.
   * @usage             await scrollToTheBottom({WebDriver})
   * @example           await scrollToTheBottom(driver)
   */
  async scrollToTheBottom(driver: WebDriver) {
    try {
      // Print the message in the console and add it to the report.
      pomMessages(`+ ${currentFileName}:: SCROLL to the bottom of the page`)
      // Create a flag for the loop for 'previousLength'.
      let previousLength = 0
      // Create a flag for the loop for 'currentLength'.
      let currentLength = 0
      // Make a loop for 'previousLength' and 'currentLength'.
      do {
        // Set the 'previousLength' to 'currentLength'.
        previousLength = currentLength
        // Get all play buttons.
        const playButtons = await getElements(driver, allPlayButtons)
        // Set the 'currentLength' to the length of the play buttons array.
        currentLength = playButtons.length
        // If the 'currentLength' is greater than 0, scroll to the last button.
        if (currentLength > 0) {
          // Get the last button.
          const lastButton = playButtons[currentLength - 1]
          // Scroll to the last button.
          await scrollToElement(driver, lastButton)
          // Wait for a period of time.
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      }
      // Check if the 'currentLength' is equal to the 'previousLength'.
      while (currentLength !== previousLength)
      // Print the message in the console and add it to the report.
      pomMessages(`- ${currentFileName}:: Successfully SCROLLED to the bottom of the page`)
    } catch (error) {
      // Throw an error.
      throw new Error(`Error in scrollToTheBottom: ${error}`)
    }
  }

  /**
   * @description       This method will get the duration of the song.
   * @param driver      Provide the driver instance.
   * @usage             await getSongDuration({WebDriver})
   * @example           await getSongDuration(driver)
   */
  async currentSongDuration(driver: WebDriver) {
    try {
      // Print the message in the console and add it to the report.
      pomMessages(`+ ${currentFileName}:: CHECK if the song is started from the beginning. If not, the method will press the backward button to start the song from the beginning.`)
      // Get the current song duration.
      const currentSongDuration = await getText(driver, currentSongTime)
      // Check if the song is started from the beginning. If not, the method will press the backward button to start the song from the beginning.
      if (currentSongDuration !== '0:00' && currentSongDuration !== '-:--') {
        // Press the backward button to start the song from the beginning.
        await click(driver, backwardSong_buttonElement)
        // Print the message in the console and add it to the report.
        pomMessages(`- ${currentFileName}:: The song is not started from the beginning. The method pressed the backward button to start the song from the beginning.`)
      }
      // Otherwise, print the message in the console.
      else {
        // Print the message in the console and add it to the report.
        pomMessages(`- ${currentFileName}:: The song is started from the beginning.`)
      }
    } catch (error) {
      // Throw an error.
      throw new Error(`Error in currentSongDuration: ${error}`)
    }
  }

  /**
   * @description             This method will play all songs.
   * @param driver            Provide the driver instance.
   * @param randomPercent     Provide the random percent.
   * @param artist            Provide the artist name.
   * @param recordLog         Provide the record log.
   * @param expectedNames     Provide the expected song names.
   * @usage                   await playAllSongs({WebDriver}, {number}, {string}, {boolean}, {string[]})
   * @example                 await playAllSongs(driver, 0.5, 'Eminem', true, ['Changes', 'All eyes on me', 'killuminati'])
   */
  async playAllSongs(driver: WebDriver, randomPercent: number, artist: string, recordLog: boolean, expectedNames: string[]) {
    try {
      // Print the message in the console and add it to the report.
      pomMessages(`+ ${currentFileName}:: PLAY all songs`)
      // Check if the song is started from the beginning. If not, the method will press the backward button to start the song from the beginning.
      await this.currentSongDuration(driver);
      // Print the message in the console and add it to the report.
      pomMessages(`   > ${currentFileName}:: Check if the song is started from the beginning. If not, the method will press the backward button to start the song from the beginning.`)
      // Get all play buttons in array.
      const playButtons = await getElements(driver, allPlayButtons)
      // Print the message in the console and add it to the report.
      pomMessages(`   > ${currentFileName}:: Get all play buttons in array.`)
      // Get all songs time in array.
      const songsTime = await getElements(driver, allSongsTime)
      // Print the message in the console and add it to the report.
      pomMessages(`   > ${currentFileName}:: Get all songs time in array.`)
      // Set counter for the songs time array.
      let iterationCount = 0;
      // Make a loop for all play buttons.
      for (const button of playButtons) {
        // Print the message in the console and add it to the report.
        pomMessages(`+ ${currentFileName}:: A new song will be played.`)
        // Print the message in the console and add it to the report.
        pomMessages(`   > ${currentFileName}:: Get random decision for playing the song.`)
        // Get random decision.
        const decision = getRandomBoolean(randomPercent)
        // If the decision is true...
        if (decision) {
          // Print the message in the console and add it to the report.
          pomMessages(`   > ${currentFileName}:: The decision is TRUE. The song will be played if the current song is not in the black list.`)
          // Hover on the button and click on it.
          const isOnBlackList = await hoverAndClick(driver, button, expectedNames, iterationCount + 1)
          if (isOnBlackList) {
            // Validate that the song is playing.
            let flag = false;
            // Print the message in the console and add it to the report.
            pomMessages(`   > ${currentFileName}:: Validate that the song is playing.`)
            // Make a loop for validating that the song is playing.
            for (let i = 0; i < 10; i++) {
              // Check if the song is playing.
              const assertSongIsPlaying = await isElementExist(driver, validateSongIsPlaying)
              // If the song is playing, set the flag to true and break the loop.
              if (assertSongIsPlaying) {
                // Set the flag to true.
                flag = true;
                // Print the message in the console.
                pomMessages(`   > ${currentFileName}:: The song is playing.`)
                // Break the loop.
                break;
              }
              // Print the message in the console and add it to the report.
              pomMessages(`   > ${currentFileName}:: The song is not playing. Wait for 2 seconds and try again.`)
              // Wait for 2 seconds.
              staticWait(2000)
            }
            // If the song is not playing, throw an error.
            if (!flag) {
              // Throw an error.
              throw new Error(`The song is not playing.`)
            }
            // Print the message in the console and add it to the report.
            pomMessages(`   > ${currentFileName}:: Get the song duration time in string.`)
            // Get the song duration time in string.
            const durationTimeString = await getText(driver, songsTime[iterationCount])
            // Print the message in the console and add it to the report.
            pomMessages(`   > ${currentFileName}:: Convert the song duration time in miliseconds.`)
            // Convert the song duration time in miliseconds.
            const durationTimeMiliseconds = await convertDurationToMilliseconds(durationTimeString);
            // Print the message in the console and add it to the report.
            pomMessages(`   > ${currentFileName}:: Get random time for listening the song.`)
            // Get random time for listening the song.
            const songWait = waitSongListeningTime(durationTimeMiliseconds);
            // Print the message in the console and add it to the report.
            pomMessages(`   > ${currentFileName}:: Wait for the song to be listen.`)
            // Print the message in the console.
            songDurationMessage(`The song duration time is ${durationTimeString}. The song will be listen for ${songWait / 1000} secconds.`, artist, recordLog)
            // Wait for the song to be listen.
            await staticWait(songWait);
          }
        }
        // Print the message in the console and add it to the report.
        pomMessages(` - ${currentFileName}:: The song was played.`)
        // Add 1 to the iteration count.
        iterationCount++;
      }
    }
    catch (error) {
      // Throw an error.
      throw new Error(`Error in playAllSongs: ${error}`)
    }
  }
}

// Export the class.
export default AllSongs