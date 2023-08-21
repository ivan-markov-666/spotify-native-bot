##
## That is the main script that is used to start the VPN connection.
##

# Import the startVpnConnection.ps1 file.
. .\src\vpn\methods\startVpnConnection.ps1
# Import the approveVpnConnection.ps1 file.
. .\src\vpn\methods\approveVpnConnection.ps1
# Import the getCurrentIpAddress.ps1 file.
. .\src\vpn\methods\getCurrentIpAddress.ps1
# Import the assertions.ps1 file.
. .\src\vpn\methods\assertions.ps1
# Import the staticWait.ps1 file.
. .\src\vpn\methods\staticWait.ps1

function ExecuteVPNConnectionProcess {
    # Validate the input parameters.
    param(
        [string]$openvpnPath,
        [string]$authFile,
        [string]$ovpnFile
    )

    # Get the current IP address before starting the VPN connection
    $oldIpAddress = Get-CurrentIPAddress

    # Start the VPN connection
    $startedJob = Start-VPNConnection -openvpnPath $openvpnPath -authFile $authFile -ovpnFile $ovpnFile
    # Print the job object to the console.
    $startedJob | Format-List *

    # Validate that the VPN connection was successful
    Approve-VPNConnectionIsSuccessful -OldIpAddress $oldIpAddress
}

