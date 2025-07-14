ECHO OFF

@REM  cd.. devi posizionarti su git_desktop
@REM imposto la variabile path:
SET PATH_S=c:\GESTIONI\GESTIONE_LLPP\25_GESTIONE_LLPP\PRES3000_GESTIONE\ARCHIVI_PRES3000\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\


@CD %PATH_S%
@dir /W

@ECHO  CANCELLO I DATI
@ECHO  .......................................................
@ECHO  .
@ECHO  .
@ECHO  .

@DIR MDB

 
	@REM  elimina una directory (RMDIR) + le sottodirectory (/S) senza conferma (/Q)
	rmdir /s /q "c:\GESTIONI\GESTIONE_LLPP\25_GESTIONE_LLPP\PRES3000_GESTIONE\ARCHIVI_PRES3000\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\MDB"



@DIR OBJECT

	@REM  elimina una directory (RMDIR) + le sottodirectory (/S) senza conferma (/Q)
	rmdir /s /q "c:\GESTIONI\GESTIONE_LLPP\25_GESTIONE_LLPP\PRES3000_GESTIONE\ARCHIVI_PRES3000\PRES3000_NUMERI_TELEFONICI_DIPENDENTI\OBJECT"

@REM ALLINEO LA REPOSITORY LOCALE CON GITHUB
	
	@REM Aggiorna le informazioni dal remoto
	git fetch origin	
	
	@REM Sovrascrive completamente i file locali con quella dalla branch remota
	git reset --hard origin/calcolo

	@REM Verifica che la directory locale sia ora identica al repository remoto 
	git status
	

@ECHO  .
@ECHO  .
@ECHO  .......................................................



@REM 01)
@REM sospensione con crononometro 
@REM ---->	timeout /t 2 /nobreak > NUL
@REM ---->
@ECHO
@ECHO
@ECHO  pausa  per consentire il commit
@ECHO
@TIMEOUT /T 2 /NOBREAK

