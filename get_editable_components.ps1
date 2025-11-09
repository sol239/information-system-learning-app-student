# Base directory
$baseDir = ".\app\components\infsys_components"

# Output file
$outputFile = "vue_files_list.txt"
Clear-Content $outputFile -ErrorAction SilentlyContinue

# Get all directories recursively including the base
Get-ChildItem -Path $baseDir -Directory -Recurse | ForEach-Object {
    $dir = $_.FullName
    $vueFiles = Get-ChildItem -Path $dir -Filter *.vue -File
    if ($vueFiles.Count -gt 0) {
        # Relative directory path
        $relativeDir = $dir.Substring((Get-Item $baseDir).FullName.Length + 1)
        Add-Content $outputFile "$relativeDir/"
        foreach ($file in $vueFiles) {
            Add-Content $outputFile "  $($file.Name)"
        }
    }
}

# Check the base directory itself
$vueFilesRoot = Get-ChildItem -Path $baseDir -Filter *.vue -File
if ($vueFilesRoot.Count -gt 0) {
    Add-Content $outputFile "./"
    foreach ($file in $vueFilesRoot) {
        Add-Content $outputFile "  $($file.Name)"
    }
}
