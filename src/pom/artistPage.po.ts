/**
 * @fileoverview               This file contains POM methods related to the Artist page.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the click method.
import click from '../methods/dsl/click'
// Import the getText method.
import getText from '../methods/dsl/getText'
// Import the randomWait method.
import { randomWait } from '../methods/others/randomWait'
// Import the pomMessages messages.
import { pomMessages } from '../methods/others/messages'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

// Define the locators.
const verifyArtistPage_textElement = '//span/h1[@data-encore-id="type"]'
const showAll_buttonElement = `(//*[text() = 'Show all'])[1]`

// Create a class for the Artist page.
class ArtistPage {
/**
 * @description     This method will verify if the correct artist page is displayed.
 * @param driver    Provide the driver.
 * @param artist    Provide the artist name.
 * @usage           await verifyArtistPage({WebDriver}, {string})
 * @example         await verifyArtistPage(driver, 'Eminem')
 */
  async verifyArtistPage(driver: WebDriver, artist: string) {
    try {
      // Print the message in the console and add it to the report.
      pomMessages(`+ ${currentFileName}:: VERIFY if the correct artist page is displayed`)
      // Wait for a period of time.
      await getText(driver, verifyArtistPage_textElement, artist)
      // Print the message in the console and add it to the report.
      pomMessages(`- ${currentFileName}:: Successfully VERIFIED if the correct artist page is displayed`)
    } catch (error) {
      // Throw an error.
      throw new Error(`Error in verifyArtistPage: ${error}`)
    }
  }

/**
 * @description     This method will click on the 'Show all' button.
 * @param driver    Provide the driver instance.
 * @usage           await clickShowAllButton({WebDriver})
 * @example         await clickShowAllButton(driver)
 */
  async clickShowAllButton(driver: WebDriver) {
    try {
      // Print the message in the console and add it to the report.
      pomMessages(`+ ${currentFileName}:: CLICK on 'Show all' button`)
      // Wait for a period of time.
      await click(driver, showAll_buttonElement)
      // Print the message in the console and add it to the report.
      await randomWait(3000, 8000);
      // Print the message in the console and add it to the report.
      pomMessages(`- ${currentFileName}:: Successfully CLICKED on 'Show all' button`)
    } catch (error) {
      // Throw an error.
      throw new Error(`Error in clickShowAllButton: ${error}`)
    }
  }
}

// Export the ArtistPage class.
export default ArtistPage