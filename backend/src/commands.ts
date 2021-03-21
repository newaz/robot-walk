import { Orientation, Position } from './types';

abstract class Command<T> {
  abstract execute(currentValue: T): T;
}

class TurnRightCommand extends Command<Orientation> {
  execute(currentOrientation: Orientation): Orientation {
    switch (currentOrientation) {
      case Orientation.North:
        return Orientation.East;
      case Orientation.East:
        return Orientation.South;
      case Orientation.South:
        return Orientation.West;
      case Orientation.West:
        return Orientation.North;
      default:
        return currentOrientation;
    }
  }
}

class TurnLeftCommand extends Command<Orientation> {
  execute(currentValue: Orientation): Orientation {
    switch (currentValue) {
      case Orientation.North:
        return Orientation.West;
      case Orientation.West:
        return Orientation.South;
      case Orientation.South:
        return Orientation.East;
      case Orientation.East:
        return Orientation.North;
      default:
        return currentValue;
    }
  }
}

class WalkForwardCommand extends Command<Position> {
  private orientation: Orientation;
  private roomSize: Position;

  constructor(roomSize: Position, orientation: Orientation) {
    super();
    this.orientation = orientation;
    this.roomSize = roomSize;
  }

  execute(currentPosition: Position): Position {
    switch (this.orientation) {
      case Orientation.North:
        // if going up goes outside of the room then do not do anything, otherwise move
        return currentPosition[1] - 1 < 0
          ? currentPosition
          : [currentPosition[0], currentPosition[1] - 1];
      case Orientation.East:
        return currentPosition[0] + 1 >= this.roomSize[0]
          ? currentPosition
          : [currentPosition[0] + 1, currentPosition[1]];
      case Orientation.West:
        return currentPosition[0] - 1 < 0
          ? currentPosition
          : [currentPosition[0] - 1, currentPosition[1]];
      case Orientation.South:
        return currentPosition[1] + 1 >= this.roomSize[1]
          ? currentPosition
          : [currentPosition[0], currentPosition[1] + 1];
      default:
        return currentPosition;
    }
  }
}

export { Command, TurnRightCommand, TurnLeftCommand, WalkForwardCommand };
