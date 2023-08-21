/**
 * @fileoverview               This file contains POM methods related to the static wait. This is used for debugging purposes.
 */

// Import the pomMessages messages.
import { pomMessages } from '../methods/others/messages'
// Import the path module.
import path from 'path';

// Get the current file name.
const currentFileName = path.basename(__filename, '.ts');

// Create a class for the static wait.
class StaticWait {
/**
 * @description               This method will wait for a period of time.
 * @param waitTime            Provide the wait time in milliseconds.
 * @usage                     await staticWait({number})
 * @example                   await staticWait(5000)
 */
  async staticWait(waitTime: number) {
    try {
      // Print the message in the console and add it to the report.
      pomMessages(`+ ${currentFileName}:: WAIT for ${waitTime} milliseconds`)
      // Wait for a period of time.
      await new Promise((resolve) => setTimeout(resolve, waitTime))
      // Print the message in the console and add it to the report.
      pomMessages(`- ${currentFileName}:: Successfully WAITED for ${waitTime} milliseconds`)
    } catch (error) {
      // Throw an error.
      throw new Error(`Error in staticWait: ${error}`)
    }
  }
}

// Export the StaticWait class.
export default StaticWait