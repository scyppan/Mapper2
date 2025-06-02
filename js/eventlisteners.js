function setMouseInputEventListeners() {console.log("initmousecontrols");
  
  let isPanning = false, start = { x: 0, y: 0 }, startViewBox;
  function pointerDown(e) {
    isPanning = true;
    start = { x: e.clientX, y: e.clientY };
    startViewBox = getviewbox();
    svgobj.setPointerCapture(e.pointerId);
    svgobj.style.cursor = 'grabbing';
  }
  function pointerMove(e) {
    if (!isPanning) return;
    const dx = e.clientX - start.x,
          dy = e.clientY - start.y,
          [x, y, w, h] = startViewBox,
          scaleX = w / svgobj.clientWidth,
          scaleY = h / svgobj.clientHeight;
    setviewbox([x - dx * scaleX, y - dy * scaleY, w, h]);
  }
  function pointerUp(e) {
    if (!isPanning) return;
    isPanning = false;
    svgobj.releasePointerCapture(e.pointerId);
    svgobj.style.cursor = 'grab';
  }
  function wheelHandler(e) {
    e.preventDefault();
    if (e.deltaY < 0) zoomViewBox(true);
    else zoomViewBox(false);
  }
  svgobj.addEventListener('pointerdown', pointerDown);
  svgobj.addEventListener('pointermove', pointerMove);
  svgobj.addEventListener('pointerup', pointerUp);
  svgobj.addEventListener('pointercancel', pointerUp);
  svgobj.addEventListener('wheel', wheelHandler, { passive: false });
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
