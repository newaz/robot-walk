const assert = require('chai').assert;
const expect = require('chai').expect;

import RobotController from '../src/robot-controller';
import { Orientation, Position } from '../src/types';

const createDefaultController = (roomSize: Position) => {
  return new RobotController(roomSize, [0, 0, Orientation.North]);
};

describe('Robot in a 5x5 room - full simulations', function () {
  it('should be at 1 3 N if the initial position is at (1,2, N) with RFRFFRFRF command', function () {
    const robotController = new RobotController(
      [5, 5],
      [1, 2, Orientation.North]
    );
    robotController.navigate('RFRFFRFRF'.split(''));

    const position = robotController.getPosition();

    assert.equal(position[0], 1);
    assert.equal(position[1], 3);
    assert.equal(robotController.getOrientation(), Orientation.North);
  });

  it('should be at 3 1 E if the initial position is at (0,0, E) with RFLFFLRF command', function () {
    const robotController = new RobotController(
      [5, 5],
      [0, 0, Orientation.East]
    );
    robotController.navigate('RFLFFLRF'.split(''));

    const position = robotController.getPosition();

    assert.equal(position[0], 3);
    assert.equal(position[1], 1);
    assert.equal(robotController.getOrientation(), Orientation.East);
  });

  it('should be at 4 4 S if the initial position is at (0,0, E) with FRFLFRFLFRFLFRF command', function () {
    const robotController = new RobotController(
      [5, 5],
      [0, 0, Orientation.East]
    );
    robotController.navigate('FRFLFRFLFRFLFRF'.split(''));

    const position = robotController.getPosition();

    assert.equal(position[0], 4);
    assert.equal(position[1], 4);
    assert.equal(robotController.getOrientation(), Orientation.South);
  });
});

describe('Robot in a 5x5 room and navigate 1 step forward', function () {
  let robotController: RobotController;
  beforeEach(() => {
    robotController = createDefaultController([5, 5]);
  });

  describe('Facing South', function () {
    beforeEach(() => {
      robotController.setOrientation(Orientation.South);
    });

    it('should be at the same place if the initial position is at (1,4)', function () {
      robotController.setPosition([1, 4]);
      robotController.navigate(['F']);
      const position = robotController.getPosition();
      assert.equal(position[0], 1);
      assert.equal(position[1], 4);
    });

    it('should move one step south from position (0,0)', function () {
      robotController.navigate(['F']);

      const position = robotController.getPosition();
      assert.equal(position[0], 0);
      assert.equal(position[1], 1);
    });
  });

  describe('Facing North', function () {
    it('should be at the same place if the initial position is at (2,0)', function () {
      robotController.setPosition([2, 0]);
      robotController.navigate(['F']);
      const position = robotController.getPosition();

      assert.equal(position[0], 2);
      assert.equal(position[1], 0);
    });

    it('should move one step north from position (0,3)', function () {
      robotController.setPosition([0, 3]);
      robotController.navigate(['F']);
      const position = robotController.getPosition();

      assert.equal(position[0], 0);
      assert.equal(position[1], 2);
    });
  });

  describe('Facing West', function () {
    beforeEach(() => {
      robotController.setOrientation(Orientation.West);
    });

    it('should be at the same place if the initial position is at (0,3)', function () {
      robotController.setPosition([0, 3]);
      robotController.navigate(['F']);
      const position = robotController.getPosition();

      assert.equal(position[0], 0);
      assert.equal(position[1], 3);
    });

    it('should move one step west from position (3,2)', function () {
      robotController.setPosition([3, 2]);
      robotController.navigate(['F']);
      const position = robotController.getPosition();

      assert.equal(position[0], 2);
      assert.equal(position[1], 2);
    });
  });

  describe('Facing East', function () {
    beforeEach(() => {
      robotController.setOrientation(Orientation.East);
    });

    it('should be at the same place if the initial position is at (4,1)', function () {
      robotController.setPosition([4, 1]);
      robotController.navigate(['F']);
      const position = robotController.getPosition();

      assert.equal(position[0], 4);
      assert.equal(position[1], 1);
    });

    it('should move one step east from position (2,2)', function () {
      robotController.setPosition([2, 2]);
      robotController.navigate(['F']);
      const position = robotController.getPosition();

      assert.equal(position[0], 3);
      assert.equal(position[1], 2);
    });
  });
});

describe('Robot Controller - room input validation', function () {
  it('should throw error if initial position is out of room', function () {
    expect(() => {
      new RobotController([5, 5], [5, 5, Orientation.North]);
    }).to.throw();
  });

  it('should throw error if initial position has negative value', function () {
    expect(() => {
      new RobotController([5, 5], [-1, 2, Orientation.North]);
    }).to.throw();
  });

  it('should not throw error if initial position ins in the room', function () {
    expect(() => {
      new RobotController([5, 5], [0, 0, Orientation.North]);
    }).to.not.throw();
  });
});

describe('Robot Controller - Turn', function () {
  let robotController: RobotController;
  beforeEach(() => {
    robotController = createDefaultController([5, 5]);
  });

  describe('Right', function () {
    it('should face east from north with turn right command', function () {
      robotController.navigate(['R']);
      assert.equal(robotController.getOrientation(), Orientation.East);
    });
    it('should face south from east with turn right command', function () {
      robotController.setOrientation(Orientation.East);
      robotController.navigate(['R']);
      assert.equal(robotController.getOrientation(), Orientation.South);
    });
    it('should face west from east with two right command', function () {
      robotController.setOrientation(Orientation.East);
      robotController.navigate(['L', 'L']);
      assert.equal(robotController.getOrientation(), Orientation.West);
    });
  });

  describe('Left', function () {
    it('should face west from north with turn left command', function () {
      robotController.navigate(['L']);
      assert.equal(robotController.getOrientation(), Orientation.West);
    });
    it('should face north from east with turn left command', function () {
      robotController.setOrientation(Orientation.East);
      robotController.navigate(['L']);
      assert.equal(robotController.getOrientation(), Orientation.North);
    });

    it('should face west from east with two left commands', function () {
      robotController.setOrientation(Orientation.East);
      robotController.navigate(['L', 'L']);
      assert.equal(robotController.getOrientation(), Orientation.West);
    });
  });
});
