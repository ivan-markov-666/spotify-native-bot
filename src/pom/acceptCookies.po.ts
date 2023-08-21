/**
 * @fileoverview               This file contains POM methods related to the Accept Cookies button.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the DSL messages.
import click from '../methods/dsl/click'
// Import the randomWait messages.
import { randomWait } from '../methods/others/randomWait'
// Import the pomMessages messages.
import { pomMessages } from '../methods/others/messages'// Import the path module.
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

// Define the locators.
const accept_cookies_buttonElement = '#onetrust-accept-btn-handler' // 'Accept Cookies' button.

// Create a class for the Accept Cookies button.
class AcceptCookies {

/**
 * @description         This method will click on the 'Accept Cookies' button.
 * @param driver        Provide the driver instance.
 * @usage               await acceptCookies({WebDriver})
 * @example             await acceptCookies(driver)
 */
  async acceptCookies(driver: WebDriver) {
    try {
      // Print the message in the console and add it to the report.
      pomMessages(`+ ${currentFileName}:: ACCEPT COOKIES`)
      // Wait for a period of time.
      await randomWait(500, 1500);
      // Click on the 'Accept Cookies' button.
      await click(driver, accept_cookies_buttonElement)
      // Print the message in the console and add it to the report.
      pomMessages(`- ${currentFileName}:: Successfully ACCEPTED COOKIES`)
    } catch (error) {
      // Throw an error.
      throw new Error(`Error in acceptCookies: ${error}`)
    }
  }
}

// Export the AcceptCookies class.
export default AcceptCookies