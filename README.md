# ITMS (지능형 테스트 관리 시스템) - 데스크톱 앱

## 🚀 프로젝트 개요

ITMS는 테스트 계획, 실행, 결과 추적 및 결함 관리를 간소화하는 데스크톱 애플리케이션입니다. 사용자 친화적인 UX와 AI 기반 통찰력을 결합하여 QA 생산성을 높이고 소프트웨어 품질을 향상하며 팀 간 협업을 개선하는 것을 목표로 합니다.

### 🎯 주요 목표
- **40%** 테스트 준비 시간 단축
- **30%** 결함 처리 시간 단축  
- **≥90%** 주간 활성 QA 사용자 달성
- **<2초** 평균 화면 응답 시간 (5천 동시 케이스 처리 시)

## 🛠️ 기술 스택

### 프론트엔드
- **Electron** - 데스크톱 애플리케이션 프레임워크
- **React 18** - UI 라이브러리
- **Redux Toolkit** - 상태 관리
- **Styled Components** - 스타일링
- **TypeScript** - 타입 안전성

### 백엔드
- **Node.js** - 런타임 환경
- **Express.js** - 웹 프레임워크
- **PostgreSQL** - 관계형 데이터베이스
- **Elasticsearch** - 검색 엔진
- **Passport.js** - 인증 미들웨어

### 개발 도구
- **Webpack** - 모듈 번들러
- **Jest** - 테스트 프레임워크
- **ESLint** - 코드 린팅
- **Cypress** - E2E 테스트
- **Storybook** - 컴포넌트 문서화

## 🚀 빠른 시작

### 필수 요구사항
- **Node.js** 18+ 
- **PostgreSQL** 12+
- **Elasticsearch** 7+ (선택사항)

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone <repository-url>
cd my-project

# 2. 의존성 설치
npm install

# 3. 환경 설정
cp env.example .env
# .env 파일에서 데이터베이스 설정 수정

# 4. 개발 서버 실행
npm run dev:stable
```

### 🎯 권장 실행 방법

```bash
# 가장 안정적인 방법 (권장)
npm run dev:stable

# 순차적 서비스 시작
npm run dev:sequential

# 문제 발생 시 완전 리셋
npm run dev:reset
```

## 📋 사용 가능한 스크립트

### 개발 스크립트
- `npm run dev:stable` - 안정적인 개발 환경 (권장)
- `npm run dev:sequential` - 순차적 서비스 시작
- `npm run dev:reset` - 완전 리셋 후 안정적 시작
- `npm run dev` - 기본 개발 환경
- `npm run dev:clean` - 프로세스 정리

### 빌드 스크립트
- `npm run build` - 프로덕션 빌드
- `npm run build:main` - 메인 프로세스 빌드
- `npm run build:all` - 전체 빌드

### 테스트 스크립트
- `npm run test` - 단위 테스트 실행
- `npm run test:watch` - 테스트 감시 모드
- `npm run test:coverage` - 테스트 커버리지

### 품질 관리
- `npm run lint` - 코드 린팅
- `npm run lint:fix` - 린팅 오류 자동 수정
- `npm run type-check` - 타입 체크

### 진단 및 유지보수
- `npm run diagnostic` - 환경 진단
- `npm run diagnostic:cleanup` - 환경 정리
- `npm run diagnostic:test` - 환경 테스트
- `npm run setup` - 개발 환경 설정

## 🏗️ 프로젝트 구조

```
src/
├── main/                    # Electron Main Process (Node.js 백엔드)
│   ├── app/
│   │   ├── domains/         # 도메인별 모듈
│   │   │   ├── testcases/   # 테스트 케이스 관리
│   │   │   ├── executions/  # 테스트 실행
│   │   │   ├── defects/     # 결함 관리
│   │   │   ├── releases/    # 릴리즈 관리
│   │   │   └── users/       # 사용자 관리
│   │   ├── infrastructure/  # 인프라 계층
│   │   └── utils/           # 유틸리티
│   ├── electron/            # Electron 설정
│   └── index.ts             # 백엔드 서버 시작점
├── renderer/                # Electron Renderer Process (React 프론트엔드)
│   ├── app/                 # React 앱
│   ├── features/            # 기능별 모듈
│   │   ├── TestCaseManagement/
│   │   ├── ExecutionManagement/
│   │   ├── ReleaseManagement/
│   │   └── Dashboard/
│   ├── shared/              # 공통 컴포넌트
│   ├── store/               # Redux 스토어
│   └── types/               # 타입 정의
└── types/                   # 전역 타입 정의
```

## 🔧 주요 기능

### 🧪 테스트 케이스 관리
- CRUD 작업 (생성, 조회, 수정, 삭제)
- 버전 이력 및 롤백
- 고급 검색 및 다중 필터
- 인라인 편집 지원

### 📊 테스트 실행 및 결과 기록
- 상태 선택 (Pass/Fail/Blocked/Untested)
- 실패 상세 정보 (재현 단계, 스크린샷, 로그)
- 오프라인 실행 → 재연결 시 자동 동기화

### 🚀 릴리즈 및 스위트 계획
- 릴리즈/반복 객체 정의
- 드래그 앤 드롭으로 케이스를 스위트에 추가
- 실행자, 환경, 마감일 할당

### 🐛 결함 관리 통합
- ITMS 내부 또는 Jira/Redmine으로 원클릭 결함 생성
- 양방향 상태 동기화
- REST API를 통한 외부 시스템 연동

### 📈 대시보드 및 보고서
- 실시간 차트 (진행률, 결함 밀도, 테스터 작업량)
- 드래그 앤 드롭으로 위젯 커스터마이징
- 3초 내 업데이트

### 👥 사용자 및 역할 관리
- 역할 기반 접근 제어 (RBAC)
- SAML/OAuth2를 통한 SSO
- 관리자, QA, 개발자, PM 역할

### 💬 협업 기능
- 케이스, 실행, 결함에 대한 댓글 및 @멘션
- 알림 센터 (인앱 + 이메일)

## 🔐 보안

### 인증 및 권한 관리
- 개별 사용자 식별 및 인증
- bcrypt를 사용한 비밀번호 해싱
- 계정 잠금 정책 (5회 실패 시 5분 잠금)
- 최소 권한 원칙 적용

### 데이터 보호
- AES-256 저장 암호화
- TLS 1.3 전송 암호화
- 민감 정보 마스킹
- OWASP Top 10 준수

### 로깅 및 감사
- 중요 활동 로그 기록
- 최소 1년간 로그 보관
- 표준화된 로그 형식

## 🧪 테스트

### 테스트 계정
- **아이디**: `admin`
- **비밀번호**: `admin123`

### 테스트 유형
- **단위 테스트**: Jest + React Testing Library
- **통합 테스트**: Supertest
- **E2E 테스트**: Cypress
- **접근성 테스트**: 자동화된 a11y 검사

## 🚨 문제 해결

### Electron 앱이 보이지 않는 경우
```bash
# 1. 모든 프로세스 정리
npm run dev:clean

