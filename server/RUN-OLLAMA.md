# Ollama 실행 가이드

## 1. Ollama 실행
```bash
ollama serve
```

## 2. 모델 준비
예시:
```bash
ollama pull qwen2.5:7b
```

## 3. 브리지 실행
```bash
cd server
npm install
npm start
```

## 4. 브리지 확인
브라우저 또는 curl:
```bash
curl http://127.0.0.1:8787/health
```

정상 응답이면 웹앱에서 턴 종료 시 LLM 브리핑이 자동으로 붙습니다.
