# Getting Started

Poet orchestrates AI coding agents using skills. You write skills, Poet schedules and runs them. Read the [Introduction](/introduction) first if you haven't. This page gets you from zero to a running poet loop.

## Install

Give this prompt to your coding agent ([Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Codex CLI](https://github.com/openai/codex), etc.):

```md
Install Poet and set up this project. Follow the instructions at
https://raw.githubusercontent.com/poteto/poet/main/INSTALL.md
```

The agent installs the binary, creates a config, writes schedule and execute skills tailored to your project, seeds a backlog, and gets the loop running.

::: details Manual install

::: code-group

```sh [Mac]
brew install poteto/tap/poet
```

```sh [Linux]
curl -Lo poet https://github.com/poteto/poet/releases/latest/download/poet-linux-amd64
chmod +x poet
sudo mv poet /usr/local/bin/
```

```powershell [Windows]
Invoke-WebRequest -Uri https://github.com/poteto/poet/releases/latest/download/poet-windows-amd64.exe -OutFile poet.exe
Move-Item poet.exe "$env:USERPROFILE\AppData\Local\Microsoft\WindowsApps\"
```

:::

Verify: `poet --version`

You also need **Git** and at least one agent CLI. Then follow the steps in [INSTALL.md](https://github.com/poteto/poet/blob/main/INSTALL.md) manually.

:::

## Run `poet start` and watch it work

Run:

```sh
poet start
```

This launches the poet loop and a local web UI so you can monitor what's happening. The poet loop works in three phases:

1. **Schedule**: the scheduler reads the backlog and writes orders.
2. **Execute**: Poet spawns an agent in its own worktree. The agent runs the assigned skill and commits.
3. **Merge**: in `auto` mode, completed work merges back automatically. In `supervised` or `manual` mode, the worktree is left for your review.

This keeps going until the backlog is empty or you stop it.

## Review the output

After an agent finishes:

- **Commits** appear on the agent's branch. Each agent gets its own worktree, so concurrent work stays isolated.
- **Web UI** shows a live event feed, the order queue, and stage status for each session. In `supervised` or `manual` mode, the reviews page lets you approve or reject work before it merges.
- **Backlog updates**: completed items get marked done in the backlog.

Run `poet status` to see the current poet loop state from the terminal.

## Next steps

- [FAQ](/reference/faq): common questions about Poet
- [Skills](/concepts/skills): how to write and compose skills
- [Scheduling](/concepts/scheduling): how the scheduler decides what to do
- [Brain](/concepts/brain): optional persistent memory vault
- [Glossary](/reference/glossary): quick reference for Poet terminology
- [Configuration](/reference/configuration): all config options
- [Cookbook](/cookbook/): patterns and recipes to copy
