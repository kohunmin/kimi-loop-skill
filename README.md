# kimi-loop-skill

Kimi Code CLI용 `/loop` skill plugin 패키지입니다.

원본 [Qwen Code `loop` 스킬](https://github.com/QwenLM/qwen-code)을 참고하여 작성했으며, Kimi Code CLI 환경에 맞게 `LoopWakeup`을 제외하고 `CronCreate`/`CronList`/`CronDelete`만 사용하도록 조정했습니다.

## 설치

### 1. Plugin으로 설치 (권장)

```bash
kimi plugin install https://github.com/kohunmin/kimi-loop-skill.git
```

### 2. Skill 파일 설치

plugin 설치 후 Kimi Code CLI에서 다음 tool을 실행하면 skill이 `~/.config/agents/skills/loop/`에 복사됩니다.

```text
/install_loop_skill
```

또는 직접 복사할 수도 있습니다.

```bash
mkdir -p ~/.config/agents/skills/loop
curl -L https://raw.githubusercontent.com/kohunmin/kimi-loop-skill/main/skills/loop/SKILL.md \
  -o ~/.config/agents/skills/loop/SKILL.md
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
kimi-loop-skill/
├── plugin.json           # Plugin manifest
├── scripts/
│   └── install.sh        # Skill installer tool
├── skills/loop/
│   ├── SKILL.md          # Skill definition
│   └── SKILL.test.ts     # Structure verification test
└── README.md
```

## 주의

- `/loop`는 Kimi Code CLI 낹부의 cron 도구를 사용하므로 본질적으로 **skill**입니다.
- 이 plugin 패키지는 skill을 설치하기 위한 wrapper 역할을 합니다.
- plugin 설치 후 반드시 `install_loop_skill` tool을 실행하거나 skill 파일을 수동 복사해야 `/loop`가 동작합니다.
