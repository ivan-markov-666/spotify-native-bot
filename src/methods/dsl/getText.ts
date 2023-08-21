/**
 * @fileoverview               This file contains the method for getting the text of the element.
 */

// Import the WebDriver and WebElement from selenium-webdriver.
import { WebDriver, WebElement } from "selenium-webdriver";
// Import the selector method.
import selector from './element'
// Import the DSL messages.
import { dslMessages } from '../../methods/others/messages'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

/**
 * @description             This method will get the text of the element.
 * @param driver            Provide the driver instance.
 * @param locatorOrElement  Provide the selector or the WebElement.
 * @param expectedText      Optional. Provide the expected text of the element.
 * @returns                 The text of the element.
 * @usage                   await getText({WebDriver}, {string | WebElement}, {string})
 * @example                 await getText(driver, '.button', 'Click me')
 *                          await getText(driver, '.button')
 */
export default async function getText(driver: WebDriver, locatorOrElement: string | WebElement, expectedText?: string) {
  try {
    // Print the message in the console and add it to the report.
    dslMessages(`+ ${currentFileName}:: GET TEXT on element with selector '${JSON.stringify(locatorOrElement)}'`)
    // If the locatorOrElement is a WebElement.
    if (typeof locatorOrElement !== 'string') {
      // Get the element.
      const element = locatorOrElement
      // Get the text of the element.
      const text = await element.getText()
      // If the expectedText is provided.
      if (expectedText) {
        // Check if the text is the same as the expectedText.
        expect(text).toBe(expectedText);
        // Print the message in the console and add it to the report.
        dslMessages(`   > ${currentFileName}:: The element text is correct!`)
      }
      // Print the message in the console and add it to the report.
      dslMessages(`- ${currentFileName}:: The element CONTAINS the TEXT: "'${text}'"`)
      // Return the text.
      return text;
    }
    // If the locatorOrElement is a selector.
    else {
      // Get the element.
      const element = await selector(driver, locatorOrElement)
      // Get the text of the element.
      const text = await element.getText()
      // If the expectedText is provided.
      if (expectedText) {
        // Check if the text is the same as the expectedText.
        expect(text).toBe(expectedText);
        // Print the message in the console and add it to the report.
        dslMessages(`   > ${currentFileName}:: The element text is correct!`)
      }
      // Print the message in the console and add it to the report.
      dslMessages(`- ${currentFileName}:: The element CONTAINS the TEXT: "'${text}'"`)
      // Return the text.
      return text;
    }
  } catch (error) {
    // Print the message in the console and add it to the report.
    throw new Error(`Error in getText: ${error}`)
  }
}
