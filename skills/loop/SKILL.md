---
name: loop
description: Use when you need to run a prompt repeatedly on a fixed schedule. Examples - /loop 5m check the build, /loop check the PR every 30m.
argument-hint: '[interval] [prompt] | list | clear'
allowedTools:
  - cron_create
  - cron_list
  - cron_delete
---

# /loop — run a prompt on a schedule

## Subcommands

If the input (after stripping the `/loop` prefix) is exactly one of these keywords, run the subcommand:

- **`list`** — call CronList and display the results. Done.
- **`clear`** — call CronList, then call CronDelete for every job returned. Confirm how many were cancelled. Done.

## Parsing

Parse the input after removing the `/loop` prefix:

1. **Empty input**: show usage `/loop [interval] [prompt]` and stop.
2. **Leading interval token**: if the first whitespace-delimited token matches `^\d+[smhd]$` (e.g. `5m`, `2h`), this is the recurring path. The rest is the prompt.
3. **Trailing "every" clause**: otherwise, if the input ends with `every <N><unit>` or `every <N> <unit-word>` (e.g. `every 20m`, `every 5 minutes`), this is the recurring path. Extract that interval and strip it from the prompt. Only match when what follows "every" is a time expression — `check every PR` has no interval.
4. **Prompt-only input**: otherwise, show usage because this Kimi Code CLI version does not support the self-paced wakeup path.

If the resulting prompt is empty, show usage and stop.

Examples:

- `5m /babysit-prs` → fixed interval `5m`, prompt `/babysit-prs` (leading interval token)
- `check the deploy every 20m` → fixed interval `20m`, prompt `check the deploy` (trailing "every" clause)
- `run tests every 5 minutes` → fixed interval `5m`, prompt `run tests` (trailing "every" clause)
- `check every PR` → show usage (no interval; prompt-only path is not supported here)
- `check the deploy` → show usage (no interval)
- `5m` → empty prompt → show usage

## Fixed-interval recurring path

Use this path only for inputs with a leading interval token or a trailing "every" clause.

### Interval to cron

Supported suffixes: `s` (seconds, rounded up to nearest minute, min 1), `m` (minutes), `h` (hours), `d` (days). Convert:

| Interval pattern   | Cron expression        | Notes                                     |
| ------------------ | ---------------------- | ----------------------------------------- |
| `Nm` where N <= 59 | `*/N * * * *`          | every N minutes                           |
| `Nm` where N >= 60 | `0 */H * * *`          | round to hours (H = N/60, must divide 24) |
| `Nh` where N <= 23 | `0 */N * * *`          | every N hours                             |
| `Nd`               | `0 0 */N * *`          | every N days at midnight local            |
| `Ns`               | treat as `ceil(N/60)m` | cron minimum granularity is 1 minute      |

If the interval does not cleanly divide its unit (for example `7m` gives uneven gaps at `:56` to `:00`, or `90m` is 1.5 hours which cron cannot express), pick the nearest clean interval and tell the user what you rounded to before scheduling.

### Action

1. Call CronCreate with:
   - `cron`: the expression from the table above
   - `prompt`: the parsed prompt from above, verbatim (slash commands are passed through unchanged)
   - `recurring`: `true`
2. Briefly confirm: what is scheduled, the cron expression, the human-readable cadence, that recurring tasks auto-expire after 7 days, and that they can cancel sooner with CronDelete (include the job ID).
3. Then immediately execute the parsed prompt now. Do not wait for the first cron fire.
   - If it is a slash command, invoke it via the Skill tool.
   - Otherwise, act on it directly.
