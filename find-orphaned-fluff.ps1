# Navigate to your repo directory
cd "D:\Documents\Website & Webserver Stuff\5etools-src\data\bestiary"

# Get all fluff files
$fluffFiles = Get-ChildItem -Filter "*fluff*. json"

# Array to store orphaned fluff files
$orphanedFluff = @()

foreach ($fluffFile in $fluffFiles) {
    # Derive the expected main file name by removing "fluff" from the filename
    $mainFileName = $fluffFile.Name -replace "fluff-", "" -replace "-fluff", ""
    
    # Check if the main file exists
    if (-not (Test-Path $mainFileName)) {
        $orphanedFluff += $fluffFile. Name
        Write-Host "Orphaned fluff file found: $($fluffFile.Name)" -ForegroundColor Yellow
    }
}

# Display results
if ($orphanedFluff.Count -eq 0) {
    Write-Host "`nNo orphaned fluff files found!" -ForegroundColor Green
} else {
    Write-Host "`nFound $($orphanedFluff.Count) orphaned fluff file(s)" -ForegroundColor Red
    
    # Ask for confirmation to delete
    $confirm = Read-Host "`nDo you want to delete these files? (y/n)"
    
    if ($confirm -eq 'y') {
        foreach ($file in $orphanedFluff) {
            Remove-Item $file
            Write-Host "Deleted: $file" -ForegroundColor Red
        }
        Write-Host "`nDeletion complete!" -ForegroundColor Green
        Write-Host "`nOrphaned files deleted:" -ForegroundColor Cyan
        $orphanedFluff | ForEach-Object { Write-Host "  - bestiary/$_" }
    }
}