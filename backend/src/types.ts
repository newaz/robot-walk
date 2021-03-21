export type Position = [number, number];

export enum Orientation {
  West = 'W',
  East = 'E',
  North = 'N',
  South = 'S',
}

export type PositionAndOrientation = [number, number, Orientation];

export enum CommandKey {
  TurnLeft = 'L',
  TurnRight = 'R',
  WalkForward = 'F',
}
