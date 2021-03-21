const robot = {
  position: [0, 0],
  orientation: 'N',
  roomSize: [0, 0],
};

export const setPosition = (position) => {
  robot.position = position;
};

export const setOrientation = (orientaiton) => {
  robot.orientation = orientaiton;
};

export const setRobotRoomSize = (roomSize) => {
  robot.roomSize = roomSize;
};

const turnRight = () => {
  switch (robot.orientation) {
    case 'N':
      robot.orientation = 'E';
      break;
    case 'W':
      robot.orientation = 'N';
      break;
    case 'S':
      robot.orientation = 'W';
      break;
    case 'E':
      robot.orientation = 'S';
      break;
  }
};

const turnLeft = () => {
  switch (robot.orientation) {
    case 'N':
      robot.orientation = 'W';
      break;
    case 'W':
      robot.orientation = 'S';
      break;
    case 'S':
      robot.orientation = 'E';
      break;
    case 'E':
      robot.orientation = 'N';
      break;
  }
};

const walk = () => {
  switch (robot.orientation) {
    case 'W':
      robot.position[0] - 1 >= 0 && robot.position[0]--;
      break;
    case 'E':
      robot.position[0] + 1 < robot.roomSize[0] && robot.position[0]++;
      break;
    case 'N':
      robot.position[1] - 1 >= 0 && robot.position[1]--;
      break;
    case 'S':
      robot.position[1] + 1 < robot.roomSize[1] && robot.position[1]++;
      break;
  }
};

export const navigate = (commands) => {
  commands.forEach((command) => {
    switch (command.toUpperCase()) {
      case 'L':
        turnLeft();
        break;
      case 'R':
        turnRight();
        break;
      case 'F':
        walk();
        break;
      default:
        break;
    }
  });
};

export const getPosition = () => robot;
