import { Rectangular } from "./geometry.third-party";

export interface Quadratic {
  getSide(): number;
}

export class Square implements Quadratic {
  constructor(private side: number) {}

  public toString(): string {
    return `Square(${this.side})`;
  }

  public getSide(): number {
    return this.side;
  }
}

export class RectangleAdapter implements Rectangular {
  constructor(private square: Quadratic) {}

  public getWidth(): number {
    return this.square.getSide();
  }

  public getHeight(): number {
    return this.square.getSide();
  }
}

export class Calc {
  getArea(shape: Rectangular): number {
    return shape.getWidth() * shape.getHeight();
  }

  getPerimeter(shape: Rectangular): number {
    return 2 * (shape.getWidth() + shape.getHeight());
  }

  getDiagonal(shape: Rectangular): number {
    return Math.sqrt(
      shape.getWidth() ** 2 + shape.getHeight() ** 2
    );
  }

  getWidthHeightRatio(shape: Rectangular): number {
    return shape.getWidth() / shape.getHeight();
  }
}
