const cssfiles = ['style.css', 'zoom.css'];
const jsfiles  = [
  'classes.js',
  'globalvars.js',
  'load.js',
  'parser.js',
  'builder.js',
  'reconstructor.js',
  'controls.js',
  'eventlisteners.js',
  'overlord.js'
];

// ── 2) loadAssets: inject each CSS/JS in order ─────────────────────────────
function loadAssets(baseUrl, version) {
  return new Promise((resolve, reject) => {
    const head = document.head;
    const fullPath = baseUrl + '@' + version + '/';
    const total = cssfiles.length + jsfiles.length;
    let loaded = 0;

    function checkDone() {
      if (++loaded === total) {
        resolve();
      }
    }

    if (total === 0) {
      resolve();
      return;
    }

    // 2a) insert all CSS
    cssfiles.forEach(function(file) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fullPath + 'css/' + file;
      link.onload = checkDone;
      link.onerror = reject;
      head.appendChild(link);
    });

    // 2b) insert all JS (with defer)
    jsfiles.forEach(function(file) {
      const script = document.createElement('script');
      script.src = fullPath + 'js/' + file;
      script.defer = true;
      script.onload = checkDone;
      script.onerror = reject;
      head.appendChild(script);
    });
  });
}

// ── 3) initapp: after CSS/JS are in the DOM, start your SVG‐loader logic ───
async function initapp(baseUrl, version) {
  await loadAssets(baseUrl, version);

}