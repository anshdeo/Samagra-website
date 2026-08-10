#!/usr/bin/env python3
"""
deploy.py — save your changes and publish the Samagra site.

Run it:   python3 deploy.py

It shows you what changed, asks for a short message, then commits and
(after you say yes) pushes to GitHub. The live site updates on its own
about a minute after the push.
"""

import subprocess
import sys
import os
from datetime import datetime

# Always operate on the folder this script lives in, wherever it's run from.
REPO = os.path.dirname(os.path.abspath(__file__))


def git(*args):
    """Run a git command in the repo and capture its output."""
    return subprocess.run(["git", *args], cwd=REPO, text=True, capture_output=True)


def must(*args):
    """Run a git command; stop with a clear message if it fails."""
    result = git(*args)
    if result.returncode != 0:
        sys.stderr.write(result.stdout + result.stderr)
        sys.exit("\n[x] git " + " ".join(args) + " failed - see the message above.")
    return result.stdout


def ask(prompt, default=""):
    """Ask the user a question; Enter uses the default. Ctrl+C cancels cleanly."""
    try:
        answer = input(prompt).strip()
    except (EOFError, KeyboardInterrupt):
        print("\nCancelled - nothing was changed.")
        sys.exit(0)
    return answer or default


def main():
    if git("rev-parse", "--is-inside-work-tree").returncode != 0:
        sys.exit("[x] This folder isn't a git repository.")

    branch = must("rev-parse", "--abbrev-ref", "HEAD").strip()

    changes = git("status", "--short").stdout.strip()
    unpushed = git("log", "--oneline", "origin/" + branch + "..HEAD").stdout.strip()

    if not changes and not unpushed:
        print("[ok] Nothing to publish - everything is already up to date.")
        return

    print("=" * 50)
    print(" Publish  -  Samagra Workplace Advisory")
    print("=" * 50)

    if changes:
        print("\nChanges to save:")
        for line in changes.splitlines():
            print("   " + line)
    else:
        print("\nNo new file changes, but there are commits waiting to push.")

    # 1) Commit (only if there are file changes to save)
    if changes:
        default_msg = "Update site - " + datetime.now().strftime("%Y-%m-%d %H:%M")
        msg = ask('\nCommit message [Enter for "' + default_msg + '"]: ', default_msg)
        must("add", "-A")
        must("commit", "-m", msg)
        print('[ok] Saved: "' + msg + '"')

    # 2) Confirm, then push
    go = ask("\nPush to GitHub and update the live site? [Y/n]: ", "y").lower()
    if go not in ("y", "yes"):
        print("[.] Saved on your computer, but NOT published. Run again when ready.")
        return

    print("--> Pushing to " + branch + " ...")
    push = git("push", "origin", branch)
    if push.returncode != 0:
        sys.stderr.write(push.stdout + push.stderr)
        sys.exit("\n[x] Push failed - check your internet or GitHub login.")
    print("[ok] Published! The live site updates in under a minute.")


if __name__ == "__main__":
    main()
