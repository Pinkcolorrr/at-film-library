const form = document.getElementById("form");
const inputs = document.getElementsByClassName("input-text");
const starShipStates = {
  MGTL: "Unknown",
  hyperdrive_rating: "Unknown",
  starship_class: "Unknown",
};

for (let item of inputs) {
  item.addEventListener("input", function () {
    starShipStates[item.id] = this.value;
    if (this.value === "") {
      starShipStates[item.id] = "Unknown";
    }
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  writeStarShipData();
});

function clearInputs() {
  for (let item of inputs) {
    item.value = "";
  }
}

async function writeStarShipData() {
  let request = {
    fields: starShipStates,
    model: "resources.starship",
    pk: Math.random().toString(36).substr(2, 9),
  };

  let response = await fetch(
    "https://js-camp-htmlform-project-default-rtdb.firebaseio.com/swapi/starships.json/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(request),
    }
  );
  if (response.ok) {
    clearInputs();
  }
}
