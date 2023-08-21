/**
 * @fileoverview               This file contains all the functions which are related to the hover and click action.
 */

// Import the WebDriver, WebElement, By and until from selenium-webdriver.
import { WebDriver, By, until, WebElement } from "selenium-webdriver";
// Import the DSL messages.
import getAttribute from './getAttribute'
// Import the DSL messages.
import { dslMessages } from '../others/messages'
// Import the config.
import { config } from '../../config/config'
// Import the verifySongName.
import { verifySongName } from '../assertion/verifySongName'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

/**
 * @description               This method will hover and click on the element.
 * @param driver              Provide the driver instance.
 * @param locatorOrElement    Provide the selector or the WebElement.
 * @param expectedNames       Provide the expected names.
 * @param iterationCount      Provide the iteration count used for song name.
 * @param attributeName       Optional. Provide the attribute name.
 * @param expectedValue       Optional. Provide the expected value of the attribute.
 * @usage                     hoverAndClick({WebDriver}, {string | WebElement}, {string[]}, {number}, {string}, {string})
 * @example                   hoverAndClick(driver, 'div', ['song1', 'song2'], 1, 'class', 'song')
 */
export default async function hoverAndClick(driver: WebDriver, locatorOrElement: string | WebElement, expectedNames: string[], iterationCount: number, attributeName?: string, expectedValue?: string): Promise<boolean> {
  try {
    // Print the message in the console and add it to the report.
    dslMessages(`+ ${currentFileName}:: HOVER and CLICK on element with selector '${JSON.stringify(locatorOrElement)}'. Attribute: '${attributeName}'. Expected value: '${expectedValue}'`);
    // Set the timeout.
    const TIMEOUT = config.globalTimeOut;

    // Get the element.
    let element: WebElement;
    // If the locatorOrElement is a WebElement.
    if (typeof locatorOrElement !== 'string') {
      // Get the element.
      element = locatorOrElement as WebElement;
    }
    // If the locatorOrElement is a selector.
    else {
      // Get the element.
      const locator = locatorOrElement as string;
      // Get the element.
      element = await driver.findElement(By.css(locator));
      // !!! ALERT. Maybe the method should be changed to use XPATH method too.
    }
    dslMessages(`   > ${currentFileName}:: Get the song name.`)
    // Define the locator for the song name. The locator is in the loop because we want to the song name related to the current song iteration.
    const actualSongNamesText = `(//a/div[@data-encore-id="type"])[${iterationCount}]`;
    // Verify that the song name is not in the black list.
    const isSongNameExistInTheBlackList = await verifySongName(driver, actualSongNamesText, expectedNames);
    // If the song name is not in the black list...
    if (!isSongNameExistInTheBlackList) {
      // Print the message in the console and add it to the report.
      dslMessages(`   > ${currentFileName}:: The song name is NOT in the black list.`)
      // Hover on the element.
      await driver.actions().move({ origin: element }).perform();
      // Print the message in the console and add it to the report.
      dslMessages(`   > ${currentFileName}:: Hovered on element '${JSON.stringify(element)}'`);

      // Check if the attribute is provided.
      if (attributeName) {
        // Get the attribute value.
        const attributeValue = await getAttribute(driver, element, attributeName);
        // Check if the attribute value is the same as the expectedValue.
        if (expectedValue && attributeValue !== expectedValue) {
          // Throw the error.
          throw new Error(`Expected attribute '${attributeName}' to have value '${expectedValue}' but it had value '${attributeValue}'`);
        }
        // Print the message in the console and add it to the report.
        dslMessages(`   > ${currentFileName}:: The actual attribute value is correct!`);
      }
      // Wait until the element is visible.
      await driver.wait(until.elementIsVisible(element), TIMEOUT);
      // Click on the element.
      await element.click();
      // Print the message in the console and add it to the report.
      dslMessages(`- ${currentFileName}:: HOVERED nad CLICKED on element '${JSON.stringify(locatorOrElement)}'`);
      return true;
    }
    // If the song name is in the black list...
    else {
      // Print the message in the console and add it to the report.
      dslMessages(`   > ${currentFileName}:: The song name is in the black list. The`)
      return false;
    }
  }
  catch (error) {
    // Print the message in the console and add it to the report.
    throw new Error(`Error in hoverAndClick: ${error}`);
  }
}