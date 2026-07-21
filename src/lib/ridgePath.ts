/**
 * Catmull-Rom spline through a handful of points, converted to cubic
 * Beziers. This is the core smoothing used for both the mountain
 * silhouettes and the dragon's sinuous body — real ink-brush curves
 * instead of geometric zigzags.
 */
function smoothCurveTo(points: [number, number][]): string {
  const get = (i: number): [number, number] => {
    if (i < 0) return points[0];
    if (i >= points.length) return points[points.length - 1];
    return points[i];
  };

  let d = "";
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = get(i - 1);
    const [x1, y1] = get(i);
    const [x2, y2] = get(i + 1);
    const [x3, y3] = get(i + 2);

    const cp1x = x1 + (x2 - x0) / 6;
    const cp1y = y1 + (y2 - y0) / 6;
    const cp2x = x2 - (x3 - x1) / 6;
    const cp2y = y2 - (y3 - y1) / 6;

    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
  }
  return d;
}

/**
 * Smooth silhouette path closed down to a flat baseline — used for the
 * mountain ridgelines.
 */
export function ridgePath(
  points: [number, number][],
  baselineY: number
): string {
  if (points.length < 2) return "";

  let d = `M${points[0][0]},${points[0][1]}`;
  d += smoothCurveTo(points);

  const lastX = points[points.length - 1][0];
  const firstX = points[0][0];
  d += ` L${lastX},${baselineY} L${firstX},${baselineY} Z`;

  return d;
}

/**
 * Smooth closed ribbon between a top edge and a bottom edge (both given
 * left-to-right) — used for the dragon's body, where there's no flat
 * baseline to close against, just two parallel wavy edges.
 */
export function ribbonPath(
  topEdge: [number, number][],
  bottomEdge: [number, number][]
): string {
  if (topEdge.length < 2 || bottomEdge.length < 2) return "";

  let d = `M${topEdge[0][0]},${topEdge[0][1]}`;
  d += smoothCurveTo(topEdge);

  const bottomReversed = [...bottomEdge].reverse();
  d += ` L${bottomReversed[0][0]},${bottomReversed[0][1]}`;
  d += smoothCurveTo(bottomReversed);
  d += " Z";

  return d;
}