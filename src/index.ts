// @ts-expect-error they dont have types
import { parse } from 'gradient-parser'
import { TLinearGradientOrientation, TColorStop, TValue, TRadialGradientOrientation, ILinearGradient, IRadialGradient, BBox } from './types'


const orientationToAngle = ({ type, value }: TLinearGradientOrientation) => {
  if (type == 'directional') {
    return {
      'top': 0,
      'right': 90,
      'bottom': 180,
      'left': 270
    }[value];
  }
  else {
    return Number(value);
  }
}

const normalizeColor = ({ type, value }: TColorStop) => {
  if (type === 'hex') {
    return `#${ value }`;
  }
  if (type === 'rgba' || type === 'rgb') {
    return `${ type }(${ value.join(', ') })`
  }
  if (type === 'literal') {
    return value;
  }
}
const normalizeLength = ({ type, value }: TValue) => `${ value }${ type }`;

const round = (n: number, digits: number) => Math.round(n * (10 ** digits)) / (10 ** digits);



function getPosValue(pos: TValue, size: number) {
  if (pos) {
    const { type, value } = pos;
    if (type == 'position-keyword') {
      return {
        'top': 0,
        'right': 1,
        'bottom': 1,
        'left': 0,
        'center': 0.5
      }[value]
    }
    if (type == '%') {
      return Number(value) / 100;
    }
    if (type === 'px') {
      return Number(value) / size;
    }
  }
}

function parseRadialPos({ at }: TRadialGradientOrientation, bbox: BBox) {
  
  if (at.type == 'position') {
    const x = (getPosValue(at.value.x, bbox.width) || getPosValue(at.value.x, bbox.width) == 0) ? getPosValue(at.value.x, bbox.width) : 0.5;
    const y = getPosValue(at.value.y, bbox.height);
    return {
      x,
      y: y || x
    }
  }
}

function createColorStops(colorStops: TColorStop[]): string[] {
  return colorStops.map(({ type, value, length }, i) => {
    return `<stop offset="${ length ? normalizeLength(length) : ((i / (colorStops.length - 1)) * 100 + '%') }" style="stop-color: ${ normalizeColor({ type, value } as TColorStop) };" />`;
  });
}

function parseLinearGradient({ orientation, colorStops }: ILinearGradient) : string|undefined {
  if (!orientation) return;
  const angle = orientationToAngle(orientation) * (Math.PI / 180) - Math.PI;
    const matrix = {
      start: {
        x: round(0.5 + 0.5 * Math.sin(angle), 4),
        y: round(0.5 - 0.5 * Math.cos(angle), 4)
      },
      end: {
        x: round(0.5 + 0.5 * Math.sin(angle + Math.PI), 4),
        y: round(0.5 - 0.5 * Math.cos(angle + Math.PI), 4)
      }
    }


    return `<linearGradient data-gradient-angle="${ orientationToAngle(orientation) }" x1="${ (matrix.start.x) * 100 }%" y1="${ (matrix.start.y) * 100 }%" x2="${ (matrix.end.x) * 100 }%" y2="${ (matrix.end.y) * 100 }%">${ createColorStops(colorStops).join('') }</linearGradient>`;
    
}



function parseRadialGradient({ orientation, colorStops }: IRadialGradient, bbox: BBox = { width: 100, height: 100 }) {

  const pos = orientation ? parseRadialPos(orientation[0], bbox) : { x: 0.5, y: 0.5 };
  

  if (!pos || !pos.x || !pos.y) return;
  

  return `<radialGradient cx="${ pos.x }" cy="${ pos.y }" r="50%">${ createColorStops(colorStops).join('') }</linearGradient>`;

}

export default function cssGradient2SVG(cssGradient: string): string | undefined {
  try {
    const gradient = parse(cssGradient)[0];
    if (gradient.type === 'linear-gradient') {
      return parseLinearGradient(gradient);
    }
    if (gradient.type === 'radial-gradient') {
      return parseRadialGradient(gradient);
    }
  }
  catch (err) {
    return
  }
}