//vars
const createShapesButton = document.querySelector("#createShapes");
const cancelButton = document.querySelector("#cancel");
const shapeMenu = document.querySelector("#shape");
const countInput = document.querySelector("#count");

//on load function
document.addEventListener("DOMContentLoaded", function () {
  //   formValidation();
});

//initialize select menu
selectMenu.init();

//event listeners
countInput.oninput = () => {
  //   formValidation();
};
shapeMenu.onchange = () => {
  //   formValidation();
};
createShapesButton.onclick = () => {
  createShapes();
};
cancelButton.onclick = () => {
  cancel();
};

//form validation
var formValidation = function (event) {
  if (shapeMenu.value === "" || countInput.value === "") {
    createShapesButton.disabled = true;
  } else {
    createShapesButton.disabled = false;
  }
};

//functions
function createShapes() {
  parent.postMessage(
    {
      pluginMessage: {
        type: "find-all",
        value: countInput.value,
      },
    },
    "*"
  );
}

function cancel() {
  parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
}

onmessage = (event) => {
  const elements = event.data.pluginMessage;
  let messages = [];

  console.log(elements);

  for (i = 0; i < elements.length; i++) {
    messages.push(elements[i].name);
  }

  document.getElementById("names").innerHTML = messages;
};
