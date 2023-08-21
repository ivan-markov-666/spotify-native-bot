/**
 * @fileoverview               This file contains all the functions which are related to the hover action.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver"
// Import the selector method.
import selector from './element'
// Import the DSL messages.
import { dslMessages } from '../../methods/others/messages'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

/**
 * @description               This method will hover on the element.
 * @param driver              Provide the driver instance.
 * @param locator             Provide the selector.
 */
export default async function hoverElement(driver: WebDriver, locator: string): Promise<void> {
  try {
    // Print the message in the console and add it to the report.
    dslMessages(`+ ${currentFileName}:: HOVER on element with selector '${JSON.stringify(locator)}'`)
    // Get the element.
    const element = await selector(driver, locator)
    // Hover on the element.
    await driver.actions().move({ origin: element }).perform()
    // Print the message in the console and add it to the report.
    dslMessages(`- ${currentFileName}:: Successfully HOVERED on element with selector '${JSON.stringify(locator)}'`)
  }
  catch (error) {
    // Throw the error.
    throw new Error(`Error in hoverElement: ${error}`)
  }
}