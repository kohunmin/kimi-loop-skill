#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_SRC="${SCRIPT_DIR}/../skills/loop/SKILL.md"
SKILL_DST="${HOME}/.config/agents/skills/loop"

mkdir -p "${SKILL_DST}"
cp "${SKILL_SRC}" "${SKILL_DST}/SKILL.md"

echo "{\"content\": \"Installed loop skill to ${SKILL_DST}\"}"
