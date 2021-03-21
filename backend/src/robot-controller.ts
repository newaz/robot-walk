import {
  Command,
  TurnLeftCommand,
  TurnRightCommand,
  WalkForwardCommand,
} from './commands';

import {
  CommandKey,
  Orientation,
  Position,
  PositionAndOrientation,
} from './types';

const validatePosition = (roomSize: Position, initialPosition: Position) => {
  if (
    initialPosition[0] < 0 ||
    initialPosition[1] < 0 ||
    initialPosition[0] >= roomSize[0] ||
    initialPosition[1] >= roomSize[1]
  ) {
    throw new Error('Robot position is outside of the room');
  }
};

/* Main class that controls the movement of the Robot*/
class RobotController {
  private position: Position;
  private orientation: Orientation;
  private roomSize: Position;

  constructor(
    roomSize: Position,
    [xPosition, yPosition, orientation]: PositionAndOrientation
  ) {
    validatePosition(roomSize, [xPosition, yPosition]);
    this.roomSize = roomSize;
    this.position = [xPosition, yPosition];
    this.orientation = orientation;
  }

  setPosition(initialPosition: Position) {
    validatePosition(this.roomSize, initialPosition);
    this.position = [initialPosition[0], initialPosition[1]];
  }

  setOrientation(orientation: Orientation) {
    this.orientation = orientation;
  }

  private executeCommand<T>(command: Command<T>) {
    if (command instanceof WalkForwardCommand) {
      this.position = command.execute(this.position);
    } else if (
      command instanceof TurnLeftCommand ||
      command instanceof TurnRightCommand
    ) {
      this.orientation = command.execute(this.orientation);
    }
  }

  getPosition() {
    return this.position;
  }

  getOrientation() {
    return this.orientation;
  }

  navigate(commands: string[]) {
    commands.forEach((command) => {
      switch (command) {
        case CommandKey.TurnLeft:
          this.executeCommand(new TurnLeftCommand());
          break;
        case CommandKey.TurnRight:
          this.executeCommand(new TurnRightCommand());
          break;
        case CommandKey.WalkForward:
          this.executeCommand(
            new WalkForwardCommand(this.roomSize, this.orientation)
          );
          break;
        default:
          break;
      }
    });
  }
}

export default RobotController;