# 2. 안정적인 환경으로 재시작
npm run dev:stable
```

### 포트 충돌 발생 시
```bash
# 포트 확인
lsof -i :4000
lsof -i :3000

# 강제 종료
lsof -ti:4000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### TypeScript 컴파일 에러
```bash
# 타입 체크
npm run type-check

# 린트 수정
npm run lint:fix
```

### 데이터베이스 연결 문제
```bash
# PostgreSQL 서비스 상태 확인
brew services list | grep postgresql

# PostgreSQL 재시작
brew services restart postgresql
```

## 📊 성능 지표

### 목표 성능
- **UI 응답 시간**: 평균 2초 미만
- **대량 임포트**: 10,000개 케이스 60초 미만
- **동시 사용자**: 500명 지원
- **데이터 처리**: 100만개 케이스 처리

### 모니터링
- p95 API 지연시간 < 300ms
- 오류율 < 0.1%
- 메모리 사용량 최적화

## 🔄 개발 워크플로우

### 코드 품질
- **Clean Code** 원칙 준수
- **TDD** (Test-Driven Development) 적용
- **Git Flow** 브랜치 전략
- **Conventional Commits** 메시지 규칙

### 코드 리뷰
- 모든 PR에 대한 코드 리뷰 필수
- 자동화된 테스트 및 린팅 통과
- 보안 취약점 검사

## 📈 로드맵

### Phase 1: MVP (완료)
- ✅ 핵심 테스트 케이스 관리
- ✅ 기본 실행 및 결과 기록
- ✅ Jira/Redmine 연동
- ✅ 기본 대시보드

### Phase 2: 기능 강화 (진행 중)
- 🔄 고급 검색 및 필터링
- 🔄 오프라인 모드 지원
- 🔄 사용자 정의 위젯
- 🔄 알림 시스템

### Phase 3: AI 기능 (계획)
- 🤖 AI 기반 케이스 생성 제안
- 🤖 영향 분석 및 회귀 스위트 추천
- 🤖 실패 핫스팟 예측
- 🤖 위험 기반 테스트 우선순위

## 🤝 기여하기

### 개발 환경 설정
```bash
# 1. 포크 및 클론
git clone <your-fork-url>
cd my-project

# 2. 개발 브랜치 생성
git checkout -b feature/your-feature-name

# 3. 개발 및 테스트
npm run dev:stable
npm run test

# 4. 커밋 및 푸시
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 커밋 메시지 규칙
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

## 📞 지원

### 문서
- [API 문서](./docs/api.md)
- [사용자 가이드](./docs/user-guide.md)
- [개발자 가이드](./docs/developer-guide.md)

### 이슈 리포트
- [GitHub Issues](https://github.com/your-org/itms-desktop/issues)
- [기능 요청](https://github.com/your-org/itms-desktop/issues/new?template=feature_request.md)
- [버그 리포트](https://github.com/your-org/itms-desktop/issues/new?template=bug_report.md)

## 📄 라이선스

이 프로젝트는 [ISC 라이선스](LICENSE) 하에 배포됩니다.

---

**ITMS** - 지능형 테스트 관리 시스템으로 QA 생산성을 혁신하세요! 🚀 
