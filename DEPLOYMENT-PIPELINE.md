# CI/CD Pipeline

## 목표
- `main` 브랜치에 반영된 게임 변경사항을 자동 검증 후 배포한다.
- 위험한 자동 기능 생성은 하지 않고, 이미 커밋된 변경을 테스트/빌드/배포한다.

## 현재 구성
- GitHub Actions
- GitHub Pages
- 정적 사이트 빌드 산출물: `ai-grand-strategy-mvp/dist`

## 트리거
- `main` 브랜치 push
- 수동 실행 `workflow_dispatch`

## 파이프라인 순서
1. 체크아웃
2. Node 설정
3. `npm install`
4. `npm test`
5. `npm run build`
6. GitHub Pages artifact 업로드
7. Pages 배포

## 운영 메모
- 이 프로젝트는 정적 프론트엔드이므로 Pages가 가장 단순하고 적합하다.
- 향후 로컬 LLM 백엔드가 붙으면 프론트와 백엔드 파이프라인을 분리해야 한다.
- 신규 기능은 사람이 커밋하고, CI/CD는 이를 자동 검증 및 배포한다.
