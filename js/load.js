function loadSvgFile() {
  return new Promise((resolve, reject) => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
      reject('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result);
    };
    reader.onerror = function (e) {
      reject('Error reading file: ' + e);
    };

    reader.readAsText(file);
  });
}

function storeOriginalViewBox() {
  origviewbox = getviewbox();
  console.log("Original viewBox stored:", origviewbox.join(' '));
}
