// PlayBoard 하이브리드 캡처 파이프라인 (스펙 §8) — 실행은 후순위(Playwright 도입 시).
//
// 사용: 1) dev 서버 기동 (npm run dev, PROTOTYPE_ENABLED 불필요 — 로컬 자동 노출)
//       2) npx playwright install chromium  (최초 1회)
//       3) node scripts/capture.mjs
//
// 동작: 각 산출물 화면의 데모 라우트(/playboard/screens/:plane/:slug)를 고정 뷰포트로 열어
//       fullPage 스크린샷을 public/playboard/captures/:plane/:slug.png 로 저장한다.
//       (보호 라우트가 생기면 개발 전용 로그인으로 운영자 세션을 먼저 확보)
//
// SoT: 화면 목록은 src/playboard/registry/screens.ts 에서 파생한다.
//      이 스크립트는 그 키 목록만 알면 되므로, 빌드 산출물이나 별도 매니페스트에서 읽도록
//      확장할 수 있다. 아래는 수동 동기화 목록(레지스트리와 함께 갱신).

import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const BASE = process.env.PLAYBOARD_BASE ?? "http://localhost:3000";
const VIEWPORT = { width: 1280, height: 900 };

// DERIVED FROM src/playboard/registry/screens.ts — keep in sync (동시 갱신 규칙).
const SCREEN_KEYS = [
  "learner/landing",
  "learner/lesson",
  "learner/dictionary",
  "learner/stamp-map",
  "learner/auth",
  "operator/teacher-kit",
  "operator/admin-dashboard",
  "system/not-found",
];

async function main() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.error(
      "[capture] Playwright 미설치. `npm i -D playwright && npx playwright install chromium` 후 재실행.",
    );
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: VIEWPORT });

  for (const key of SCREEN_KEYS) {
    const url = `${BASE}/playboard/screens/${key}`;
    const out = resolve("public/playboard/captures", `${key}.png`);
    await mkdir(dirname(out), { recursive: true });
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
      // 개발 인디케이터 숨김 (결과물 오염 방지)
      await page.addStyleTag({
        content: "nextjs-portal,#__next-build-watcher{display:none!important}",
      });
      await page.screenshot({ path: out, fullPage: true });
      console.log(`[capture] ✓ ${key}`);
    } catch (e) {
      console.warn(`[capture] ✗ ${key} — ${e.message}`);
    }
  }

  await browser.close();
}

main();
