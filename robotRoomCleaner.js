/*
https://igotanoffer.com/blogs/tech/google-software-engineer-interview
https://www.youtube.com/watch?v=-1P3VP7LH0I
"Given a robot cleaner in a room modeled as a grid.
Each cell in the grid can be empty or blocked.
The robot cleaner with 4 given APIs can move forward, turn left or turn right.
Each turn it made is 90 degrees. When it tries to move into a blocked cell,
its bumper sensor detects the obstacle and it stays on the current cell.
Design an algorithm to clean the entire room using only the 4 given APIs shown below."

Example input
room = [
  [1,1,1,1,1,0,1,1],
  [1,1,1,1,1,0,1,1],
  [1,0,1,1,1,1,1,1],
  [0,0,0,1,0,0,0,0],
  [1,1,1,1,1,1,1,1]
],
row = 1,
col = 3
Explanation:
All grids in the room are marked by either 0 or 1.
0 means the cell is blocked, while 1 means the cell is accessible.
The robot initially starts at the position of row=1, col=3.
From the top left corner, its position is one row below and three columns right.
Notes:

The input is only given to initialize the room and the robot’s position internally. You must solve this problem “blindfolded”. In other words, you must control the robot using only the mentioned 4 APIs, without knowing the room layout and the initial robot’s position.
The robot’s initial position will always be in an accessible cell.
The initial direction of the robot will be facing up.
All accessible cells are connected, which means the all cells marked as 1 will be accessible by the robot.
Assume all four edges of the grid are all surrounded by wall.
*/


const room = [
  [1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1]
];

const room1 = [
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 0, 0, 1],
  [1, 1, 1, 1],
]

class RobotCleaner {
  constructor(row, column, angle, room) {
    this.startRow = row;
    this.startColumn = column;
    this.startAngle = angle;
    this.room = room;
    this.visited = {};
    this.row = row;
    this.column = column;
    this.angle = angle;
  }
  clean() {
    console.log(`cleaning cell (${this.row}, ${this.column})`)
    this.visited[`(${this.row},${this.column})`] = true;
  }
  isClean() {
    return this.visited[`(${this.row},${this.column})`];
  }
  move() {
    // 0 is right, 90 is up, 180 is left, 270 is down
    switch (this.angle) {
      case 0:
        //Move robot to the next column meaning to the right
        if (this.column + 1 < this.room[0].length && this.room[this.row][this.column + 1] !== 0) {
          this.column++;
          console.log(`Moved to next column (${this.row}, ${this.column})`);
          return true;
        } else {
          console.log('move failed. Wall or obstacle detected to the right')
        }
        break;
      case 90:
        //Move robot to the previous row meaning to the top
        if (this.row - 1 >= 0 && this.room[this.row - 1][this.column] !== 0) {
          this.row--;
          console.log(`Moved to the previous row (${this.row}, ${this.column})`)
          return true;
        } else {
          console.log('move failed. Wall or obstacle detected to the right')
        }
        break;
      case 180:
        //Move robot to the previous column meaning to the left
        if (this.column - 1 >= 0 && this.room[this.row][this.column - 1] !== 0) {
          this.column--;
          console.log(`Moved to the previous column (${this.row}, ${this.column})`)
          return true;
        } else {
          console.log('move failed. Wall or obstacle detected to the right')
        }
        break;
      case 270:
        //Move robot to the next row meaning down
        if (this.row + 1 < this.room.length && this.room[this.row + 1][this.column] !== 0) {
          this.row++;
          console.log(`Moved to the next row (${this.row}, ${this.column})`)
          return true;
        } else {
          console.log('move failed. Wall or obstacle detected to the right')
        }
        break;
    }
    return false;
  }
  turnLeft() {
    this.angle = (this.angle + 90) % 360;
  }
  turnRight() {
    // this.angle = (Math.abs((this.angle - 90)) % 360);
    if (this.angle === 0) {
      this.angle = 270;
      console.log(`turned right. New orientation ${this.angle}`)
    };
    this.angle = (this.angle - 90) % 360;
    console.log(`turned right. New orientation ${this.angle}`)

  }
  moveBack() {
    this.turnRight();
    this.turnRight();
    this.move();
    this.turnRight();
    this.turnRight();
  }
  cellsCleaned() {
    return Object.keys(this.visited).join(',');
  }
  location() {
    return ([this.row, this.column, this.angle]);
  }
  depthFirstSearch() {
    if (this.isClean()) {
      this.moveBack();
      return;
    };
    console.log(`calling dfs on cell ${this.row}, ${this.column}`)
    this.clean();

    if (this.move()) this.depthFirstSearch()

    this.turnLeft();
    if (this.move()) this.depthFirstSearch()

    this.turnLeft();
    if (this.move()) this.depthFirstSearch()

    this.turnLeft();
    if (this.move()) this.depthFirstSearch()

    this.turnLeft();

    if (this.angle === this.startAngle && this.row === this.startRow && this.column === this.startColumn) {
      console.log(`Cleaned up all the cells and back to the starting point`);
      console.log(this.visited.join(','));
      console.log('Program complete');
      return;
    }
    console.log(`Explored all possible directions for the cell ${this.row}, ${this.column}`);
    console.log('Moving Back to the previous cell')
    this.moveBack();
  }
}

let robotCleaner = new RobotCleaner(row = 1, column = 3, angle = 0, room);
let robotCleaner1 = new RobotCleaner(1, 1, 90, room1);
console.log(robotCleaner1.depthFirstSearch());
