let svgobj;
let svgparsed;
let origviewbox;
let zoomfactor = .1;
let panfactor = 10;
const minZoom = 1;   // Minimum width/height
const maxZoom = 6000; // Maximum width/height
let currentZoom = 1;
let viewportAdjustment = 2.5;
const strokeBreakpoints = [
  { zoom: 7, stroke: "1.5px", highlight: "3px", pan: 32 },
  { zoom: 13, stroke: ".5px", highlight: ".75px", pan: 23 },
  { zoom: 17, stroke: ".35px", highlight: ".5px", pan: 17 },
  { zoom: 23, stroke: ".30px", highlight: ".45px", pan: 12 },
  { zoom: 27, stroke: ".25px", highlight: ".35px", pan: 7 },
  { zoom: 32, stroke: ".20px", highlight: ".3px", pan: 3 },
  { zoom: 37, stroke: ".15px", highlight: ".2px", pan: 1 },
  { zoom: 42, stroke: ".1px", highlight: ".15px", pan: .75 },
  { zoom: 47, stroke: ".05px", highlight: ".1px", pan: .5 },
  { zoom: 52, stroke: ".025px", highlight: ".05px", pan: .25 },
  { zoom: 57, stroke: ".01px", highlight: ".025px", pan: .1 },
  { zoom: 62, stroke: ".005px", highlight: ".01px", pan: .05 },
  { zoom: 67, stroke: ".001px", highlight: ".005px", pan: .01 }
];