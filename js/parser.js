function parseSVGContents(contents) {
  const svgObj = {
    header: "",
    districts: []
  };
  const xmlDeclarationRegex = /<\?xml\b[^>]*\?>/i;
  const xmlDeclarationMatch = xmlDeclarationRegex.exec(contents);
  if (xmlDeclarationMatch) {
    svgObj.header += xmlDeclarationMatch[0];
  }

  const headerRegex = /<svg\b[^>]*>/i;
  const headerMatch = headerRegex.exec(contents);
  if (headerMatch) {
    svgObj.header += headerMatch[0];
  }

  const elementsRegex = /<\s*(path|polyline|rect|circle|ellipse|line)\b[^>]*>(<\/\1>)?/gi;
  let match;
  while ((match = elementsRegex.exec(contents)) !== null) {
    let tag = match[0];
    let endIndex = tag.endsWith('/>')
      ? elementsRegex.lastIndex
      : contents.indexOf(`</${match[1]}>`, elementsRegex.lastIndex) + `</${match[1]}>`.length;
    let elementContent = contents.substring(match.index, endIndex);
    svgObj.districts.push({ content: elementContent });
  }

  return svgObj;
}

function parseElementForId(str) {
  const match = str.match(/id="([^"]+)"/);
  if (match) {
    return match[1].trim();
  } else {
    console.warn("No ID found in:", str);
    return null;
  }
}