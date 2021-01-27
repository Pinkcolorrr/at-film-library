const addFilmForm = document.getElementById('filmForm');
const addFilmInputs = document.getElementsByClassName('addFilmInput');
const errorMsg = document.getElementById('errorMsg');
const DEFALUT_NAME = 'Unknown';
const inputState = {
  title: DEFALUT_NAME,
  release_date: DEFALUT_NAME,
  director: DEFALUT_NAME,
  producer: DEFALUT_NAME,
  opening_crawl: DEFALUT_NAME,
  episode_id: DEFALUT_NAME,
  created: DEFALUT_NAME,
  edited: new Date(),
};

for (let input of addFilmInputs) {
  input.addEventListener('input', e => {
    inputState[e.target.id] = e.target.value || DEFALUT_NAME;
  });
}

addFilmForm.addEventListener('submit', e => {
  e.preventDefault();

  if (getTypeOfForm() === 'add') {
    addNewFilm();
  } else {
    editFilm(getFilmId());
  }
});

/**
 Add film in database
 */
async function addNewFilm() {
  inputState.created = new Date();
  const request = {
    fields: inputState,
    model: 'resources.film',
    // Number for generate id
    // eslint-disable-next-line no-magic-numbers
    pk: Math.random().toString(36).substr(2, 9),
  };

  try {
    await fetch('https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(request),
    });
    window.location.replace('../');
  } catch (err) {
    errorMsg.innerHTML = err.message;
    errorMsg.style.display = 'block';
  }
}

/**
 Modifies an existing movie in database
 @param {string} id id of film
 */
async function editFilm(id) {
  const request = {};
  for (let key in inputState) {
    if (inputState[key] != DEFALUT_NAME) {
      request[key] = inputState[key];
    }
  }

  try {
    await fetch(`https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/films/${id}/fields.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(request),
    });
    window.location.replace('../');
  } catch (err) {
    errorMsg.innerHTML = err.message;
    errorMsg.style.display = 'block';
  }
}

/**
 Get film id from url params
 @returns {string} id of film in database
 */
function getFilmId() {
  return new URL(window.location.href).searchParams.get('id');
}

/**
 Get type of form from url params
 @returns {string} type of form (add or edit)
 */
function getTypeOfForm() {
  return new URL(window.location.href).searchParams.get('type');
}

getFilmId();
