param(
    [string]$Directory = "data/bestiary",
    [switch]$DryRun = $true
)

$repoRoot = "D:\Documents\Website & Webserver Stuff\5etools-src"
cd $repoRoot

$targetDir = Join-Path $repoRoot $Directory

if (-not (Test-Path $targetDir)) {
    Write-Host "Directory not found: $targetDir" -ForegroundColor Red
    exit
}

Write-Host "=== Scanning directory: $targetDir ===" -ForegroundColor Cyan

$allActualFiles = Get-ChildItem -Path $targetDir -Filter "*.json" | Where-Object { 
    $_.Name -ne "index.json" -and 
    $_.Name -ne "fluff-index.json" -and 
    $_.Name -ne "foundry. json" -and 
    $_.Name -ne "legendarygroups.json" -and 
    $_.Name -ne "template.json" 
} | ForEach-Object { $_.Name }

Write-Host "Found $($allActualFiles. Count) actual data files in directory" -ForegroundColor Green

function Clean-IndexFile {
    param(
        [string]$IndexPath,
        [string[]]$ActualFiles
    )
    
    if (-not (Test-Path $IndexPath)) {
        Write-Host "`nIndex file not found: $IndexPath" -ForegroundColor Yellow
        return
    }
    
    Write-Host "`n=== Processing: $(Split-Path $IndexPath -Leaf) ===" -ForegroundColor Cyan
    
    $jsonContent = Get-Content $IndexPath -Raw -Encoding UTF8
    $indexData = $jsonContent | ConvertFrom-Json
    
    if ($indexData -isnot [PSCustomObject]) {
        Write-Host "Unexpected index structure (not an object)" -ForegroundColor Red
        return
    }
    
    [int]$originalCount = @($indexData.PSObject.Properties). Count
    $keysToRemove = @()
    $removedEntries = @()
    
    foreach ($property in $indexData.PSObject.Properties) {
        $key = $property. Name
        $filename = $property.Value
        
        if ($ActualFiles -notcontains $filename) {
            $keysToRemove += $key
            $removedEntries += "$key : $filename"
            Write-Host "  - Will remove: $key -> $filename (file not found)" -ForegroundColor Red
        }
    }
    
    if ($keysToRemove.Count -eq 0) {
        Write-Host "No missing files found - index is clean!" -ForegroundColor Green
        return
    }
    
    [int]$removeCount = $keysToRemove.Count
    [int]$remainingCount = $originalCount - $removeCount
    
    Write-Host "`nSummary for $(Split-Path $IndexPath -Leaf):" -ForegroundColor Yellow
    Write-Host "  Original entries: $originalCount"
    Write-Host "  Entries to remove: $removeCount"
    Write-Host "  Remaining entries: $remainingCount"
    
    if ($DryRun -eq $false) {
        foreach ($key in $keysToRemove) {
            $indexData.PSObject.Properties.Remove($key)
        }
        
        $indexData | ConvertTo-Json -Depth 100 | Set-Content $IndexPath -Encoding UTF8
        Write-Host "Index file updated!" -ForegroundColor Green
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "CLEANING index. json" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$indexPath = Join-Path $targetDir "index.json"
Clean-IndexFile -IndexPath $indexPath -ActualFiles $allActualFiles

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "CLEANING fluff-index.json" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$fluffIndexPath = Join-Path $targetDir "fluff-index.json"
Clean-IndexFile -IndexPath $fluffIndexPath -ActualFiles $allActualFiles

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "CLEANUP COMPLETE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "`n[DRY RUN MODE] No files were modified." -ForegroundColor Magenta
    Write-Host "Run with -DryRun:`$false to actually update the index files:" -ForegroundColor Magenta
    Write-Host "  .\cleanup-index-files.ps1 -Directory `"$Directory`" -DryRun:`$false" -ForegroundColor Cyan
} else {
    Write-Host "`nIndex files have been updated!" -ForegroundColor Green
    Write-Host "`nNext steps - commit your changes:" -ForegroundColor Yellow
    Write-Host "  git add $Directory" -ForegroundColor Cyan
    Write-Host "  git commit -m 'Clean up bestiary index files - remove missing entries'" -ForegroundColor Cyan
    Write-Host "  git push origin homebrew" -ForegroundColor Cyan
}