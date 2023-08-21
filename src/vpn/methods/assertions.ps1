##
## That script is used to assert values.
##

<#
.SYNOPSIS
Compare two values.
.DESCRIPTION
This function is used to compare two values.
.PARAMETER Value1
Please provide the value for Value1 parameter here.
.PARAMETER Value2
Please provide the value for Value2 parameter here.
.EXAMPLE
$value1 = 94.128.56.2
$value2 = 115.23.123.12
$result = Compare-Values-Are-Equal -Value1 $value1 -Value2 $value2
Write-Host "Values are equal: $result"
.OUTPUTS
Boolean value.
- True - if the values are NOT equal. We are returning "true" if the values are NOT equal, because we are using this function to check if the VPN connection was successful. If the expected IP address is different from the current IP address, then the VPN connection was successful.
- False - if the values are equal.
#>
function Compare-Values-Are-Equal {
    # Validate the input parameters.
    param (
        # The parameter is mandatory.
        [Parameter(Mandatory = $true)]
        # The first value is passed as a string parameter to the function.
        $Value1,
        # The parameter is mandatory.
        [Parameter(Mandatory = $true)]
        # The second value is passed as a string parameter to the function.
        $Value2
    )
    # Check if the values are equal and return the result of the comparison as a boolean value.
    return $Value1 -ne $Value2
}