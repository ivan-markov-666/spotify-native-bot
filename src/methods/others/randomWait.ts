/**
 * @fileoverview               This file contains the methods for random wait.
 */

// Import the config.
import { config } from '../../config/config';
// Import the getRandomNumberInRange method.
import { getRandomNumberInRange } from './randomDecisions';
// Import the otherMessages method.
import { otherMessages } from './messages';

/**
 * @description                 This method will wait for a random time between min and max.
 * @param min                   Provide the minimum time.
 * @param max                   Provide the maximum time.
 * @usage                       await randomWait({number}, {number})
 * @example                     await randomWait(1000, 5000)
 */
export async function randomWait(min: number, max: number): Promise<void> {
    try {
        // Print the message in the console and add it to the report.
        otherMessages(`+ Wait for random time between ${min} and ${max}`)
        // Check if the minimum time is less than the maximum time.
        if (config.waitToggle) {
            // Wait for a random time between min and max.
            if (min < max) {
                // Generate a random number between min and max.
                const waitTime = Math.floor(Math.random() * (max - min + 1)) + min;
                // Wait for a random time.
                await new Promise((resolve) => setTimeout(resolve, waitTime));
                // Print the message in the console and add it to the report.
                otherMessages(`- Successfully waited for ${waitTime} milliseconds`)
            }
            else {
                // Throw an error.
                throw new Error('The minimum time cannot be greater than the maximum time!')
            }
        }
    } catch (error) {
        // Throw an error.
        throw new Error(`Error in randomWait: ${error}`)
    }
}

/**
 * @description                 This method will convert the duration of the song from text to milliseconds.
 * @param duration              Provide the duration of the song in text. Example of correct duration of time: "5:03".
 * @returns                     The duration of the song in milliseconds.
 * @usage                       await textToDurationconvertDurationToMilliseconds({string})
 * @example                     await textToDurationconvertDurationToMilliseconds('5:03')
 */
export async function convertDurationToMilliseconds(duration: string): Promise<number> {
    try {
        otherMessages(`+ Convert duration of the song from text to milliseconds`)
        const [minutes, seconds] = duration.split(':').map(Number);
        const totalMilliseconds = (minutes * 60 + seconds) * 1000;
        otherMessages(`- The duration of the song in milliseconds is ${totalMilliseconds}`)
        return totalMilliseconds;
    } catch (error) {
        throw new Error(`Error in convertDurationToMilliseconds: ${error}`)
    }
}

/**
 * @important               Spotify stream is equal to 30 Seconds. 
 * @description             This method will return the duration of the song in milliseconds that should be played. The method will take a random decision based on the duration of the song.
 *                          - If the duration of the song is less than 31 seconds, the whole song will be played.
 *                          - Otherwise, the method will take a decision for a random time between 31 seconds and 160 seconds.
 * @param duration          Provide the duration of the song in milliseconds.
 * @returns                 The duration of the song in milliseconds that should be played.
 * @usage                   waitSongListeningTime({number})
 * @example                 waitSongListeningTime(31000)
 */
export function waitSongListeningTime(duration: number): number {
    try {
        otherMessages(`+ Make a decision for the duration of the song that should be played`)
        if (duration <= 31000) {
            otherMessages(`- The duration of the song that should be played is ${duration}`)
            return duration;
        }
        else {
            duration = getRandomNumberInRange(35000, 160000);
            otherMessages(`- The duration of the song that should be played is ${duration}`)
            return duration;
        }
    } catch (error) {
        throw new Error(`Error in waitSongListeningTime: ${error}`)
    }
}

/**
 * @description             This method will wait for a static time.
 * @param duration          Provide the duration of the time in milliseconds.
 * @usage                   await staticWait({number})
 * @example                 await staticWait(1000)
 */
export async function staticWait(duration: number): Promise<void> {
    try {
        if (config.waitToggle) {
            otherMessages(`+ Wait for ${duration} milliseconds`)
            await new Promise((resolve) => setTimeout(resolve, duration));
            otherMessages(`- Successfully waited for ${duration} milliseconds`)
        }
    } catch (error) {
        throw new Error(`Error in staticWait: ${error}`)
    }
}
