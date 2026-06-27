# kimi-loop-skill

Kimi Code CLI용 `/loop` skill입니다.

원본 [Qwen Code `loop` 스킬](https://github.com/QwenLM/qwen-code)을 참고하여 작성했으며, Kimi Code CLI 환경에 맞게 `LoopWakeup`을 제외하고 `CronCreate`/`CronList`/`CronDelete`만 사용하도록 조정했습니다.

## 설치

```bash
mkdir -p ~/.config/agents/skills/loop
cp skills/loop/SKILL.md ~/.config/agents/skills/loop/
```

## 사용법

```text
/loop 5m check the build
/loop check the PR every 30m
/loop list
/loop clear
```

## 구조

```text
skills/loop/
├── SKILL.md        # 스킬 정의
└── SKILL.test.ts   # 구조 검증 테스트
```

## 주의

- 이 skill은 **skill**이지 **plugin**이 아닙니다.
- `kimi plugin install`로 설치할 수 없습니다.
- Kimi Code CLI의 `~/.config/agents/skills/` 디렉토리에 직접 복사해야 합니다.
