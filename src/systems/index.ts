import { EllipseSystem } from "./EllipseSystem";
import { LineSystem } from "./LineSystem";
import { PathSystem } from "./PathSystem";
import { PolygonSystem } from "./PolygonSystem";
import { RectangleSystem } from "./RectangleSystem";
import { StarSystem } from "./StarSystem";
import { TriangleSystem } from "./TriangleSystem";

const ShapeSystems = {
  ellipse: EllipseSystem,
  line: LineSystem,
  path: PathSystem,
  polygon: PolygonSystem,
  rect: RectangleSystem,
  star: StarSystem,
  triangle: TriangleSystem,
}

export {
  ShapeSystems,
  EllipseSystem,
  LineSystem,
  PathSystem,
  PolygonSystem,
  RectangleSystem,
  StarSystem,
  TriangleSystem
}
