import { Point } from "./parseLightPoints";

type ElapseOneSecond = (points: Point[]) => Point[];

const elapseOneSecond: ElapseOneSecond = points =>
  points.map(point => {
    return {
      position: {
        x: point.position.x + point.velocity.x,
        y: point.position.y + point.velocity.y
      },
      velocity: point.velocity
    };
  });

export default elapseOneSecond;
