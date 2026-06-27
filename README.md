# kimi-loop-skill

Kimi Code CLI용 `/loop` skill plugin입니다.

원본 [Qwen Code `loop` 스킬](https://github.com/QwenLM/qwen-code)을 참고하여 작성했으며, Kimi Code CLI 환경에 맞게 `LoopWakeup`을 제외하고 `CronCreate`/`CronList`/`CronDelete`만 사용하도록 조정했습니다.

## 설치

```bash
kimi plugin install https://github.com/kohunmin/kimi-loop-skill.git
```

또는 Kimi Code CLI 낲부에서:

```text
/plugins
```

Marketplace에서 `kimi-loop-skill`을 찾아 설치한 후 `/reload`를 실행합니다.

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
├── kimi.plugin.json      # Kimi Code CLI plugin manifest
├── skills/
│   └── loop/
│       ├── SKILL.md      # Skill definition
│       └── SKILL.test.ts # Structure verification test
└── README.md
```

## 참고

- `/loop`은 Kimi Code CLI 납부의 `CronCreate`/`CronList`/`CronDelete`를 사용합니다.
- 이 패키지는 Kimi Code CLI plugin 형식(`kimi.plugin.json`)으로 skill을 배포합니다.
