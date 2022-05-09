// População da lista
const data = Array.from({ length: 100 }).map(
  (_, i) => `<item"> ${i + 1}`,
); /* aqui ultilizamos o Array.from(metodo) para transformar ArrayLike ou nodeList numa Array.
e o map irá fzer um loop para cada item do array retornando o posicinamento de 1 á 100 */

// function populateList(){

//     const list = document.querySelector('.list')
//     list.innerHTML = data.join("")
//      return data
// }
// const data = populateList()

// Controles
const html = {
  get(element) {
    return document.querySelector(element);
  },
};

let perPage = 5;
const state = {
  page: 1, //pagina atual
  perPage,
  totalPage: Math.ceil(data.length / perPage), //temos 100 posições dividido pelo quantidade de elementos por pagina,q no caso é 5,sendo assim teremos 20 paginas.
  maxVisibleButtons: 5,
};
const controls = {
  next() {
    state.page++;

    const lastPage = state.page > state.totalPage;
    if (lastPage) {
      state.page--;
    }
  },
  prev() {
    state.page--;

    if (state.page < 1) {
      state.page++;
    }
  },
  goTo(page) {
    if (page < 1) {
      page = 1;
    }

    state.page = +page;
    if (page > state.totalPage) {
      state.page = state.totalPage;
    }
  },

  //createListeners() sua funcionalidade ela ira procurar um elemento que foi clicado e irá adicionar um evento nele
  createListeners() {
    html.get('.first').addEventListener('click', () => {
      controls.goTo(1);
      update();
    });
    html.get('.last').addEventListener('click', () => {
      controls.goTo(state.totalPage);
      update();
    });
    html.get('.next').addEventListener('click', () => {
      controls.next();
      update();
    });
    html.get('.prev').addEventListener('click', () => {
      controls.prev();
      update();
    });
  },
};
// até onde entendi !!!!!!!!!!!

const list = {
  create(item) {
    const div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = item;

    html.get('.list').appendChild(div);
  },
  update() {
    html.get('.list').innerHTML = '';
    let page = state.page - 1;
    let start = page * state.perPage;
    let end = start + state.perPage;

    const paginatedItems = data.slice(start, end);
    paginatedItems.forEach(list.create);
  },
};

const buttons = {
  element: html.get('#paginate .numbers'),
  create(numbers) {
    const button = document.createElement('div');
    button.innerHTML = numbers;
    if (state.page === numbers) {
      button.classList.add('active');
    }
    button.addEventListener('click', (event) => {
      const page = event.target.innerText;
      controls.goTo(page);
      update();
    });
    buttons.element.appendChild(button);
  },
  update() {
    buttons.element.innerHTML = '';
    const { maxLeft, maxRight } = buttons.calculatemaxVisible();
    for (let page = maxLeft; page <= maxRight; page++) {
      buttons.create(page);
    }
  },
  calculatemaxVisible() {
    const { maxVisibleButtons } = state;
    let maxLeft = state.page - Math.floor(maxVisibleButtons / 2);
    let maxRight = state.page + Math.floor(maxVisibleButtons / 2);
    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = maxVisibleButtons;
    }

    if (maxRight > state.totalPage) {
      maxLeft = state.totalPage - (maxVisibleButtons - 1);
      maxRight = state.totalPage;
    }
    return { maxLeft, maxRight };
  },
};

function update() {
  list.update();
  buttons.update();
}

function init() {
  update();
  controls.createListeners();
}

init();




// const data = [];
//     for (i = 0; i < 100; i++){
//         data.push(`item ${i + 1}`)
//     };
//     console.log(data);
