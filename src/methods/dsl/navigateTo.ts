/**
 * @fileoverview               This file contains all the functions which are related to the navigateTo action.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the DSL messages.
import { dslMessages } from '../../methods/others/messages'
// Import the config.
import { config } from '../../config/config'
// Import the verifyExactUrl method.
import { verifyExactUrl } from '../../methods/assertion/verifyUrl'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');
// Set the timeout.
const TIMEOUT = config.globalTimeOut;

/**
 * @description               This method will navigate to the provided URL. 
 * @param driver              Provide the driver instance.
 * @param url                 Provide the URL.
 * @usage                     await navigateTo({WebDriver}, {string})
 * @example                   await navigateTo(driver, 'https://www.google.com')
 */
export default async function navigateTo(driver: WebDriver, url: string): Promise<void> {
  try {
    // Print the message in the console and add it to the report.
    dslMessages(`+ ${currentFileName}:: NAVIGATE to '${url}'`)
    // Navigate to the URL.
    await driver.get(url);
    // Wait for the page to be fully loaded.
    await driver.wait(async () => {
      // Get the readyState.
      const readyState = await driver.executeScript('return document.readyState');
      // Return the readyState.
      return readyState === 'complete';
    },
    // Set the timeout.
    TIMEOUT);
    // Print the message in the console and add it to the report.
    dslMessages(`   > ${currentFileName}:: The page is fully loaded!`)
    // Verify that the browser navigated to the correct URL.
    verifyExactUrl(driver, url)
    // Print the message in the console and add it to the report.
    dslMessages(`- ${currentFileName}:: Successfully NAVIGATED to '${url}'`)
  } catch (error) {
    // Throw the error.
    throw new Error(`Error in navigateTo: ${error}`)
  }
}
