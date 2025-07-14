
@REM NOME FILE : PULL_LOG.BAT  + SETTAGGI
@REM -------------------------------------------------------------------------------------
@REM Script migliorato per stampare messaggi di blocco dal 1 fino all'ultimo sia a video che nel log

@ECHO OFF
@REM Disabilita la stampa dei comandi per ridurre la confusione nel terminale

@REM Imposta il percorso del file di log
SET LOG_FILE=c:\GESTIONI\GESTIONE_LLPP\25_GESTIONE_LLPP\PRES3000_GESTIONE\ARCHIVI_PRES3000\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\git_PULL_LOG.txt




@REM Verifica la creazione del file di log                                        01
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.

SET BLOCK=01
ECHO [%BLOCK%] TEST DI CREAZIONE DEL FILE LOG 
ECHO [%BLOCK%] TEST DI CREAZIONE DEL FILE LOG  > %LOG_FILE%
IF ERRORLEVEL 1 (
    ECHO [%BLOCK%] Errore: impossibile creare il file di log.
    PAUSE
    EXIT /B 1
)


@REM Scrive l'intestazione del file di log                                       02
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.

SET BLOCK=02
ECHO [%BLOCK%] FILE LOG DI STAMPA DEL COMANDO BAT PULL_LOG.BAT
ECHO [%BLOCK%] FILE LOG DI STAMPA DEL COMANDO BAT PULL_LOG.BAT >> %LOG_FILE%
ECHO. >> %LOG_FILE%
ECHO. >> %LOG_FILE%
ECHO [%BLOCK%] Data: %DATE% Ora: %TIME% >> %LOG_FILE%
ECHO. >> %LOG_FILE%
ECHO. >> %LOG_FILE%
ECHO. >> %LOG_FILE%
ECHO. >> %LOG_FILE%
ECHO. >> %LOG_FILE%


@REM Inizio del log                                                             03
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.

SET BLOCK=03
CALL :LogMessage "%BLOCK% Inizio esecuzione dello script"
ECHO [%BLOCK%] Inizio esecuzione dello script


@REM Stampa la directory corrente solo all'inizio                               04
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.

SET BLOCK=04
ECHO [%BLOCK%] Directory corrente: %CD%
CALL :LogCommand "%BLOCK% CD c:\GESTIONI\GESTIONE_LLPP\25_GESTIONE_LLPP\PRES3000_GESTIONE\ARCHIVI_PRES3000\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\"
CD c:\GESTIONI\GESTIONE_LLPP\25_GESTIONE_LLPP\PRES3000_GESTIONE\ARCHIVI_PRES3000\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\
IF NOT ERRORLEVEL 0 (
    CALL :LogMessage "%BLOCK% Errore nel cambio directory"
    ECHO [%BLOCK%] Errore nel cambio directory
    @REM riga vuota a schermo
    ECHO.
    EXIT /B 1
)

@REM Lista dei file nella directory                                             05
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.

SET BLOCK=05
CALL :LogCommand "%BLOCK% DIR"
ECHO [%BLOCK%] Lista dei file nella directory...
DIR >> %LOG_FILE% 2>&1

IF NOT ERRORLEVEL 0 (
    CALL :LogMessage "%BLOCK% Errore durante l'esecuzione del comando DIR"
    ECHO [%BLOCK%] Errore durante l'esecuzione del comando DIR
    @REM riga vuota a schermo
    ECHO.
)

@REM Controlla lo stato del repository                                          06
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.

SET BLOCK=06
CALL :LogCommand "%BLOCK% GIT STATUS"
ECHO [%BLOCK%] Controllo stato del repository...
GIT STATUS >> %LOG_FILE% 2>&1
IF NOT ERRORLEVEL 0 (
    CALL :LogMessage "%BLOCK% Errore durante l'esecuzione del comando git status"
    ECHO [%BLOCK%] Errore durante l'esecuzione del comando git status
    @REM riga vuota a schermo
    ECHO.
)

@REM Pausa di controllo DEL PROCEDIMENTO                                        07
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.
SET BLOCK=07
CALL :LogCommand "%BLOCK% TIMEOUT /T 3 /NOBREAK"
ECHO [%BLOCK%] Pausa di 3 secondi...
@REM riga vuota a schermo
TIMEOUT /T 3 /NOBREAK >> %LOG_FILE% 2>&1

@REM Esegue il PUL                                                              08
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.

SET BLOCK=08
CALL :LogCommand "%BLOCK% GIT PULL"
ECHO [%BLOCK%] Esecuzione di GIT PULL...
@REM riga vuota a schermo
GIT PULL >> %LOG_FILE% 2>&1
IF NOT ERRORLEVEL 0 (
    CALL :LogMessage "%BLOCK% Errore durante l'esecuzione del comando git pull"
    ECHO [%BLOCK%] Errore durante l'esecuzione del comando git pull
    @REM riga vuota a schermo
    ECHO.
)


@REM Pausa per consentire il commit                                             09
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.

SET BLOCK=09
CALL :LogCommand "%BLOCK% TIMEOUT /T 5 /NOBREAK"
ECHO [%BLOCK%] Pausa di 5 secondi...
TIMEOUT /T 5 /NOBREAK >> %LOG_FILE% 2>&1


@REM Fine script                                                                10
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.

SET BLOCK=10
CALL :LogMessage "%BLOCK% Fine esecuzione dello script"
ECHO [%BLOCK%] Fine esecuzione dello script

EXIT /B




@REM QUI IL GOTO
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.
GOTO :EOF
:LogMessage
ECHO [%DATE% %TIME%] %* >> %LOG_FILE%
EXIT /B



@REM Funzione per registrare i comandi
@REM -------------------------------------------------------------------------------------
@REM riga vuota a schermo
ECHO.

:LogCommand
ECHO [%DATE% %TIME%] Eseguendo comando: %* >> %LOG_FILE%
EXIT /B
