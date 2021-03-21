import { CommandKey, Orientation, PositionAndOrientation } from './types';

// accepts only FRL as navigation commands
const getNavigationCommands = (commands: string): string[] => {
  if (/^[FRL]*$/.test(commands)) {
    return commands.trim().split('') as CommandKey[];
  } else {
    throw Error(
      'Command sequence can only one of the following commands: L/R/F. Example: LRFFRRFF'
    );
  }
};

const getRoomSize = (roomSize: string): [number, number] => {
  if (/^[0-9]* [0-9]*$/.test(roomSize)) {
    const items = roomSize.trim().split(' ');
    return [+items[0], +items[1]];
  } else {
    throw Error('Room size must be in this format: number number');
  }
};

// accepts only NSEW as orientation
const getInitialPositionAndOrientaiton = (
  initialPosition: string
): PositionAndOrientation => {
  if (/^[0-9]* [0-9]* [NSEW]$/.test(initialPosition)) {
    const items = initialPosition.trim().split(' ');
    return [+items[0], +items[1], items[2] as Orientation];
  } else {
    throw Error(
      'Starting position and orientaiton must be in this format:  number number [S/N/W/E]'
    );
  }
};

// For simplicity we assume that the array is of length three with the following items
//input[0] = room size
//input[1] = initial position
//input[2] = navigation commands
export const extractInputs = (inputs: string[]) => {
  return {
    roomSize: getRoomSize(inputs[0]),
    initialPosition: getInitialPositionAndOrientaiton(inputs[1]),
    commands: getNavigationCommands(inputs[2]),
  };
};
