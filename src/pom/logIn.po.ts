/**
 * @fileoverview               This file contains POM methods related to the Login page.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the navigateTo method.
import navigateTo from '../methods/dsl/navigateTo'
// Import the sendKeys method.
import sendKeys from '../methods/dsl/sendKeys'
// Import the click method.
import click from '../methods/dsl/click'
// Import the selector method.
import selector from '../methods/dsl/element'
// Import the randomWait method.
import { randomWait } from '../methods/others/randomWait'
// Import the pomMessages messages.
import { pomMessages } from '../methods/others/messages'
// Import the verifyPartialUrl method.
import { verifyPartialUrl } from '../methods/assertion/verifyUrl'
// Import the getRandomBoolean method.
import { getRandomBoolean } from '../methods/others/randomDecisions'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

// Define the locators.
const username_inputTextElement = '#login-username'
const password_inputTextElement = '#login-password'
const rememberMe_checkboxElement = '//*[@*="login-remember"]/parent::label'
const login_buttonElement = '#login-button'
const accept_cookies_buttonElement = '#onetrust-accept-btn-handler'

// Create a class for the Login page.
class Login {

  /**
   * @description                   This method will log in.
   * @param driver                  Provide the driver instance.
   * @param url                     Provide the URL.
   * @param username                Provide the username.
   * @param password                Provide the password.
   * @param expectedUrlAfterLogin   Provide the expected URL after login.
   */
  async logIn(driver: WebDriver, url: string, username: string, password: string, expectedUrlAfterLogin: string) {
    try {
      // Print the message in the console and add it to the report.
      pomMessages(`+ ${currentFileName}:: LOG IN.`)
      // Navigate to the URL.
      await navigateTo(driver, url)
      // Print the message in the console and add it to the report.
      pomMessages(`   > ${currentFileName}:: The URL '${url}' is opened.`)
      // Wait for a period of time.
      await randomWait(3000, 8000)
      // Send the username and password to the input text elements.
      await sendKeys(driver, username_inputTextElement, username)
      // Print the message in the console and add it to the report.
      pomMessages(`   > ${currentFileName}:: The username '${username}' text is sent to the element.`)
      // Wait for a period of time.
      await randomWait(7000, 12000)
      // Send the username and password to the input text elements.
      await sendKeys(driver, password_inputTextElement, password)
      // Print the message in the console and add it to the report.
      pomMessages(`   > ${currentFileName}:: The password '${password}' text is sent to the element.`)
      // Wait for a period of time.
      const decision_dontRememberMe = getRandomBoolean(50)
      // If the 'Remember me' checkbox is checked.
      if (decision_dontRememberMe) {
        // Print the message in the console and add it to the report.
        pomMessages(`   > ${currentFileName}:: The 'Remember me' checkbox is checked.`)
        // Click on the 'Remember me' checkbox.
        await click(driver, rememberMe_checkboxElement)
      }
      // If the 'Remember me' checkbox is NOT checked.
      else {
        // Print the message in the console and add it to the report.
        pomMessages(`   > ${currentFileName}:: The 'Remember me' checkbox is NOT checked.`)
      }
      // Wait for a period of time.
      await randomWait(600, 1200)
      // Click on the 'Log in' button.
      await click(driver, login_buttonElement)
      // Print the message in the console and add it to the report.
      pomMessages(`   > ${currentFileName}:: The 'Log in' button is clicked.`)
      // Wait for a period of time.
      await selector(driver, accept_cookies_buttonElement)
      // Click on the 'Accept Cookies' button.
     // await verifyPartialUrl(driver, expectedUrlAfterLogin)
      // Print the message in the console and add it to the report.
      pomMessages(`- ${currentFileName}:: Successfully LOGGED IN.`)
      // Wait for a period of time.
      await randomWait(7000, 12000)
    } catch (error) {
      // Throw an error.
      throw new Error(`Error in logIn: ${error}`)
    }
  }
}

// Export the Login class.
export default Login