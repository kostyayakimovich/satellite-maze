// По умолчанию:
// 1- Может быть любой лабиринт с любыми путями
// 2-Точки входа и выхода в лабиринте могут быть в любом месте, но только на краю лабиринта
// 3-Точки входа и выхода в лабиринте могут быть с любой стороны лабиринта
// 4-Если точка входа находится в углу лабиринта, то выход из лабиринта может быть только соседняя точка по оси

type Coord = {
  x: number;
  y: number;
};

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

const walk = (mazeArr: boolean[][], objStart: Coord): Coord[] | string => {
  if (!mazeArr.length) return 'this is not a maze';
  const xStart = objStart.x;
  const yStart = objStart.y;
  //Проверяем находится ли точка входа на краю
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
  //Проверяем все углы. Если точка входа находится на угле лабиринта,
  //то нужно проверить только соседние координаты и не нужно запускать функцию findWay
  //check Angle
  if (xStart === 0 && yStart === 0) {
    if (mazeArr[yStart][xStart + 1]) {
      way.push({ y: yStart, x: xStart + 1 });
      return way;
    }
    if (mazeArr[yStart + 1][xStart]) {
      way.push({ y: yStart + 1, x: xStart });
      return way;
    }
  }
  if (xStart === 0 && yStart === mazeArr.length - 1) {
    if (mazeArr[yStart][xStart + 1]) {
      way.push({ y: yStart, x: xStart + 1 });
      return way;
    }

    if (mazeArr[yStart - 1][xStart]) {
      way.push({ y: yStart - 1, x: xStart });
      return way;
    }
  }
  if (xStart === mazeArr[0].length - 1 && yStart === mazeArr.length - 1) {
    if (mazeArr[yStart][xStart - 1]) {
      way.push({ y: yStart, x: xStart - 1 });
      return way;
    }

    if (mazeArr[yStart - 1][xStart]) {
      way.push({ y: yStart - 1, x: xStart });
      return way;
    }
  }
  if (xStart === mazeArr[0].length - 1 && yStart === 0) {
    if (mazeArr[yStart][xStart - 1]) {
      way.push({ y: yStart, x: xStart - 1 });
      return way;
    }
    if (mazeArr[yStart + 1][xStart]) {
      way.push({ y: yStart + 1, x: xStart });
      return way;
    }
  }
  //При входе в лабиринт проверяем две соседние координаты(может выход рядом и не нужно запускать функцию findWay)
  //check neighbors(quick exit)
  if (xStart === 0 || xStart === mazeArr[0].length - 1) {
    if (mazeArr[yStart - 1][xStart]) {
      way.push({ y: yStart - 1, x: xStart });
      return way;
    }
    if (mazeArr[yStart + 1][xStart]) {
      way.push({ y: yStart + 1, x: xStart });
      return way;
    }
  }
  if (yStart === 0 || yStart === mazeArr.length - 1) {
    if (mazeArr[yStart][xStart - 1]) {
      way.push({ y: yStart, x: xStart - 1 });
      return way;
    }

    if (mazeArr[yStart][xStart + 1]) {
      way.push({ y: yStart, x: xStart + 1 });
      return way;
    }
  }

  //Создаем направление движения, чтобы не проверять путь откуда мы пришли
  let direction = '';
  if (xStart === 0) direction = 'east';
  else if (xStart === mazeArr[0].length - 1) direction = 'west';
  else if (yStart === 0) direction = 'south';
  else if (yStart === mazeArr.length - 1) direction = 'north';

  const wrongWays = [{ y: yStart, x: xStart }];
  const arrCrossroads = [];
  //функция которая проверяет путь
  const findWay = (
    arr: boolean[][],
    x: number,
    y: number
  ): Coord[] | string => {
    let leftCoord = true;
    let rightCoord = true;
    let upCoord = true;
    let downCoord = true;
    //массив wrongWays содержит точки лабиринта где мы уже были.
    //Это позволяет избежать петли, т.е. вернуться на свой путь.
    //Здесь мы проводим такую проверку
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
    //Здесь мы проводим проверку направления - ВОСТОК
    if (direction !== 'west' && rightCoord && arr[y][x + 1]) {
      wrongWays.push({ y: y, x: x + 1 });
      //check crossroads
      //Массив arrCrossroads содержит координаты всех развилок в лабиринте
      //Если мы уперлись в стену, то всегда можно вернуться к предыдущей развилке
      if (arr[y - 1][x] || arr[y + 1][x]) {
        arrCrossroads.push({ y: y, x: x });
      }
      direction = 'east';
      //Массив way - это основной массив маршрута.
      //Если мы вышли из лабиринта, то мы его возвращаем
      way.push({ y: y, x: x + 1 });
      //check exit
      //Здесь мы проверяем вышли ли мы из лабиринта.
      //Если мы не вышли, то рекурсивно запускаем функцию findWay
      //Если мы вышли из лабиринта, то возвращаем путь way
      if (x + 1 === 0 || x + 1 === arr[y].length - 1) return way;
      return findWay(arr, x + 1, y);
    }
    //Здесь мы проверяем направление - ЗАПАД(аналогично направлению ВОСТОК)
    else if (direction !== 'east' && leftCoord && arr[y][x - 1]) {
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
    }
    //Здесь мы проверяем направление - СЕВЕР(аналогично направлению ВОСТОК и ЗАПАД)
    else if (direction !== 'south' && upCoord && arr[y - 1][x]) {
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
    }
    //Здесь мы проверяем направление - ЮГ(аналогично направлению ВОСТОК, ЗАПАД и СЕВЕР )
    else if (direction !== 'north' && downCoord && arr[y + 1][x]) {
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
      //Если мы уперлись в стену, то мы проверяем проходили ли мы развилки,
      //координаты которых лежат в массиве arrCrossroads.
      if (arrCrossroads.length) {
        let checkX = arrCrossroads[arrCrossroads.length - 1].x;
        let checkY = arrCrossroads[arrCrossroads.length - 1].y;
        let newWay = [];
        let indexWay = 0;
        //Формируем новый путь к выходу(обрезая ложное направление)
        while (way[indexWay].y !== checkY || way[indexWay].x !== checkX) {
          newWay.push(way[indexWay]);
          indexWay += 1;
        }
        newWay.push({ y: checkY, x: checkX });
        way = [...newWay];
        //меняем направление движения, чтобы не проверять путь откуда мы пришли
        if (direction === '') direction = 'east';
        else if (direction === 'east') direction = 'west';
        else if (direction === 'west') direction = 'east';
        else if (direction === 'north') direction = 'south';
        else if (direction === 'south') direction = 'north';
        //удаляем последнюю развилку
        arrCrossroads.pop();
        //запускаем рекурсивно функцию findWay с координатами развилки
        return findWay(arr, checkX, checkY);
      } else {
        //если выхода из лабиринта нет, то возвращаем "wall"
        return 'wall';
      }
    }
  };
  return findWay(mazeArr, xStart, yStart);
};

console.log(walk(maze, coord));

//Надеюсь мои комментарии будут вам полезны. Спасибо за задачу. Было интересно.
