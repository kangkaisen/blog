#!/bin/sh
#
## store the arguments given to the script
read oldrev newrev refname

## Where to store the log information about the updates
LOGFILE=./post-receive.log

# The deployed directory (the running site)
DEPLOYDIR=/home/kks/git/blog
PIDDIR=/home/logs/blog.pid

##  Record the fact that the push has been received
echo -e "Received Push Request at $( date +%F )" >> $LOGFILE
echo " - Old SHA: $oldrev New SHA: $newrev Branch Name: $refname" >> $LOGFILE

## Update the deployed copy
echo "Starting Deploy" >> $LOGFILE


echo " - Starting git pull"
cd "$DEPLOYDIR"; git pull;
echo " - Finished git pull"

if [ -f "$PIDDIR" ]; then
 echo " - pm2 restart "
 npm restart;
 echo " - Finished pm2 restart"
else
 echo " - pm2 start "
 npm start;
 echo " - Finished pm2 start"
fi
cd -
echo "Finished Deploy" >> $LOGFILE