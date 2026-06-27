@AGENTS.md

<!-- BEGIN:playboard-sot-notice -->
# PlayBoard SoT — 이중 고지

이 repo는 `/playboard` 아래 **레지스트리 파생 단일 진실 공급원(PlayBoard)** 을 운영한다.
전체 운영 규칙은 `AGENTS.md` 의 "PlayBoard — 기획·구현·운영 통합 SoT" 절을 따른다(이 파일과 이중 명시).

핵심만:
- 사실은 `src/playboard/registry/*.ts` 한 곳에만. 표면은 모두 파생(제1원칙). 하드코딩 목록 금지.
- 요구사항·상태·정책·디자인 변경은 **같은 PR에서 레지스트리와 함께** 갱신.
- 머지 전 `npm test`(무결성 불변식) **green** 필수 + `playboard-integrity` GO.
- PlayBoard 는 production 기본 비공개(노출 게이트). 공유는 프리뷰 URL.
<!-- END:playboard-sot-notice -->
