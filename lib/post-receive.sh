#!/bin/sh

## Where to store the log information about the updates
LOGFILE=./post-receive.log

# The deployed directory (the running site)
DEPLOYDIR=/home/kks/git/blog
PIDDIR=/home/logs/blog.pid


echo "Starting Deploy" >> $LOGFILE


echo " - Starting git pull" >> $LOGFILE
cd "$DEPLOYDIR"; git pull;
echo " - Finished git pull" >> $LOGFILE

if [ -f "$PIDDIR" ]; then
 echo " - pm2 restart " >> $LOGFILE
 npm restart;
 echo " - Finished pm2 restart" >> $LOGFILE
else
 echo " - pm2 start " >> $LOGFILE
 npm start;
 echo " - Finished pm2 start" >> $LOGFILE
fi


echo "Finished Deploy" >> $LOGFILE