##
## That script is used to start the VPN connection.
##

# Start the VPN connection.
$job = Start-Job -ScriptBlock {
    # Validate the input parameters.
    param($openvpnPath, $ovpnFile, $authFile)
    # Start the VPN connection.
    Start-Process -FilePath $openvpnPath -ArgumentList "--config `"$ovpnFile`" --auth-user-pass `"$authFile`"" -NoNewWindow
} -ArgumentList $openvpnPath, $ovpnFile, $authFile

# If you want to wait for the job to finish, you can uncomment the line below. For out case, we don't need to wait for the job to finish.
# Wait-Job -Job $job

<#
.SYNOPSIS
This function starts the VPN connection.
.DESCRIPTION
Starts the VPN connection.
.PARAMETER openvpnPath
The path to the OpenVPN executable file.
.PARAMETER authFile
The path to the auth file.
.PARAMETER ovpnFile
The path to the ovpn file.
.EXAMPLE
Start-VPNConnection -openvpnPath "C:\Program Files\OpenVPN\bin\openvpn.exe" -authFile "<parth-to-auth-file>\auth.txt" -ovpnFile "<path to ovpn file>\vpnbook-pl226-tcp80.ovpn"
#>
function Start-VPNConnection {
    # Validate the input parameters.
    param(
        [string]$openvpnPath,
        [string]$authFile,
        [string]$ovpnFile
    )

    # Start the VPN connection.
    $job = Start-Job -ScriptBlock {
        # Validate the input parameters.
        param($openvpnPath, $ovpnFile, $authFile)
        # Start the VPN connection.
        Start-Process -FilePath $openvpnPath -ArgumentList "--config `"$ovpnFile`" --auth-user-pass `"$authFile`"" -NoNewWindow
    } -ArgumentList $openvpnPath, $ovpnFile, $authFile

    # If you want to wait for the job to finish, you can uncomment the line below. For out case, we don't need to wait for the job to finish.
    # Wait-Job -Job $job

    # Return the job.
    return $job
}