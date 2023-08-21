##
## That script is used to get the current IP address.
##

<#
.SYNOPSIS
Get the current IP address.
.DESCRIPTION
This function is used to get the current IP address.
.EXAMPLE
$currentIP = Get-CurrentIPAddress
if ($currentIP) {
    Write-Host "Current IP address: $currentIP"
}
#>
function Get-CurrentIPAddress {
    try {
        # Get the current IP address.
        $currentIp = node .\src\vpn\methods\getIp.js
        # Print the current IP address.
        Write-Host "My current IP is: $currentIp"
        # Return the current IP address.
        return $currentIp
    }
    catch {
        # Print the error message.
        Write-Host "ERROR while getting the current IP address: $_"
        # Return null.
        return $null
    }
}
