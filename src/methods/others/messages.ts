/**
 * @fileoverview               This file contains the methods for printing the messages in the console and in the log file.
 */

// Import the fs and path module.
import * as fs from 'fs';
// Import the path module.
import * as path from 'path';
// Import the debug config.
import { debug } from '../../config/config'

// Create the log file path.
const logFilePath = createLogFolder();

/**
 * @description               This method will create the log folder and the log file.
 * @returns                   The log file path.
 * @usage & @example          await createLogFolder()
 */
function createLogFolder(): string {
  try {
    // Get the root path.
    const rootPath = process.cwd();
    // Get the current date.
    const currentDate = new Date();
    // Create the log folder name.
    const logFolderName = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;
    // Create the log folder path.
    const logFolderPath = path.join(rootPath, 'log');
    // If the log folder does not exist.
    if (!fs.existsSync(logFolderPath)) {
      // Create the log folder.
      fs.mkdirSync(logFolderPath, { recursive: true });
    }
    // Create the log file path.
    const folderPath = path.join(logFolderPath, logFolderName);
    // If the log file does not exist.
    if (!fs.existsSync(folderPath)) {
      // Create the log file.
      fs.mkdirSync(folderPath, { recursive: true });
    }
    // Return the log file path.
    return path.join(folderPath, 'log.txt');
  } catch (error) {
    // Throw an error.
    throw new Error(`Error while creating log folder: ${error}`);
  }
}

/**
 * @description                 This method will append the message to the log file.
 * @param message               Provide the message.
 * @usage                       await appendToLogFile({string})
 * @example                     await appendToLogFile('Hello World!')
 */
function appendToLogFile(message: string) {
  try {
    // Append the message to the log file.
    fs.appendFileSync(logFilePath, message + '\n', { encoding: 'utf-8' });
  } catch (error) {
    // Throw an error.
    throw new Error(`Error while appending to log file: ${error}`);
  }
}

/**
 * @description               This method will print the message in the console and in the log file.
 * @param message             Provide the message.
 * @param artist              Provide the artist.
 * @param recordLog           Optional. Provide if the message should be recorded in the log file.
 * @usage                     await songDurationMessage({string}, {string}, {boolean})
 * @example                   await songDurationMessage('Hello World!', 'Artist', true)
 */
export function songDurationMessage(message: string, artist: string, recordLog?: boolean) {
  try {
    // If the songDurationMessageToggle is true.
    if (debug.songDurationMessageToggle) {
      // Create the formatted message.
      const formattedMessage = `Song Duration ${message} Artist: ${artist}`;
      // Print the message in the console.
      console.log(formattedMessage);
      // If the recordLog is true (including undefined and null).
      if (recordLog === undefined || recordLog === null || recordLog === true) {
        // Append the message to the log file.
        appendToLogFile(formattedMessage);
      }
    }
  } catch (error) {
    // Throw an error.
    throw new Error(`Error while appending to log file: ${error}`);
  }
}

/**
 * @description             This method will print the message in the console and in the log file.
 * @param message           Provide the message.
 * @usage                   await errorMessage({string})
 * @example                 await errorMessage('Hello World!')
 */
export function debugMessage(message: string) {
  try {
    // If the debugMessageToggle is true.
    if (debug.debugMessageToggle) {
      // Create the formatted message.
      const formattedMessage = `DEBUG     ${message}`;
      // Print the message in the console.
      console.log(formattedMessage);
      // Append the message to the log file.
      appendToLogFile(formattedMessage);
    }
  } catch (error) {
    // Throw an error.
    throw new Error(`Error while appending to log file: ${error}`);
  }
}

/**
 * @description             This method will print the message in the console and in the log file.
 * @param message           Provide the message.
 * @usage                   await errorMessage({string})
 * @example                 await errorMessage('Hello World!')
 */
export function testCaseMessage(message: string) {
  try {
    // If the testCaseMessageToggle is true.
    if (debug.testCaseMessageToggle) {
      // Create the formatted message.
      const formattedMessage = `Step      ${message}`;
      // Print the message in the console.
      console.log(formattedMessage);
      // Append the message to the log file.
      appendToLogFile(formattedMessage);
    }
  } catch (error) {
    // Throw an error.
    throw new Error(`Error while appending to log file: ${error}`);
  }
}

/**
 * @description           This method will print the message in the console and in the log file.
 * @param message         Provide the message.
 * @usage                 await errorMessage({string})
 * @example               await errorMessage('Hello World!')
 */
export function dslMessages(message: string) {
  try {
    // If the dslMessagesToggle is true.
    if (debug.dslMessagesToggle) {
      // Create the formatted message.
      const formattedMessage = `DSL       ${message}`;
      // Print the message in the console.
      console.log(formattedMessage);
      // Append the message to the log file.
      appendToLogFile(formattedMessage);
    }
  } catch (error) {
    // Throw an error.
    throw new Error(`Error while appending to log file: ${error}`);
  }
}

/**
 * @description             This method will print the message in the console and in the log file.
 * @param message           Provide the message.
 * @usage                   await errorMessage({string})
 * @example                 await errorMessage('Hello World!')
 */
export function assertMessages(message: string) {
  try {
    // If the assertMessagesToggle is true.
    if (debug.assertMessagesToggle) {
      // Create the formatted message.
      const formattedMessage = `ASSERT       ${message}`;
      // Print the message in the console.
      console.log(formattedMessage);
      // Append the message to the log file.
      appendToLogFile(formattedMessage);
    }
  } catch (error) {
    // Throw an error.
    throw new Error(`Error while appending to log file: ${error}`);
  }
}

/**
 * @description             This method will print the message in the console and in the log file.
 * @param message           Provide the message.
 * @usage                   await errorMessage({string})
 * @example                 await errorMessage('Hello World!')
 */
export function otherMessages(message: string) {
  try {
    // If the otherMessagesToggle is true.
    if (debug.othersMesageToggle) {
      // Create the formatted message.
      const formattedMessage = `Others    ${message}`;
      // Print the message in the console.
      console.log(formattedMessage);
      // Append the message to the log file.
      appendToLogFile(formattedMessage);
    }
  } catch (error) {
    // Throw an error.
    throw new Error(`Error while appending to log file: ${error}`);
  }
}

/**
 * @description             This method will print the message in the console and in the log file.
 * @param message           Provide the message.
 * @usage                   await errorMessage({string})
 * @example                 await errorMessage('Hello World!')
 */
export function pomMessages(message: string) {
  try {
    // If the pomMessagesToggle is true.
    if (debug.pomMessagesToggle) {
      // Create the formatted message.
      const formattedMessage = `POM       ${message}`;
      // Print the message in the console.
      console.log(formattedMessage);
      // Append the message to the log file.
      appendToLogFile(formattedMessage);
    }
  } catch (error) {
    // Throw an error.
    throw new Error(`Error while appending to log file: ${error}`);
  }
}
