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

const maze3 = [
  [false, false, false, false, false, false, false, false, false],
  [false, true, false, true, true, false, true, true, false],
  [false, true, false, false, true, false, true, false, false],
  [true, true, false, true, true, true, true, false, true],
  [false, true, false, true, false, true, false, false, false],
  [false, true, true, true, false, true, true, true, false],
  [false, false, false, false, false, false, false, false, false],
];

const maze4 = [
  [false, false, false, false, false, false, false, false, false],
  [false, true, false, true, true, false, true, true, false],
  [false, true, false, false, true, false, true, false, false],
  [true, true, false, true, true, true, true, false, true],
  [false, true, false, true, false, true, false, false, false],
  [false, true, true, true, false, true, true, true, false],
  [false, false, true, false, false, false, false, false, false],
];

const walk = (mazeArr = [], objStart) => {
   
  if (!mazeArr.length) return console.log('this is not a maze');
  const xStart = objStart.x;
  const yStart = objStart.y;

  if (
    xStart !== 0 &&yStart !== 0 &&
    xStart !== mazeArr[0].length - 1 &&
    yStart !== mazeArr.length - 1
  ) {
    return console.log('the entry point to the maze must be on the edge');
  }
  
  if (!mazeArr[yStart][xStart]) return console.log("it's a wall");
  let way = [{ y: yStart, x: xStart }];

  let direction = '';
  if (xStart === 0) direction = 'east';
  else if (xStart === mazeArr[0].length - 1) direction = 'west';
  else if (yStart === 0) direction = 'south';
  else if (yStart === mazeArr.length - 1) direction = 'north';
 

  let wrongWays = [{ y: yStart, x: xStart }];
  const arrCrossroads = [];
  const findWay = (arr, x, y) => {
let left = true;
let right = true;
let up = true;
let down = true;
    wrongWays.forEach(item=>{
      if(item.x===x-1&&item.y===y){
       left = false;
      }
      if(item.x===x+1&&item.y===y){
        right = false;
       }
       if(item.x===x&&item.y===y-1){
        up = false;
       }
       if(item.x===x&&item.y===y+1){
        down = false;
       }
     
    })
  
    if (arr[y][x + 1] && direction !== 'west'&&right) {
      wrongWays.push({y:y, x:x+1});
      //check crossroads
      if (arr[y - 1][x] || arr[y + 1][x]) {
        arrCrossroads.push({
          coordCrossroad: { y: y, x: x }
        });
      }
      direction = 'east';
      way.push({ y: y, x: x + 1 });
      if (x + 1 === 0 || x + 1 === arr[y].length - 1)
        return console.log(way, `exit: y:${y}, x:${x+1}`);
      findWay(arr, x + 1, y);
    }
    
    else if (arr[y][x - 1] && direction !== 'east'&&left) {
     
      wrongWays.push({y:y, x:x-1});
      //check crossroads
      if (arr[y - 1][x] || arr[y + 1][x]) {
        arrCrossroads.push({
          coordCrossroad: { y: y, x: x }
        });
      }
      direction = 'west';
      way.push({ y: y, x: x - 1 });
      if (x - 1 === 0 || x - 1 === arr[y].length - 1)
        return console.log(way, `exit: y:${y}, x:${x-1}`);
      findWay(arr, x - 1, y);
    } 
    
    else if (arr[y - 1][x] && direction !== 'south'&&up) {
      wrongWays.push({y:y-1, x:x});
      //check crossroads
      if (arr[y][x + 1] || arr[y][x - 1]) {
        arrCrossroads.push({
          coordCrossroad: { y: y, x: x },
        });
      }

      direction = 'north';
      if (y - 1 === 0 || y - 1 === arr.length - 1)
        return console.log(way, `exit: y:${y - 1}, x:${x}`);
      way.push({ y: y - 1, x: x });
      findWay(arr, x, y - 1);
    } 
    
    else if (arr[y + 1][x] && direction !== 'north'&&down) {
      wrongWays.push({y:y+1, x:x});
      //check crossroads
      if (arr[y][x + 1] || arr[y][x - 1]) {
        arrCrossroads.push({
          coordCrossroad: { y: y, x: x },
        });
      }
      direction = 'south';
      if (y + 1 === 0 || y + 1 === arr.length - 1)
        return console.log(way, `exit: y:${y+1}, x:${x}`);
      way.push({ y: y + 1, x: x });
      findWay(arr, x, y + 1);
    } else {
      if (arrCrossroads.length) {       
        let checkX = arrCrossroads[arrCrossroads.length - 1].coordCrossroad.x;
        let checkY = arrCrossroads[arrCrossroads.length - 1].coordCrossroad.y;
        let newWay = [];
        indexWay = 0;
        while (way[indexWay].y !== checkY || way[indexWay].x !== checkX) {
          newWay.push(way[indexWay]);
          indexWay += 1;
        }
        newWay.push({ y: checkY, x: checkX });
        way = [...newWay];        
       
        if(direction === "east") direction = "west";
        else if(direction === "west") direction = "east";
        else if(direction === "north") direction = "south";
        else if(direction === "south") direction = "north";

         arrCrossroads.pop()

        findWay(arr, checkX, checkY);
      } else {
        return console.log(way, 'wall', wrongWays);
      }
    }
  };
  findWay(mazeArr, xStart, yStart);
};

walk(maze1, coord);
