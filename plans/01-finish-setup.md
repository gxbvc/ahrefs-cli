# Finish ahrefs-cli setup

## Build the tool
1. Implement real commands in place of the `example` placeholder
2. Update AGENTS.md with actual commands, flags, and examples
3. Update README.md with description, prerequisites, and setup instructions
4. Fill in .env.example with the actual env vars needed

## Register the tool
1. Install deps and make globally callable:
   ```bash
   cd ~/tools/ahrefs-cli
   npm install && npm run build && npm link
   ```
2. Set up credentials:
   ```bash
   cp .env.example .env
   # Fill in values (or symlink: ln -s ../.env .env)
   ```
3. Create GitHub repo:
   ```bash
   cd ~/tools/ahrefs-cli
   git init && git add -A && git commit -m "Initial commit: ahrefs-cli"
   gh repo create christiangenco/ahrefs-cli --public --source=. --push
   ```
4. Add to ~/tools/sync.sh REPOS array:
   ```bash
   "ahrefs-cli|https://github.com/christiangenco/ahrefs-cli.git|main"
   ```
5. Add to ~/tools/AGENTS.md tool index table (keep alphabetical)
6. Add to ~/tools/agent-toolkit/README.md in the appropriate section
7. Verify: `ahrefs-cli --help` works from any directory
8. Delete this plans/ directory when done
