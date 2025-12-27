import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function Home() {
  return (
    <div className="bg-sand dark:bg-background-dark text-text-main dark:text-text-main-dark transition-colors duration-200 min-h-screen flex flex-col font-body">
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-default dark:border-border-default-dark bg-surface-light/90 backdrop-blur-md dark:bg-surface-dark/90 px-6 md:px-10 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-10 flex items-center justify-center bg-primary/10 rounded-xl text-primary">
            <span className="material-symbols-outlined text-3xl">description</span>
          </div>
          <h2 className="text-text-main dark:text-white text-xl font-bold font-display tracking-tight">
            Resume<span className="text-primary">Builder</span>
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <div className="hidden md:flex items-center gap-8">
            <a className="text-text-main dark:text-text-main-dark text-sm font-semibold hover:text-primary transition-colors" href="#">Templates</a>
            <a className="text-text-main dark:text-text-main-dark text-sm font-semibold hover:text-primary transition-colors" href="#">Features</a>
            <a className="text-text-main dark:text-text-main-dark text-sm font-semibold hover:text-primary transition-colors" href="#">Pricing</a>
          </div>
          <div className="flex items-center gap-4 border-l border-border-default dark:border-stone-700 pl-6">

            {/* Theme Toggle Component */}
            <ThemeToggle />

            <Link to="/login" className="text-text-main dark:text-text-main-dark text-sm font-semibold hover:text-primary transition-colors hidden sm:block">
              Login
            </Link>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-primary hover:bg-primary/90 transition-all text-white text-sm font-bold shadow-md shadow-primary/20">
              <span className="truncate">Get Started</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-6 py-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-surface-light dark:bg-surface-dark rounded-3xl p-8 md:p-12 border border-border-default dark:border-border-default-dark shadow-sm flex flex-col justify-center items-start relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6 rounded-full bg-secondary/10 px-4 py-2 text-xs font-bold text-secondary dark:text-secondary/80 uppercase tracking-wider font-display">
                <span className="material-symbols-outlined text-base">stars</span>
                New Collection Live
              </div>
              <h1 className="text-text-main dark:text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight font-display max-w-xl mb-6">
                Craft a resume that tells your <span className="text-primary relative whitespace-nowrap">story</span>
              </h1>
              <p className="text-text-muted dark:text-text-muted-dark text-lg font-normal leading-relaxed max-w-md mb-8">
                Stand out with boutique templates and intelligent tools. Designed to highlight your unique career path in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button className="flex items-center justify-center rounded-full h-12 px-8 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-1">
                  Build My Resume
                </button>
                <button className="flex items-center justify-center rounded-full h-12 px-8 bg-subtle-light dark:bg-stone-800 text-text-main dark:text-white text-sm font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                  View Templates
                </button>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-border-default dark:border-border-default-dark w-full">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark bg-stone-200 bg-center bg-cover shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHB8iGsaUMIYs7Fz7FuuPzAnHaVtTlyFYB1mGx21i2D4oM5cmv5SK5nSmTsPuj1Sxi111a-bZYvMTaCkrUSrSLd5R9T43NMpY35trsCe-owaqXsfftqLJgJMm7qdFDBBBjAtuy6k3_BllFOAnbTPH7-BuSUKDnP4_UoEUIY8R9Et4L9kBZV7_o7Hjcoo9jkREbgAzJeKO1gF1vXEnAS5aWUnqu_vdeWbInoEV3wl2BARR3ono0VWo21rZagtnu2RNaWcrZnizhwro")' }}></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark bg-stone-200 bg-center bg-cover shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVnPOKQtyQNzia7h5YRCjNkwQQ6MEcbZK66iMXRE2UZgzp_TpiUV6IaasHZ1h0X88mg2JJ3Bs6mUNkNSWiRqK5_zxBpo5y-sbYusSOFe_Mu--g6njunN8rYAmmQR5sePoSR4tUuow8Z35168oGoym3-_Fvni0qcLeZwyHakK6Y3edMW1YqbjtCNwiTrRIfowzWD1mHxTRAVGxet8Fp5owBpK4H1W1IYf4nhQ9hLB7JGb-ls9kK3sYSXf9LNbWiF5yajtGbFhAaNMM")' }}></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark bg-stone-200 bg-center bg-cover shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfapD2VzhBBxLV9qFzwe_jv3MdTD-2xoWcWEwtj6tT9nN5F_OEb9vyS-QCSIuSL6gvy_vqGATBucSZvhkUlFDvj0OGPZIwYQRKeu1gjpwxjr9QkRfSUzq47PLC1hKD5807uE-ll7sUSM-hyRU78znNYxyIsFuyUuxzGN58_a9gFEFQNUX_2zdWKqHffYImb8mGFA_6Ffsw2sNNy37AVPweoPUlUJaFnCbFGv-Is37XAp16CKZHKlISszeBsF8ThpxQhoe7ufjy1kM")' }}></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark bg-secondary text-white flex items-center justify-center text-[10px] font-bold shadow-sm">+2k</div>
                </div>
                <p className="text-xs font-semibold text-text-muted dark:text-text-muted-dark">Loved by professionals worldwide</p>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-5 w-64 h-64 bg-primary rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
          </div>
          <div className="lg:col-span-5 bg-subtle-light dark:bg-stone-900 rounded-3xl overflow-hidden border border-border-default dark:border-border-default-dark shadow-sm relative group min-h-[400px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAd-dNVjxwfKaP3fyy5xLO6A4IKmGReQxtu7iykDfYjfmh1MIYbNJHi4MvG9-gs4r-z_n4ZRyrWGvJEjfjP3l_3fhot8pVOgKc-GAtrfiFOBIC2A4wEbsFusP28Cuy2WdUW0UfWT4DaHA_9jcjYvRYXJwxx-3tIy8ZkkFqyEvbmj1yAuotFX-onW8SwFWuY3fgD6RRSugnHilonEwlVOvVlfZ3kuNQw8qYhItlqvy7ZgH_lCdfQkthc-PyJ572v0YPz6A6nfOl3644")' }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-8">
              <div className="bg-white/95 backdrop-blur dark:bg-surface-dark/95 rounded-xl p-4 shadow-xl flex items-center gap-4 border border-border-default dark:border-stone-700 w-full max-w-xs animate-bounce">
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

        <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-6 md:p-8 border border-border-default dark:border-border-default-dark shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-text-main dark:text-white font-display">Popular Templates</h3>
              <p className="text-sm text-text-muted mt-1">Start with a professional layout</p>
            </div>
            <a className="text-primary font-bold flex items-center hover:underline group decoration-2 underline-offset-4 text-sm" href="#">
              View all 50+ templates
              <span className="material-symbols-outlined ml-1 text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide -mx-2 px-2 snap-x">
            <a className="flex-shrink-0 w-48 group snap-start" href="#">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-border-default dark:border-stone-700 bg-subtle-light mb-3 relative">
                <div className="w-full h-full bg-cover bg-top transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1yzONnWfW3Z0b0vXzyg76Srktlz2JgabNhj8G-9ZskpdXFOBEdNaSqazvYPZkRUo1_T277EbHjRqb9rui0eQEMG9LwYiEETZFJI_1UukgjVVGJ4Tn5_b54kumknuSp6-Zf8PEP5q5kL8LNELwAmQDgL2lujtngIOfW1f6I297-Xj-b1qxNDyVypNo-burt0hxGV2u-KfPo9sjYgpqyonJoRbVFHOZbRunOwt4jFHMaLMOOzBW0GP2TQ_afiBRXPaC5SXBEsz4vAs")' }}></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h4 className="font-bold text-sm text-text-main dark:text-text-main-dark font-display">The Modernist</h4>
              <p className="text-[10px] text-text-muted uppercase tracking-wide">Tech & Design</p>
            </a>
            <a className="flex-shrink-0 w-48 group snap-start" href="#">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-border-default dark:border-stone-700 bg-subtle-light mb-3 relative">
                <div className="w-full h-full bg-cover bg-top transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbZr9NpzBtGU-3fXhOl0u_Aw_DkOrDLh_ldpdvszKFnX3VoukgeK1QweDS6svPjHj36K15u2z7fJQ48gPQgEwuwvPeW_TICQrn_uYIkJ2K7-JoS8QTK3TATecVG_Z38LYuICBqZZMPB2ksR0cpLboCvuYLOqvDY5BuYJ2oICf1ltFrZxUxUM3zrW3qmnp4D7jbEssWRpEakx2as1qDzsxUtxIJqyzG_D9EIqxqpopmF2I0nLGu7XBwuFCO9pcHqO8inqP9677aJAE")' }}></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h4 className="font-bold text-sm text-text-main dark:text-text-main-dark font-display">The Executive</h4>
              <p className="text-[10px] text-text-muted uppercase tracking-wide">Management</p>
            </a>
            <a className="flex-shrink-0 w-48 group snap-start" href="#">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-border-default dark:border-stone-700 bg-subtle-light mb-3 relative">
                <div className="w-full h-full bg-cover bg-top transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKyume1JNLt5sMxaXBc3I7RTn3Us9ydmopVV5ZxnfOzJqbwF1EMisJTenSpmLmLTjp_8gaYzUv9PtZh362FqcqQbZk48rZOR_HDN3ILb2_3SfMJLWaKpYjOuHvLiU4yVuhuGDQeSpPssh1fU3Ls9vcovp5RSgKvOT-ZZ6rCof5tGcClA0SeaQ5O9k7Gl6g-HtpJ4W68biEw3GlsU5-jVnbM54TNkh6-Sr2gnep5vUgGY05zQBaT61dvIE9ts2RsTsKUQLzT0qpios")' }}></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h4 className="font-bold text-sm text-text-main dark:text-text-main-dark font-display">The Creative</h4>
              <p className="text-[10px] text-text-muted uppercase tracking-wide">Marketing</p>
            </a>
            <a className="flex-shrink-0 w-48 group snap-start" href="#">
              <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-sm border border-border-default dark:border-stone-700 bg-subtle-light mb-3 relative">
                <div className="w-full h-full bg-cover bg-top transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1yzONnWfW3Z0b0vXzyg76Srktlz2JgabNhj8G-9ZskpdXFOBEdNaSqazvYPZkRUo1_T277EbHjRqb9rui0eQEMG9LwYiEETZFJI_1UukgjVVGJ4Tn5_b54kumknuSp6-Zf8PEP5q5kL8LNELwAmQDgL2lujtngIOfW1f6I297-Xj-b1qxNDyVypNo-burt0hxGV2u-KfPo9sjYgpqyonJoRbVFHOZbRunOwt4jFHMaLMOOzBW0GP2TQ_afiBRXPaC5SXBEsz4vAs")' }}></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h4 className="font-bold text-sm text-text-main dark:text-text-main-dark font-display">The Minimalist</h4>
              <p className="text-[10px] text-text-muted uppercase tracking-wide">General</p>
            </a>
            <a className="flex-shrink-0 w-48 group flex flex-col justify-center items-center h-auto rounded-xl border-2 border-dashed border-border-default dark:border-stone-700 hover:border-primary/50 hover:bg-primary/5 transition-all text-center p-4" href="#">
              <span className="material-symbols-outlined text-4xl text-text-muted group-hover:text-primary mb-2">add_circle</span>
              <span className="font-bold text-sm text-text-main dark:text-text-main-dark group-hover:text-primary">See All Templates</span>
            </a>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-8 border border-border-default dark:border-border-default-dark shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-muted dark:text-text-muted-dark text-xs font-bold tracking-[0.1em] uppercase font-display whitespace-nowrap">Trusted by pros at</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 w-full">
            <span className="text-lg font-bold font-display text-stone-600 dark:text-text-main-dark flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-xl">change_history</span> Acme</span>
            <span className="text-lg font-bold font-display text-stone-600 dark:text-text-main-dark flex items-center gap-1.5"><span className="material-symbols-outlined text-secondary text-xl">hexagon</span> HexaGlobal</span>
            <span className="text-lg font-bold font-display text-stone-600 dark:text-text-main-dark flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-xl">emergency</span> MedTech</span>
            <span className="text-lg font-bold font-display text-stone-600 dark:text-text-main-dark flex items-center gap-1.5"><span className="material-symbols-outlined text-secondary text-xl">bolt</span> FastStream</span>
            <span className="text-lg font-bold font-display text-stone-600 dark:text-text-main-dark flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-xl">cloud</span> CloudNine</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-secondary dark:bg-secondary/20 rounded-3xl p-8 md:p-10 flex flex-col justify-center border border-secondary/20 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <div className="text-white/80 dark:text-secondary-light font-bold tracking-wider uppercase text-xs mb-3 font-display">Seamless Experience</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 font-display">Why Choose Our Builder?</h2>
              <p className="text-white/90 text-base leading-relaxed mb-8">
                We've stripped away the complexity. Our tools are designed to help you focus on your content while we handle the design and formatting with elegance.
              </p>
              <a className="inline-flex items-center justify-center rounded-full h-11 px-6 bg-white text-secondary font-bold text-sm shadow-lg hover:bg-stone-50 transition-colors w-fit" href="#">
                Explore all features
              </a>
            </div>
          </div>
          <div className="lg:col-span-8 bg-surface-light dark:bg-surface-dark rounded-3xl p-8 border border-border-default dark:border-border-default-dark shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/50 hover:bg-white border border-border-default dark:border-border-default-dark hover:border-primary/20 hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </div>
                <h3 className="text-base font-bold text-text-main dark:text-white mb-1 font-display">Real-time Preview</h3>
                <p className="text-xs text-text-muted dark:text-text-muted-dark">See changes instantly as you type. No switching modes.</p>
              </div>
              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/50 hover:bg-white border border-border-default dark:border-border-default-dark hover:border-stone-300 hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-600 mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">verified_user</span>
                </div>
                <h3 className="text-base font-bold text-text-main dark:text-white mb-1 font-display">ATS-Friendly</h3>
                <p className="text-xs text-text-muted dark:text-text-muted-dark">Optimized for Applicant Tracking Systems.</p>
              </div>
              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/50 hover:bg-white border border-border-default dark:border-border-default-dark hover:border-secondary/20 hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-secondary mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">download</span>
                </div>
                <h3 className="text-base font-bold text-text-main dark:text-white mb-1 font-display">One-Click Export</h3>
                <p className="text-xs text-text-muted dark:text-text-muted-dark">Download as PDF or Word in seconds.</p>
              </div>
              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/50 hover:bg-white border border-border-default dark:border-border-default-dark hover:border-amber-200 hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xl">auto_fix_high</span>
                </div>
                <h3 className="text-base font-bold text-text-main dark:text-white mb-1 font-display">AI Suggestions</h3>
                <p className="text-xs text-text-muted dark:text-text-muted-dark">Smart bullet points and skill suggestions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-3xl border border-border-default dark:border-border-default-dark shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
              </div>
              <span className="material-symbols-outlined text-stone-200 text-2xl">format_quote</span>
            </div>
            <p className="text-text-main dark:text-text-main-dark text-sm leading-relaxed font-medium">"I was struggling to get callbacks until I used the Executive template. The formatting is clean, warm, and professional."</p>
            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border-default dark:border-border-default-dark">
              <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXhpPlyt9Fqpig6b69MFj5HaUYqC2WR4aTKJ5MmSSMnuGlUqUqGdEEGU6PhlSXgsFkgalYA8SlfO_ky0Iq8fmCsbUBG4MypVj1_KRkwLBnyusNFmmwHIxCG_lqK6VwNYzUz0S9J9NuylnQhm_ith1qovUr-KIYdb30SfJ9_m_o6VK4V-QyCwJLQFXw-Zw6TfXl5gLCw2Ojrw5f28n1z3NRddd2rDiT6K6IzOGrz7izmUX5NodzIQhXhdFpJcNgsTAiC-tZOHL1Two")' }}></div>
              <div>
                <h5 className="font-bold text-xs text-text-main dark:text-white font-display">Sarah Jenkins</h5>
                <p className="text-[10px] text-text-muted">Marketing Manager @ Google</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-3xl border border-border-default dark:border-border-default-dark shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
              </div>
              <span className="material-symbols-outlined text-stone-200 text-2xl">format_quote</span>
            </div>
            <p className="text-text-main dark:text-text-main-dark text-sm leading-relaxed font-medium">"The AI suggestions were a lifesaver. I didn't know how to phrase my achievements, but this tool made it easy."</p>
            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border-default dark:border-border-default-dark">
              <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUzMzCdNZ4qnikPS-SvT1JbiQ0xPZoPVFYAN5vQGjJP2Cf21psGrurdoIMITK7ZS9Og2HAZUTYDYXjgHLv7vECu6a-lvVGx9zHF851NFir6KA8MCXEFMgQvnBSiKGpbtM8jtnYaLE92pUXwdsgXdwPPW-ko5XWw0NYkol5oICnB1XGP6R_KWz0ug8889qes6SimtOOfPaT5qtvK8NcX6DxxSCeFg9jIT9m_oqllXFrvEvWaDm3vZS2Cr5UsZL7rGIn3uwHcXaefUM")' }}></div>
              <div>
                <h5 className="font-bold text-xs text-text-main dark:text-white font-display">Mark Thompson</h5>
                <p className="text-[10px] text-text-muted">Engineer @ Spotify</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-3xl border border-border-default dark:border-border-default-dark shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
                <span className="material-symbols-outlined text-base fill-current">star</span>
              </div>
              <span className="material-symbols-outlined text-stone-200 text-2xl">format_quote</span>
            </div>
            <p className="text-text-main dark:text-text-main-dark text-sm leading-relaxed font-medium">"Simply the best resume builder out there. The live preview is fantastic and exporting to PDF is flawless."</p>
            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border-default dark:border-border-default-dark">
              <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCb_v6SbI-vbeoRHLswfQefmZq31owZnsziUX9RiNSqqjnWI7guvAP4qQtwX-q4QZJ0bNQiL-F3dfchUIoMj4T77Z34ZPBKA_qHXYKNJ6uLYktFUAiUZU-RlA66uKln_EI-xkpSr9gpD1jaR_Rl3ZQWOOTq7KMCPfIyz-YwmUH7v8q3IG-VKBG0EruIMGfKrlJ5-mzybfjbIK5URvIhtfKQ7WZo0pL97RztStN4kRzlVmcwxKnrWrQJMGC0n6sstNtBEqDu4I54DcE")' }}></div>
              <div>
                <h5 className="font-bold text-xs text-text-main dark:text-white font-display">Emily Rodriguez</h5>
                <p className="text-[10px] text-text-muted">Project Lead @ Airbnb</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-3xl overflow-hidden relative shadow-xl shadow-primary/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 font-display">Ready to land your dream job?</h2>
              <p className="text-white/90 text-base max-w-lg">Join thousands of job seekers who have successfully built their careers.</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              <button className="bg-white text-primary hover:bg-stone-50 transition-all px-8 py-4 rounded-full font-bold text-base shadow-lg transform hover:-translate-y-1 whitespace-nowrap">
                Create My Resume
              </button>
              <p className="text-white/70 text-xs">No credit card required</p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-surface-dark border-t border-border-default dark:border-border-default-dark pt-16 pb-8 px-6 md:px-10 mt-auto">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-20">
          <div className="flex flex-col gap-6 max-w-xs">
            <div className="flex items-center gap-2 text-text-main dark:text-white">
              <span className="material-symbols-outlined text-primary text-3xl">description</span>
              <span className="text-xl font-bold font-display">ResumeBuilder</span>
            </div>
            <p className="text-text-muted dark:text-text-muted-dark text-sm leading-relaxed">Empowering professionals to build their future, one resume at a time. Crafted with care.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-text-main dark:text-white mb-1 font-display">Product</h4>
              <a className="text-text-muted dark:text-text-muted-dark text-sm hover:text-primary transition-colors" href="#">Templates</a>
              <a className="text-text-muted dark:text-text-muted-dark text-sm hover:text-primary transition-colors" href="#">Features</a>
              <a className="text-text-muted dark:text-text-muted-dark text-sm hover:text-primary transition-colors" href="#">Pricing</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-text-main dark:text-white mb-1 font-display">Company</h4>
              <a className="text-text-muted dark:text-text-muted-dark text-sm hover:text-primary transition-colors" href="#">About Us</a>
              <a className="text-text-muted dark:text-text-muted-dark text-sm hover:text-primary transition-colors" href="#">Careers</a>
              <a className="text-text-muted dark:text-text-muted-dark text-sm hover:text-primary transition-colors" href="#">Contact</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-text-main dark:text-white mb-1 font-display">Legal</h4>
              <a className="text-text-muted dark:text-text-muted-dark text-sm hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="text-text-muted dark:text-text-muted-dark text-sm hover:text-primary transition-colors" href="#">Terms</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto mt-16 border-t border-border-default dark:border-border-default-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted dark:text-text-muted-dark text-xs">© 2023 ResumeBuilder Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-text-muted dark:text-text-muted-dark hover:text-primary transition-colors flex items-center gap-1 text-sm" href="#">Twitter</a>
            <a className="text-text-muted dark:text-text-muted-dark hover:text-primary transition-colors flex items-center gap-1 text-sm" href="#">LinkedIn</a>
            <a className="text-text-muted dark:text-text-muted-dark hover:text-primary transition-colors flex items-center gap-1 text-sm" href="#">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}