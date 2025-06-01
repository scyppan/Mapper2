function displaySVG(svgObj) {
  let svgContent = svgObj.header;
  svgObj.districts.forEach(district => {
    svgContent += district;
  });
  svgContent += '</svg>';

  const container = document.getElementById('map-container');
  container.innerHTML = svgContent;
}