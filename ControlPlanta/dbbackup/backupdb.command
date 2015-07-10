#!/usr/bin/env bash
/Applications/MAMP/Library/bin/mysqldump -uroot -proot ControlPlanta > /Volumes/DATOS/Avanzando_Juntos/ControlPlanta/ControlPlanta/dbbackup/BACKUPS/backup$(date +%Y%m%d%H%M).sql
sleep 2s
python /Volumes/DATOS/Avanzando_Juntos/ControlPlanta/ControlPlanta/dbbackup/uploader2.py