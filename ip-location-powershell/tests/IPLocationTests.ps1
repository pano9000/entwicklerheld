Describe 'IP Location Tests' {
      BeforeEach {
          Write-Host ""
        Write-Host "##polylith[testStarted name="
    }
    It 'handles incorrect API key test' {
          Mock Invoke-RestMethod { throw "401 Unauthorized: API key is invalid" }

        $outputPath = (New-TemporaryFile).FullName
        { IPLocation "$PSScriptRoot/../test_data/example1.txt" $outputPath "INCORRECT_API_KEY" } | Should -Throw "401 Unauthorized: API key is invalid"
    }

    It 'get location test' {
          Mock Invoke-RestMethod {}

        $MockedDate = Get-Date -Day 4 -Month 8 -Year 2023 -Hour 13 -Minute 0
        Mock Get-Date {
            param(
                [string]$Format
            )

            if ($Format) {
              return $MockedDate.ToString($Format)
            } else {
              return $MockedDate
            }
        }

        $outputPath = (New-TemporaryFile).FullName
        IPLocation "$PSScriptRoot/../test_data/first_ips.txt" $outputPath "CORRECT_KEY"
        try {
              Should -Invoke -CommandName Invoke-RestMethod -Times 1 -ParameterFilter {$Uri -eq "https://api.ip2location.io" -and $Body.ip -eq "8.8.8.8" -and $Body.key -eq "CORRECT_KEY"}
        }
        catch {
              throw "Something were wrong for the first ip 8.8.8.8. You should call Invoke-RestMethod with uri https://api.ip2location.io and pass ip and key as body."
        }
        try {
              Should -Invoke -CommandName Invoke-RestMethod -Times 1 -ParameterFilter {$Uri -eq "https://api.ip2location.io" -and $Body.ip -eq "1.1.1.1" -and $Body.key -eq "CORRECT_KEY"}
        }
        catch {
              throw "Something were wrong for the second ip 1.1.1.1. You should call Invoke-RestMethod with uri https://api.ip2location.io and pass ip and key as body."
        }
    }

    It 'invalid ip address test' {
          Mock Invoke-RestMethod {}

        $MockedDate = Get-Date -Day 4 -Month 8 -Year 2023 -Hour 13 -Minute 0
        Mock Get-Date {
              param(
                  [string]$Format
            )

            if ($Format) {
                  return $MockedDate.ToString($Format)
            } else {
                  return $MockedDate
            }
        }

        $outputPath = (New-TemporaryFile).FullName
        {IPLocation "$PSScriptRoot/../test_data/invalid_ip.txt" $outputPath "CORRECT_KEY"} | Should -Throw "IP Address 256.1.1.1 is invalid."
    }

    It 'store csv address test' {
          Mock Invoke-RestMethod {
              if ($Body.ip -eq "1.1.1.1") {
                  return @{
                    ip="1.1.1.1"
                    country_code="US"
                    country_name="United States of America"
                    region_name="California"
                    city_name="San Jose"
                    latitude=37.33939
                    longitude=-121.89496
                    zip_code="95101"
                    time_zone="-07:00"
                    asn="13335"
                    as="CloudFlare Inc."
                    is_proxy=$false
                }
            }
            if ($Body.ip -eq "212.111.236.201") {
                  return @{
                    ip="212.111.236.201"
                    country_code="DE"
                    country_name="Germany"
                    region_name="Sachsen"
                    city_name="Dresden"
                    latitude=51.051371
                    longitude=13.738321
                    zip_code="01067"
                    time_zone="+02:00"
                    asn="15372"
                    as="IBH IT-Service GmbH"
                    is_proxy=$false
                }
            }
            if ($Body.ip -eq "212.111.236.203") {
                  return @{
                    ip="212.111.236.203"
                    country_code="DE"
                    country_name="Germany"
                    region_name="Sachsen"
                    city_name="Dresden"
                    latitude=51.051371
                    longitude=13.738321
                    zip_code="01067"
                    time_zone="+02:00"
                    asn="15372"
                    as="IBH IT-Service GmbH"
                    is_proxy=$false
                }
            }
            if ($Body.ip -eq "212.111.236.204") {
                  return @{
                    ip="212.111.236.204"
                    country_code="DE"
                    country_name="Germany"
                    region_name="Sachsen"
                    city_name="Dresden"
                    latitude=51.051371
                    longitude=13.738321
                    zip_code="01067"
                    time_zone="+02:00"
                    asn="15372"
                    as="IBH IT-Service GmbH"
                    is_proxy=$false
                }
            }
            if ($Body.ip -eq "103.203.180.1") {
                  return @{
                    ip="103.203.180.1"
                    country_code="AT"
                    country_name="Austria"
                    region_name="Steiermark"
                    city_name="Barnbach"
                    latitude=47.03333
                    longitude=15.85
                    zip_code="8311"
                    time_zone="+02:00"
                    asn="213102"
                    as="Max Mustermann"
                    is_proxy=$false
                }
            }
        }

        $MockedDate = Get-Date -Day 4 -Month 8 -Year 2023 -Hour 13 -Minute 0
        Mock Get-Date {
              param(
                  [string]$Format
            )

            if ($Format) {
                  return $MockedDate.ToString($Format)
            } else {
                  return $MockedDate
            }
        }

        $outputPath = (New-TemporaryFile).FullName
        IPLocation "$PSScriptRoot/../test_data/example1.txt" $outputPath "CORRECT_KEY"

        $expectedCSVContent = (Get-Content "$PSScriptRoot/../test_data/example1.csv" -Raw).Split([Environment]::NewLine)
        $actualCSVContent = (Get-Content $outputPath -Raw)
        $actualCSVContent | Should -BeTrue -Because "your csv file shouln\'t be empty or null"

        $actualCSVContentLines = $actualCSVContent.Split([Environment]::NewLine)

        $actualCSVContentLines | Should -HaveCount $expectedCSVContent.Length
        for ($i = 0; $i -lt $actualCSVContentLines.Length; $i++) {
              ("Line $i " + $actualCSVContentLines[$i]) | Should -BeExactly ("Line $i " + $expectedCSVContent[$i])
        }
    }

    It 'handles empty input file test' {
          $outputPath = (New-TemporaryFile).FullName
        { IPLocation "$PSScriptRoot/../test_data/empty.txt" $outputPath "CORRECT_KEY" } | Should -Throw "File is empty*"
    }


}

BeforeAll {
  . "$PSScriptRoot/../IPLocation.ps1"
  # capture the write host output
  $pestOutput = [Console]::Out
  $Output = New-Object System.IO.StringWriter
  [Console]::SetOut($Output)
}

AfterAll {
  # Write captured output into the console
  [Console]::SetOut($pestOutput)
  Write-Host $Output.ToString()
  # remove output file if it exists
  $outputFile = "$PSScriptRoot/../../output.xml"
  if (Test-Path $outputFile) {
    Remove-Item $outputFile
  }
  # write captured output into the file
  $Output.ToString() | Out-File $outputFile
}