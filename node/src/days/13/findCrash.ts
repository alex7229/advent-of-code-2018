import { Cart } from "./parseField";
import { Position } from "../10/parseLightPoints";

type FindCrash = (carts: ReadonlyArray<Cart>) => Position | null;

const findCrash: FindCrash = carts => {
  for (let i = 0; i < carts.length - 1; i += 1) {
    for (let j = i + 1; j < carts.length; j += 1) {
      const firstCart = carts[i];
      const secondCart = carts[j];
      if (
        firstCart.position.x === secondCart.position.x &&
        firstCart.position.y === secondCart.position.y
      ) {
        return firstCart.position;
      }
    }
  }
  return null;
};

export default findCrash;
