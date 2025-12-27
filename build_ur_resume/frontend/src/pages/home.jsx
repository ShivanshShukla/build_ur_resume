import React from "react";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function Home() {
  // Theme logic is now global or handled within ThemeToggle/App


  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-stone-200 transition-colors duration-200">

      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-stone-100 dark:border-b-stone-800 bg-surface-light/90 backdrop-blur-md dark:bg-surface-dark/90 px-6 md:px-10 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-10 flex items-center justify-center bg-primary/10 rounded-xl text-primary">
            <span className="material-symbols-outlined text-3xl">description</span>
          </div>
          <h2 className="text-text-main dark:text-stone-100 text-xl font-bold font-display tracking-tight">
            Resume<span className="text-primary">Builder</span>
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <div className="hidden md:flex items-center gap-8">
            <a className="text-text-main dark:text-stone-300 text-sm font-semibold hover:text-primary transition-colors" href="#">Templates</a>
            <a className="text-text-main dark:text-stone-300 text-sm font-semibold hover:text-primary transition-colors" href="#">Features</a>
            <a className="text-text-main dark:text-stone-300 text-sm font-semibold hover:text-primary transition-colors" href="#">Pricing</a>
            <a className="text-text-main dark:text-stone-300 text-sm font-semibold hover:text-primary transition-colors" href="/login">Login</a>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>

          <a href="/register" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-primary hover:bg-primary/90 transition-all text-white text-sm font-bold shadow-md shadow-primary/20">
            <span className="truncate">Get Started</span>
          </a>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex flex-col items-center w-full">
        <section className="w-full max-w-7xl px-4 md:px-10 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
            <div className="flex flex-col gap-6 lg:w-1/2 lg:text-left text-center items-center lg:items-start">
              <div className="inline-flex items-center gap-2 self-center lg:self-start rounded-full bg-secondary/10 px-4 py-2 text-xs font-bold text-secondary dark:text-secondary/80 uppercase tracking-wider font-display">
                <span className="material-symbols-outlined text-base">stars</span>
                New Collection Live
              </div>
              <h1 className="text-text-main dark:text-white text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight font-display max-w-md">
                Craft a resume that tells your <span className="text-primary relative whitespace-nowrap">
                  story
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" preserveAspectRatio="none" viewBox="0 0 100 10">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
                  </svg>
                </span>
              </h1>
              <p className="text-text-muted dark:text-stone-400 text-lg lg:text-xl font-normal leading-relaxed max-w-md">
                Stand out with boutique templates and intelligent tools. Designed to highlight your unique career path in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button className="flex items-center justify-center rounded-full h-14 px-8 bg-primary text-white text-base font-bold shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-1">
                  Build My Resume
                </button>
                <button className="flex items-center justify-center rounded-full h-14 px-8 bg-white dark:bg-surface-dark border-2 border-stone-100 dark:border-stone-700 text-text-main dark:text-white text-base font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                  View Templates
                </button>
              </div>
              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-[3px] border-white dark:border-surface-dark bg-stone-200 bg-center bg-cover shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHB8iGsaUMIYs7Fz7FuuPzAnHaVtTlyFYB1mGx21i2D4oM5cmv5SK5nSmTsPuj1Sxi111a-bZYvMTaCkrUSrSLd5R9T43NMpY35trsCe-owaqXsfftqLJgJMm7qdFDBBBjAtuy6k3_BllFOAnbTPH7-BuSUKDnP4_UoEUIY8R9Et4L9kBZV7_o7Hjcoo9jkREbgAzJeKO1gF1vXEnAS5aWUnqu_vdeWbInoEV3wl2BARR3ono0VWo21rZagtnu2RNaWcrZnizhwro")' }}></div>
                  <div className="w-10 h-10 rounded-full border-[3px] border-white dark:border-surface-dark bg-stone-200 bg-center bg-cover shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVnPOKQtyQNzia7h5YRCjNkwQQ6MEcbZK66iMXRE2UZgzp_TpiUV6IaasHZ1h0X88mg2JJ3Bs6mUNkNSWiRqK5_zxBpo5y-sbYusSOFe_Mu--g6njunN8rYAmmQR5sePoSR4tUuow8Z35168oGoym3-_Fvni0qcLeZwyHakK6Y3edMW1YqbjtCNwiTrRIfowzWD1mHxTRAVGxet8Fp5owBpK4H1W1IYf4nhQ9hLB7JGb-ls9kK3sYSXf9LNbWiF5yajtGbFhAaNMM")' }}></div>
                  <div className="w-10 h-10 rounded-full border-[3px] border-white dark:border-surface-dark bg-stone-200 bg-center bg-cover shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfapD2VzhBBxLV9qFzwe_jv3MdTD-2xoWcWEwtj6tT9nN5F_OEb9vyS-QCSIuSL6gvy_vqGATBucSZvhkUlFDvj0OGPZIwYQRKeu1gjpwxjr9QkRfSUzq47PLC1hKD5807uE-ll7sUSM-hyRU78znNYxyIsFuyUuxzGN58_a9gFEFQNUX_2zdWKqHffYImb8mGFA_6Ffsw2sNNy37AVPweoPUlUJaFnCbFGv-Is37XAp16CKZHKlISszeBsF8ThpxQhoe7ufjy1kM")' }}></div>
                  <div className="w-10 h-10 rounded-full border-[3px] border-white dark:border-surface-dark bg-secondary text-white flex items-center justify-center text-xs font-bold shadow-sm">+2k</div>
                </div>
                <p className="text-sm font-medium text-text-muted dark:text-stone-400">Loved by professionals worldwide</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative group perspective-1000">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-[2rem] blur-2xl opacity-60 dark:opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-700 bg-surface-light dark:bg-surface-dark transform transition-transform duration-500 hover:rotate-1">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAd-dNVjxwfKaP3fyy5xLO6A4IKmGReQxtu7iykDfYjfmh1MIYbNJHi4MvG9-gs4r-z_n4ZRyrWGvJEjfjP3l_3fhot8pVOgKc-GAtrfiFOBIC2A4wEbsFusP28Cuy2WdUW0UfWT4DaHA_9jcjYvRYXJwxx-3tIy8ZkkFqyEvbmj1yAuotFX-onW8SwFWuY3fgD6RRSugnHilonEwlVOvVlfZ3kuNQw8qYhItlqvy7ZgH_lCdfQkthc-PyJ572v0YPz6A6nfOl3644")' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center p-8">
                    <div className="bg-white/95 backdrop-blur dark:bg-surface-dark/95 rounded-xl p-4 shadow-lg flex items-center gap-4 animate-bounce border border-stone-100 dark:border-stone-700">
                      <div className="p-2 bg-secondary/20 rounded-full text-secondary">
                        <span className="material-symbols-outlined">check_circle</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-text-main dark:text-white font-display">Resume Score: 98/100</p>
                        <p className="text-xs text-text-muted">Ready for application</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full max-w-7xl px-4 md:px-10 pb-16 lg:pb-24">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-main dark:text-white font-display">Popular Templates</h2>
            <a className="text-primary font-bold flex items-center hover:underline group decoration-2 underline-offset-4 text-sm md:text-base" href="#">
              View all 50+ templates
              <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4 md:-mx-10 md:px-10 lg:mx-0 lg:px-0 scrollbar-hide">
            <div className="flex-shrink-0 w-80 snap-center group relative rounded-2xl overflow-hidden shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-200/60 dark:border-stone-700 aspect-[3/4] bg-white dark:bg-stone-800">
              <div className="absolute inset-4 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-cover bg-top transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1yzONnWfW3Z0b0vXzyg76Srktlz2JgabNhj8G-9ZskpdXFOBEdNaSqazvYPZkRUo1_T277EbHjRqb9rui0eQEMG9LwYiEETZFJI_1UukgjVVGJ4Tn5_b54kumknuSp6-Zf8PEP5q5kL8LNELwAmQDgL2lujtngIOfW1f6I297-Xj-b1qxNDyVypNo-burt0hxGV2u-KfPo9sjYgpqyonJoRbVFHOZbRunOwt4jFHMaLMOOzBW0GP2TQ_afiBRXPaC5SXBEsz4vAs")' }}></div>
              </div>
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white text-text-main font-bold py-3 px-8 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-primary hover:text-white">Use Template</button>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur dark:bg-stone-900/95 p-4 rounded-xl border border-stone-100 dark:border-stone-700 shadow-sm translate-y-20 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-center text-text-main dark:text-white font-display text-lg">The Modernist</h4>
                <p className="text-xs text-center text-text-muted mt-1 uppercase tracking-wide">Best for Tech & Design</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-80 snap-center group relative rounded-2xl overflow-hidden shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-200/60 dark:border-stone-700 aspect-[3/4] bg-white dark:bg-stone-800">
              <div className="absolute inset-4 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-cover bg-top transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbZr9NpzBtGU-3fXhOl0u_Aw_DkOrDLh_ldpdvszKFnX3VoukgeK1QweDS6svPjHj36K15u2z7fJQ48gPQgEwuwvPeW_TICQrn_uYIkJ2K7-JoS8QTK3TATecVG_Z38LYuICBqZZMPB2ksR0cpLboCvuYLOqvDY5BuYJ2oICf1ltFrZxUxUM3zrW3qmnp4D7jbEssWRpEakx2as1qDzsxUtxIJqyzG_D9EIqxqpopmF2I0nLGu7XBwuFCO9pcHqO8inqP9677aJAE")' }}></div>
              </div>
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white text-text-main font-bold py-3 px-8 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-primary hover:text-white">Use Template</button>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur dark:bg-stone-900/95 p-4 rounded-xl border border-stone-100 dark:border-stone-700 shadow-sm translate-y-20 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-center text-text-main dark:text-white font-display text-lg">The Executive</h4>
                <p className="text-xs text-center text-text-muted mt-1 uppercase tracking-wide">Best for Management</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-80 snap-center group relative rounded-2xl overflow-hidden shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-200/60 dark:border-stone-700 aspect-[3/4] bg-white dark:bg-stone-800">
              <div className="absolute inset-4 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-cover bg-top transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKyume1JNLt5sMxaXBc3I7RTn3Us9ydmopVV5ZxnfOzJqbwF1EMisJTenSpmLmLTjp_8gaYzUv9PtZh362FqcqQbZk48rZOR_HDN3ILb2_3SfMJLWaKpYjOuHvLiU4yVuhuGDQeSpPssh1fU3Ls9vcovp5RSgKvOT-ZZ6rCof5tGcClA0SeaQ5O9k7Gl6g-HtpJ4W68biEw3GlsU5-jVnbM54TNkh6-Sr2gnep5vUgGY05zQBaT61dvIE9ts2RsTsKUQLzT0qpios")' }}></div>
              </div>
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white text-text-main font-bold py-3 px-8 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-primary hover:text-white">Use Template</button>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur dark:bg-stone-900/95 p-4 rounded-xl border border-stone-100 dark:border-stone-700 shadow-sm translate-y-20 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-center text-text-main dark:text-white font-display text-lg">The Creative</h4>
                <p className="text-xs text-center text-text-muted mt-1 uppercase tracking-wide">Best for Marketing</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-80 snap-center group relative rounded-2xl overflow-hidden shadow-xl shadow-stone-200/50 dark:shadow-none border border-stone-200/60 dark:border-stone-700 aspect-[3/4] bg-white dark:bg-stone-800">
              <div className="absolute inset-4 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-cover bg-top transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1yzONnWfW3Z0b0vXzyg76Srktlz2JgabNhj8G-9ZskpdXFOBEdNaSqazvYPZkRUo1_T277EbHjRqb9rui0eQEMG9LwYiEETZFJI_1UukgjVVGJ4Tn5_b54kumknuSp6-Zf8PEP5q5kL8LNELwAmQDgL2lujtngIOfW1f6I297-Xj-b1qxNDyVypNo-burt0hxGV2u-KfPo9sjYgpqyonJoRbVFHOZbRunOwt4jFHMaLMOOzBW0GP2TQ_afiBRXPaC5SXBEsz4vAs")' }}></div>
              </div>
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white text-text-main font-bold py-3 px-8 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-primary hover:text-white">Use Template</button>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur dark:bg-stone-900/95 p-4 rounded-xl border border-stone-100 dark:border-stone-700 shadow-sm translate-y-20 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-center text-text-main dark:text-white font-display text-lg">The Modernist</h4>
                <p className="text-xs text-center text-text-muted mt-1 uppercase tracking-wide">Best for Tech & Design</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full border-y border-stone-100 dark:border-stone-800 bg-white dark:bg-surface-dark py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-10 text-center">
            <p className="text-text-muted dark:text-stone-500 text-sm font-bold tracking-[0.1em] uppercase mb-8 font-display">Join 10,000+ professionals hired by</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-xl font-bold font-display text-stone-600 dark:text-stone-300 flex items-center gap-2"><span className="material-symbols-outlined text-primary">change_history</span> Acme Corp</span>
              <span className="text-xl font-bold font-display text-stone-600 dark:text-stone-300 flex items-center gap-2"><span className="material-symbols-outlined text-secondary">hexagon</span> HexaGlobal</span>
              <span className="text-xl font-bold font-display text-stone-600 dark:text-stone-300 flex items-center gap-2"><span className="material-symbols-outlined text-primary">emergency</span> MedTech</span>
              <span className="text-xl font-bold font-display text-stone-600 dark:text-stone-300 flex items-center gap-2"><span className="material-symbols-outlined text-secondary">bolt</span> FastStream</span>
              <span className="text-xl font-bold font-display text-stone-600 dark:text-stone-300 flex items-center gap-2"><span className="material-symbols-outlined text-primary">cloud</span> CloudNine</span>
            </div>
          </div>
        </section>
        <section className="w-full max-w-7xl px-4 md:px-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col justify-between p-8 bg-white dark:bg-surface-dark rounded-2xl border border-stone-100 dark:border-stone-700 shadow-sm">
              <div>
                <div className="text-primary font-bold tracking-wider uppercase text-sm mb-2 font-display">Seamless Experience</div>
                <h2 className="text-4xl font-extrabold text-text-main dark:text-white mb-6 font-display">Why Choose Our Builder?</h2>
                <p className="text-text-muted dark:text-stone-400 text-lg leading-relaxed mb-8">
                  We've stripped away the complexity. Our tools are designed to help you focus on your content while we handle the design and formatting with elegance.
                </p>
              </div>
              <a className="text-primary font-bold flex items-center hover:underline group decoration-2 underline-offset-4 mt-auto" href="#">
                Explore all features
                <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-stone-100 dark:border-stone-700 shadow-sm hover:shadow-lg hover:shadow-stone-200/50 dark:hover:shadow-none transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                <h3 className="text-xl font-bold text-text-main dark:text-white mb-3 font-display">Real-time Preview</h3>
                <p className="text-text-muted dark:text-stone-400">See changes instantly as you type. No more switching back and forth between edit and preview modes.</p>
              </div>
              <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-stone-100 dark:border-stone-700 shadow-sm hover:shadow-lg hover:shadow-stone-200/50 dark:hover:shadow-none transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <h3 className="text-xl font-bold text-text-main dark:text-white mb-3 font-display">ATS-Friendly Designs</h3>
                <p className="text-text-muted dark:text-stone-400">Our templates are optimized for Applicant Tracking Systems to ensure your resume reaches human hands.</p>
              </div>
              <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-stone-100 dark:border-stone-700 shadow-sm hover:shadow-lg hover:shadow-stone-200/50 dark:hover:shadow-none transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-secondary mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">download</span>
                </div>
                <h3 className="text-xl font-bold text-text-main dark:text-white mb-3 font-display">One-Click Export</h3>
                <p className="text-text-muted dark:text-stone-400">Download your finished resume as a polished PDF or Word document in seconds, ready to send.</p>
              </div>
              <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-stone-100 dark:border-stone-700 shadow-sm hover:shadow-lg hover:shadow-stone-200/50 dark:hover:shadow-none transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-3xl">auto_fix_high</span>
                </div>
                <h3 className="text-xl font-bold text-text-main dark:text-white mb-3 font-display">AI Suggestions</h3>
                <p className="text-text-muted dark:text-stone-400">Get intelligent suggestions for bullet points and skills based on your desired job title.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full max-w-7xl px-4 md:px-10 py-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-text-main dark:text-white mb-16 font-display">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-sm flex flex-col gap-6 relative">
              <span className="material-symbols-outlined absolute top-6 right-6 text-stone-200 text-4xl">format_quote</span>
              <div className="flex items-center gap-1 text-amber-400">
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
              </div>
              <p className="text-text-main dark:text-stone-300 leading-relaxed font-medium">"I was struggling to get callbacks until I used the Executive template. The formatting is clean, warm, and professional. Got hired within 2 weeks!"</p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-stone-50 dark:border-stone-700">
                <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-offset-2 ring-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXhpPlyt9Fqpig6b69MFj5HaUYqC2WR4aTKJ5MmSSMnuGlUqUqGdEEGU6PhlSXgsFkgalYA8SlfO_ky0Iq8fmCsbUBG4MypVj1_KRkwLBnyusNFmmwHIxCG_lqK6VwNYzUz0S9J9NuylnQhm_ith1qovUr-KIYdb30SfJ9_m_o6VK4V-QyCwJLQFXw-Zw6TfXl5gLCw2Ojrw5f28n1z3NRddd2rDiT6K6IzOGrz7izmUX5NodzIQhXhdFpJcNgsTAiC-tZOHL1Two")' }}></div>
                <div>
                  <h5 class="font-bold text-base text-text-main dark:text-white font-display">Sarah Jenkins</h5>
                  <p class="text-xs text-text-muted">Marketing Manager @ Google</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-sm flex flex-col gap-6 relative">
              <span className="material-symbols-outlined absolute top-6 right-6 text-stone-200 text-4xl">format_quote</span>
              <div className="flex items-center gap-1 text-amber-400">
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
              </div>
              <p className="text-text-main dark:text-stone-300 leading-relaxed font-medium">"The AI suggestions were a lifesaver. I didn't know how to phrase my achievements, but this tool made it easy. Highly recommended."</p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-stone-50 dark:border-stone-700">
                <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-offset-2 ring-secondary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUzMzCdNZ4qnikPS-SvT1JbiQ0xPZoPVFYAN5vQGjJP2Cf21psGrurdoIMITK7ZS9Og2HAZUTYDYXjgHLv7vECu6a-lvVGx9zHF851NFir6KA8MCXEFMgQvnBSiKGpbtM8jtnYaLE92pUXwdsgXdwPPW-ko5XWw0NYkol5oICnB1XGP6R_KWz0ug8889qes6SimtOOfPaT5qtvK8NcX6DxxSCeFg9jIT9m_oqllXFrvEvWaDm3vZS2Cr5UsZL7rGIn3uwHcXaefUM")' }}></div>
                <div>
                  <h5 className="font-bold text-base text-text-main dark:text-white font-display">Mark Thompson</h5>
                  <p className="text-xs text-text-muted">Software Engineer @ Spotify</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-surface-dark p-8 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-sm flex flex-col gap-6 relative">
              <span className="material-symbols-outlined absolute top-6 right-6 text-stone-200 text-4xl">format_quote</span>
              <div className="flex items-center gap-1 text-amber-400">
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
                <span className="material-symbols-outlined text-xl fill-current">star</span>
              </div>
              <p className="text-text-main dark:text-stone-300 leading-relaxed font-medium">"Simply the best resume builder out there. The live preview is fantastic and exporting to PDF is flawless. Worth every penny."</p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-stone-50 dark:border-stone-700">
                <div className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-offset-2 ring-orange-200" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCb_v6SbI-vbeoRHLswfQefmZq31owZnsziUX9RiNSqqjnWI7guvAP4qQtwX-q4QZJ0bNQiL-F3dfchUIoMj4T77Z34ZPBKA_qHXYKNJ6uLYktFUAiUZU-RlA66uKln_EI-xkpSr9gpD1jaR_Rl3ZQWOOTq7KMCPfIyz-YwmUH7v8q3IG-VKBG0EruIMGfKrlJ5-mzybfjbIK5URvIhtfKQ7WZo0pL97RztStN4kRzlVmcwxKnrWrQJMGC0n6sstNtBEqDu4I54DcE")' }}></div>
                <div>
                  <h5 className="font-bold text-base text-text-main dark:text-white font-display">Emily Rodriguez</h5>
                  <p class="text-xs text-text-muted">Project Lead @ Airbnb</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full px-4 md:px-10 py-16">
          <div className="max-w-5xl mx-auto bg-secondary rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-secondary/20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary opacity-20 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center text-center p-12 md:p-24">
              <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-6 font-display">Ready to land your dream job?</h2>
              <p className="text-stone-100 text-lg md:text-xl max-w-2xl mb-10 opacity-90">Join thousands of job seekers who have successfully built their careers with our premium tools.</p>
              <button className="bg-white text-secondary hover:bg-stone-50 hover:text-secondary/80 transition-all px-10 py-5 rounded-full font-bold text-lg shadow-lg transform hover:-translate-y-1">
                Create My Resume Now
              </button>
              <p className="text-white/60 text-sm mt-6">No credit card required for basic templates</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-cream dark:bg-surface-dark border-t border-stone-100 dark:border-stone-800 pt-20 pb-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="flex flex-col gap-6 max-w-xs">
            <div className="flex items-center gap-2 text-text-main dark:text-white">
              <span className="material-symbols-outlined text-primary text-3xl">description</span>
              <span className="text-xl font-bold font-display">ResumeBuilder</span>
            </div>
            <p className="text-text-muted dark:text-stone-400 text-sm leading-relaxed">Empowering professionals to build their future, one resume at a time. Crafted with care.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-text-main dark:text-white mb-2 font-display">Product</h4>
              <a className="text-text-muted dark:text-stone-400 text-sm hover:text-primary transition-colors" href="#">Templates</a>
              <a className="text-text-muted dark:text-stone-400 text-sm hover:text-primary transition-colors" href="#">Features</a>
              <a className="text-text-muted dark:text-stone-400 text-sm hover:text-primary transition-colors" href="#">Pricing</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-text-main dark:text-white mb-2 font-display">Company</h4>
              <a className="text-text-muted dark:text-stone-400 text-sm hover:text-primary transition-colors" href="#">About Us</a>
              <a className="text-text-muted dark:text-stone-400 text-sm hover:text-primary transition-colors" href="#">Careers</a>
              <a className="text-text-muted dark:text-stone-400 text-sm hover:text-primary transition-colors" href="#">Contact</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-text-main dark:text-white mb-2 font-display">Legal</h4>
              <a className="text-text-muted dark:text-stone-400 text-sm hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="text-text-muted dark:text-stone-400 text-sm hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 border-t border-stone-200 dark:border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted dark:text-stone-500 text-xs">© 2023 ResumeBuilder Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-text-muted dark:text-stone-500 hover:text-primary transition-colors flex items-center gap-1 text-sm" href="#">Twitter</a>
            <a className="text-text-muted dark:text-stone-500 hover:text-primary transition-colors flex items-center gap-1 text-sm" href="#">LinkedIn</a>
            <a className="text-text-muted dark:text-stone-500 hover:text-primary transition-colors flex items-center gap-1 text-sm" href="#">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}