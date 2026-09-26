/* =========================================================
   oneusop · i18n + render engine
   - detects system language (zh / en)
   - supports manual toggle (persisted)
   - fills [data-i18n], renders app config
   ========================================================= */
(function () {
  'use strict';
  var SUPPORTED = ['zh', 'en'];

  function detectLang() {
    try {
      var stored = localStorage.getItem('oneusop_lang');
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    var nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.indexOf('zh') === 0 ? 'zh' : 'en';
  }

  function pick(obj, lang) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] != null ? obj[lang] : (obj.en || obj.zh || '');
  }

  /* common UI strings */
  var COMMON = {
    zh: {
      brand: 'oneusop',
      apps: '全部应用',
      download: 'App Store 下载',
      backHome: '返回首页',
      featuresTitle: '核心功能',
      featuresSub: '从最初的构思到每一处交互细节，我们都为孩子的好奇与每位用户的日常使用反复打磨，让功能既好用又让人安心。',
      showcaseTitle: '精美界面一览',
      showcaseSub: '我们坚持简洁、直观的视觉语言，去掉多余干扰，让每一次点击都自然流畅，带来真正令人愉悦的使用体验。',
      ctaTitle: '立即开启精彩体验',
      ctaSub: '现在就在 iPhone 与 iPad 上免费下载，无需注册、几秒即可开始，和我们一起开启属于你的精彩旅程。',
      getApp: '获取 App',
      rights: '保留所有权利。',
      privacy: '隐私政策',
      support: '支持',
      langToggle: 'EN',
      allApps: '探索 oneusop 的全部应用'
    },
    en: {
      brand: 'oneusop',
      apps: 'All Apps',
      download: 'Download on App Store',
      backHome: 'Back to Home',
      featuresTitle: 'Core Features',
      featuresSub: 'From the first idea to every interaction detail, we refine for a child\'s curiosity and every user\'s daily life, making features easy to use and reassuring.',
      showcaseTitle: 'A Look Inside',
      showcaseSub: 'We keep a clean, intuitive visual language, cut the clutter, and make every tap feel natural — a truly delightful experience.',
      ctaTitle: 'Start Your Journey Today',
      ctaSub: 'Download free on iPhone and iPad now — no sign-up, ready in seconds, and start your own wonderful journey with us.',
      getApp: 'Get the App',
      rights: 'All rights reserved.',
      privacy: 'Privacy',
      support: 'Support',
      langToggle: '中',
      allApps: 'Explore all oneusop apps'
    }
  };

  var APPLE_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.9c0-2 1.6-3 1.7-3a3.7 3.7 0 0 0-2.9-1.6c-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7A3.9 3.9 0 0 0 5.4 11c-1.3 2.3-.3 5.7 1 7.6.6.9 1.3 2 2.3 2 1 0 1.3-.6 2.5-.6s1.5.6 2.6.6 1.6-.9 2.2-1.9c.7-1 1-2 1-2a5.4 5.4 0 0 1-2.6-4.8zM14.2 5.4a3.6 3.6 0 0 0 .8-2.6 3.7 3.7 0 0 0-2.4 1.3 3.5 3.5 0 0 0-.8 2.5 3 3 0 0 0 2.4-1.2z"/></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function applyLang(lang) {
    document.documentElement.lang = lang;
    var c = COMMON[lang];

    // static [data-i18n]
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (c[key] != null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = c[key];
        else el.textContent = c[key];
      }
    });

    // language toggle labels
    document.querySelectorAll('[data-lang-label]').forEach(function (el) {
      el.textContent = c.langToggle;
    });

    // app-specific config
    var cfg = window.APP_CONFIG;
    if (cfg) renderApp(cfg, lang, c);

    // hub app grid
    if (window.HUB_APPS) renderHub(window.HUB_APPS, lang, c);

    // shared privacy page (?app=slug)
    if (window.ONEUSOP_PRIVACY) renderPrivacy(lang, c);

    // hub descriptive text
    if (window.HUB_TEXT) {
      ['hubTagline', 'hubLead', 'appsSub'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el && window.HUB_TEXT[id]) el.textContent = pick(window.HUB_TEXT[id], lang);
      });
    }

    // toggle active state
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
  }

  function renderApp(cfg, lang, c) {
    var $ = function (id) { return document.getElementById(id); };

    // download / appstore link
    var dl = cfg.appStoreUrl;
    var as = document.querySelectorAll('[data-appstore]');
    as.forEach(function (a) {
      a.href = dl;
      var small = a.querySelector('small');
      var b = a.querySelector('b');
      if (small) small.textContent = c.getApp;
      if (b) b.textContent = 'App Store';
    });

    // hero texts
    if ($('app-name')) $('app-name').textContent = pick(cfg.name, lang);
    if ($('app-tagline')) $('app-tagline').textContent = pick(cfg.tagline, lang);
    if ($('app-desc')) $('app-desc').textContent = pick(cfg.desc, lang);
    if ($('app-badge')) $('app-badge').textContent = pick(cfg.badge, lang);

    // phone mockup texts
    if ($('screen-emoji')) $('screen-emoji').textContent = cfg.icon;
    if ($('screen-title')) $('screen-title').textContent = pick(cfg.name, lang);
    if ($('screen-sub')) $('screen-sub').textContent = pick(cfg.badge, lang);

    // phone screen body
    var sb = $('screen-body');
    if (sb && cfg.screenBody) {
      sb.innerHTML = cfg.screenBody.map(function (it) {
        if (it.t === 'pill') return '<span class="s-pill">' + pick(it.text, lang) + '</span>';
        if (it.t === 'circle') return '<div class="s-circle">' + it.icon + '</div>';
        if (it.t === 'grid') return '<div class="s-grid">' + (it.cells || []).map(function (c) { return '<div class="s-cell">' + c + '</div>'; }).join('') + '</div>';
        if (it.t === 'row') return '<div class="s-row"><div class="s-card"><div class="t">' + pick(it.a, lang) + '</div><div class="b">' + pick(it.x, lang) + '</div></div><div class="s-card"><div class="t">' + pick(it.b, lang) + '</div><div class="b">' + pick(it.y, lang) + '</div></div></div>';
        return '<div class="s-card"><div class="t">' + pick(it.a, lang) + '</div>' + (it.x ? '<div class="b">' + pick(it.x, lang) + '</div>' : '') + '</div>';
      }).join('');
    }

    // stats
    var statsEl = $('stats');
    if (statsEl && cfg.stats) {
      statsEl.innerHTML = cfg.stats.map(function (s) {
        return '<li><span class="num">' + s.value + '</span><span class="lab">' + pick(s.label, lang) + '</span></li>';
      }).join('');
    }

    // features
    var fe = $('#features-grid');
    if (fe && cfg.features) {
      fe.innerHTML = cfg.features.map(function (f) {
        return '<div class="feature reveal">' +
          '<div class="f-ic">' + f.icon + '</div>' +
          '<h3>' + pick(f.title, lang) + '</h3>' +
          '<p class="f-desc">' + pick(f.desc, lang) + '</p>' +
          (f.detail ? '<p class="f-detail">' + pick(f.detail, lang) + '</p>' : '') + '</div>';
      }).join('');
    }

    // features intro
    var fi = $('#features-intro');
    if (fi && cfg.featuresIntro) fi.textContent = pick(cfg.featuresIntro, lang);

    // showcase
    var sh = $('#showcase');
    if (sh && cfg.shots) {
      sh.innerHTML = cfg.shots.map(function (s) {
        return '<div class="shot reveal"><div class="sc" style="background:' + s.bg + '">' +
          '<div class="sc-h"><div class="e">' + s.icon + '</div><div class="ti">' + pick(s.title, lang) + '</div></div>' +
          '<div class="sc-b">' + (s.rows || []).map(function (r) {
            return '<div class="row"><div class="a">' + pick(r.a, lang) + '</div><div class="x">' + pick(r.x, lang) + '</div></div>';
          }).join('') + '</div></div>' +
          '<div class="sc-cap">' + pick(s.cap, lang) + '</div>' +
          (s.detail ? '<div class="sc-detail">' + pick(s.detail, lang) + '</div>' : '') + '</div>';
      }).join('');
    }

    // section titles
    var ft = $('#features-title'); if (ft) ft.textContent = c.featuresTitle;
    var fs = $('#features-sub'); if (fs) fs.textContent = c.featuresSub;
    var st = $('#showcase-title'); if (st) st.textContent = c.showcaseTitle;
    var ss = $('#showcase-sub'); if (ss) ss.textContent = c.showcaseSub;

    // cta band
    var ct = $('#cta-title'); if (ct) ct.textContent = c.ctaTitle;
    var cs = $('#cta-sub'); if (cs) cs.textContent = c.ctaSub;

    observeReveals();
  }

  function renderPrivacy(lang, c) {
    var apps = window.ONEUSOP_APPS || {};
    var data = window.ONEUSOP_PRIVACY[lang] || window.ONEUSOP_PRIVACY.en;

    var params = new URLSearchParams(window.location.search);
    var slug = params.get('app');
    var app = apps[slug];

    // apply theme + app name
    var appName = app ? pick(app.name, lang) : pick({ zh: 'oneusop', en: 'oneusop' }, lang);

    if (app && app.theme) document.documentElement.setAttribute('data-theme', app.theme);
    if (document.getElementById('pt-app')) document.getElementById('pt-app').textContent = appName;
    if (document.getElementById('pt-title')) {
      document.getElementById('pt-title').textContent = appName + ' · ' + data.title;
      document.title = appName + ' · ' + data.title;
    }
    if (document.getElementById('pt-updated')) {
      document.getElementById('pt-updated').textContent = data.updatedLabel + '：' + (app ? pick(app.updated, lang) : '—');
    }

    // intro (replace {app})
    if (document.getElementById('pt-intro')) {
      document.getElementById('pt-intro').textContent = data.intro.replace(/\{app\}/g, appName);
    }

    // sections
    var sec = document.getElementById('pt-sections');
    if (sec) {
      sec.innerHTML = data.sections.map(function (s, i) {
        return '<div class="p-sec reveal">' +
          '<div class="p-num">' + (i + 1) + '</div>' +
          '<div class="p-body"><h3>' + s.h + '</h3><p>' + s.p + '</p></div></div>';
      }).join('');
    }

    // contact
    if (document.getElementById('pt-contact-label')) document.getElementById('pt-contact-label').textContent = data.contactLabel;
    if (document.getElementById('pt-contact-text')) document.getElementById('pt-contact-text').textContent = data.contactText;
    var mail = document.getElementById('pt-email');
    if (mail) {
      var email = app && app.email ? app.email : 'oneusop@163.com';
      mail.textContent = email;
      mail.href = 'mailto:' + email;
    }

    // back-to-app vs back-home link
    var back = document.getElementById('privacy-back');
    if (back) {
      back.setAttribute('data-i18n', 'backHome');
      back.querySelector('span').textContent = app ? data.backLabel : c.backHome;
      back.href = app ? ('./' + app.slug + '/') : './index.html';
    }
    var home = document.getElementById('privacy-home');
    if (home) home.href = './index.html';

    observeReveals();
  }

  function renderHub(apps, lang, c) {
    var grid = document.getElementById('app-grid');
    if (!grid) return;
    grid.innerHTML = apps.map(function (a) {
      return '<a class="app-card reveal" href="' + a.url + '" style="--c1:' + a.c1 + ';--c2:' + a.c2 + ';--accent:' + a.c1 + '">' +
        '<span class="glow" style="background:linear-gradient(135deg,' + a.c1 + ',' + a.c2 + ')"></span>' +
        '<div class="a-ic">' + a.icon + '</div>' +
        '<h3>' + ONEUSOP.pick(a.name, lang) + '</h3>' +
        '<div class="a-tag">' + ONEUSOP.pick(a.tag, lang) + '</div>' +
        '<div class="a-desc">' + ONEUSOP.pick(a.desc, lang) + '</div>' +
        '<span class="a-link">' + c.allApps.split(' ').slice(0, 1).join(' ') + ' ' + ARROW + '</span>' +
        '</a>';
    }).join('');
    observeReveals();
  }

  function observeReveals() {
    var els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  function bindLangToggle() {
    var lang = detectLang();
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        var next = b.getAttribute('data-lang');
        try { localStorage.setItem('oneusop_lang', next); } catch (e) {}
        lang = next;
        applyLang(lang);
      });
    });
  }

  function init() {
    var lang = detectLang();
    bindLangToggle();
    applyLang(lang);
    // mark static reveals
    observeReveals();
    // year
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  // expose for reuse
  window.ONEUSOP = { init: init, pick: pick, COMMON: COMMON };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
