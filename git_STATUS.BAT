@echo off
cls
CD c:\GESTIONI\GESTIONE_LLPP\25_GESTIONE_LLPP\PRES3000_GESTIONE\ARCHIVI_PRES3000\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\

:: Elenco dei file nella directory
dir

:: =======================================================================
:: CICLO PER LA GESTIONE DELLA DATA
:: =======================================================================
:: I caso: gestione della data con sottostringhe, aggiungendo lo 0 se <10

for /f "skip=1" %%x in ('wmic os get localdatetime') do if not defined MyDate set MyDate=%%x

:: Formato data con sottostringhe (anno_mese_giorno)
set today=%MyDate:~0,4%_%MyDate:~4,2%_%MyDate:~6,2%

:: II caso: gestione della data senza sottostringhe, solo numerico con trattino
:: (anno-mese-giorno)
:: Commentato il codice alternativo per questo caso
:: set today=%Year%-%Month%-%Day%

:: =======================================================================
:: STAMPA E LOG DI STATUS
:: =======================================================================
ECHO.
ECHO ........................................................................
ECHO.
ECHO       CONTROLLO STATUS IN DATA %today%
ECHO ........................................................................
ECHO. 

:: Esegui il comando git status e scrivilo nel log
git status > git_STATUS_LOG.txt

:: Mantenere il terminale con sfondo nero e testo giallo, quindi usa PowerShell
:: Uso di PowerShell:
:: Il comando PowerShell Get-Content legge il file git_STATUS_LOG.txt.
:: ForEach-Object {Write-Host $_ -ForegroundColor Red -BackgroundColor White}
:: per ogni riga del file, viene stampata con il testo rosso su sfondo giallo.
:: per cambiare solo il colore dei dati nel file git_STATUS_LOG.txt (rosso su sfondo bianco)
:: uso il comando pawershell per cambiare IL TESTO 	---> Write-Host 		= GIALLO
:: uso il comando pawershell per cambiare LO SFONDO ---> BackgroundColor 	= NERO
powershell -Command "Get-Content git_STATUS_LOG.txt | ForEach-Object {Write-Host $_ -ForegroundColor Yellow -BackgroundColor Black}"

:: Pausa per permettere di leggere il risultato
ECHO.
ECHO.
ECHO ........................................................................
ECHO  Pausa di 5 secondi per consentire il commit
ECHO ........................................................................
ECHO.

:: Pausa di 5 secondi prima di continuare
TIMEOUT /T 10 /NOBREAK

:: Fine dello script
