##
## That script is used to validate that the VPN connection was successful.
##

# Import the assertions.ps1 file.
. .\src\vpn\methods\assertions.ps1
# Import the staticWait.ps1 file.
. .\src\vpn\methods\staticWait.ps1
# Import the getCurrentIpAddress.ps1 file.
. .\src\vpn\methods\getCurrentIpAddress.ps1

<#
.SYNOPSIS
Validate that the VPN connection was successful.
.DESCRIPTION
This function is used to validate that the VPN connection was successful.
.PARAMETER oldIpAddress
Please provide the old IP address.
.EXAMPLE
$oldIpAddress = "192.168.1.100"
Approve-VPNConnectionIsSuccessful -OldIpAddress $oldIpAddress
#>
function Approve-VPNConnectionIsSuccessful {
    # Validate the input parameters.
    param (
        # The parameter is mandatory.
        [Parameter(Mandatory = $true)]
        # The old IP address value is passed as a string parameter to the function.
        $OldIpAddress
    )

    # Validate that the old IP address is not empty.
    for ($i = 1; $i -le 30; $i++) {
        # Get the current IP address.
        $currenttIP = Get-CurrentIPAddress
        # Compare the old IP address with the current IP address.
        $result = Compare-Values-Are-Equal -Value1 $OldIpAddress -Value2 $currenttIP
        # Print the result.
        Write-Host "Is the IP address changed: $result"
        # Check if the result is true.  
        if ($result) {
            # Print the result.
            Write-Host "It seems that the VPN connection was successful."
            # Break the loop.
            break
        }
    # Set Static Wait
    Set-Wait -Seconds 2
    }
}