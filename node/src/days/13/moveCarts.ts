import { sortBy } from "lodash";
import { Cart, Field, Cell, IntersectionTurn, Direction } from "./parseField";

type MoveCarts = (
  carts: ReadonlyArray<Cart>,
  field: Field
) => ReadonlyArray<Cart>;

const moveCarts: MoveCarts = (carts, field) =>
  sortBy(carts, ["position.y", "position.x"]).map(cart => {
    const rightCell: Cell | undefined =
      field[cart.position.y][cart.position.x + 1];
    const leftCell: Cell | undefined =
      cart.position.x === 0
        ? undefined
        : field[cart.position.y][cart.position.x - 1];
    const topCell: Cell | undefined =
      cart.position.y === 0
        ? undefined
        : field[cart.position.y - 1][cart.position.x];
    const bottomCell: Cell | undefined =
      field[cart.position.y + 1] && field[cart.position.y + 1][cart.position.x];

    let nextIntersectionTurn: IntersectionTurn = "left";
    if (cart.lastIntersection === "left") {
      nextIntersectionTurn = "straight";
    } else if (cart.lastIntersection === "straight") {
      nextIntersectionTurn = "right";
    } else if (cart.lastIntersection === "right") {
      nextIntersectionTurn = "left";
    }

    let nextDirectionAfterIntersection: Direction = "up";
    if (
      (cart.direction === "right" && nextIntersectionTurn === "right") ||
      (cart.direction === "down" && nextIntersectionTurn === "straight") ||
      (cart.direction === "left" && nextIntersectionTurn === "left")
    ) {
      nextDirectionAfterIntersection = "down";
    }
    if (
      (cart.direction === "up" && nextIntersectionTurn === "left") ||
      (cart.direction === "left" && nextIntersectionTurn === "straight") ||
      (cart.direction === "down" && nextIntersectionTurn === "right")
    ) {
      nextDirectionAfterIntersection = "left";
    }
    if (
      (cart.direction === "up" && nextIntersectionTurn === "right") ||
      (cart.direction === "right" && nextIntersectionTurn === "straight") ||
      (cart.direction === "down" && nextIntersectionTurn === "left")
    ) {
      nextDirectionAfterIntersection = "right";
    }

    // moving right to the '-'
    if (cart.direction === "right" && rightCell === "-") {
      return {
        direction: "right",
        position: { y: cart.position.y, x: cart.position.x + 1 },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving right to the '/'
    if (cart.direction === "right" && rightCell === "/") {
      return {
        direction: "up",
        position: { y: cart.position.y, x: cart.position.x + 1 },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving right to the '\'
    if (cart.direction === "right" && rightCell === "\\") {
      return {
        direction: "down",
        position: { y: cart.position.y, x: cart.position.x + 1 },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving right to the '+'
    if (cart.direction === "right" && rightCell === "+") {
      return {
        position: { y: cart.position.y, x: cart.position.x + 1 },
        lastIntersection: nextIntersectionTurn,
        direction: nextDirectionAfterIntersection
      };
    }

    // moving left to the '-'
    if (cart.direction === "left" && leftCell === "-") {
      return {
        direction: "left",
        position: { y: cart.position.y, x: cart.position.x - 1 },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving left to the '/'
    if (cart.direction === "left" && leftCell === "/") {
      return {
        direction: "down",
        position: { y: cart.position.y, x: cart.position.x - 1 },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving left to the '\'
    if (cart.direction === "left" && leftCell === "\\") {
      return {
        direction: "up",
        position: { y: cart.position.y, x: cart.position.x - 1 },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving left to the '+'
    if (cart.direction === "left" && leftCell === "+") {
      return {
        position: { y: cart.position.y, x: cart.position.x - 1 },
        lastIntersection: nextIntersectionTurn,
        direction: nextDirectionAfterIntersection
      };
    }

    // moving down to the '|'
    if (cart.direction === "down" && bottomCell === "|") {
      return {
        direction: "down",
        position: { y: cart.position.y + 1, x: cart.position.x },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving down to the '/'
    if (cart.direction === "down" && bottomCell === "/") {
      return {
        direction: "left",
        position: { y: cart.position.y + 1, x: cart.position.x },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving down to the '\'
    if (cart.direction === "down" && bottomCell === "\\") {
      return {
        direction: "right",
        position: { y: cart.position.y + 1, x: cart.position.x },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving down to the '+'
    if (cart.direction === "down" && bottomCell === "+") {
      return {
        position: { y: cart.position.y + 1, x: cart.position.x },
        lastIntersection: nextIntersectionTurn,
        direction: nextDirectionAfterIntersection
      };
    }

    // moving up to the '|'
    if (cart.direction === "up" && topCell === "|") {
      return {
        direction: "up",
        position: { y: cart.position.y - 1, x: cart.position.x },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving up to the '/'
    if (cart.direction === "up" && topCell === "/") {
      return {
        direction: "right",
        position: { y: cart.position.y - 1, x: cart.position.x },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving up to the '\'
    if (cart.direction === "up" && topCell === "\\") {
      return {
        direction: "left",
        position: { y: cart.position.y - 1, x: cart.position.x },
        lastIntersection: cart.lastIntersection
      };
    }
    // moving up to the '+'
    if (cart.direction === "up" && topCell === "+") {
      return {
        position: { y: cart.position.y - 1, x: cart.position.x },
        lastIntersection: nextIntersectionTurn,
        direction: nextDirectionAfterIntersection
      };
    }
    throw new Error("cannot move the cart for weird reason");
  });

export default moveCarts;
