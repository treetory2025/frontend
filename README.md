## 🚀 Tech Stack

### Environment

- Node: 20 (LTS)
- Build Tool: Vite
- Package Manager: Npm

### Core

- Framework: Next.js 16 (App Router)
- Language: TypeScript 5

### State / Data

- Client State: Zustand
- Server State: React Query

### Styling & Animation

- UI Styling: Tailwind CSS
- Animation: Framer Motion

### Validation

- zod : 입력/요청 유효성 검사
- luxon : 날짜/시간 포맷 및 유효성 관리

### Features

- 장식 렌더링: react-konva
- 트리 확대/이동 제스처: react-zoom-pan-pinch
- 이미지 캡쳐: html2canvas
- 이미지 업로드 / 저장: AWS S3
- OAuth 로그인: NextAuth

### Development Quality

- Linting: ESLint
- Formatting: Prettier
- Testing: Jest

<br>
<hr>

## 📁 Folder Structure

```markup
treetory/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                           # 랜딩 페이지
│   │   ├── tutorial/page.tsx                  # 공개 트리 둘러보기
│   │   └── layout.tsx
│   │
│   ├── (tree)/
│   │   ├── [treeId]/
│   │       ├── page.tsx                       # 트리 화면 (Konva)
│   │       ├── ornaments/
│   │       │   ├── page.tsx                   # 장식 목록 조회
│   │       │   ├── layout.tsx
│   │
│   │       ├── decorate/                      #  장식하기 플로우
│   │       │   ├── page.tsx                   # Step 1. 전체 조회 + 검색 + 이미지 업로드
│   │       │   ├── nickname/page.tsx          # Step 2. 닉네임 입력
│   │       │   ├── guide/page.tsx             # Step 3. 안내 화면
│   │       │   ├── letter/page.tsx            # Step 4. 편지 작성
│   │       │   └── position/page.tsx          # Step 5. 위치 배치(Konva)
│   │       └── layout.tsx
│   │
│   ├── (settings)/
│   │   ├── page.tsx                           #  Settings 단일 페이지 (닉네임/테마/탈퇴/안내)
│   │   ├── theme/page.tsx                     # 테마 설정
│   │   ├── withdrawal/page.tsx                # 회원 탈퇴
│   │   └── about/page.tsx                     # 개발자 안내 / 서비스 정보 (SSG)
│   │
│   ├── api/
│   │   ├── oauth/
│   │   │   ├── login/route.ts               # OAuth redirect
│   │   │   └── callback/route.ts            # OAuth callback → 토큰 발급 + 쿠키
│   │   │
│   │   ├── users/
│   │   │   ├── me/route.ts                  # 내 정보 조회
│   │   │   └── nickname/route.ts            # 닉네임 변경
│   │   │
│   │   ├── trees/
│   │   │   ├── route.ts                     # 트리 조회
│   │   │   └── [treeId]/
│   │   │       ├── route.ts                 # 트리 상세 조회/삭제
│   │   │       └── ornaments/
│   │   │           └──route.ts              # 장식 목록 조회/ 장식 삭제
│   │   │           └──messageroute.ts       # 편지 목록 조회
│   │   │
│   │   └── ornaments/
│   │      └── route.ts                     # 오너먼트 조회
│   │       └── [ornamentId]/route.ts        # 오너먼트 상세 정보
│   │       └── upload/route.ts                  # 이미지 업로드
│   │
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                                    # Tailwind 기반 자체 UI
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Modal.tsx
│   │   ├── BottomSheet.tsx
│   │   ├── Divider.tsx
│   │   └── Toast.tsx
│   │
│   ├── tree/                                  # Konva 기반 트리 UI
│   │   ├── TreeCanvas.tsx
│   │   ├── OrnamentRenderer.tsx
│   │   ├── OrnamentDraggable.tsx
│   │   ├── CollisionGuide.tsx
│   │   └── TreeInfoBar.tsx
│   │
│   ├── ornaments/
│   │   ├── OrnamentPreview.tsx
│   │   ├── OrnamentList.tsx
│   │   ├── OrnamentCard.tsx
│   │   ├── FrameSelector.tsx
│   │   ├── ImageUploader.tsx
│   │   └── LetterEditor.tsx
│   │
│   ├── settings/
│   │   ├── NicknameForm.tsx                   # 닉네임 변경 UI
│   │   ├── ThemeLink.tsx
│   │   ├── WithdrawalLink.tsx
│   │   └── AboutLink.tsx
│   │
│   └── common/
│       ├── Header.tsx
│       ├── Navigation.tsx
│       ├── Footer.tsx
│       └── [...]
│
├── hooks/
│   ├── useOrnamentFlow.ts
│   ├── useTree.ts
│   ├── useKonvaCollision.ts
│   ├── useModal.ts
│   ├── useToast.ts
│   └── useAuth.ts
│
├── types/
│   ├── tree.ts
│   ├── ornament.ts
│   ├── user.ts
│   ├── settings.ts
│   └── letter.ts
│
├── public/
│   ├── frames/
│   ├── tree/
│   ├── ornaments/
│   └── icons/
└── tailwind.config.ts

```
