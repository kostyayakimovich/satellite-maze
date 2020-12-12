const coord = {
  x: 0,
  y: 3,
};
const maze1 = [
  [false, false, false, false, true, false, false, false, false],
  [false, true, false, true, true, false, true, true, false],
  [false, true, false, false, true, false, true, false, false],
  [true, true, false, true, true, true, true, false, true],
  [false, true, false, true, false, true, false, false, false],
  [false, true, true, true, false, true, true, true, false],
  [false, false, false, false, false, false, false, false, false],
];

const maze2 = [
  [false, false, false, false, true, false, false, false, false],
  [false, false, false, false, true, false, true, true, false],
  [false, false, false, false, true, false, true, false, false],
  [true, true, false, true, true, false, false, false, true],
  [false, true, false, true, false, true, false, false, false],
  [false, true, true, true, false, true, true, true, false],
  [false, false, false, false, false, false, false, false, false],
];

const walk = (mazeArr = [], objStart) => {
  if (!mazeArr.length) return console.log('this is not a maze');
  const xStart = objStart.x;
  const yStart = objStart.y;
  if (
    xStart !== 0 &&
    yStart !== 0 &&
    xStart !== mazeArr[y].length - 1 &&
    yStart !== mazeArr.length - 1
  ) {
    return console.log('the entry point to the maze must be on the edge');
  }
  if (!mazeArr[yStart][xStart]) return console.log("it's a wall");
  const way = [{ y: yStart, x: xStart }];

  let direction = '';
  if (xStart === 0) direction = 'east';
  else if (xStart === mazeArr[y].length - 1) direction = 'west';
  else if (yStart === 0) direction = 'south';
  else if (yStart === mazeArr.length - 1) direction = 'north';

  const findWay = (arr, x, y) => {
    if (arr[y][x + 1] && direction !== 'west') {
      direction = 'east';
      way.push({ y: y, x: x + 1 });
      if (x + 1 === 0 || x + 1 === arr[y].length - 1)
        return console.log(way, 'exit');
      findWay(arr, x + 1, y);
    } else if (arr[y][x - 1] && direction !== 'east') {
      direction = 'west';
      way.push({ y: y, x: x - 1 });
      if (x - 1 === 0 || x - 1 === arr[y].length - 1)
        return console.log(way, 'exit');
      findWay(arr, x - 1, y);
    } else if (arr[y - 1][x] && direction !== 'south') {
      direction = 'north';
      if (y - 1 === 0 || y - 1 === arr.length - 1)
        return console.log(way, 'exit');
      way.push({ y: y - 1, x: x });
      findWay(arr, x, y - 1);
    } else if (arr[y + 1][x] && direction !== 'north') {
      direction = 'south';

      if (y + 1 === 0 || y + 1 === arr.length - 1)
        return console.log(way, 'exit');
      way.push({ y: y + 1, x: x });
      findWay(arr, x, y + 1);
    } else return console.log(way, 'wall', direction);
  };
  findWay(mazeArr, xStart, yStart);
};

walk(maze6, coord);
