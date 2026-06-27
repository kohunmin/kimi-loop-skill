/**
 * @license
 * Copyright 2026 Qwen
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

function loadLoopSkill() {
  const skillPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'SKILL.md',
  );
  const content = fs.readFileSync(skillPath, 'utf8');
  return { content };
}

describe('loop skill for Kimi Code CLI', () => {
  it('uses only cron tools', () => {
    const { content } = loadLoopSkill();

    expect(content).toContain('- cron_create');
    expect(content).toContain('- cron_list');
    expect(content).toContain('- cron_delete');
    expect(content).not.toContain('loop_wakeup');
  });

  it('documents list and clear subcommands', () => {
    const { content } = loadLoopSkill();

    expect(content).toContain('**`list`**');
    expect(content).toContain('**`clear`**');
    expect(content).toContain('call CronDelete for every job returned');
  });

  it('documents fixed-interval recurring path', () => {
    const { content } = loadLoopSkill();

    expect(content).toContain('## Fixed-interval recurring path');
    expect(content).toContain('Call CronCreate with:');
    expect(content).toContain('recurring`: `true`');
  });
});
