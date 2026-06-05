# Synology passwordless rebuild

Use this when Codex should rebuild the FoxCloud Dashboard container without asking you to type the Synology sudo password every time.

The safer pattern is a root-owned wrapper script plus one narrow sudoers rule. Do not put the privileged wrapper inside the shared project folder, because that folder is writable by your normal NAS user.

## One-time Synology setup from Mac Mini Terminal

If your prompt looks like `bash-3.2$`, `ylei@yleis-Mac-mini`, or `/Users/ylei`, you are still in the Mac Mini shell. Use this remote command from the Mac Mini Terminal so the setup runs on the NAS:

```bash
ssh DS923SOPAC.local 'cat >/tmp/setup-foxcloud-rebuild.sh <<'"'"'EOF'"'"'
#!/bin/sh
set -eu
sudo tee /usr/local/bin/rebuild-foxcloud-dashboard >/dev/null <<'"'"'WRAPPER'"'"'
#!/bin/sh
set -eu
cd /volume1/Newhome/docker/foxcloud-dashboard
exec /usr/local/bin/docker compose up --build -d
WRAPPER

sudo chown root:root /usr/local/bin/rebuild-foxcloud-dashboard
sudo chmod 755 /usr/local/bin/rebuild-foxcloud-dashboard

printf "ylei ALL=(root) NOPASSWD: /usr/local/bin/rebuild-foxcloud-dashboard\n" | sudo tee /etc/sudoers.d/foxcloud-dashboard-rebuild >/dev/null
sudo chown root:root /etc/sudoers.d/foxcloud-dashboard-rebuild
sudo chmod 440 /etc/sudoers.d/foxcloud-dashboard-rebuild
sudo -n /usr/local/bin/rebuild-foxcloud-dashboard
EOF
sh /tmp/setup-foxcloud-rebuild.sh'
```

## One-time setup after SSH into Synology

Run this once in an SSH session on the Synology NAS:

```bash
sudo tee /usr/local/bin/rebuild-foxcloud-dashboard >/dev/null <<'EOF'
#!/bin/sh
set -eu
cd /volume1/Newhome/docker/foxcloud-dashboard
exec /usr/local/bin/docker compose up --build -d
EOF

sudo chown root:root /usr/local/bin/rebuild-foxcloud-dashboard
sudo chmod 755 /usr/local/bin/rebuild-foxcloud-dashboard

printf 'ylei ALL=(root) NOPASSWD: /usr/local/bin/rebuild-foxcloud-dashboard\n' | sudo tee /etc/sudoers.d/foxcloud-dashboard-rebuild >/dev/null
sudo chown root:root /etc/sudoers.d/foxcloud-dashboard-rebuild
sudo chmod 440 /etc/sudoers.d/foxcloud-dashboard-rebuild
```

If you saved those commands into `~/sudo-foxcloud.sh` on the Synology NAS, run the setup script first:

```bash
chmod a+x ~/sudo-foxcloud.sh
./sudo-foxcloud.sh
```

Enter the Synology sudo password when it asks. Do not run `sudo -n /usr/local/bin/rebuild-foxcloud-dashboard` until this setup script has completed successfully.

Then test it:

```bash
sudo -n /usr/local/bin/rebuild-foxcloud-dashboard
```

If that succeeds, Codex can rebuild with:

```bash
npm run deploy:nas
```

## If you accidentally ran this on the Mac Mini

If you saw `chown: root: illegal group name`, the setup was run on macOS instead of Synology. Clean up the accidental local Mac files with:

```bash
sudo rm -f /usr/local/bin/rebuild-foxcloud-dashboard
sudo rm -f /etc/sudoers.d/foxcloud-dashboard-rebuild
```

Then run the Mac Mini Terminal SSH command above.

## Revoke access

To remove the passwordless rebuild path:

```bash
sudo rm -f /etc/sudoers.d/foxcloud-dashboard-rebuild
sudo rm -f /usr/local/bin/rebuild-foxcloud-dashboard
```

## Notes

- This does not give Codex your password.
- This does not grant broad passwordless sudo.
- Docker access is still powerful, so only use this on a NAS account and network you trust.
