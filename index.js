const coord = {
  x: 0,
  y: 3,
};
const maze = [
  [false, false, false, false, true, false, false, false, false],
  [false, true, false, true, true, false, true, true, false],
  [false, true, false, false, true, false, true, false, false],
  [true, true, false, true, true, true, true, false, true],
  [false, true, false, true, false, true, false, false, false],
  [false, true, true, true, false, true, true, true, false],
  [false, false, false, false, false, false, false, false, false],
];

const walk = (mazeArr = [], objStart) => {
  if (!mazeArr.length) return 'this is not a maze';
  const xStart = objStart.x;
  const yStart = objStart.y;

  if (
    xStart !== 0 &&
    yStart !== 0 &&
    xStart !== mazeArr[0].length - 1 &&
    yStart !== mazeArr.length - 1
  ) {
    return 'the entry point to the maze must be on the edge';
  }

  if (!mazeArr[yStart][xStart]) return "it's a wall";
  let way = [{ y: yStart, x: xStart }];

  //check Angle
  if (xStart === 0 && yStart === 0) {
    if (mazeArr[yStart][xStart + 1])
      return [
        { y: yStart, x: xStart },
        { y: yStart, x: xStart + 1 },
      ];
    if (mazeArr[yStart + 1][xStart])
      return [
        { y: yStart, x: xStart },
        { y: yStart + 1, x: xStart },
      ];
  }
  if (xStart === 0 && yStart === mazeArr.length - 1) {
    if (mazeArr[yStart][xStart + 1])
      return [
        { y: yStart, x: xStart },
        { y: yStart, x: xStart + 1 },
      ];
    if (mazeArr[yStart - 1][xStart])
      return [
        { y: yStart, x: xStart },
        { y: yStart - 1, x: xStart },
      ];
  }
  if (xStart === mazeArr[0].length - 1 && yStart === mazeArr.length - 1) {
    if (mazeArr[yStart][xStart - 1])
      return [
        { y: yStart, x: xStart },
        { y: yStart, x: xStart - 1 },
      ];
    if (mazeArr[yStart - 1][xStart])
      return [
        { y: yStart, x: xStart },
        { y: yStart - 1, x: xStart },
      ];
  }
  if (xStart === mazeArr[0].length - 1 && yStart === 0) {
    if (mazeArr[yStart][xStart - 1])
      return [
        { y: yStart, x: xStart },
        { y: yStart, x: xStart - 1 },
      ];
    if (mazeArr[yStart + 1][xStart])
      return [
        { y: yStart, x: xStart },
        { y: yStart + 1, x: xStart },
      ];
  }

  //check neighbors(quick exit)
  if (xStart === 0 || xStart === mazeArr[0].length - 1) {
    if (mazeArr[yStart - 1][xStart])
      return [
        { y: yStart, x: xStart },
        { y: yStart - 1, x: xStart },
      ];
    if (mazeArr[yStart + 1][xStart])
      return [
        { y: yStart, x: xStart },
        { y: yStart + 1, x: xStart },
      ];
  }
  if (yStart === 0 || yStart === mazeArr.length - 1) {
    if (mazeArr[yStart][xStart - 1])
      return [
        { y: yStart, x: xStart },
        { y: yStart, x: xStart - 1 },
      ];
    if (mazeArr[yStart][xStart + 1])
      return [
        { y: yStart, x: xStart },
        { y: yStart, x: xStart + 1 },
      ];
  }

  let direction = '';
  if (xStart === 0) direction = 'east';
  else if (xStart === mazeArr[0].length - 1) direction = 'west';
  else if (yStart === 0) direction = 'south';
  else if (yStart === mazeArr.length - 1) direction = 'north';

  const wrongWays = [{ y: yStart, x: xStart }];
  const arrCrossroads = [];

  const findWay = (arr, x, y) => {
    let leftCoord = true;
    let rightCoord = true;
    let upCoord = true;
    let downCoord = true;
    wrongWays.forEach((item) => {
      if (item.x === x - 1 && item.y === y) {
        leftCoord = false;
      }
      if (item.x === x + 1 && item.y === y) {
        rightCoord = false;
      }
      if (item.x === x && item.y === y - 1) {
        upCoord = false;
      }
      if (item.x === x && item.y === y + 1) {
        downCoord = false;
      }
    });

    if (direction !== 'west' && rightCoord && arr[y][x + 1]) {
      wrongWays.push({ y: y, x: x + 1 });
      //check crossroads
      if (arr[y - 1][x] || arr[y + 1][x]) {
        arrCrossroads.push({ y: y, x: x });
      }
      direction = 'east';
      way.push({ y: y, x: x + 1 });
      //check exit
      if (x + 1 === 0 || x + 1 === arr[y].length - 1) return way;
      return findWay(arr, x + 1, y);
    } else if (direction !== 'east' && leftCoord && arr[y][x - 1]) {
      wrongWays.push({ y: y, x: x - 1 });
      //check crossroads
      if (arr[y - 1][x] || arr[y + 1][x]) {
        arrCrossroads.push({ y: y, x: x });
      }
      direction = 'west';
      way.push({ y: y, x: x - 1 });
      //check exit
      if (x - 1 === 0 || x - 1 === arr[y].length - 1) return way;
      return findWay(arr, x - 1, y);
    } else if (direction !== 'south' && upCoord && arr[y - 1][x]) {
      wrongWays.push({ y: y - 1, x: x });
      //check crossroads
      if (arr[y][x + 1] || arr[y][x - 1]) {
        arrCrossroads.push({ y: y, x: x });
      }

      direction = 'north';
      way.push({ y: y - 1, x: x });
      //check exit
      if (y - 1 === 0 || y - 1 === arr.length - 1) return way;
      return findWay(arr, x, y - 1);
    } else if (direction !== 'north' && downCoord && arr[y + 1][x]) {
      wrongWays.push({ y: y + 1, x: x });
      //check crossroads
      if (arr[y][x - 1] || arr[y][x + 1]) {
        arrCrossroads.push({ y: y, x: x });
      }
      direction = 'south';
      way.push({ y: y + 1, x: x });
      //check exit
      if (y + 1 === 0 || y + 1 === arr.length - 1) return way;

      return findWay(arr, x, y + 1);
    } else {
      if (arrCrossroads.length) {
        let checkX = arrCrossroads[arrCrossroads.length - 1].x;
        let checkY = arrCrossroads[arrCrossroads.length - 1].y;
        let newWay = [];
        indexWay = 0;
        while (way[indexWay].y !== checkY || way[indexWay].x !== checkX) {
          newWay.push(way[indexWay]);
          indexWay += 1;
        }
        newWay.push({ y: checkY, x: checkX });
        way = [...newWay];

        if (direction === '') direction = 'east';
        else if (direction === 'east') direction = 'west';
        else if (direction === 'west') direction = 'east';
        else if (direction === 'north') direction = 'south';
        else if (direction === 'south') direction = 'north';

        arrCrossroads.pop();

        return findWay(arr, checkX, checkY);
      } else {
        return 'wall';
      }
    }
  };
  return findWay(mazeArr, xStart, yStart);
};

console.log(walk(maze, coord));
