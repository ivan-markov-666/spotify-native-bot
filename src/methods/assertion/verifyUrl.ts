/**
 * @fileoverview            That file contains the methods for verifying the URL.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the Assert messages.
import { assertMessages } from '../../methods/others/messages'


/**
 * @description                 This method will verify current URL is EQUAL to expected URL.
 * @param expectedUrl           Provide the URL that you want to verify.
 * @returns                     The current URL.
 * @usage                       await verifyExactUrl({string})
 * @example                     await verifyExactUrl('https://accounts.spotify.com/en/login?continue=https%3A%2F%2Fwww.spotify.com%2F')
 */
export async function verifyExactUrl(driver: WebDriver, expectedUrl: string): Promise<String> {
    // Get the current URL.
    const currentUrl = await driver.getCurrentUrl();
    // Verify the current URL with the expected URL.
    expect(expectedUrl).toBe(currentUrl);
    // Return the current URL.
    return currentUrl;
}

/**
 * @description                 This method will verify the current URL CONTAINS the expected URL.
 * @param expectedUrl           Provide the URL that you want to verify.
 * @returns                     The current URL.
 * @usage                       await verifyPartialUrl({string})
 * @example                     await verifyPartialUrl('https://accounts.spotify.com/en/login?continue=https%3A%2F%2Fwww.spotify.com%2F')
 */
export async function verifyPartialUrl(driver: WebDriver, expectedUrl: string): Promise<String> {
    // Get the current URL.
    const currentUrl = await driver.getCurrentUrl();
    // Verify the current URL contains the expected URL.
    expect(expectedUrl).toContain(currentUrl);
    // Return the current URL.
    return currentUrl;
}
