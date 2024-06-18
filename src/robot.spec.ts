/**
 * @fileoverview               This file contains the main test case.
 */

// Import the WebDriver from selenium-webdriver.
import { WebDriver } from "selenium-webdriver";
// Import the credentials.
import credentials from "../credentials.json";
// Import the createDriver method.
import { createDriver } from "./config/driver";
// Import the Login page object model.
import Login from './pom/logIn.po'
// Import the AcceptCookies page object model.
import AcceptCookies from './pom/acceptCookies.po'
// Import the ArtistPage page object model.
import ArtistPage from './pom/artistPage.po'
// Import the ChromeDriverVersion page object model.
import ChromeDriverVersion from './pom/chromeDriverVersion.po'
// Import the SearchArtist page object model.
import SearchArtist from './pom/searchArtist.po'
// Import the playlist approach page object model.
import Playlist from './pom/playlist.po'
// Import the testCaseMessage method.
import { testCaseMessage } from './methods/others/messages'
// Import the PlayAllSongs page object model.
import PlayAllSongs from './pom/allSongs'
// Import the config.
import { config } from './config/config'

// Define the login url.
const loginUrl = `https://accounts.spotify.com/en/login?continue=https%3A%2F%2Fwww.spotify.com%2F`
// Define the expected url after login.
const expectedUrlAfterLogin = `https://open.spotify.com/?flow_ctx`
// Define the playlistName.
const playlistName = `My Playlist #1`

// Define the credential interface.
interface Credential {
  userName: string;
  password: string;
  artist: string[];
  mainArtist: string;
  blacklist: string[];
}

// Create a test suite.
describe(`Spotify Native Robot Simulator.`, () => {
  // Create a new instance of the page objects.
  let loginPom: Login = new Login()
  let chromeDriverVersionPom: ChromeDriverVersion = new ChromeDriverVersion()
  let acceptCookiesPom: AcceptCookies = new AcceptCookies()
  let searchArtistPom: SearchArtist = new SearchArtist()
  let artistPagePom: ArtistPage = new ArtistPage()
  let playAllSongsPom: PlayAllSongs = new PlayAllSongs()
  let playlistPom: Playlist = new Playlist()

  /**
   * @description         This method will listen to the artist.
   * @param driver        Provide the driver instance.
   * @param artist        Provide the artist name.
   * @param randomPercent Provide the random percent.
   * @param recordLog     Provide the record log.
   * @param expectedNames Provide the black list of the songs that are not allowed to be played.
   * @usage               await listenArtist({WebDriver}, {string}, {number}, {boolean})
   * @example             await listenArtist(driver, 'Eminem', 0.5, true)
   */
  async function listenArtist(driver: WebDriver, artist: string, randomPercent: number, recordLog: boolean, expectedNames: string[]): Promise<void> {
    // Print the message in the console and add it to the report.
    testCaseMessage(`+ Search for artist '${artist}'.`)
    // Search for artist and click on the artist name to go to the artist page.
    await searchArtistPom.searchArtist(driver, artist)
    // Print the message in the console and add it to the report.
    testCaseMessage(`- Successfully SEARCHED for artist '${artist}'.`)
    // Print the message in the console and add it to the report.
    testCaseMessage(`+ Go to artist page.`)
    // Verify that the correct artist page is displayed.
    await artistPagePom.verifyArtistPage(driver, artist)
    // Print the message in the console and add it to the report.
    testCaseMessage(`- Successfully VERIFIED if the correct artist page is displayed.`)
    // Print the message in the console and add it to the report.
    testCaseMessage(`+ Click on 'Show all' button, to show all the songs of the artist.`)
    // Click on the 'Show all' button, to show all the songs of the artist.
    await artistPagePom.clickShowAllButton(driver)
    // Print the message in the console and add it to the report.
    testCaseMessage(`- Successfully CLICKED on 'Show all' button, to show all the songs of the artist.`)
    // Print the message in the console and add it to the report.
    testCaseMessage(`+ Scroll to the bottom of the page.`)
    // Scroll to the bottom of the page.
    await playAllSongsPom.scrollToTheBottom(driver)
    // Print the message in the console and add it to the report.
    testCaseMessage(`- Successfully SCROLLED to the bottom of the page.`)
    // Print the message in the console and add it to the report.
    testCaseMessage(`+ Play all songs of the artist.`)
    // Play all songs of the artist.
    await playAllSongsPom.playAllSongs(driver, randomPercent, artist, recordLog, expectedNames)
    // Print the message in the console and add it to the report.
    testCaseMessage(`- Successfully PLAYED all songs of the artist.`)
  }

  async function listenPlaylist(driver: WebDriver, playlistName: string): Promise<void> {
    // Print the message in the console and add it to the report.
    testCaseMessage(`+ Click over playlist '${playlistName}'.`)
    // Click over playlist.
    await playlistPom.clickOverPlaylist(driver, playlistName)
  }

  // Loop through the credentials.
  credentials.forEach((credential: Credential, index: number) => {
    // Create a test case.
    it(`Spotify login process for user number ${index + 1}`, async () => {
      // Create a new instance of the driver.
      let driver = await createDriver();
      try {
        // Debug option to show current CHROME driver version in console.
        await chromeDriverVersionPom.chromeDriverVersion();
        // Print the message in the console and add it to the report.
        testCaseMessage(`+ Spotify login process.`)
        // Login to Spotify account.
        await loginPom.logIn(
          driver,
          loginUrl,
          credential.userName,
          credential.password,
          expectedUrlAfterLogin
        )
        // Print the message in the console and add it to the report.
        testCaseMessage(`- Successfully LOGGED IN.`)
        // Print the message in the console and add it to the report.
        testCaseMessage(`+ Accept cookies.`)
        // Accept cookies.
        await acceptCookiesPom.acceptCookies(driver)
        // Print the message in the console and add it to the report.
        testCaseMessage(`- Successfully ACCEPTED COOKIES.`)
        // Use 'artist' approach for listening tracks.
        if (config.listenTracks == "artist") {
          // Loop through the artists.
          for (let artist of credential.artist) {
            // If the artist is the main artist.
            if (credential.mainArtist === artist) {
              await listenArtist(driver, artist, config.randomPercentStremedArtist, true, credential.blacklist)
            }
            // If the artist is NOT the main artist.
            else {
              await listenArtist(driver, artist, config.randomPercentOtherArtist, false, credential.blacklist)
            }
          }
        }
        // Use 'playlist' approach for listening tracks.
        else if (config.listenTracks == "playlist") {
          await listenPlaylist(driver, playlistName)
        }
        // Throw an error if the value is not correct.
        else {
          throw new Error(`Error in listenTracks: You provided '${config.listenTracks}' value. But that value is not correct. Please check the value that you provided in config file.`)
        }
      }
      // When the test case is done.
      finally {
        // Quit the driver.
        await driver.quit();
      }
    },
      // Set the timeout.
      config.robotTimeOut);
  });
});
