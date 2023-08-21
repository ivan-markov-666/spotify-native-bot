/**
 * @fileoverview            That file contains the WebDriver configuration.
 */

// Import the WebDriver and the Builder from selenium-webdriver.
import { Builder, WebDriver } from "selenium-webdriver";
// Import the ChromeOptions and the ChromeServiceBuilder from selenium-webdriver/chrome.
import {
  Options as ChromeOptions,
  ServiceBuilder as ChromeServiceBuilder,
} from 'selenium-webdriver/chrome'
// Import the path module.
import * as path from 'path'

/**
 * @description              Create a WebDriver instance.
 * @returns                  A WebDriver instance.
 * @usage and @example       await createDriver().
 */
export const createDriver = async (): Promise<WebDriver> => {
  // Added the ChromeOptions and ChromeServiceBuilder. That will allow us to use Chrome.
  const chromeOptions = new ChromeOptions()
  // Added the ChromeDriver path. We are using the ChromeDriver that is installed with the package. That is very useful because the ChromeDriver is updated automatically with the package.
  const chromeDriverPath = path.join(
    __dirname,
    '../../node_modules/chromedriver/lib/chromedriver/chromedriver',
  )
  // Create the ChromeServiceBuilder and provide the ChromeDriver path to it.
  const chromeServiceBuilder = new ChromeServiceBuilder(chromeDriverPath)
  // Return the WebDriver instance with the ChromeOptions and ChromeServiceBuilder.
  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .setChromeService(chromeServiceBuilder)
    .build()
};
