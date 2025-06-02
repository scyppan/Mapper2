const cssfiles = ['style.css', 'zoom.css'];
const jsfiles  = [
  'classes.js',
  'globalvars.js',
  'load.js',
  'parser.js',
  'builder.js',
  'reconstructor.js',
  'controls.js',
  'eventlisteners.js'
];

function loadAssets(baseUrl, version) {
  return new Promise((resolve, reject) => {
    const head = document.head;
    const fullPath = baseUrl + '@' + version + '/';
    const total = cssfiles.length + jsfiles.length;
    let loaded = 0;

    function checkDone() {
      if (++loaded === total) resolve();
    }

    if (total === 0) {
      resolve();
      return;
    }

    cssfiles.forEach(file => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fullPath + 'css/' + file;
      link.onload = checkDone;
      link.onerror = reject;
      head.appendChild(link);
    });

    jsfiles.forEach(file => {
      const script = document.createElement('script');
      script.src = fullPath + 'js/' + file;
      script.defer = true;
      script.onload = checkDone;
      script.onerror = reject;
      head.appendChild(script);
    });
  });
}

function initapp(baseUrl, version) {
  loadAssets(baseUrl, version).then(() => {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', () => {
      loadSvgFile()
        .then(contents => {
          svgparsed = parseSVGContents(contents);
          svgparsed.districts = svgparsed.districts
            .map(d => wrapDistrictInGroup(d))
            .filter(Boolean);
          displaySVG(svgparsed);
          fileInput.classList.add('hidden');
          setViewportToWindow();
          storeOriginalViewBox();
          setMouseInputEventListeners();
          initKeyboardControls();
          svgobj = document.querySelector('#map-container > svg');
          console.log("here's the svg obj", svgobj);
          svgobj.focus();
          console.log("application initialized");
        })
        .catch(error => console.error(error));
    });
  }).catch(error => console.error(error));
}