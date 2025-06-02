function setMouseInputEventListeners() {console.log("initmousecontrols");
  const svg = document.querySelector('#map-container svg');
  if (!svg) {
    console.error('SVG not found in #map-container.');
    return;
  }
  let isPanning = false, start = { x: 0, y: 0 }, startViewBox;
  function pointerDown(e) {
    isPanning = true;
    start = { x: e.clientX, y: e.clientY };
    startViewBox = getviewbox();
    svg.setPointerCapture(e.pointerId);
    svg.style.cursor = 'grabbing';
  }
  function pointerMove(e) {
    if (!isPanning) return;
    const dx = e.clientX - start.x,
          dy = e.clientY - start.y,
          [x, y, w, h] = startViewBox,
          scaleX = w / svg.clientWidth,
          scaleY = h / svg.clientHeight;
    setviewbox([x - dx * scaleX, y - dy * scaleY, w, h]);
  }
  function pointerUp(e) {
    if (!isPanning) return;
    isPanning = false;
    svg.releasePointerCapture(e.pointerId);
    svg.style.cursor = 'grab';
  }
  function wheelHandler(e) {
    e.preventDefault();
    if (e.deltaY < 0) zoomViewBox(true);
    else zoomViewBox(false);
  }
  svg.addEventListener('pointerdown', pointerDown);
  svg.addEventListener('pointermove', pointerMove);
  svg.addEventListener('pointerup', pointerUp);
  svg.addEventListener('pointercancel', pointerUp);
  svg.addEventListener('wheel', wheelHandler, { passive: false });
}

function initKeyboardControls() {console.log("initkeyboardcontrols");
  document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    console.log('Key pressed:', key);
    switch (key) {
      case 'q':
      case '+':
      case '=':
        zoomViewBox(true);
        break;
      case 'e':
      case '-':
        zoomViewBox(false);
        break;
      case 'w':
      case 'arrowup':
        panViewBox('up');
        break;
      case 'a':
      case 'arrowleft':
        panViewBox('left');
        break;
      case 's':
      case 'arrowdown':
        panViewBox('down');
        break;
      case 'd':
      case 'arrowright':
        panViewBox('right');
        break;
      case 'r':
      case 'home':
        resetView();
        break;
    }
  });
}
