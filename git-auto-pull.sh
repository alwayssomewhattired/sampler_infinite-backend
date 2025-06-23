#!/bin/bash

#  AUTOMATED CODE PULLER

set -x


cd /home/ec2-user/sampler_infinite-backend || {
 echo "Failed to cd into repo directory"
 exit 1
}

echo "Current directory: $(pwd)"
echo "Running git pull..."

REMOTE=prod
BRANCH=main
REMOTE_BRANCH="$REMOTE/$BRANCH"

while true; do
    git fetch $REMOTE

    LOCAL_HASH=$(git rev-parse $BRANCH)
    REMOTE_HASH=$(git rev-parse $REMOTE_BRANCH)

    echo "Local hash: $LOCAL_HASH"
    echo "Remote hash: $REMOTE_HASH"

        if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
        echo "[$(date)] New commit detected. Pulling..."
        git reset --hard $REMOTE_BRANCH

        echo "Installing dependencies..."
        npm install

        echo "Finished!"

        cd ..
    fi

    sleep 60
done

