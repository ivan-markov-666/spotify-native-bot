/**
 * @fileoverview            This file contains the getIp method.  
 */

// Imports the https module.
const https = require('https');

// Catches unhandled exceptions and logs them.
process.on('uncaughtException', (error) => {
    // Save the error and throw it.
    console.error('Caught an unhandled exception:', error);
    // Exit the process.
    process.exit(1);
});

// Catches unhandled promise rejections and logs them.
https.get('https://api.ipify.org?format=json', (res) => {
    // Logs the status code.
    let data = '';
    // Logs the data.
    res.on('data', (chunk) => {
        // Logs the chunk.
        data += chunk;
    });

    // Logs the end of the response.
    res.on('end', () => {
        // Logs the data.
        const ipInfo = JSON.parse(data);
        // Logs the ip.
        console.log(ipInfo.ip);
    });
}).on('error', (err) => {
    // Throws an error.
    throw new Error("Error fetching IP: " + err.message);
});