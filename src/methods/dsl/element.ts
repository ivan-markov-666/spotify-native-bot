/**
 * @fileoverview                That file contains the DSL methods for the element.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the DSL messages.
import { dslMessages } from '../../methods/others/messages'
// Import the By, Until and WebElement from selenium-webdriver.
import { By, until, WebElement } from 'selenium-webdriver'
// Import the config.
import { config } from '../../config/config'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');
// Set the global timeout.
const TIMEOUT = config.globalTimeOut;

/**
 * @description                 This method will return the selector type.
 * @param selector              Provide the selector.
 * @returns                     Returns the selector type.
 * @usage                       await recognizeSelectorType({string})
 * @example                     await recognizeSelectorType('//span/h1[@data-encore-id="type"]')
 *                              await recognizeSelectorType('.class')
 */
export function recognizeSelectorType(selector: string): 'xpath' | 'css' {
  try {
    // Check if the selector is xpath or css.
    const selectorType = selector.startsWith('//') || selector.startsWith('(//') ? 'xpath' : 'css';
    // Return the selector type.
    return selectorType;
  }
  catch (error) {
    // Throw an error.
    throw new Error(`Error in recognizeSelectorType: ${error}`)
  }
}

/**
 * @description                 This method will check if the element is exist.
 * @param driver                Provide the Web Driver instance.
 * @param selectorOrElement     Provide the selector or the element.
 * @returns                     Returns true if the element is exist.
 * @usage                       await isElementExist({WebDriver}, {string | WebElement})
 * @example                     await isElementExist(driver, '.button')
 * @example                     await isElementExist(driver, '//span/h1[@data-encore-id="type"]')
 * @example                     await isElementExist(driver, element)
 */
export async function isElementExist(driver: WebDriver, selectorOrElement: string | WebElement): Promise<boolean> {
  try {
    // Check if the selector is a WebElement.
    if (typeof selectorOrElement !== 'string') {
      // If the selector is a WebElement, check if the element is exist.
      const element = selectorOrElement as WebElement;
      try {
        // Wait until the element is visible.
        await driver.wait(until.elementIsVisible(element), TIMEOUT);
        // Return true.
        return true;
      } catch (error) {
        // Throw an error.
        throw new Error(`It seems that the element doesn't exist. Received error: ${error}`);
      }
    }

    // If the selector is a string, check if the element is exist.
    const selector = selectorOrElement as string;
    // Get the selector type.
    const selectorType = recognizeSelectorType(selector);
    try {
      // Check if the selector type is css.
      if (selectorType === 'css') {
        // Wait until the element is located.
        await driver.wait(until.elementLocated(By.css(selector)), TIMEOUT);
        // Return true.
        return true;
      }
      // Check if the selector type is xpath.
      else if (selectorType === 'xpath') {
        // Wait until the element is located.
        await driver.wait(until.elementLocated(By.xpath(selector)), TIMEOUT);
        // Return true.
        return true;
      } else {
        // Throw an error.
        throw new Error('Unknown selector type');
      }
    } catch (error) {
      // Throw an error.
      throw new Error(`It seems that the element doesn't exist. Received error: ${error}`);
    }
  }
  catch (error) {
    // Throw an error.
    throw new Error(`Error in isElementExist: ${error}`)
  }
}

/**
 * @description             This method will check if the element is visible.
 * @param driver            Provide the Web Driver instance.
 * @param selectorOrElement Provide the selector (string) or the element (WebElement).
 * @returns                 Returns true if the element is visible.
 * @usage                   await isElementVisible({WebDriver}, {string | WebElement})
 * @example                 await isElementVisible(driver, '.button')
 * @example                 await isElementVisible(driver, '//span/h1[@data-encore-id="type"]')
 */
