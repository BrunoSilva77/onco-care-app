Get-ChildItem "C:\Users\Usuario\Desktop\Nova pasta\onco-care-app\src" -Recurse -Filter "*.css" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = $content -replace 'rgba\(138,\s*99,\s*229,', 'rgba(var(--color-primary-rgb),'
    Set-Content $_.FullName $content -Encoding UTF8 -NoNewline
}
Write-Host "Done replacing rgba colors!"
