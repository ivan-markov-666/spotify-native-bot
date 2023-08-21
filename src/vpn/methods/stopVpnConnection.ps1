##
## That script is used to stop the VPN connection.
##

<#
.SYNOPSIS
Stops all instances of OpenVPN processes.
.DESCRIPTION
Searches for and terminates all running instances of OpenVPN processes.
.EXAMPLE
Stop-OpenVPNProcesses
#>
function Stop-OpenVPNProcesses {
    # Stop all instances of OpenVPN processes.
    Get-Process -Name openvpn -ErrorAction SilentlyContinue | Stop-Process -Force
}
## Stop all instances of OpenVPN processes.
Stop-OpenVPNProcesses
