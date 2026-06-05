#!/bin/sh
set -eu

NAS_HOST="${NAS_HOST:-DS923SOPAC.local}"
NAS_URL="${NAS_URL:-http://192.168.0.19:3080}"
LOCAL_NAS_PATH="${LOCAL_NAS_PATH:-/Volumes/Newhome/docker/foxcloud-dashboard}"
REMOTE_REBUILD="${REMOTE_REBUILD:-sudo -n /usr/local/bin/rebuild-foxcloud-dashboard}"
NAS_LIVEZ_RETRIES="${NAS_LIVEZ_RETRIES:-30}"
NAS_LIVEZ_DELAY_SECONDS="${NAS_LIVEZ_DELAY_SECONDS:-2}"

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

attempt=1
while [ "$attempt" -le "$NAS_LIVEZ_RETRIES" ]; do
  if response="$(curl -fsS "$NAS_URL/api/livez" 2>/dev/null)"; then
    printf '%s\n' "$response"
    exit 0
  fi

  sleep "$NAS_LIVEZ_DELAY_SECONDS"
  attempt=$((attempt + 1))
done

echo "NAS livez did not recover after $NAS_LIVEZ_RETRIES attempts: $NAS_URL/api/livez" >&2
exit 1
