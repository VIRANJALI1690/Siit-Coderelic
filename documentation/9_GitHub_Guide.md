# 9. GitHub Guide

## Introduction
Git is a version control system used to track changes in code, and GitHub is a platform to host those code repositories online. This guide explains how to manage the **Siit Coderelic** project using Git.

## 1. Initialize Git Repository
If you are starting from scratch in a local folder:
```bash
git init
```

## 2. Create .gitignore
A `.gitignore` file specifies which files Git should ignore. For this project, it is crucial to exclude:
- `node_modules/`: (Dependency folders are too large).
- `.env`: (Contains sensitive database and API keys).
- `dist/` or `build/`: (Compiled files are not needed in the source code).

**Example `.gitignore` content:**
```text
node_modules
.env
dist
.DS_Store
```

## 3. Version Control Workflow

### Step 1: Add Files
Choose which files you want to track:
```bash
git add .
```
*(The dot adds all changed files in the current folder)*

### Step 2: Commit Changes
Save a "snapshot" of your code with a descriptive message:
```bash
git commit -m "Initial commit: Set up MERN stack structure"
```

### Step 3: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and log in.
2. Click "New" to create a repository named `SiitCoderelic`.
3. Keep it Public or Private and click "Create repository".

### Step 4: Link Local to Online
```bash
git remote add origin https://github.com/your-username/SiitCoderelic.git
git branch -M main
git push -u origin main
```

## 4. Working with Branches
Branches allow you to work on new features without breaking the "main" code.
- **Create a branch**: `git checkout -b feature-search`
- **Switch to main**: `git checkout main`
- **Merge changes**: `git merge feature-search`

## 5. Summary of Common Commands
- **`git status`**: See which files are modified and not yet committed.
- **`git log`**: View the history of all commits.
- **`git pull`**: Download the latest code from GitHub to your local machine.
- **`git push`**: Upload your local commits to GitHub.

## Beginner Tips
- **Commit often**: Small, frequent commits are easier to manage than one giant commit.
- **Write clear messages**: Instead of "Update", use "Added user login validation".
- **NEVER push secrets**: Ensure your `.env` file is in `.gitignore` before your first push!
