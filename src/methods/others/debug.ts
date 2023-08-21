/**
 * @fileoverview               This file contains the method for printing the ChromeDriver version.
 */

// Import the debugMessage method.
import { debugMessage } from './messages'

/**
 * @description               This method will print the ChromeDriver version.
 * @returns                   The ChromeDriver version.
 * @usage & @example          await printChromeDriverVersion()
 */
export default async function printChromeDriverVersion() {
        try {
                // Get the ChromeDriver version.
                const response = require('chromedriver').version;
                // Print the message in the console and add it to the report.
                debugMessage(`   > ChromeDriver version: ${response}`);
                // Return the ChromeDriver version.
                return response;
        } catch (error) {
                // Throw an error.
                throw new Error(`Error in printChromeDriverVersion: ${error}`);
        }
}
