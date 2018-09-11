'use strict';

var Wizard = {
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
  ]
};


var WIZARDS_DIALOG = document.querySelector('.setup');
var SETUP_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template').content;
var SETUP_SIMILAR_LIST = document.querySelector('.setup-similar-list');
var SETUP_SIMILAR = document.querySelector('.setup-similar');


// отображение блока .setup и .setup-similar
WIZARDS_DIALOG.classList.remove('hidden');
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
  for (var i = 0; i < 4; i++) {
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


