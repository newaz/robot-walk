import React, { useState } from 'react';
import { FormGroup, Label, Input, Button } from './Form';

import {
  setPosition,
  setOrientation,
  getPosition,
  navigate,
  setRobotRoomSize,
} from './robot';

const strToNumArray = (arr) => arr.map((n) => +n);

export function RobotController(props) {
  const [roomSize, setRoomSize] = useState('');
  const [initialPosition, setInitialPosition] = useState('');
  const [commands, setCommands] = useState('');

  const clearForm = () => {
    setRoomSize('');
    setInitialPosition('');
    setCommands('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const initialPositionArray = initialPosition.split(',');
    const orientation = initialPositionArray.splice(-1, 1); // get last item which is orientation

    setRobotRoomSize(strToNumArray(roomSize.split(',')));
    setPosition(strToNumArray(initialPositionArray));
    setOrientation(orientation.join());

    navigate(commands.split(''));
    props.onSubmit(getPosition());
    clearForm();
  };

  return (
    <form>
      <FormGroup>
        <Label>Room size: x,y (e.g 5,5)</Label>
        <Input
          aria-label='room-size'
          value={roomSize}
          onChange={(e) => setRoomSize(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Initial position and Orientaiton ((e.g 1,2,N):</Label>
        <Input
          aria-label='initial-position'
          value={initialPosition}
          onChange={(e) => setInitialPosition(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Commands(e.g RFRFFRFRF)</Label>
        <Input
          aria-label='command'
          value={commands}
          onChange={(e) => setCommands(e.target.value)}
        />
      </FormGroup>
      <Button data-testid='submit' type='submit' onClick={handleSubmit}>
        Suimulate
      </Button>
    </form>
  );
}
