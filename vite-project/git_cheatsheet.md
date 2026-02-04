Git Cheat Sheet — Essential Commands
Basic commands
Clone a repo
git clone <url>

Check status
git status

Add all changes
git add .

Commit
git commit -m "message"

Create a branch
git checkout -b <name>

Switch branches
git checkout <name>

List branches
git branch

Stash work (save WIP)
git stash

Push branch to remote
git push origin <your_branch>

Rebase develop into your feature branch (safe, step-by-step) 🔁
Ensure a clean working tree
git status
If needed: git add . && git commit -m "WIP" or git stash

Fetch latest from remote
git fetch origin

Switch to your feature branch
git checkout <your_branch>

(Optional) Backup your branch
git branch backup/<your_branch>

Rebase onto develop
git rebase origin/develop

If conflicts occur: edit files → git add <file> → git rebase --continue
To cancel: git rebase --abort

Test locally (run app/tests)

Push the rebased branch (use safe force)
git push --force-with-lease origin <your_branch>