/**
 * @fileoverview                That file contains the method for clicking on the element.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the selector method.
import selector from './element'
// Import the DSL messages.
import { dslMessages } from '../../methods/others/messages'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

/**
 * @description                 This method will click on the element.
 * @param driver                Provide the driver instance.
 * @param locator               Provide the selector of the element.
 * @usage                       await click({WebDriver}, {string})
 * @example                     await click(driver, '.button')
 */
export default async function click(driver: WebDriver, locator: string): Promise<void> {
  try {
    // Print the message in the console and add it to the report.
    dslMessages(`+ CLICK on element with selector '${locator}'`)
    // Find the element and click on it.
    const element = await selector(driver, locator)
    // Click on the element.
    await element.click()
    // Print the message in the console and add it to the report.
    dslMessages(`- ${currentFileName}:: Successfully CLICKED on element with selector '${locator}'`)
  }
  catch (error) {
    // Throw an error.
    throw new Error(`Maybe you try to click on an element that is not clickable. Error in click method: ${error} .`)
  }
}
