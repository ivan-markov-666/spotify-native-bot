/**
 * @fileoverview               This file contains all the functions which are related to the scroll action.
 */

// Import the WebDriver and WebElement from selenium-webdriver.
import { WebDriver, WebElement } from "selenium-webdriver";
// Import the DSL messages.
import { dslMessages } from '../others/messages'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

/**
 * @description               This method will scroll to the element.
 * @param driver              Provide the driver instance.
 * @param element             Provide the WebElement.
 * @usage                     await scrollToElement({WebDriver}, {WebElement})
 * @example                   await scrollToElement(driver, '#element')
 */
export async function scrollToElement(driver: WebDriver, element: WebElement) {
  try {
    // Print the message in the console and add it to the report.
    dslMessages(`+ ${currentFileName}:: SCROLL to the element: '${JSON.stringify(element)}'`)
    // Scroll to the element.
    await driver.executeScript('arguments[0].scrollIntoView(true);', element)
    // Print the message in the console and add it to the report.
    dslMessages(`- ${currentFileName}:: Successfully SCROLLED to the element.`)
  } catch (error) {
    // Throw an error.
    throw new Error(`Error in scrollToElement: ${error}`)
  }
}