export async function isElementVisible(driver: WebDriver, selectorOrElement: string | WebElement): Promise<boolean> {
  try {
    // Check if the selector is a WebElement.
    if (typeof selectorOrElement !== 'string') {
      // Get the selector as WebElement.
      const element = selectorOrElement as WebElement;
      try {
        // Wait until the element is displayed.
        const isDisplayed = await element.isDisplayed();
        // Return true if the element is displayed.
        return isDisplayed;
      } catch (error) {
        // Throw an error.
        throw new Error(`It seems that the element is not visible. Received error: ${error}`);
      }
    }

    // If the selector is a string, check if the element is visible.
    const selector = selectorOrElement as string;
    // Get the selector type.
    const selectorType = recognizeSelectorType(selector);
    try {
      // Check if the selector type is css.
      if (selectorType === 'css') {
        // Wait until the element is located.
        const element = await driver.wait(until.elementLocated(By.css(selector)), TIMEOUT);
        // Wait until the element is displayed.
        const isDisplayed = await element.isDisplayed();
        // Return true if the element is displayed.
        return isDisplayed;
      }
      // Check if the selector type is xpath.
      else if (selectorType === 'xpath') {
        // Wait until the element is located.
        const element = await driver.wait(until.elementLocated(By.xpath(selector)), TIMEOUT);
        // Wait until the element is displayed.
        const isDisplayed = await element.isDisplayed();
        // Return true if the element is displayed.
        return isDisplayed;
      } else {
        // Throw an error.
        throw new Error('Unknown selector type');
      }
    } catch (error) {
      // Throw an error.
      throw new Error(`It seems that the element is not visible. Received error: ${error}`);
    }
  } catch (error) {
    // Throw an error.
    throw new Error(`Error: ${error}`);
  }
}

/**
 * @description             This method will check if the element is enabled.
 * @param driver            Provide the Web Driver instance.
 * @param selectorOrElement Provide the selector (string) or the element (WebElement).
 * @returns                 Returns true if the element is enabled.
 * @usage                   await isElementEnabled({WebDriver}, {string | WebElement})
 * @example                 await isElementEnabled(driver, '.button')
 * @example                 await isElementEnabled(driver, '//span/h1[@data-encore-id="type"]')
 */
export async function isElementEnabled(driver: WebDriver, selectorOrElement: string | WebElement): Promise<boolean> {
  try {
    // Check if the selector is a WebElement.
    if (typeof selectorOrElement !== 'string') {
      // Get the selector as WebElement.
      const element = selectorOrElement as WebElement;
      try {
        // Wait until the element is enabled.
        const isEnabled = await element.isEnabled();
        // Return true if the element is enabled.
        return isEnabled;
      } catch (error) {
        // Throw an error.
        throw new Error(`It seems that the element is not enabled. Received error: ${error}`);
      }
    }

    // If the selector is a string, check if the element is enabled.
    const selector = selectorOrElement as string;
    // Get the selector type.
    const selectorType = recognizeSelectorType(selector);
    try {
      // Check if the selector type is css.
      if (selectorType === 'css') {
        // Wait until the element is located.
        const element = await driver.wait(until.elementLocated(By.css(selector)), TIMEOUT);
        // Wait until the element is enabled.
        const isEnabled = await element.isEnabled();
        // Return true if the element is enabled.
        return isEnabled;
      }
      // Check if the selector type is xpath.
      else if (selectorType === 'xpath') {
        // Wait until the element is located.
        const element = await driver.wait(until.elementLocated(By.xpath(selector)), TIMEOUT);
        // Wait until the element is enabled.
        const isEnabled = await element.isEnabled();
        // Return true if the element is enabled.
        return isEnabled;
      } else {
        // Throw an error.
        throw new Error('Unknown selector type');
      }
    } catch (error) {
      // Throw an error.
      throw new Error(`It seems that the element is not enabled. Received error: ${error}`);
    }
  } catch (error) {
    // Throw an error.
    throw new Error(`Error in isElementEnabled: ${error}`)
  }
}

/**
 * @description             This method will check if the element is only one in the DOM tree.
 * @param driver            Provide the Web Driver instance.
 * @param selectorOrElement Provide the selector (string) or the element (WebElement).
 * @returns                 Returns true if the element is unique.
 * @usage                   await isElementUnique({WebDriver}, {string | WebElement})
 * @example                 await isElementUnique(driver, '.button')
 * @example                 await isElementUnique(driver, '//span/h1[@data-encore-id="type"]')
 */
