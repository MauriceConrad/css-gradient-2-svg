import cssGradient2SVG from '../src/index'


test('linear 55 deg', () => {
  expect(cssGradient2SVG('linear-gradient(55deg, #f00, #000)')).toBe(`<linearGradient data-gradient-angle="55" x1="9.04%" y1="78.68%" x2="90.96%" y2="21.32%"><stop offset="0%" style="stop-color: #f00;" /><stop offset="100%" style="stop-color: #000;" /></linearGradient>`);
});

test('linear 90 deg', () => {
  expect(cssGradient2SVG('linear-gradient(90deg, #f00, #000)')).toBe(`<linearGradient data-gradient-angle="90" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="0%" style="stop-color: #f00;" /><stop offset="100%" style="stop-color: #000;" /></linearGradient>`);
});

test('linear 23 deg with different pos', () => {
  expect(cssGradient2SVG('linear-gradient(23deg, #f00 15%, #000)')).toBe(`<linearGradient data-gradient-angle="23" x1="30.459999999999997%" y1="96.03%" x2="69.54%" y2="3.9699999999999998%"><stop offset="15%" style="stop-color: #f00;" /><stop offset="100%" style="stop-color: #000;" /></linearGradient>`);
});


test('radial 40px 40px', () => {
  expect(cssGradient2SVG('radial-gradient(circle at 40px 40px, #f00 10%, #00f 95%)')).toBe(`<radialGradient cx="0.4" cy="0.4" r="50%"><stop offset="10%" style="stop-color: #f00;" /><stop offset="95%" style="stop-color: #00f;" /></linearGradient>`);
});
test('radial 10px center', () => {
  expect(cssGradient2SVG('radial-gradient(circle at 10% center, #f00 10%, #00f 95%)')).toBe(`<radialGradient cx="0.1" cy="0.5" r="50%"><stop offset="10%" style="stop-color: #f00;" /><stop offset="95%" style="stop-color: #00f;" /></linearGradient>`);
});

