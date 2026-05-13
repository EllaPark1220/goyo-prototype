'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-accent-darkest text-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-5 py-4 md:px-10 md:py-5 flex justify-between items-center backdrop-blur-md bg-[rgba(10,58,66,0.28)] border-b border-white/10 saturate-150">
        <div className="font-serif font-semibold text-[17px] tracking-tight drop-shadow-md">
          고요의 경제나루
        </div>
        <div className="flex gap-4 md:gap-7 items-center">
          <Link href="/" className="text-[13px] md:text-sm text-white/90 font-medium hover:text-white hover:-translate-y-[1px] transition-all drop-shadow-md">HOME</Link>
          <Link href="/dictionary" className="text-[13px] md:text-sm text-white/90 font-medium hover:text-white hover:-translate-y-[1px] transition-all drop-shadow-md">INDEX</Link>
          <Link href="/stamp-map" className="text-[13px] md:text-sm text-white/90 font-medium hover:text-white hover:-translate-y-[1px] transition-all drop-shadow-md">STAMP MAP</Link>
          <Link href="/login" className="text-[13px] md:text-sm text-white/90 font-medium hover:text-white hover:-translate-y-[1px] transition-all drop-shadow-md">로그인</Link>
        </div>
      </nav>

      {/* STAGE 1 */}
      <section className="relative min-h-screen overflow-hidden bg-[#0A3A42] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden z-0">
          <img
            src="https://images.unsplash.com/photo-1742075292207-0b480220556d?fm=jpg&q=85&w=2400&auto=format&fit=crop"
            alt="햇빛에 반짝이는 물 표면의 윤슬"
            className="w-full h-full object-cover object-center"
            style={{ animation: 'kenBurnsClose 36s ease-in-out infinite alternate', willChange: 'transform' }}
          />
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.35) 100%), linear-gradient(180deg, rgba(10,58,66,0.25) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 60%, rgba(220,234,238,0.85) 100%)'
        }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[880px] h-[380px] md:h-[460px] z-20 pointer-events-none blur-[40px]" style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%)'
        }}></div>

        <div className="relative z-30 flex flex-col items-center text-center px-6 md:px-10 max-w-[860px]">
          <div className="font-mono text-[11px] tracking-[0.32em] text-white/90 uppercase font-semibold mb-8 drop-shadow-lg opacity-0" style={{ animation: 'fadeUp 1.4s ease-out 0.4s forwards' }}>
            고요의 경제나루
          </div>
          <h1 className="font-serif font-bold text-[34px] md:text-[min(5.5vw,60px)] leading-tight tracking-tight mb-7 drop-shadow-xl opacity-0" style={{ animation: 'fadeUp 1.4s ease-out 0.6s forwards' }}>
            광고도 결제도 없이,<br/>차근차근 경제를 배우다
          </h1>
          <p className="font-sans text-[15px] md:text-[min(1.5vw,17px)] text-white/95 leading-relaxed mb-11 max-w-[520px] drop-shadow-lg opacity-0" style={{ animation: 'fadeUp 1.4s ease-out 0.8s forwards' }}>
            5권 133편으로 천천히 흐르는 경제 강의.<br/>당신의 속도에 맞춰 시작하세요.
          </p>
          <div className="flex flex-col md:flex-row gap-3 opacity-0 w-full md:w-auto max-w-[280px] md:max-w-none" style={{ animation: 'fadeUp 1.4s ease-out 1.0s forwards' }}>
            <Link href="/lesson/L001" className="flex items-center justify-center px-8 py-4 bg-accent-main text-white font-semibold rounded-xl transition-all hover:bg-accent-deep hover:-translate-y-0.5 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_18px_40px_-14px_rgba(26,142,156,0.7)] tracking-wide group">
              <span className="mr-2">1권 1편 시작하기</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
            <Link href="#stage-3" className="flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/45 backdrop-blur-md transition-all hover:bg-white/20 hover:border-white hover:-translate-y-0.5 tracking-wide">
              커리큘럼 여정 보기
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center gap-2.5 opacity-0" style={{ animation: 'fadeIn 1s ease-out 1.6s forwards, gentleBob 3s ease-in-out 2.6s infinite' }}>
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/85 uppercase drop-shadow-md">SCROLL</div>
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/75"></div>
        </div>

        <div className="absolute bottom-3.5 right-4 md:right-5 z-10 font-mono text-[9px] text-white/45 uppercase tracking-widest">
          Photo · <a href="https://unsplash.com/@neoleephoto" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">Neo Lee</a> · Unsplash
        </div>
      </section>

      {/* STAGE 2 */}
      <section className="relative px-6 py-20 md:px-10 md:py-32 text-text-main" style={{
        background: 'linear-gradient(180deg, var(--water-light) 0%, var(--bg-light) 30%, var(--water-card) 100%)'
      }}>
        <div className="max-w-[1100px] mx-auto">
          <div ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="font-mono text-[11px] tracking-[0.3em] text-accent-deep uppercase font-semibold mb-5 text-center">WHAT WE OFFER</div>
            <h2 className="font-serif font-semibold text-[28px] md:text-[min(4.2vw,44px)] leading-tight tracking-tight mb-4 text-center">차분히 배울 수 있는<br/>여섯 가지 도구</h2>
            <p className="font-sans text-[15px] md:text-[min(1.4vw,16.5px)] text-text-soft leading-relaxed max-w-[580px] mx-auto text-center mb-16">
              강요하지 않고, 흐름을 끊지 않으며,<br/>당신이 멈추고 싶을 때 멈출 수 있도록.
            </p>
          </div>

          <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100">
            {/* Cards */}
            <div className="bg-white border border-line-light rounded-[18px] p-7 md:p-9 transition-all duration-400 hover:-translate-y-1 hover:border-accent-soft hover:shadow-[0_24px_48px_-24px_rgba(26,142,156,0.25)]">
              <svg className="w-11 h-11 mb-5 text-accent-main" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="6" y="10" width="36" height="24" rx="3"/>
                <path d="M20 18 L28 22 L20 26 Z" fill="currentColor"/>
                <line x1="14" y1="40" x2="34" y2="40"/>
              </svg>
              <h3 className="font-serif font-semibold text-[19px] text-text-main tracking-tight mb-3">133편의 영상 강의</h3>
              <p className="font-sans text-sm text-text-soft leading-relaxed">5권에 걸쳐 차근차근 풀어가는 영상. 빠른 진도가 아니라 깊은 이해를 위한 속도로.</p>
            </div>

            <div className="bg-white border border-line-light rounded-[18px] p-7 md:p-9 transition-all duration-400 hover:-translate-y-1 hover:border-accent-soft hover:shadow-[0_24px_48px_-24px_rgba(26,142,156,0.25)]">
              <svg className="w-11 h-11 mb-5 text-accent-main" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M8 10 H24 V38 H10 Q8 38 8 36 Z"/>
                <path d="M40 10 H24 V38 H38 Q40 38 40 36 Z"/>
                <line x1="13" y1="18" x2="20" y2="18"/>
                <line x1="13" y1="24" x2="20" y2="24"/>
                <line x1="13" y1="30" x2="20" y2="30"/>
                <line x1="28" y1="18" x2="35" y2="18"/>
                <line x1="28" y1="24" x2="35" y2="24"/>
                <line x1="28" y1="30" x2="35" y2="30"/>
              </svg>
              <h3 className="font-serif font-semibold text-[19px] text-text-main tracking-tight mb-3">글로 읽는 학습</h3>
              <p className="font-sans text-sm text-text-soft leading-relaxed">영상이 부담스러운 날엔 글로 읽으세요. 같은 내용을 한 번의 클릭으로 전환합니다.</p>
            </div>

            <div className="bg-white border border-line-light rounded-[18px] p-7 md:p-9 transition-all duration-400 hover:-translate-y-1 hover:border-accent-soft hover:shadow-[0_24px_48px_-24px_rgba(26,142,156,0.25)]">
              <svg className="w-11 h-11 mb-5 text-accent-main" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="16" cy="24" r="7"/>
                <path d="M28 17 L40 31" strokeLinecap="round"/>
                <path d="M40 17 L28 31" strokeLinecap="round"/>
              </svg>
              <h3 className="font-serif font-semibold text-[19px] text-text-main tracking-tight mb-3">OX 퀴즈로 이해 확인</h3>
              <p className="font-sans text-sm text-text-soft leading-relaxed">각 편 끝 5문항의 O/X. 점수도 등수도 없이, 이해했는지만 조용히 확인합니다.</p>
            </div>

            <div className="bg-white border border-line-light rounded-[18px] p-7 md:p-9 transition-all duration-400 hover:-translate-y-1 hover:border-accent-soft hover:shadow-[0_24px_48px_-24px_rgba(26,142,156,0.25)]">
              <svg className="w-11 h-11 mb-5 text-accent-main" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="22" cy="22" r="12"/>
                <line x1="31" y1="31" x2="40" y2="40" strokeLinecap="round"/>
                <line x1="22" y1="17" x2="22" y2="22"/>
                <circle cx="22" cy="26" r="1" fill="currentColor"/>
              </svg>
              <h3 className="font-serif font-semibold text-[19px] text-text-main tracking-tight mb-3">핵심 용어 사전</h3>
              <p className="font-sans text-sm text-text-soft leading-relaxed">모르는 단어가 나오면 즉시 찾습니다. 그 용어가 처음 등장한 영상으로도 바로 이동.</p>
            </div>

            <div className="bg-white border border-line-light rounded-[18px] p-7 md:p-9 transition-all duration-400 hover:-translate-y-1 hover:border-accent-soft hover:shadow-[0_24px_48px_-24px_rgba(26,142,156,0.25)]">
              <svg className="w-11 h-11 mb-5 text-accent-main" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="14" cy="14" r="4" fill="currentColor" fillOpacity="0.3"/>
                <circle cx="26" cy="20" r="4" fill="currentColor" fillOpacity="0.3"/>
                <circle cx="38" cy="14" r="4" fill="currentColor" fillOpacity="0.3"/>
                <circle cx="20" cy="32" r="4"/>
                <circle cx="34" cy="34" r="4"/>
                <path d="M14 14 Q20 18 26 20 T 38 14" strokeDasharray="2 2"/>
                <path d="M26 20 Q23 26 20 32" strokeDasharray="2 2"/>
                <path d="M26 20 Q30 27 34 34" strokeDasharray="2 2"/>
              </svg>
              <h3 className="font-serif font-semibold text-[19px] text-text-main tracking-tight mb-3">진주 스탬프 맵</h3>
              <p className="font-sans text-sm text-text-soft leading-relaxed">학습한 편마다 작은 진주가 켜집니다. 점수도, 순위도, 자극도 없이.</p>
            </div>

            <div className="bg-white border border-line-light rounded-[18px] p-7 md:p-9 transition-all duration-400 hover:-translate-y-1 hover:border-accent-soft hover:shadow-[0_24px_48px_-24px_rgba(26,142,156,0.25)]">
              <svg className="w-11 h-11 mb-5 text-accent-main" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M10 6 H30 L38 14 V42 H10 Z"/>
                <path d="M30 6 V14 H38"/>
                <line x1="16" y1="22" x2="32" y2="22"/>
                <line x1="16" y1="28" x2="32" y2="28"/>
                <line x1="16" y1="34" x2="26" y2="34"/>
              </svg>
              <h3 className="font-serif font-semibold text-[19px] text-text-main tracking-tight mb-3">교사용 PDF 자료</h3>
              <p className="font-sans text-sm text-text-soft leading-relaxed">강의에서 다룬 내용을 인쇄해 가르치고 싶은 분들을 위한 PDF. 누구나 다운로드.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 3 - Workflow (A Type) */}
      <section id="stage-3" className="relative px-6 py-20 md:px-10 md:py-36 text-white overflow-hidden" style={{
        background: 'linear-gradient(180deg, var(--water-card) 0%, var(--water-mid) 18%, var(--accent-soft) 40%, var(--accent-main) 75%, var(--accent-deep) 100%)'
      }}>
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-1000 ease-out text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 font-mono text-[11px] tracking-[0.2em] text-white/90 uppercase font-semibold mb-6 backdrop-blur-md">
              Step-by-Step Workflow
            </div>
            <h2 className="font-serif font-semibold text-[28px] md:text-[min(4.2vw,44px)] leading-tight tracking-tight mb-5 text-white drop-shadow-md">
              완결을 향한 5단계 여정
            </h2>
            <p className="font-sans text-[15px] md:text-[min(1.4vw,16.5px)] text-white/90 leading-relaxed drop-shadow-sm max-w-[600px] mx-auto">
              길을 잃을 걱정은 없습니다. 1권부터 5권까지,<br/>제시된 흐름만 따라오면 경제 판단력이 완성됩니다.
            </p>
          </div>

          <div ref={addToRefs} className="relative max-w-[800px] mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-100">
            {/* 세로 연결 선 */}
            <div className="absolute left-[39px] md:left-1/2 top-10 bottom-10 w-0.5 bg-white/20 -translate-x-1/2 rounded-full hidden sm:block"></div>
            
            <div className="flex flex-col gap-12 sm:gap-16">
              {/* STEP 1 */}
              <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-0 group">
                <div className="sm:w-1/2 sm:pr-12 flex sm:justify-end w-full">
                  <div className="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:-translate-y-1 w-full text-left relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-[80px] font-serif font-bold text-white/5 pointer-events-none select-none">1</div>
                    <div className="font-mono text-[12px] text-accent-light tracking-wider mb-2">기초 어휘 학습</div>
                    <div className="font-serif font-semibold text-[22px] text-white tracking-tight mb-3">1권. 돈의 언어</div>
                    <div className="font-sans text-[14.5px] text-white/80 leading-relaxed">
                      뉴스, 영수증, 월급명세서의 단어가 들리기 시작합니다. 기초적인 경제 용어의 장벽을 허뭅니다.
                    </div>
                    <div className="mt-5 inline-flex items-center text-sm font-semibold text-white/90 bg-white/10 px-3 py-1.5 rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-accent-light mr-2"></span> 27편 완독
                    </div>
                  </div>
                </div>
                {/* Node */}
                <div className="hidden sm:flex absolute left-1/2 top-8 -translate-x-1/2 w-16 h-16 rounded-full bg-[#0A3A42] border-4 border-white/30 items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 group-hover:border-accent-light shadow-lg">
                  <span className="font-serif font-bold text-xl text-white">1</span>
                </div>
                <div className="sm:w-1/2 sm:pl-12 w-full hidden sm:flex items-center text-white/50 text-sm font-medium">
                </div>
              </div>

              {/* STEP 2 */}
              <div className="relative flex flex-col sm:flex-row-reverse items-center sm:items-start gap-6 sm:gap-0 group">
                <div className="sm:w-1/2 sm:pl-12 flex sm:justify-start w-full">
                  <div className="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:-translate-y-1 w-full text-left relative overflow-hidden">
                    <div className="absolute -left-4 -top-4 text-[80px] font-serif font-bold text-white/5 pointer-events-none select-none">2</div>
                    <div className="font-mono text-[12px] text-accent-light tracking-wider mb-2">거시 경제 이해</div>
                    <div className="font-serif font-semibold text-[22px] text-white tracking-tight mb-3">2권. 돈의 흐름</div>
                    <div className="font-sans text-[14.5px] text-white/80 leading-relaxed">
                      환율과 금리 뉴스가 내 삶과 어떻게 연결되는지 깨닫습니다. 세상의 돈이 흐르는 길을 봅니다.
                    </div>
                    <div className="mt-5 inline-flex items-center text-sm font-semibold text-white/90 bg-white/10 px-3 py-1.5 rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-accent-light mr-2"></span> 25편 완독
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex absolute left-1/2 top-8 -translate-x-1/2 w-16 h-16 rounded-full bg-[#0A3A42] border-4 border-white/30 items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 group-hover:border-accent-light shadow-lg">
                  <span className="font-serif font-bold text-xl text-white">2</span>
                </div>
                <div className="sm:w-1/2 sm:pr-12 w-full hidden sm:flex items-center justify-end text-white/50 text-sm font-medium">
                </div>
              </div>

              {/* STEP 3 */}
              <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-0 group">
                <div className="sm:w-1/2 sm:pr-12 flex sm:justify-end w-full">
                  <div className="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:-translate-y-1 w-full text-left relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-[80px] font-serif font-bold text-white/5 pointer-events-none select-none">3</div>
                    <div className="font-mono text-[12px] text-accent-light tracking-wider mb-2">기업 가치 분석</div>
                    <div className="font-serif font-semibold text-[22px] text-white tracking-tight mb-3">3권. 돈의 구조</div>
                    <div className="font-sans text-[14.5px] text-white/80 leading-relaxed">
                      회사의 건강을 지표로 판단하는 법을 배웁니다. 투자의 근간이 되는 재무적 시각을 기릅니다.
                    </div>
                    <div className="mt-5 inline-flex items-center text-sm font-semibold text-white/90 bg-white/10 px-3 py-1.5 rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-accent-light mr-2"></span> 25편 완독
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex absolute left-1/2 top-8 -translate-x-1/2 w-16 h-16 rounded-full bg-[#0A3A42] border-4 border-white/30 items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 group-hover:border-accent-light shadow-lg">
                  <span className="font-serif font-bold text-xl text-white">3</span>
                </div>
                <div className="sm:w-1/2 sm:pl-12 w-full hidden sm:flex items-center text-white/50 text-sm font-medium">
                </div>
              </div>

              {/* STEP 4 */}
              <div className="relative flex flex-col sm:flex-row-reverse items-center sm:items-start gap-6 sm:gap-0 group">
                <div className="sm:w-1/2 sm:pl-12 flex sm:justify-start w-full">
                  <div className="bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 group-hover:-translate-y-1 w-full text-left relative overflow-hidden">
                    <div className="absolute -left-4 -top-4 text-[80px] font-serif font-bold text-white/5 pointer-events-none select-none">4</div>
                    <div className="font-mono text-[12px] text-accent-light tracking-wider mb-2">실전 경제 의사결정</div>
                    <div className="font-serif font-semibold text-[22px] text-white tracking-tight mb-3">4권. 돈의 결정</div>
                    <div className="font-sans text-[14.5px] text-white/80 leading-relaxed">
                      소비, 저축, 대출, 보험, 세금, 투자의 순간에 타인에게 휘둘리지 않고 스스로 결정합니다.
                    </div>
                    <div className="mt-5 inline-flex items-center text-sm font-semibold text-white/90 bg-white/10 px-3 py-1.5 rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-accent-light mr-2"></span> 31편 완독
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex absolute left-1/2 top-8 -translate-x-1/2 w-16 h-16 rounded-full bg-[#0A3A42] border-4 border-white/30 items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 group-hover:border-accent-light shadow-lg">
                  <span className="font-serif font-bold text-xl text-white">4</span>
                </div>
                <div className="sm:w-1/2 sm:pr-12 w-full hidden sm:flex items-center justify-end text-white/50 text-sm font-medium">
                </div>
              </div>

              {/* STEP 5 */}
              <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-0 group">
                <div className="sm:w-1/2 sm:pr-12 flex sm:justify-end w-full">
                  <div className="bg-accent-main/20 border border-accent-light/50 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 group-hover:bg-accent-main/30 group-hover:border-accent-light group-hover:-translate-y-1 w-full text-left relative overflow-hidden shadow-[0_0_30px_rgba(26,142,156,0.15)]">
                    <div className="absolute -right-4 -top-4 text-[80px] font-serif font-bold text-accent-light/10 pointer-events-none select-none">5</div>
                    <div className="font-mono text-[12px] text-white tracking-wider mb-2 font-semibold">최종 완성</div>
                    <div className="font-serif font-semibold text-[22px] text-white tracking-tight mb-3">5권. 돈의 인생</div>
                    <div className="font-sans text-[14.5px] text-white/90 leading-relaxed">
                      단순한 지식을 넘어, 인생에서 돈이 가지는 의미를 정립하고 흔들리지 않는 태도를 완성합니다.
                    </div>
                    <div className="mt-5 inline-flex items-center text-sm font-semibold text-[#0A3A42] bg-accent-light px-4 py-2 rounded-lg shadow-md">
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      경제 판단력 완성 (133편)
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex absolute left-1/2 top-8 -translate-x-1/2 w-16 h-16 rounded-full bg-accent-main border-4 border-accent-light items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(110,210,220,0.4)]">
                  <span className="font-serif font-bold text-xl text-white">5</span>
                </div>
                <div className="sm:w-1/2 sm:pl-12 w-full hidden sm:flex items-center text-white/50 text-sm font-medium">
                </div>
              </div>
            </div>
            
            <div className="mt-20 text-center">
              <Link href="/lesson/L001" className="inline-flex items-center justify-center px-10 py-5 bg-white text-accent-deep font-bold rounded-full transition-all hover:bg-accent-light hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] tracking-wide group text-[17px]">
                <span className="mr-3">안전한 여정 시작하기</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 4 */}
      <section className="relative px-6 py-24 md:px-10 md:py-36 pb-12 overflow-hidden text-white" style={{
        background: 'linear-gradient(180deg, var(--accent-deep) 0%, #08434F 30%, var(--accent-darkest) 100%)'
      }}>
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute w-[1.5px] h-[1.5px] bg-white/70 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)] top-[10%] left-[15%] animate-[deepTwinkle_5s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}></div>
          <div className="absolute w-[1.5px] h-[1.5px] bg-white/70 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)] top-[18%] left-[38%] animate-[deepTwinkle_5s_ease-in-out_infinite]" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute w-[1.5px] h-[1.5px] bg-white/70 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)] top-[8%] left-[62%] animate-[deepTwinkle_5s_ease-in-out_infinite]" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute w-[1.5px] h-[1.5px] bg-white/70 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)] top-[22%] left-[82%] animate-[deepTwinkle_5s_ease-in-out_infinite]" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute w-[1.5px] h-[1.5px] bg-white/70 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)] top-[30%] left-[25%] animate-[deepTwinkle_5s_ease-in-out_infinite]" style={{ animationDelay: '1.8s' }}></div>
          <div className="absolute w-[1.5px] h-[1.5px] bg-white/70 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)] top-[35%] left-[70%] animate-[deepTwinkle_5s_ease-in-out_infinite]" style={{ animationDelay: '3.2s' }}></div>
          <div className="absolute w-[1.5px] h-[1.5px] bg-white/70 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)] top-[14%] left-[92%] animate-[deepTwinkle_5s_ease-in-out_infinite]" style={{ animationDelay: '2.1s' }}></div>
          <div className="absolute w-[1.5px] h-[1.5px] bg-white/70 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.5)] top-[25%] left-[6%] animate-[deepTwinkle_5s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}></div>
        </div>

        <div className="max-w-[700px] mx-auto relative z-10 text-center flex flex-col h-full">
          <div ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <h2 className="font-serif font-semibold text-[30px] md:text-[min(4.5vw,48px)] leading-tight tracking-tight mb-5 drop-shadow-xl">
              지금, 천천히<br/>첫 편을 펼쳐 보세요
            </h2>
            <p className="font-sans text-base text-white/85 leading-relaxed mb-12">
              계정 없이도 둘러볼 수 있습니다.<br/>학습 흔적을 남기고 싶을 때만 가입하세요.
            </p>
            <div className="flex flex-col md:flex-row gap-3 justify-center mb-24 md:mb-32">
              <Link href="/lesson/L001" className="flex items-center justify-center px-8 py-4 bg-accent-main text-white font-semibold rounded-xl transition-all hover:bg-accent-deep hover:-translate-y-0.5 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_18px_40px_-14px_rgba(26,142,156,0.7)] tracking-wide w-full md:w-auto max-w-[280px] md:max-w-none mx-auto md:mx-0">
                강의 둘러보기
              </Link>
              <Link href="/signup" className="flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/45 backdrop-blur-md transition-all hover:bg-white/20 hover:border-white hover:-translate-y-0.5 tracking-wide w-full md:w-auto max-w-[280px] md:max-w-none mx-auto md:mx-0">
                계정 만들기
              </Link>
            </div>
          </div>

          <div className="mt-auto pt-12 border-t border-white/10">
            <div className="font-serif font-medium text-base text-white/85 mb-6 tracking-tight">고요의 경제나루</div>
            <div className="font-sans text-[13px] text-white/55 leading-loose">결제 정보를 받지 않습니다 · 광고 없음</div>
            <div className="font-sans text-[13px] text-white/55 leading-loose">CC BY-NC-SA 4.0 라이선스로 배포됩니다</div>
            <div className="font-sans text-[13px] text-white/55 leading-loose">제작 · ELLA PARK</div>
          </div>
        </div>
      </section>
    </main>
  );
}
