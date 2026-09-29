/* =========================================================
   oneusop · hub Three.js stage
   Compatible, lightweight, with CSS fallback
   ========================================================= */
(function () {
  'use strict';

  var STAGE_ID = 'hub-stage';
  var CANVAS_ID = 'hub-canvas';

  function prefersReducedMotion() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  }

  function isLowPower() {
    try {
      if (navigator.connection && (navigator.connection.saveData || /2g/.test(navigator.connection.effectiveType || ''))) {
        return true;
      }
    } catch (e) {}
    var cores = navigator.hardwareConcurrency || 4;
    var mem = navigator.deviceMemory || 4;
    return cores <= 2 || mem <= 2;
  }

  function hasWebGL() {
    try {
      var c = document.createElement('canvas');
      return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }

  function markFallback(stage) {
    if (!stage) return;
    stage.classList.add('is-fallback');
    stage.classList.remove('is-ready');
  }

  function markReady(stage) {
    if (!stage) return;
    stage.classList.add('is-ready');
    stage.classList.remove('is-fallback');
  }

  function loadThree(cb) {
    if (window.THREE) {
      cb(null, window.THREE);
      return;
    }
    var urls = [
      'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js',
      'https://unpkg.com/three@0.160.0/build/three.min.js'
    ];
    var i = 0;
    function tryNext() {
      if (i >= urls.length) {
        cb(new Error('three load failed'));
        return;
      }
      var s = document.createElement('script');
      s.src = urls[i++];
      s.async = true;
      s.onload = function () {
        if (window.THREE) cb(null, window.THREE);
        else tryNext();
      };
      s.onerror = tryNext;
      document.head.appendChild(s);
    }
    tryNext();
  }

  function createScene(THREE, stage, canvas) {
    var w = stage.clientWidth || window.innerWidth;
    var h = stage.clientHeight || window.innerHeight;
    var mobile = Math.min(w, h) < 720 || isLowPower();
    var particleCount = mobile ? 420 : 900;

    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: !mobile,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75));
    renderer.setSize(w, h, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(48, w / h, 0.1, 100);
    camera.position.set(0, 0.15, 7.2);

    // soft luminous rings
    var group = new THREE.Group();
    scene.add(group);

    function makeRing(radius, tube, color, opacity) {
      var geo = new THREE.TorusGeometry(radius, tube, 16, mobile ? 64 : 120);
      var mat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      var mesh = new THREE.Mesh(geo, mat);
      return mesh;
    }

    var ringA = makeRing(2.35, 0.018, 0x6d5efc, 0.55);
    ringA.rotation.x = Math.PI * 0.58;
    ringA.rotation.y = 0.35;
    group.add(ringA);

    var ringB = makeRing(1.75, 0.012, 0x00c2ff, 0.45);
    ringB.rotation.x = Math.PI * 0.42;
    ringB.rotation.z = -0.4;
    group.add(ringB);

    var ringC = makeRing(2.95, 0.01, 0xa78bfa, 0.28);
    ringC.rotation.x = Math.PI * 0.7;
    ringC.rotation.y = -0.55;
    group.add(ringC);

    // core icosahedron
    var icoGeo = new THREE.IcosahedronGeometry(0.72, 1);
    var icoMat = new THREE.MeshBasicMaterial({
      color: 0x6d5efc,
      transparent: true,
      opacity: 0.22,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    var ico = new THREE.Mesh(icoGeo, icoMat);
    group.add(ico);

    var coreGeo = new THREE.IcosahedronGeometry(0.38, 0);
    var coreMat = new THREE.MeshBasicMaterial({
      color: 0x00c2ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    var core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // particle field
    var positions = new Float32Array(particleCount * 3);
    var colors = new Float32Array(particleCount * 3);
    var cA = new THREE.Color(0x6d5efc);
    var cB = new THREE.Color(0x00c2ff);
    var cC = new THREE.Color(0xffffff);
    var tmp = new THREE.Color();

    for (var i = 0; i < particleCount; i++) {
      var r = 1.2 + Math.random() * 4.8;
      var theta = Math.random() * Math.PI * 2;
      var phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
      positions[i * 3 + 2] = r * Math.cos(phi);

      var mix = Math.random();
      if (mix < 0.45) tmp.copy(cA);
      else if (mix < 0.85) tmp.copy(cB);
      else tmp.copy(cC);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }

    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    var pMat = new THREE.PointsMaterial({
      size: mobile ? 0.028 : 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    var points = new THREE.Points(pGeo, pMat);
    group.add(points);

    // pointer parallax
    var targetX = 0;
    var targetY = 0;
    var curX = 0;
    var curY = 0;
    var running = true;
    var raf = 0;
    var t0 = performance.now();

    function onPointer(e) {
      var x = e.clientX != null ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : w / 2);
      var y = e.clientY != null ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : h / 2);
      targetX = (x / w - 0.5) * 2;
      targetY = (y / h - 0.5) * 2;
    }

    window.addEventListener('pointermove', onPointer, { passive: true });

    function resize() {
      w = stage.clientWidth || window.innerWidth;
      h = stage.clientHeight || window.innerHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    window.addEventListener('resize', resize, { passive: true });

    function onVisibility() {
      running = document.visibilityState !== 'hidden';
      if (running && !raf) raf = requestAnimationFrame(tick);
    }
    document.addEventListener('visibilitychange', onVisibility);

    function tick(now) {
      raf = 0;
      if (!running) return;
      var t = (now - t0) * 0.001;

      curX += (targetX - curX) * 0.045;
      curY += (targetY - curY) * 0.045;

      group.rotation.y = t * 0.12 + curX * 0.35;
      group.rotation.x = Math.sin(t * 0.35) * 0.12 + curY * -0.28;
      group.position.x = curX * 0.35;
      group.position.y = curY * -0.22;

      ringA.rotation.z = t * 0.25;
      ringB.rotation.z = -t * 0.18;
      ringC.rotation.z = t * 0.1;
      ico.rotation.y = t * 0.55;
      ico.rotation.x = t * 0.22;
      core.rotation.y = -t * 0.8;
      points.rotation.y = t * 0.05;

      camera.position.x = curX * 0.2;
      camera.position.y = 0.15 + curY * -0.12;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }

    markReady(stage);
    raf = requestAnimationFrame(tick);

    return {
      destroy: function () {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', onVisibility);
        try {
          pGeo.dispose();
          pMat.dispose();
          icoGeo.dispose();
          icoMat.dispose();
          coreGeo.dispose();
          coreMat.dispose();
          ringA.geometry.dispose();
          ringA.material.dispose();
          ringB.geometry.dispose();
          ringB.material.dispose();
          ringC.geometry.dispose();
          ringC.material.dispose();
          renderer.dispose();
        } catch (e) {}
      }
    };
  }

  function init() {
    var stage = document.getElementById(STAGE_ID);
    var canvas = document.getElementById(CANVAS_ID);
    if (!stage || !canvas) return;

    if (prefersReducedMotion() || !hasWebGL()) {
      markFallback(stage);
      return;
    }

    loadThree(function (err, THREE) {
      if (err || !THREE) {
        markFallback(stage);
        return;
      }
      try {
        createScene(THREE, stage, canvas);
      } catch (e) {
        markFallback(stage);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
