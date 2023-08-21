
/**
 * @fileoverview            That file contains the methods for verifying the song name. 
 */

// Import the WebDriver and WebElement from selenium-webdriver.
import { WebDriver, WebElement } from "selenium-webdriver";
// Import the getText method.
import getText from "../dsl/getText";
// Import the Assert messages.
import { assertMessages } from '../../methods/others/messages'


/**
 * @description                 This method will verify the song name.
 * @param driver                Provide the driver instance.
 * @param selectorOrElement     Provide the selector or element.
 * @param expectedResults       Provide the expected results.
 * @returns                     The boolean value.
 * @usage                       await verifySongName({WebDriver}, {string | WebElement}, {string[]})
 * @example                     await verifySongName(driver, songNames, ['All Eyes On Me', 'Changes', 'Song Name 3'])
 */
export async function verifySongName(
    driver: WebDriver,
    selectorOrElement: string | WebElement,
    expectedResults: string[]
): Promise<boolean> {
    // Get the text from the element.
    const actualResult = await getText(driver, selectorOrElement);
    // Print the message in the console and add it to the report.
    assertMessages(`   > The song name is: ${actualResult}`)
    // Verify the actual result with the expected result and return the result of the verification (true or false).
    return expectedResults.includes(actualResult);
}
