/**
 * @fileoverview               This file contains POM methods related to the ChromeDriver version.
 */

// Import the chromeDriverVersion method.
import chromeDriverVersion from '../methods/others/debug'
// Import the debugMessage method.
import { debugMessage } from '../methods/others/messages'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

// Create a class for the ChromeDriver version.
class ChromeDriverVersion {

/**
 * @description                 This method will print the ChromeDriver version in the console.
 * @usage & @example            await chromeDriverVersion()
 */
  async chromeDriverVersion() {
    try {
      // Print the message in the console and add it to the report.
      debugMessage(`+ ${currentFileName}:: DEBUG MESSAGE.`)
      // Print the ChromeDriver version in the console.
      debugMessage(`- ${currentFileName}:: CHROME driver version: ` + await chromeDriverVersion());
    }
    catch (error) {
      // Throw an error.
      throw new Error(`Error in chromeDriverVersion: ${error}`)
    }
  }
}

// Export the ChromeDriverVersion class.
export default ChromeDriverVersion