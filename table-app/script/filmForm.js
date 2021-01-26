const addFilmForm = document.getElementById('addFilmForm');
const addFilmInputs = document.getElementsByClassName('addFilmInput');
const errorMsg = document.getElementById('errorMsg');
const DEFALUT_NAME = 'Unknown';
const inputState = {
  characters: {},
  title: DEFALUT_NAME,
  release_date: DEFALUT_NAME,
  director: DEFALUT_NAME,
  producer: DEFALUT_NAME,
  opening_crawl: DEFALUT_NAME,
  episode_id: DEFALUT_NAME,
  created: new Date(),
  edited: new Date(),
};

for (let input of addFilmInputs) {
  input.addEventListener('input', e => {
    inputState[e.target.id] = e.target.value || DEFALUT_NAME;
  });
}

addFilmForm.addEventListener('submit', e => {
  e.preventDefault();

  writeFilmData();
});

/**
 Add film in database
 */
async function writeFilmData() {
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
