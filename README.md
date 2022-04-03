# Usage

```bash
$ npm install gradient2svg
```

## Convert `linear-gradient()` and `radial-gradient()`

```javascript
import cssGradient2SVG from 'gradient2svg'

// Linear gradient
const svgGradient1 = cssGradient2SVG('linear-gradient(55deg, #f00, #000)');
/*
  <linearGradient data-gradient-angle="55" x1="9.04%" y1="78.68%" x2="90.96%" y2="21.32%"
    <stop offset="0%" style="stop-color: #f00;" /
    <stop offset="100%" style="stop-color: #000;" />
  </linearGradient>
*/

// Radial gradient
const svgGradient2 = cssGradient2SVG('radial-gradient(circle at 10% center, #f00 10%, #00f 95%)');

/*
  <radialGradient cx=\"0.1\" cy=\"0.5\" r=\"50%\">
    <stop offset=\"10%\" style=\"stop-color: #f00;\" />
    <stop offset=\"95%\" style=\"stop-color: #00f;\" />
  </linearGradient>
*/
```

### Imporrtant

Currently, the `<size>` keywords such as `closest-side`, `closest-corner`, `farthest-side`, `farthest-corner`, `cover` and `contain` that are describing a responsive size of a `radial-gradient` in CSS are **NOT** supported because there is no way to describe this in plain SVG.