export async function isElementUnique(driver: WebDriver, selectorOrElement: string | WebElement): Promise<boolean> {
  try {
    // Check if the selector is a WebElement.
    if (typeof selectorOrElement !== 'string') {
      // Get the selector as WebElement.
      throw new Error('Unexpected argument type. Expected string selector.');
    }
    // If the selector is a string, check if the element is unique.
    const selector = selectorOrElement as string;
    // Get the selector type.
    const selectorType = recognizeSelectorType(selector);

    // Get the elements.
    let elements;
    // Check if the selector type is css.
    if (selectorType === 'css') {
      // Wait until the element is located.
      elements = await driver.findElements(By.css(selector)), TIMEOUT;
    }
    // Check if the selector type is xpath.
    else if (selectorType === 'xpath') {
      // Wait until the element is located.
      elements = await driver.findElements(By.xpath(selector)), TIMEOUT;
    } else {
      // Throw an error.
      throw new Error('Unknown selector type');
    }

    // Return true if the element is unique.
    return elements.length === 1;
  } catch (error) {
    // Throw an error.
    throw new Error(`Error in isElementUnique: ${error}`)
  }
}

/**
 * @description             This method will select an element.
 * @param driver            Provide the Web Driver instance.
 * @param selectorOrElement Provide the selector (string) or the element (WebElement).
 * @returns                 Returns the selected element.
 * @usage                   await selector({WebDriver}, {string | WebElement})
 * @example                 await selector(driver, '.button')
 * @example                 await selector(driver, '//span/h1[@data-encore-id="type"]')
 * @example                 await selector(driver, await driver.findElement(By.css('.button')))
 */
export default async function selector(driver: WebDriver, selectorOrElement: string | WebElement): Promise<WebElement> {
  try {
    // Print the message in the console and add it to the report.
    dslMessages(`+ ${currentFileName}:: ELEMENT: ${selectorOrElement}. You provide a ${typeof selectorOrElement} type.`);
    // Check if element exists in the DOM tree.
    const doesElementExist = await isElementExist(driver, selectorOrElement);
    // Make an assertion.
    expect(doesElementExist).toBe(true);
    // Print the message in the console and add it to the report.
    dslMessages(`   > ${currentFileName}:: exists in the DOM tree.`);

    // Check if element is unique.
    const doesElementUnique = await isElementUnique(driver, selectorOrElement);
    // Make an assertion.
    expect(doesElementUnique).toBe(true);
    // Print the message in the console and add it to the report.
    dslMessages(`   > ${currentFileName}:: is the only one in the DOM tree.`);

    // Check if element is visible.
    const doesElementVisible = await isElementVisible(driver, selectorOrElement);
    // Make an assertion.
    expect(doesElementVisible).toBe(true);
    // Print the message in the console and add it to the report.
    dslMessages(`   > ${currentFileName}:: is visible.`);

    // Check if element is enabled.
    const doesElementEnabled = await isElementEnabled(driver, selectorOrElement);
    // Make an assertion.
    expect(doesElementEnabled).toBe(true);
    // Print the message in the console and add it to the report.
    dslMessages(`   > ${currentFileName}:: is enabled.`);

    // Check if the selector is a WebElement.
    if (typeof selectorOrElement !== 'string') {
      // Return the selector as WebElement.
      return selectorOrElement as WebElement;
    }

    // If the selector is a string, get the element.
    const selector = selectorOrElement as string;
    // Get the selector type.
    const selectorType = recognizeSelectorType(selector);

    // Get the element.
    let element: WebElement;
    // Check if the selector type is css.
    if (selectorType === 'css') {
      // Wait until the element is located.
      element = await driver.wait(until.elementLocated(By.css(selector)), TIMEOUT);
      // Print the message in the console and add it to the report.
      dslMessages(`   > ${currentFileName}:: The locator is CSS.`);
    }
    // Check if the selector type is xpath.
    else if (selectorType === 'xpath') {
      // Wait until the element is located.
      element = await driver.wait(until.elementLocated(By.xpath(selector)), TIMEOUT);
      // Print the message in the console and add it to the report.
      dslMessages(`   > ${currentFileName}:: The locator is XPATH.`);
    } else {
      // Throw an error.
      throw new Error('Unknown selector type!');
    }
    // Print the message in the console and add it to the report.
    dslMessages(`- ${currentFileName}:: The following ELEMENT was found: ${JSON.stringify(element)}`);
    // Return the element.
    return element;
  }
  catch (error) {
    // Throw an error.
    throw new Error(`It seems that the element is not unique. Received error: ${error}`);
  }
}
