@echo off
title POP'IT - Update Brand Files
cd /d "%~dp0"

echo.
echo ========================================
echo   POP'IT - Updating brand files
echo ========================================
echo.

node scripts/build-brand-assets.mjs
if errorlevel 1 (
  echo Build failed. Check errors above.
  pause
  exit /b 1
)

echo.
echo Done! Now refresh your browser: Ctrl+Shift+R
echo Site: http://localhost:3000
echo.
pause
