/**
 * @fileoverview This file contains a functions used to get the value of an attribute of an element.
 */

// Import the WebDriver and WebElement from selenium-webdriver.
import { WebDriver, WebElement } from "selenium-webdriver";
// Import the selector method from element.ts.
import selector from './element'
// Import the DSL messages.
import { dslMessages } from '../others/messages'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

/**
 * @description             This method will get the value of an attribute of an element. 
 * @param driver            Provide the driver instance.
 * @param locatorOrElement  Provide the selector or the WebElement.
 * @param attributeName     Provide the name of the attribute.
 * @param expectedValue     Optional. Provide the expected value of the attribute.
 * @returns                 The value of the attribute.
 * @usage                   await getAttribute({WebDriver}, {string | WebElement}, {string}, {string})
 * @example                 await getAttribute(driver, '.button', 'href', 'submit')
 *                          await getAttribute(driver, '.button', 'href')
 */
export default async function getAttribute(driver: WebDriver, locatorOrElement: string | WebElement, attributeName: string, expectedValue?: string) {
  try {
    // Print the message in the console and add it to the report.
    dslMessages(`+ ${currentFileName}:: GET ATTRIBUTE on element with selector '${locatorOrElement}'. Attribute: '${attributeName}'. Expected value: '${expectedValue}'`);
    // Locate the element.
    const element = await selector(driver, locatorOrElement);
    // Get the attribute value.
    const attributeValue = await element.getAttribute(attributeName);
    // Print the message in the console and add it to the report.
    dslMessages(`   > ${currentFileName}:: the element contains attribute '${attributeName}' with value: '${attributeValue}'`);
    // If the expectedValue is provided.
    if (expectedValue) {
      // Check if the attributeValue is the same as the expectedValue.
      expect(attributeValue).toBe(expectedValue);
      // Print the message in the console and add it to the report.
      dslMessages(`- ${currentFileName}:: The element ATTRIBUTE value is correct!`);
    }
    // Return the attributeValue.
    return attributeValue;
  } catch (error) {
    // Throw an error.
    throw new Error(`Error in getAttribute: ${error}`);
  }
}

