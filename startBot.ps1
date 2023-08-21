##
## That file is used to start the bot and execute the tests.
##

# Execute the tsc command to compile the config.ts file.
Invoke-Expression "tsc .\src\config\config.ts"
# Execute the extractConfig.js file.
Invoke-Expression "node .\src\config\extractConfig.js"

# Import the vpn.ps1 file.
. .\src\vpn\vpn.ps1
# Import the stopVpnConnection.ps1 file.
. .\src\vpn\methods\stopVpnConnection.ps1
# Import the staticWait.ps1 file.
. .\src\vpn\methods\staticWait.ps1

# Get the root folder.
$rootFolder = $PSScriptRoot
# Get the config data.
$configData = Get-Content -Path ".\src\config\config.json" | ConvertFrom-Json
# Provide the path to the OpenVPN executable file.
$openvpnPath = $configData.openVpnPath
# Provide the path to the base auth directory.
$baseAuthDir = $configData.authPath
# Get the useVpn value.
$useVpn = $configData.vpn

# Get all the directories inside the base auth directory that contain auth.txt and .ovpn file.
$directories = Get-ChildItem -Path $baseAuthDir -Directory

# Make a loop through all the directories and execute the tests for each user in the directory if the user has auth.txt and .ovpn file in the directory.
foreach ($dir in $directories) {
    # Get the credentials file.
    $credentialsFile = Join-Path $dir.FullName "credentials.json"
    # Check if the vpn usage is allowed. If not the tests will be executed without VPN connection.
    if ($useVpn) {
        # Get the auth file.
        $authFile = Join-Path $dir.FullName "auth.txt"
        # Assuming that there's only one .ovpn file per directory
        $ovpnFile = Get-ChildItem -Path $dir.FullName -Filter "*.ovpn" | Select-Object -First 1 | ForEach-Object { $_.FullName }
        # Check if the auth.txt and .ovpn file exist in the directory.
        if ((Test-Path $authFile) -and (Test-Path $ovpnFile)) {
            # Copy the credentials file to the root folder.
            Copy-Item -Path $credentialsFile -Destination $rootFolder -Force
            # Call the function with the parameters
            ExecuteVPNConnectionProcess -openvpnPath $openvpnPath -authFile $authFile -ovpnFile $ovpnFile
            # Print the current directory to the console.
            Write-Host "Running npm test for user in $dir..."
            # Execute the tests.
            Invoke-Expression "npm test"
            # Stop the VPN connection.
            Stop-OpenVPNProcesses
            # Set Static Wait
            Set-Wait -Seconds 5
        }
        # If the auth.txt or .ovpn file is missing in the directory, print a message to the console.
        else {
            # Print a message to the console.
            Write-Host "Either auth.txt or .ovpn file is missing in $dir. Skipping..."
        }
    }
    # If the vpn usage is not allowed, execute the tests without VPN connection.
    else {
        # Print the current directory to the console.
        Copy-Item -Path $credentialsFile -Destination $rootFolder -Force
        # Print the current directory to the console.
        Invoke-Expression "npm test"
    }
}
