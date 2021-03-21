import readline from 'readline';
import RobotController from './robot-controller';
import { extractInputs } from './extract-inputs';
import { Position } from './types';

let inputs: string[] = [];
let lineCounter = 0;

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.prompt();

readLine.on('line', (line: string) => {
  lineCounter++;
  inputs.push(line);
  if (lineCounter > 2) {
    readLine.close();
  }
});

readLine.on('close', function () {
  try {
    // extract and format the desired inputs
    const extractedInputs = extractInputs(inputs);

    //create and initialize a Robot Controller
    const robotController = new RobotController(
      extractedInputs.roomSize as Position,
      extractedInputs.initialPosition
    );

    // navigate the robot with controllers
    robotController.navigate(extractedInputs.commands);

    console.log(
      `Report: ${robotController
        .getPosition()
        .join(' ')} ${robotController.getOrientation()}`
    );

    process.exit(0);
  } catch (e) {
    console.log('ERROR:', e.message);
  }
});
