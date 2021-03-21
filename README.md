## Structure:

The repository is divided into two projects

- backend (node cli project)
- frontend (react web project)

### Backend

Backend project has more features and is more compact than the frontend. Some tests have been added to the actual robot control logic. No tests have been added for the code which parses and validates inputs. The assumption is that user will in most cases insert valid inputs. There are some validation in place within code but not so extensive. Importance has been put in code structure and organisation and flexible enough to add more command in the future.

#### Tools used:

- nodejs
- mocha and chai for testing
- babel
- typescript

### Frontend

Frontend project is more straightforward and simple. It has been as simple as possible to keep the assignment duration under 4 hours. The assumption is user will always input the right inputs. No validation is made for any inputs. There is only one positive test to showcase the test flow. In real life the project needs more safeguard, tests and fine tuning. Since the backend project has the tests for robot movements and in real world frontend would delegate the robot control to backend hence a simple robot controller is used in frontend. For more robust robot controller please refer to the backend project.

#### Tools used:

- React
- Styled components for styling
- Custom simpler tool chain using webpack (More complex tool chain like create-react-app is not needed)
- React testing library (I am becoming a fan of this testing library)
- No type is used (See backend for Typescript usage). Prop type is an alternative here but if typescript is used then we do not need them.

## Requirements:

Node development environment is needed for this project to run

## Installation and running:

Clone this repository, from console go to a specific project and then run:

```
$ npm install && npm start
```

To run tests, execute:

```
$ npm test
```

#### For Backend:

after running `npm start` there will be a prompt where the user will input each line followed by a new line. After the 3rd line the result will be displayed.

Input:

```
> 5 5
1 2 N
LLFFRRLL
```

Output

```
Report: 1 0 N
```
