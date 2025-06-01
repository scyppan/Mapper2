function addShapeClass(shapeString) {
  if (/class="/.test(shapeString)) {
    return shapeString.replace(/class="([^"]*)"/, (_, classes) => {
      return `class="${classes} shape"`;
    });
  } else {
    return shapeString.replace(/<(\w+)/, '<$1 class="shape"');
  }
}

function wrapDistrictInGroup(districtContent) {
  console.log("Processing district:", districtContent);
  const id = parseElementForId(districtContent.content);
  if (!id) {
    console.error("Missing ID for the district:", districtContent);
    return null;
  }
  const title = id
    .replace(/_/g, ' ')
    .replace(/x27/g, "’")
    .replace(/x2019/g, "’")
    .replace(/&#x2019;/g, "’")
    .replace(' ’ ', '’');

  const titleElem = `<title>${title}</title>`;
  let contentClean = districtContent.content.replace(/\s*class="[^"]*cls-[^"]*[^"]*"/g, '');
  let shapeContent = addShapeClass(contentClean);
  const randomFillClass = getRandomFillClass();
  return `<g id="${id}" class="district ${randomFillClass}">${titleElem}${shapeContent}</g>`;
}
