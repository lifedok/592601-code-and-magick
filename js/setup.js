'use strict';

var Wizard = {
  CONST: 4,
  FIRST_NAME: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  LAST_NAME: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  COAT_COLOR: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  EYES_COLOR: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
  FIREBALL: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};


var SETUP_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content;
var SETUP_SIMILAR_LIST = document.querySelector('.setup-similar-list');
var SETUP_SIMILAR = document.querySelector('.setup-similar');


// отображение блока .setup и .setup-similar
// WIZARDS_DIALOG.classList.remove('hidden');
SETUP_SIMILAR.classList.remove('hidden');


// генератор случайного значения из массива
var getRandomElement = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];
  }
  return randomElement;
};


// массив 4х сгенерированных JS объектов (волшебников)
var randomWizards = function () {
  var arr = [];
  for (var i = 0; i < Wizard.CONST; i++) {
    arr.push({
      firstName: getRandomElement(Wizard.FIRST_NAME),
      lastName: getRandomElement(Wizard.LAST_NAME),
      coatColor: getRandomElement(Wizard.COAT_COLOR),
      eyesColor: getRandomElement(Wizard.EYES_COLOR)
    });
  }
  return arr;
};


// на основании шаблона #similar-wizard-template создаём DOM-елемент волшебника
var renderWizard = function (wizard) {
  var wizardItem = SETUP_WIZARD_TEMPLATE.querySelector('.setup-similar-item').cloneNode(true);
  wizardItem.querySelector('.setup-similar-label').textContent = wizard.firstName + '\n ' + wizard.lastName;
  wizardItem.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardItem.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardItem;
};

// отрисовка сгенерированного DOM-элемента в блок .setup-similar-list
var renderWizards = function () {
  var wizards = randomWizards();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  SETUP_SIMILAR_LIST.appendChild(fragment);
};

renderWizards();


// next lesson

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var SETUP = document.querySelector('.setup');
var SETUP_OPEN = document.querySelector('.setup-open');
var SETUP_CLOSE = SETUP.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target.className !== 'setup-user-name') {
    onClosePopup();
  }
};
var onOpenPopup = function () {
  SETUP.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
var onClosePopup = function () {
  SETUP.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// по клику на элемент - закрытие, открытие Popup
SETUP_OPEN.addEventListener('click', onOpenPopup);
SETUP_CLOSE.addEventListener('click', onClosePopup);

// событие Popup по ENTER
SETUP_OPEN.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onOpenPopup();
  }
});
SETUP_CLOSE.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && !evt.target.classList.contains('.setup-user-name')) {
    onClosePopup();
  }
});

var SETUP_WIZARD = SETUP.querySelector('.setup-wizard');
var WIZARD_COAT = SETUP_WIZARD.querySelector('.wizard-coat');
var WIZARD_EYES = SETUP_WIZARD.querySelector('.wizard-eyes');
var SETUP_FIREBALL_WRAP = document.querySelector('.setup-fireball-wrap');

var onChangeCoatColor = function () {
  WIZARD_COAT.style.fill = getRandomElement(Wizard.COAT_COLOR);
};
var onChangeEyesColor = function () {
  WIZARD_EYES.style.fill = getRandomElement(Wizard.EYES_COLOR);
};
var onChangeFireballColor = function () {
  SETUP_FIREBALL_WRAP.style.background = getRandomElement(Wizard.FIREBALL);
};

WIZARD_COAT.addEventListener('click', onChangeCoatColor);
WIZARD_EYES.addEventListener('click', onChangeEyesColor);
SETUP_FIREBALL_WRAP.addEventListener('click', onChangeFireballColor);

