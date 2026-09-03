# CLI Reference

All commands accept the global `--project-dir` flag. When omitted, Poet uses the current directory (or the `POET_PROJECT_DIR` environment variable).

## Global flags

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--project-dir` | string | current directory | Project directory. Also settable via `POET_PROJECT_DIR` |

---

## `poet start`

Start the poet loop. Spawns agent sessions and manages the full lifecycle.

Auto-starts a web server on port 3000 (configurable via `[server]`). Opens a browser unless `POET_NO_BROWSER=1` is set.

```
poet start [flags]
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--once` | bool | `false` | Run one scheduling cycle and exit |

---

## `poet status`

Show compact runtime status. Prints active agent count, orders queue depth, and poet loop state (running, paused, draining, or idle).

```
poet status
```

---

## `poet skills`

List resolved skills.

```
poet skills
```

### `poet skills list`

List all resolved skills.

```
poet skills list
```

---

## `poet schema`

Print generated schema docs for Poet runtime contracts. Takes an optional target argument.

```
poet schema [target]
```

### `poet schema list`

List available schema targets.

```
poet schema list
```

---

## `poet worktree`

Manage linked git worktrees. Poet uses worktrees to isolate concurrent agent sessions so they don't conflict on the working tree.

### `poet worktree create`

Create a new linked worktree.

```
poet worktree create <name> [flags]
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--from` | string | `HEAD` | Branch or commit to base the new worktree on |

### `poet worktree exec`

Run a command inside a worktree. Sets the working directory to the worktree path before executing.

```
poet worktree exec <name> <command...>
```

### `poet worktree merge`

Merge a worktree branch into a target branch.

```
poet worktree merge <name> [flags]
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--into` | string | integration branch | Target branch to merge into |

### `poet worktree cleanup`

Remove a worktree without merging.

```
poet worktree cleanup <name> [flags]
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--force` | bool | `false` | Remove even when unmerged commits exist |

### `poet worktree list`

List all worktrees with merge status.

```
poet worktree list
```

### `poet worktree prune`

Remove merged and patch-equivalent worktrees.

```
poet worktree prune
```

### `poet worktree hook`

Run worktree session hook. Used internally by agent sessions.

```
poet worktree hook
```

---

## `poet event`

Manage poet loop events.

### `poet event emit`

Emit an external event into the poet loop or a specific session.

```
poet event emit <type> [flags]
```

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--payload` | string | — | Event payload as JSON |
| `--session` | string | — | Session ID. When set, writes to the session event log instead of the poet loop event log |

---

## `poet reset`

Clear all runtime state. Removes and recreates the runtime directory.

Refuses to run if Poet is currently running (checks the lock file).

```
poet reset
```
