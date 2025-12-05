<#
. SYNOPSIS
    Cleans up index. json and fluff-index.json by removing entries for missing files
.DESCRIPTION
    Parses index files and removes any file references that don't actually exist in the directory
#>

param(
    [string]$Directory = "data/bestiary",
    [switch]$DryRun = $true
)

# Navigate to repo root
$repoRoot = "D:\Documents\Website & Webserver Stuff\5etools-src"
cd $repoRoot

$targetDir = Join-Path $repoRoot $Directory

if (-not (Test-Path $targetDir)) {
    Write-Host "Directory not found: $targetDir" -ForegroundColor Red
    exit
}

Write-Host "=== Scanning directory: $targetDir ===" -ForegroundColor Cyan

# Get all actual JSON files in the directory (excluding special files)
$allActualFiles = Get-ChildItem -Path $targetDir -Filter "*.json" | 
    Where-Object { 
        $_.Name -ne "index.json" -and 
        $_.Name -ne "fluff-index.json" -and 
        $_.Name -ne "foundry.json" -and 
        $_.Name -ne "legendarygroups.json" -and 
        $_.Name -ne "template.json" 
    } | ForEach-Object { $_.Name }

Write-Host "Found $($allActualFiles.Count) actual data files in directory" -ForegroundColor Green

# Function to clean an index file
function Clean-IndexFile {
    param(
        [string]$IndexPath,
        [string[]]$ActualFiles,
        [string]$IndexType
    )
    
    if (-not (Test-Path $IndexPath)) {
        Write-Host "`nIndex file not found: $IndexPath" -ForegroundColor Yellow
        return
    }
    
    Write-Host "`n=== Processing: $(Split-Path $IndexPath -Leaf) ===" -ForegroundColor Cyan
    
    # Read and parse JSON
    try {
        $jsonContent = Get-Content $IndexPath -Raw -Encoding UTF8
        $indexData = $jsonContent | ConvertFrom-Json
    } catch {
        Write-Host "Error parsing JSON: $_" -ForegroundColor Red
        return
    }
    
    # Determine structure and get file list
    $fileList = $null
    $isSimpleArray = $false
    
    if ($indexData -is [System.Array]) {
        $fileList = $indexData
        $isSimpleArray = $true
    } elseif ($indexData. PSObject.Properties.Name -contains "data") {
        $fileList = $indexData.data
    } else {
        Write-Host "Unknown index structure.  Properties: $($indexData.PSObject.Properties.Name -join ', ')" -ForegroundColor Red
        return
    }
    
    if ($null -eq $fileList -or $fileList.Count -eq 0) {
        Write-Host "No file list found or empty list" -ForegroundColor Yellow
        return
    }
    
    $originalCount = $fileList.Count
    $removedEntries = @()
    $cleanedList = @()
    
    foreach ($entry in $fileList) {
        $shouldKeep = $true
        $filename = $null
        
        # Extract filename from entry (could be string or object)
        if ($entry -is [string]) {
            # Handle paths like "bestiary/bestiary-mm.json" or just "bestiary-mm.json"
            if ($entry -match '/') {
                $filename = Split-Path $entry -Leaf
            } else {
                $filename = $entry
            }
        } elseif ($entry. PSObject.Properties.Name -contains "file") {
            $filename = Split-Path $entry.file -Leaf
        } elseif ($entry.PSObject. Properties.Name -contains "path") {
            $filename = Split-Path $entry.path -Leaf
        } else {
            # Unknown structure, keep it to be safe
            Write-Host "  ?  Unknown entry structure, keeping: $($entry | ConvertTo-Json -Compress)" -ForegroundColor Gray
            $cleanedList += $entry
            continue
        }
        
        # Check if file exists
        if ($null -ne $filename) {
            if ($ActualFiles -contains $filename) {
                $shouldKeep = $true
            } else {
                $shouldKeep = $false
                $removedEntries += $entry
                Write-Host "  - Will remove: $filename (entry: $entry)" -ForegroundColor Red
            }
        }
        
        if ($shouldKeep) {
            $cleanedList += $entry
        }
    }
    
    if ($removedEntries.Count -eq 0) {
        Write-Host "No missing files found - index is clean!" -ForegroundColor Green
        return
    }
    
    Write-Host "`nSummary for $(Split-Path $IndexPath -Leaf):" -ForegroundColor Yellow
    Write-Host "  Original entries: $originalCount"
    Write-Host "  Entries to remove: $($removedEntries.Count)"
    Write-Host "  Remaining entries: $($cleanedList.Count)"
    
    if (-not $DryRun) {
        # Update and save
        try {
            if ($isSimpleArray) {
                $cleanedList | ConvertTo-Json -Depth 100 | Set-Content $IndexPath -Encoding UTF8
            } else {
                $indexData. data = $cleanedList
                $indexData | ConvertTo-Json -Depth 100 | Set-Content $IndexPath -Encoding UTF8
            }
            Write-Host "✓ Index file updated!" -ForegroundColor Green
        } catch {
            Write-Host "✗ Error updating file: $_" -ForegroundColor Red
        }
    }
}

# Process index. json (main bestiary files)
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "CLEANING index.json" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

$indexPath = Join-Path $targetDir "index.json"
Clean-IndexFile -IndexPath $indexPath -ActualFiles $allActualFiles -IndexType "main"

# Process fluff-index.json (fluff files)
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "CLEANING fluff-index.json" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

$fluffIndexPath = Join-Path $targetDir "fluff-index.json"
Clean-IndexFile -IndexPath $fluffIndexPath -ActualFiles $allActualFiles -IndexType "fluff"

# Final summary
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "CLEANUP COMPLETE" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

if ($DryRun) {
    Write-Host "`n[DRY RUN MODE] No files were modified." -ForegroundColor Magenta
    Write-Host "Run with -DryRun:`$false to actually update the index files:" -ForegroundColor Magenta
    Write-Host "  .\cleanup-index-files.ps1 -Directory `"$Directory`" -DryRun:`$false" -ForegroundColor Cyan
} else {
    Write-Host "`n✓ Index files have been updated!" -ForegroundColor Green
    Write-Host "`nNext steps - commit your changes:" -ForegroundColor Yellow
    Write-Host "  git add $Directory" -ForegroundColor Cyan
    Write-Host "  git commit -m 'Clean up bestiary index files - remove missing entries'" -ForegroundColor Cyan
    Write-Host "  git push origin homebrew" -ForegroundColor Cyan
}