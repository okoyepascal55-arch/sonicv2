$publicImagesDir = "c:\Users\TOUTENUN\Desktop\sonic plus one\public\images"
$srcDir = "c:\Users\TOUTENUN\Desktop\sonic plus one\src"

# 1. Get all image files in public/images
$actualImages = Get-ChildItem -Path $publicImagesDir -Recurse -File | ForEach-Object {
    $relPath = $_.FullName.Substring(($publicImagesDir.Length - 7)) # this keeps "\images\..."
    $relPath = $relPath.Replace("\", "/")
    $relPath
}

Write-Output "Found $($actualImages.Count) images on disk."

# 2. Get all tsx/ts files in src
$srcFiles = Get-ChildItem -Path $srcDir -Recurse -Include *.ts, *.tsx, *.js, *.jsx, *.css, *.html

$references = @()
# Regex to match /images/... (up to the file extension .webp, .png, .jpg, .jpeg, .svg, etc.)
$regex = [regex]'(?i)/images/[^''"\(\)<>]+?\.(webp|png|jpg|jpeg|svg|gif)'

foreach ($file in $srcFiles) {
    # Read files using UTF-8 to correctly handle German umlauts and spaces
    $lines = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $matches = $regex.Matches($lines)
    foreach ($match in $matches) {
        $refPath = $match.Value
        # URL decode the match in case it contains %20 or other entities
        $refPathDecoded = [uri]::UnescapeDataString($refPath)
        
        # Find line number
        # Find index in string
        $index = $match.Index
        $lineNum = ($lines.Substring(0, $index) -split "`n").Count
        
        $references += [PSCustomObject]@{
            File = $file.FullName.Substring($srcDir.Length + 1)
            Line = $lineNum
            Reference = $refPath
            Decoded = $refPathDecoded
        }
    }
}

Write-Output "Found $($references.Count) image references in src/."

# 3. Check references
$broken = @()
$referencedImagesSet = @{}

foreach ($ref in $references) {
    $referencedImagesSet[$ref.Decoded] = $true
    
    # Resolve the full path on disk
    $diskPath = Join-Path "c:\Users\TOUTENUN\Desktop\sonic plus one\public" $ref.Decoded
    if (-not (Test-Path -LiteralPath $diskPath)) {
        # Check if it's a casing issue
        # Find if there is any image in actualImages that matches case-insensitively
        $lowerRef = $ref.Decoded.ToLower()
        $foundCaseDiff = $false
        $diskMatch = ""
        foreach ($img in $actualImages) {
            if ($img.ToLower() -eq $lowerRef) {
                $foundCaseDiff = $true
                $diskMatch = $img
                break
            }
        }
        
        if ($foundCaseDiff) {
            $broken += [PSCustomObject]@{
                File = $ref.File
                Line = $ref.Line
                Reference = $ref.Reference
                Reason = "Case/naming difference. Code: '$($ref.Decoded)', Disk: '$diskMatch'"
            }
        } else {
            $broken += [PSCustomObject]@{
                File = $ref.File
                Line = $ref.Line
                Reference = $ref.Reference
                Reason = "File does not exist"
            }
        }
    }
}

# 4. Find unused images
$unused = @()
foreach ($img in $actualImages) {
    if (-not $referencedImagesSet.ContainsKey($img)) {
        $unused += $img
    }
}

$reportPath = "c:\Users\TOUTENUN\Desktop\sonic plus one\image_check_report.txt"
$reportContent = @()

$reportContent += "Found $($actualImages.Count) images on disk."
$reportContent += "Found $($references.Count) image references in src/."

$reportContent += "`n--- BROKEN / MISMATCHED REFERENCES ---"
if ($broken.Count -eq 0) {
    $reportContent += "No broken references found."
} else {
    foreach ($b in $broken) {
        $reportContent += "[BROKEN] File: $($b.File):$($b.Line) -> '$($b.Reference)' ($($b.Reason))"
    }
}

$reportContent += "`n--- UNUSED IMAGES ON DISK ---"
if ($unused.Count -eq 0) {
    $reportContent += "No unused images found."
} else {
    $reportContent += "Found $($unused.Count) unused images:"
    foreach ($u in $unused) {
        $reportContent += "[UNUSED] $u"
    }
}

$reportContent | Out-File -FilePath $reportPath -Encoding UTF8
Write-Output "Report written to $reportPath"
