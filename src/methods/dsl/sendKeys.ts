/**
 * @fileoverview               This file contains the method for sending keys to the element.
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
 * @description                 This method will send keys to the element.
 * @param driver                Provide the driver instance.
 * @param locator               Provide the selector of the element.
 * @param keys                  Provide the keys to be sent.
 * @usage                       await sendKeysToElement({WebDriver}, {string}, {string})
 * @example                     await sendKeysToElement(driver, '.input', 'Hello World!')
 */
export default async function sendKeysToElement(driver: WebDriver, locator: string, keys: string) {
  try {
    // Print the message in the console and add it to the report.
    dslMessages(`+ ${currentFileName}:: SEND KEYS '${keys}' to element with selector '${locator}'`)
    // Find the element and send keys to it.
    const element = await selector(driver, locator)
    // Clear the element.
    await element.clear();
    // Print the message in the console and add it to the report.
    dslMessages(`   > ${currentFileName}:: The element is cleared!`)
    // Send keys to the element.
    await element.sendKeys(keys)
    // Print the message in the console and add it to the report.
    dslMessages(`   > ${currentFileName}:: The keys '${keys}' are sent to the element!`)
    // Get the value of the element.
    const value = await element.getAttribute('value')
    // Print the message in the console and add it to the report.
    expect(keys).toBe(value)
    // Print the message in the console and add it to the report.
    dslMessages(`- ${currentFileName}:: Successfully SENT KEYS '${keys}' to element with selector '${locator}'`)
  } catch (error) {
    // Throw an error.
    throw new Error(`Error in sendKeysToElement: ${error}`)
  }
}
