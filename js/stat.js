'use strict';

window.renderStatistics = function (ctx, players, times) {
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
  this.drawRectangle(
      ctx,
      RECTANGLE_X + SHIFT,
      RECTANGLE_Y + SHIFT,
      RECTANGLE_WIDTH,
      RECTANGLE_HEIGHT,
      RECTANGLE_RADIUS,
      'rgba(0, 0, 0, 0.7)'
  );
  this.drawRectangle(
      ctx,
      RECTANGLE_X,
      RECTANGLE_Y,
      RECTANGLE_WIDTH,
      RECTANGLE_HEIGHT,
      RECTANGLE_RADIUS,
      '#fff'
  );

  // отрисовка приветствия
  this.drawText(ctx, '#880844', '', 'Ура, вы победили!', 220, 30, 200);
  this.drawText(ctx, '', '', 'Список результатов:', 210, 50, 200);

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

  // отрисовка гистограммы
  for (var i = 0; i < players.length; i++) {
    var COLUMN_MAX_HEIGHT = getMaxValue(times);
    var TIME = Math.round(times[i]);
    var COLUMN_SHIFT_X = COLUMN_X + (COLUMN_WIDTH + COLUMN_STEP) * i;
    var COLUMN_DYNAMIC_HEIGHT = TIME * COLUMN_HEIGHT / COLUMN_MAX_HEIGHT;
    //var COLUMN_SHIFT_Y = COLUMN_Y + COLUMN_MAX_HEIGHT - COLUMN_DYNAMIC_HEIGHT;

    this.drawText(ctx, '#6F7288', '', TIME, COLUMN_SHIFT_X, 70, 40);
    this.drawRectangle(
        ctx,
        COLUMN_SHIFT_X,
        //COLUMN_SHIFT_Y,
        COLUMN_Y,
        COLUMN_WIDTH,
        COLUMN_DYNAMIC_HEIGHT,
        COLUMN_RADIUS,
        'rgba(255, 0, 0, 1)'
    );
    this.drawText(ctx, '', '', players[i], COLUMN_SHIFT_X, 270, 40);
  }
};
window.drawRectangle = function (ctx, x, y, width, height, radius, color) {
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
window.drawText = function (ctx, color, font, text, x, y, maxWidth) {
  ctx.fillStyle = color ? color : '#000';
  ctx.font = font ? font : '16px PT Mono';
  ctx.fillText(text, x, y, maxWidth);
};


