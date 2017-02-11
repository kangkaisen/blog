#!/bin/sh

## Where to store the log information about the updates
LOGFILE=/home/kks/git/blog/post-receive.log

# The deployed directory (the running site)
DEPLOYDIR=/home/kks/git/blog
PIDDIR=/home/logs/blog.pid

echo "开始: `date`" >> $LOGFILE
echo "Starting Deploy" >> $LOGFILE


echo " - Starting git pull" >> $LOGFILE
cd "$DEPLOYDIR"; git pull;
echo " - Finished git pull" >> $LOGFILE

echo "Finished Deploy" >> $LOGFILE
echo "结束: `date`" >> $LOGFILE