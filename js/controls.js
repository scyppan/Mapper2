function zoomViewBox(zoomin) {
  let [x, y, width, height] = getviewbox();
  let scale = zoomin ? 1 - zoomfactor : 1 + zoomfactor;
  let newWidth = width * scale;
  let newHeight = height * scale;
  if (newWidth < minZoom || newWidth > maxZoom) return;
  if (newHeight < minZoom || newHeight > maxZoom) return;
  x += (width - newWidth) / 2;
  y += (height - newHeight) / 2;
  if (zoomin) { currentZoom++; } else { currentZoom--; }
  setviewbox([x, y, newWidth, newHeight]);
}

function panViewBox(direction) {
  let [x, y, width, height] = getviewbox();
  switch (direction) {
    case 'left':
      x = Math.max(x - panfactor, -maxZoom);
      break;
    case 'right':
      x = Math.min(x + panfactor, maxZoom - width);
      break;
    case 'up':
      y = Math.max(y - panfactor, -maxZoom);
      break;
    case 'down':
      y = Math.min(y + panfactor, maxZoom - height);
      break;
  }
  setviewbox([x, y, width, height]);
}

function getviewbox() {
  return svgobj.getAttribute('viewBox').split(' ').map(Number);
}

function setviewbox(viewBoxArray) {
  svgobj.setAttribute('viewBox', viewBoxArray.map(v => v.toFixed(2)).join(' '));
  updateStrokeWidth();
}

function updateStrokeWidth() {
  let selectedBreakpoint = strokeBreakpoints[strokeBreakpoints.length - 1];
  for (let i = 0; i < strokeBreakpoints.length; i++) {
    if (currentZoom < strokeBreakpoints[i].zoom) {
      selectedBreakpoint = strokeBreakpoints[i];
      break;
    }
  }
  console.log("stroke:", selectedBreakpoint.stroke, "highlight:", selectedBreakpoint.highlight, "zoom:", currentZoom);
  document.documentElement.style.setProperty('--stroke-width', selectedBreakpoint.stroke);
  document.documentElement.style.setProperty('--highlight-width', selectedBreakpoint.highlight);
  panfactor = selectedBreakpoint.pan;
}

function setViewportToWindow() {
  
  let [origX, origY, origW, origH] = getviewbox();
  const winW = window.innerWidth * viewportAdjustment;
  const winH = window.innerHeight * viewportAdjustment;
  const centerX = origX + origW / 2;
  const centerY = origY + origH / 2;
  const newX = centerX - winW / 2;
  const newY = centerY - winH / 2;
  const newViewBox = [newX, newY, winW, winH].join(' ');
  svgobj.setAttribute('viewBox', newViewBox);
  console.log("New viewBox:", newViewBox);
}

function resetView() {
  if (!origviewbox) {
    console.warn("Original viewBox not stored.");
    return;
  }
  currentZoom = 1;
  setviewbox(origviewbox);
  console.log("Reset to:", origviewbox.join(' '));
}