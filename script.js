// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

const minWeightInput = document.querySelector('.minweight__input'); // добавил поле ввода мин.веса
const maxWeightInput = document.querySelector('.maxweight__input'); // добавил поле ввода макс.веса

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  let li = fruitsList.firstElementChild;
  while (li) {
    fruitsList.removeChild(li)
    li = fruitsList.firstElementChild;
  }

  const colors = ["fruit_violet","fruit_green","fruit_carmazin","fruit_yellow","fruit_lightbrown"]

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const newLi = document.createElement("li")
  
  const divMain = document.createElement("div")
  divMain.className = "fruit__info"

  const divIndex = document.createElement("div")
  divIndex.innerHTML = "index: " + i
  divMain.appendChild(divIndex)

  const divKind = document.createElement("div")
  divKind.innerHTML = "kind: " + fruits[i].kind
  divMain.appendChild(divKind)

  const divColor = document.createElement("div")
  divColor.innerHTML = "color: " + fruits[i].color
  divMain.appendChild(divColor)

  const divWeight = document.createElement("div")
  divWeight.innerHTML = "weight (кг): " + fruits[i].weight
  divMain.appendChild(divWeight)

	newLi.appendChild(divMain)
	fruitsList.appendChild(newLi)
  newLi.className = "fruit__item " + colors[getRandomInt(0,colors.length-1)]
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    const index = getRandomInt(0, fruits.length-1) 
    result.push(fruits[index])   
    fruits.splice(index, 1)
    //console.log(result)
  }

  // Вероятность совпадения крайне мала, но тем не менее добавим код для этого
  if (fruits.join()===result.join()){
    alert("Порядок фруктов не изменился! Попробуйте ещё раз!")
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  //console.log('shuffleButton')
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits = fruits.filter(item => {
    // TODO: допишите функцию
    return item.weight>minWeightInput.value && item.weight<maxWeightInput.value
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});
    

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return a.color>b.color
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    const n = arr.length
    for (let i = 0; i < n-1; i++) {
    for (let j = 0; j < n-1-i; j++) {
      if (comparation(arr[j], arr[j+1])) {
        let temp = arr[j+1] 
           arr[j+1] = arr[j]
           arr[j] = temp   
    }}}},

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    function swap(items, firstIndex, secondIndex){
      const temp = items[firstIndex]
      items[firstIndex] = items[secondIndex]
      items[secondIndex] = temp
   }
   function partition(items, left, right) {
    const pivot = items[Math.floor((right + left) / 2)]
        let i = left
        let j = right
        console.log(i)
        console.log(items[i])
    while (i <= j) {
        while (!comparation(items[i], pivot)) {
            i++;
        }
        while (comparation(items[j], pivot)) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j)
            i++;
            j--;
        }
    }
    return i
 }
 function doSort(items, left, right) {
  let index;
  if (items.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? items.length - 1 : right;
      index = partition(items, left, right);
      if (left < index - 1) {
          doSort(items, left, index - 1);
      }
      if (index < right) {
          doSort(items, index, right);
      }
  }
  //return items;
}
  doSort(arr, 0, arr.length-1)
    
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind = sortKind=='bubbleSort' ? 'quickSort' : 'bubbleSort'
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  sortTimeLabel.textContent = sortTime;
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value === '' || colorInput.value === '' || weightInput.value === '') {
    alert ('Заполните все поля у нового фрукта!')
  }
  const newFruit = {
    kind: kindInput.value,
    color: colorInput.value,
    weight: weightInput.value
  }
  fruits.push(newFruit)
  display();
});
