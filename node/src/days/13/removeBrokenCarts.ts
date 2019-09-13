import { Cart } from "./parseField";
import findCrash from "./findCrash";

type RemoveBrokenCarts = (carts: Cart[]) => Cart[];

const removeBrokenCarts: RemoveBrokenCarts = carts => {
  let removedCarts = carts;
  while (findCrash(removedCarts) !== null) {
    const crashPosition = findCrash(removedCarts);
    removedCarts = removedCarts.filter(cart => {
      if (!crashPosition) {
        throw new Error("");
      }
      return !(
        cart.position.x === crashPosition.x &&
        cart.position.y === crashPosition.y
      );
    });
  }
  return removedCarts;
};

export default removeBrokenCarts;
