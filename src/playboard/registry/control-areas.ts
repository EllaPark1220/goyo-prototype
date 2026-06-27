import type { ControlArea } from "../types";

/**
 * 제어 영역 레지스트리 — 6 횡단 비기능 정책 축.
 * standards[].path 는 실재 파일만(무결성 불변식이 존재 검증).
 * 해소 안 된 결정은 gaps[]에 정직하게(빈 갭 ≠ 갭 없음).
 */
export const CONTROL_AREAS: ControlArea[] = [
  {
    area: "auth",
    goal: "인증·접근제어를 일관 정책으로 잠근다.",
    summary:
      "로그인·세션·역할 게이트의 단일 기준. 현재 로그인은 UI만 존재하고 실제 인증 백엔드와 관리자 역할 게이트가 미구현 상태다.",
    policies: [
      {
        statement: "운영자 라우트는 역할 게이트 뒤에 둔다.",
        detail:
          "`/admin/*`는 운영자 세션이 없으면 접근 불가여야 한다(현재 미구현 — gaps).",
      },
    ],
    decisions: [
      { name: "1차 인증 수단", value: "카카오 OAuth (이메일 폴백)" },
    ],
    standards: [],
    workItems: ["W10", "W12"],
    gaps: [
      "카카오 OAuth 실연동 미정(W10)",
      "관리자 라우트 역할 가드 부재(W12)",
      "세션 만료·재발급 정책 미정",
    ],
  },
  {
    area: "privacy",
    goal: "개인정보 수집·동의를 최소·투명하게 처리한다.",
    summary:
      "이메일·닉네임·학습 진척 등 개인 데이터의 수집 범위와 동의 처리 기준. 현재 동의 UI는 있으나 동의 로그 저장과 보관 정책이 미정이다.",
    policies: [
      {
        statement: "결제 정보는 일절 수집하지 않는다.",
        detail: "서비스 정체성(광고·결제 없음)에 따라 결제 수단 입력 폼을 두지 않는다.",
      },
    ],
    decisions: [{ name: "수집 항목", value: "이메일·닉네임·학습 진척" }],
    standards: [],
    workItems: ["W10", "W11"],
    gaps: [
      "이메일·닉네임 보관 기간 정책 미정",
      "약관/개인정보 동의 로그 저장 미구현",
    ],
  },
  {
    area: "content",
    goal: "콘텐츠·저작권을 CC BY-NC-SA 4.0 기준으로 운영한다.",
    summary:
      "강의 영상·용어·교사 자료의 라이선스와 출처 표기 기준. 영상은 YouTube 임베드, 교사 자료는 PDF 배포를 따른다.",
    policies: [
      {
        statement: "모든 배포물에 CC BY-NC-SA 4.0을 표기한다.",
        detail: "랜딩·레슨·교사 자료 푸터에 라이선스를 명시한다.",
      },
      {
        statement: "영상 임베드는 추적 최소 모드를 쓴다.",
        detail: "youtube-nocookie 도메인으로 임베드하고 폴백 링크를 제공한다.",
      },
    ],
    decisions: [
      { name: "라이선스", value: "CC BY-NC-SA 4.0" },
      { name: "영상 임베드", value: "youtube-nocookie" },
    ],
    standards: [],
    workItems: ["W13", "W14"],
    gaps: ["교사 자료 PDF 버전 관리 정책 미정"],
  },
  {
    area: "a11y",
    goal: "접근성 기본기를 전 화면에서 유지한다.",
    summary:
      "skip 링크·포커스 링·모션 감소·글자 크기 토글 등 접근성 정책. VDS 토큰(globals.css)에 포커스/모션 정책이 코드로 잠겨 있다.",
    policies: [
      {
        statement: "outline:none 금지, 포커스 링을 항상 둔다.",
        detail: ":focus-visible에 3px 액센트 아웃라인(globals.css).",
      },
      {
        statement: "prefers-reduced-motion을 존중한다.",
        detail: "모션 감소 설정 시 애니메이션·트랜지션을 0.001ms로 차단.",
      },
    ],
    decisions: [{ name: "최소 본문 글자", value: "16px (토글 확대 지원)" }],
    standards: [
      { title: "접근성·모션 정책 (VDS)", path: "src/app/globals.css" },
    ],
    workItems: ["W15"],
    gaps: ["자동 a11y 검사(axe 등) 파이프라인 부재"],
  },
  {
    area: "observability",
    goal: "학습·운영 행동을 계측해 의사결정에 쓴다.",
    summary:
      "퀴즈 완료·구독·다운로드·운영 액션 등 핵심 이벤트의 계측 스키마. 현재 이벤트는 정의만 있고 실제 수집 파이프라인이 없다.",
    policies: [
      {
        statement: "개인 식별 없이 집계 가능한 이벤트만 수집한다.",
        detail: "PII를 이벤트 페이로드에 넣지 않는다.",
      },
    ],
    decisions: [],
    standards: [],
    workItems: ["W16"],
    gaps: [
      "분석 이벤트 스키마 미확정",
      "수집·적재 파이프라인 미구축(전 화면 telemetryEvents 미연동)",
    ],
  },
  {
    area: "delivery",
    goal: "배포·노출을 환경별로 안전하게 통제한다.",
    summary:
      "프리뷰/프로덕션 노출 분리와 배포 파이프라인 기준. PlayBoard 자체는 production 기본 비공개(노출 게이트)로 운영한다.",
    policies: [
      {
        statement: "PlayBoard는 production에서 기본 비공개(404)다.",
        detail:
          "`VERCEL_ENV !== 'production' || PROTOTYPE_ENABLED === 'true'` 일 때만 노출.",
      },
      {
        statement: "외부 공유는 프리뷰 배포 URL로 한다.",
        detail: "문서 export 금지 — 항상 살아있는 보드를 본다.",
      },
    ],
    decisions: [
      { name: "노출 플래그", value: "PROTOTYPE_ENABLED" },
      { name: "환경 판정", value: "VERCEL_ENV" },
    ],
    standards: [
      { title: "PlayBoard 빌드 계획·노출 게이트", path: "PLAYBOARD_BUILD_PLAN.md" },
      { title: "Next 설정", path: "next.config.ts" },
    ],
    workItems: [],
    gaps: ["프로덕션 배포 검증 자동화 부재(최근 stale 배포 이슈)"],
  },
];

export const getControlArea = (id: string): ControlArea | undefined =>
  CONTROL_AREAS.find((a) => a.area === id);

export const CONTROL_AREA_IDS = CONTROL_AREAS.map((a) => a.area);
