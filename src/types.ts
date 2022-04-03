export type TColorLiteral = "aliceblue" | "antiquewhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedalmond" | "blue" | "blueviolet" | "brown" | "burlywood" | "cadetblue" | "chartreuse" | "chocolate" | "coral" | "cornflowerblue" | "cornsilk" | "crimson" | "cyan" | "darkblue" | "darkcyan" | "darkgoldenrod" | "darkgray" | "darkgreen" | "darkgrey" | "darkkhaki" | "darkmagenta" | "darkolivegreen" | "darkorange" | "darkorchid" | "darkred" | "darksalmon" | "darkseagreen" | "darkslateblue" | "darkslategray" | "darkslategrey" | "darkturquoise" | "darkviolet" | "deeppink" | "deepskyblue" | "dimgray" | "dimgrey" | "dodgerblue" | "firebrick" | "floralwhite" | "forestgreen" | "fuchsia" | "gainsboro" | "ghostwhite" | "goldenrod" | "gold" | "gray" | "green" | "greenyellow" | "grey" | "honeydew" | "hotpink" | "indianred" | "indigo" | "ivory" | "khaki" | "lavenderblush" | "lavender" | "lawngreen" | "lemonchiffon" | "lightblue" | "lightcoral" | "lightcyan" | "lightgoldenrodyellow" | "lightgray" | "lightgreen" | "lightgrey" | "lightpink" | "lightsalmon" | "lightseagreen" | "lightskyblue" | "lightslategray" | "lightslategrey" | "lightsteelblue" | "lightyellow" | "lime" | "limegreen" | "linen" | "magenta" | "maroon" | "mediumaquamarine" | "mediumblue" | "mediumorchid" | "mediumpurple" | "mediumseagreen" | "mediumslateblue" | "mediumspringgreen" | "mediumturquoise" | "mediumvioletred" | "midnightblue" | "mintcream" | "mistyrose" | "moccasin" | "navajowhite" | "navy" | "oldlace" | "olive" | "olivedrab" | "orange" | "orangered" | "orchid" | "palegoldenrod" | "palegreen" | "paleturquoise" | "palevioletred" | "papayawhip" | "peachpuff" | "peru" | "pink" | "plum" | "powderblue" | "purple" | "rebeccapurple" | "red" | "rosybrown" | "royalblue" | "saddlebrown" | "salmon" | "sandybrown" | "seagreen" | "seashell" | "sienna" | "silver" | "skyblue" | "slateblue" | "slategray" | "slategrey" | "snow" | "springgreen" | "steelblue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whitesmoke" | "yellow" | "yellowgreen"
export interface IColorStopLiteral {
  length: TValue;
  type: "literal";
  value: TColorLiteral;
}
export interface IColorStopRGB {
  length: TValue;
  type: "rgb";
  value: [ string, string, string ];
}
export interface IColorStopRGBA {
  length: TValue;
  type: "rgba";
  value: [ string, string, string, string ]
}
export interface IColorStopHex {
  length: TValue;
  type: "hex";
  value: string;
}

export type TDirectionLiteral = "left" | "top" | "right" | "bottom"
export type TColorStop = IColorStopHex | IColorStopRGBA | IColorStopRGB | IColorStopLiteral


export interface IOrientationAngular {
  type: "angular";
  value: number;
}
export interface IOrientationDirectional {
  type: "directional";
  value: TDirectionLiteral;
}

export interface IPositioningKeyword {
  type: "position-keyword";
  value: "center" | "left" | "top" | "bottom" | "right";
}
export interface IExtentKeyword {
  type: "extent-keyword";
  value: "closest-side" | "closest-corner" | "farthest-side" | "farthest-corner" | "contain" | "cover";
}
export interface IValue {
  type: "px" | "em" | "%";
  value: string;
}

export type TValue = IPositioningKeyword | IExtentKeyword | IValue;
export interface IAt {
  value: {
    x: TValue;
    y: TValue;
  },
  type: "position";
}
export interface IShape {
  type: "shape";
  style: TValue;
  value: "ellipse" | "circle";
  at: IAt;
}
export interface IDefaultRadial {
  type: "default-radial";
  at: IAt;
}


export type TRadialGradientOrientation = IShape | IDefaultRadial
export interface IRadialGradient {
  interface: "repeating-radial-gradient" | "radial-gradient";
  orientation?: TRadialGradientOrientation[];
  colorStops: TColorStop[];
}


export type TLinearGradientOrientation = IOrientationAngular | IOrientationDirectional
export interface ILinearGradient {
  type: "linear-gradient" | "repeating-linear-gradient";
  orientation?: TLinearGradientOrientation;
  colorStops: TColorStop[];

}

export interface BBox {
  width: number;
  height: number;
}