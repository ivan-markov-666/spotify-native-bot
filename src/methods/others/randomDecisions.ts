/**
 * @fileoverview               This file contains the methods for random decisions.
 */

// Import the otherMessages method.
import { otherMessages } from './messages';

/**
 * @description                 Get a random number between min and max.
 * @param min                   Provide the minimum number.
 * @param max                   Provide the maximum number.
 * @returns                     {number}
 * @usage                       getRandomNumberInRange({number}, {number})
 * @example                     getRandomNumberInRange(1, 10)
 */
export function getRandomNumberInRange(min: number, max: number): number {
    try {
        // Print the message in the console and add it to the report.
        otherMessages(`+ Get random number between ${min} and ${max}`)
        // Check if the minimum number is less than the maximum number.
        if (min < max) {
            // Generate a random number between min and max.
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            // Print the message in the console and add it to the report.
            otherMessages(`- The random number is ${randomNumber}`)
            // Return the random number.
            return randomNumber
        }
        // If the minimum number is greater than the maximum number, throw an error.
        else {
            // Throw an error.
            throw new Error('The minimum number cannot be greater than the maximum number!')
        }
    } catch (error) {
        // Throw an error. 
        throw new Error(`Error in getRandomNumberInRange: ${error}`)
    }
}

/**
 * @description                 Get a random boolean with a given percentage to be true.
 * @param percentage            Provide the percentage.
 * @returns                     {boolean}
 * @usage                       getRandomBoolean({number})
 * @example                     getRandomBoolean(50)
 */
export function getRandomBoolean(percentage: number): boolean {
    try {
        // Check if the percentage value is within the valid range.
        if (percentage < 0 || percentage > 100) {
            // Throw an error.
            throw new Error('Percentage must be between 0 and 100');
        }

        // Generate a random number between 0 and 100.
        const randomNumber = Math.random() * 100;

        // If the random number is less than the given percentage, return true; otherwise, return false.
        return randomNumber < percentage;
    } catch (error) {
        // Throw an error.
        throw new Error(`Error in getRandomBoolean: ${error}`)
    }
}

