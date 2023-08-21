##
## That script is used to wait for a specified number of seconds before continuing the execution of the script.
##

<#
.SYNOPSIS
Static Wait function
.DESCRIPTION
This function is used to wait for a specified number of seconds before continuing the execution of the script.
.PARAMETER Seconds
Please provide the number of seconds to wait.
.EXAMPLE
Set-Wait -Seconds 2
#>
function Set-Wait {
    # Validate the input parameters.
    param (
        # The parameter is mandatory.
        [Parameter(Mandatory = $true)]
        # The number of seconds to wait.
        [int]$Seconds
    )
    
    # Wait for the specified number of seconds.
    Start-Sleep -Seconds $Seconds
    # Print the number of seconds that have passed.
    Write-Host $Seconds " seconds have passed."
}