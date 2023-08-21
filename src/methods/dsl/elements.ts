/**
 * @fileoverview                That file contains the method for getting list of elements.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the By, until and WebElement from selenium-webdriver.
import { By, until, WebElement } from 'selenium-webdriver'
// Import the recognizeSelectorType method.
import { recognizeSelectorType } from './element'
// Import the config file.
import { config } from '../../config/config'
// Import the DSL messages.
import { dslMessages } from '../../methods/others/messages'
// Import the path module.
import path from 'path';


// Define the SelectorType type.
type SelectorType = 'css' | 'xpath'

// Define the TIMEOUT constant.
const TIMEOUT = config.globalTimeOut
// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

/**
 * @description          This method will return the list of elements.
 * @param driver         Provide the Web Driver instance.
 * @param selector       Provide the selector of the element.
 * @returns              The list of elements.
 * @usage                await getElements({WebDriver}, {string})
 * @example              await getElements(driver, '.button')
 *                       await getElements(driver, '//button')
 */
export default async function getElements(driver: WebDriver, selector: string): Promise<WebElement[]> {
  try {
    // Print the message in the console and add it to the report.
    dslMessages(`+ ${currentFileName}:: ELEMENTS with selector '${selector}' are being searched`)
    // Define the elements.
    let elements: WebElement[]
    // Get the selector type.
    let selectorType = recognizeSelectorType(selector)
    // Check the selector type.
    if (selectorType === 'css') {
      // Wait until the element is located.
      elements = await driver.wait(until.elementsLocated(By.css(selector)), TIMEOUT)
      // Print the message in the console and add it to the report.
      dslMessages(`   > ${currentFileName}:: Found ${elements.length} elements with selector '${selector}'`)
    }
    // Check the selector type.
    else if (selectorType === 'xpath') {
      // Wait until the element is located.
      elements = await driver.wait(until.elementsLocated(By.xpath(selector)), TIMEOUT)
      // Print the message in the console and add it to the report.
      dslMessages(`   > ${currentFileName}:: Found ${elements.length} elements with selector '${selector}'`)
    } else {
      // Throw an error.
      throw new Error('Unknown selector type!')
    }
    // Print the message in the console and add it to the report.
    dslMessages(`- ${currentFileName}:: Found ${elements.length} ELEMENTS with selector '${selector}'`)
    // Return the elements.
    return elements
  } catch (error) {
    // Throw an error.
    throw new Error(`Error in getElements: ${error}`)
  }
}