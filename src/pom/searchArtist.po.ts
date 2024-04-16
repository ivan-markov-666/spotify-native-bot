/**
 * @fileoverview               This file contains POM methods related to the Search Artist.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the selector method.
import sendKeys from '../methods/dsl/sendKeys'
// Import the click method.
import click from '../methods/dsl/click'
// Import the randomWait method.
import { randomWait } from '../methods/others/randomWait'
// Import the pomMessages messages.
import { pomMessages } from '../methods/others/messages'
// Import the getText method.
import getText from '../methods/dsl/getText'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

// Define the locators.
const search_buttonElement = '//*[@href="/search"]'
const search_inputTextElement = '//*[@data-testid="search-input"]'

// Create a class for the Search Artist.
class SearchArtist {

/**
 * @description     This method will search for an artist.  
 * @param driver    Provide the driver instance.
 * @param artist    Provide the artist name.
 * @usage           await searchArtist({WebDriver}, {string})
 * @example         await searchArtist(driver, 'Eminem')
 */
  async searchArtist(driver: WebDriver, artist: string) {
    try {
      // Those locators are inside the method, because should use the artist name from the method parameter.
      const verifyArtistIsPresent = `//div[text() = '${artist}']`;
      const clickArtist = `//div[text() = '${artist}']/parent::a/parent::div/parent::div/parent::div`;

      // Print the message in the console and add it to the report.
      pomMessages(`+ ${currentFileName}:: SEARCH ARTIST.`)
      // Wait for a period of time.
      await randomWait(5000, 8000);
      // Click on the 'Search' button.
      await click(driver, search_buttonElement)
      // Print the message in the console and add it to the report.
      pomMessages(`   > ${currentFileName}:: The 'Search' button is clicked.`)
      // Wait for a period of time.
      await randomWait(5000, 8000);
      // Send the artist name to the input text element.
      await sendKeys(driver, search_inputTextElement, artist)
      // Print the message in the console and add it to the report.
      pomMessages(`   > ${currentFileName}:: The artist '${artist}' is sent to the search input.`)
      // Wait for a period of time.
      await randomWait(5000, 8000);
      // Get the text of the artist.
      await getText(driver, verifyArtistIsPresent, artist)
      // Print the message in the console and add it to the report.
      pomMessages(`   > ${currentFileName}:: The artist '${artist}' is present in the search results.`)
      // Wait for a period of time.
      await click(driver, clickArtist)
      // Print the message in the console and add it to the report.
      pomMessages(`- ${currentFileName}:: The artist '${artist}' is clicked.`)
      // Wait for a period of time.
      await randomWait(2000, 3500);
    } catch (error) {
      // Throw an error.
      throw new Error(`Error in searchArtist: ${error}`)
    }
  }
}

// Export the SearchArtist class.
export default SearchArtist