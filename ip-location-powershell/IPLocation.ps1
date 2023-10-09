Function IPLocation ([string] $FilePath, [string] $OutputPath, [string] $APIKey) {

    $fileContent = (Get-Content -Path $FilePath);

    if ($null -eq $fileContent) {
        throw "File is empty";
    }

    $ipList = $fileContent.Split([Environment]::NewLine);

    $results = New-Object System.Collections.ArrayList;
    foreach ($rawIp in $ipList) {

        try { 
            $ip = [IPAddress] $rawIp
        } catch {
            throw "IP Address ${rawIp} is invalid."
        }

        $reqBody = @{
            ip = $ip;
            key = $APIKey;
        };
        $timestamp = Get-Date -Format "dd.MM.yyyy HH:mm"

        $response = Invoke-RestMethod -Uri "https://api.ip2location.io" -Method Get -Body $reqBody;
        $result = $response | Select-Object -Property ip, country_code, as, is_proxy, @{Name = "query_date_and_time"; Expression = {$timestamp}}
        $results.Add($result);
    }

    $sortedResults = $results |Sort-Object -Property { [System.Version]$_.ip };
    $sortedResults | Export-Csv  -Path $OutputPath -NoTypeInformation;
}