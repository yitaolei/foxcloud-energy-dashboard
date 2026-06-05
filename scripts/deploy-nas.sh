#!/bin/sh
set -eu

NAS_HOST="${NAS_HOST:-DS923SOPAC.local}"
NAS_URL="${NAS_URL:-http://192.168.0.19:3080}"
LOCAL_NAS_PATH="${LOCAL_NAS_PATH:-/Volumes/Newhome/docker/foxcloud-dashboard}"
REMOTE_REBUILD="${REMOTE_REBUILD:-sudo -n /usr/local/bin/rebuild-foxcloud-dashboard}"

if [ ! -d "$LOCAL_NAS_PATH" ]; then
  echo "NAS share is not mounted: $LOCAL_NAS_PATH" >&2
  exit 1
fi

rsync -a \
  --exclude '.git/' \
  --exclude '.DS_Store' \
  --exclude '.env' \
  --exclude 'backups/' \
  --exclude 'codex_matches.txt' \
  --exclude 'data/' \
  --exclude 'dist/' \
  --exclude 'node_modules/' \
  ./ "$LOCAL_NAS_PATH/"

ssh -o BatchMode=yes "$NAS_HOST" "$REMOTE_REBUILD"
curl -fsS "$NAS_URL/api/livez"
printf '\n'
