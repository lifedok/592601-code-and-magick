'use strict';

window.renderStatistics = function (ctx, players, times) {

  var drawRectangle = function (x, y, width, height, radius, color) {
    ctx.fillStyle = color ? color : '#000';
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  };
  var drawText = function (color, font, text, x, y, maxWidth) {
    ctx.fillStyle = color ? color : '#000';
    ctx.font = font ? font : '16px PT Mono';
    ctx.fillText(text, x, y, maxWidth);
  };

  // constant's
  var RECTANGLE_X = 110;
  var RECTANGLE_Y = 10;
  var RECTANGLE_HEIGHT = 270;
  var RECTANGLE_WIDTH = 420;
  var RECTANGLE_RADIUS = 25;
  var SHIFT = 10;

  var COLUMN_X = 160;
  var COLUMN_Y = 100;
  var COLUMN_HEIGHT = 150;
  var COLUMN_WIDTH = 40;
  var COLUMN_RADIUS = 3;
  var COLUMN_STEP = 50;

  // отрисовка облачка с тенью
  drawRectangle(
      RECTANGLE_X + SHIFT,
      RECTANGLE_Y + SHIFT,
      RECTANGLE_WIDTH,
      RECTANGLE_HEIGHT,
      RECTANGLE_RADIUS,
      'rgba(0, 0, 0, 0.7)'
  );
  drawRectangle(
      RECTANGLE_X,
      RECTANGLE_Y,
      RECTANGLE_WIDTH,
      RECTANGLE_HEIGHT,
      RECTANGLE_RADIUS,
      '#fff'
  );

  // отрисовка приветствия
  drawText('#880844', '', 'Ура, вы победили!', 220, 30, 200);
  drawText('', '', 'Список результатов:', 210, 50, 200);

  // высчитываем максимальное значение массива
  var getMaxValue = function (arr) {
    var maxValue = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
      }
    }
    return maxValue;
  };

  // отрисовка гистограмм
  for (var i = 0; i < players.length; i++) {

    // определение максимальной высоты относительно time
    var COLUMN_MAX_HEIGHT = getMaxValue(times);

    // округление до ближайщего целого
    var TIME = Math.round(times[i]);

    //  распределение стобцов по ширине canvas относительно оси Х
    var COLUMN_SHIFT_X = COLUMN_X + (COLUMN_WIDTH + COLUMN_STEP) * i;

    // динамическое определение высоты столбца
    var COLUMN_DYNAMIC_HEIGHT = TIME * COLUMN_HEIGHT / COLUMN_MAX_HEIGHT;

    // выравнивание столбцов по оси Y
    var COLUMN_SHIFT_Y = COLUMN_Y + COLUMN_HEIGHT - COLUMN_DYNAMIC_HEIGHT;

    // динамическое позиционирование времени над столбцом
    var TIME_SHIFT_Y = COLUMN_SHIFT_Y - 10;

    // генератор случайного синего цвета
    var COLORS = ['0e5ec5', '4c8de0', '4b709e', '1e4b6d', '0a3f67', 'a0b6e0', '64a2c7'];
    var COLUMN_BACKGROUNG = '#' + COLORS[Math.floor(Math.random() * COLORS.length)];

    drawText('#6F7288', '', TIME, COLUMN_SHIFT_X, TIME_SHIFT_Y, 40);

    if (players[i] === 'Вы') {
      drawRectangle(
          COLUMN_SHIFT_X,
          COLUMN_SHIFT_Y,
          COLUMN_WIDTH,
          COLUMN_DYNAMIC_HEIGHT,
          COLUMN_RADIUS,
          'rgba(255, 0, 0, 1)'
      );
    } else {
      drawRectangle(
          COLUMN_SHIFT_X,
          COLUMN_SHIFT_Y,
          COLUMN_WIDTH,
          COLUMN_DYNAMIC_HEIGHT,
          COLUMN_RADIUS,
          COLUMN_BACKGROUNG
      );
    }

    drawText('', '', players[i], COLUMN_SHIFT_X, 270, 40);
  }
};


