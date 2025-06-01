const maxFill = 100;
const fillClasses = Array.from({ length: maxFill }, (_, i) => `fill-${i + 1}`);
function getRandomFillClass() {
  const idx = Math.floor(Math.random() * fillClasses.length);
  return fillClasses[idx];
}