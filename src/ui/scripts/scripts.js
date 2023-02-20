const findNodesButton = document.querySelector("#findNodesButton");
const shapeMenu = document.querySelector("#shape");
const countInput = document.querySelector("#count");
const selectAll = document.querySelector("#selectAll");

let selectedNodes = [];

document.addEventListener("DOMContentLoaded", function () {
  selectMenu.init();
  disclosure.init();
});

document.body.addEventListener("click", function (event) {
  if (event.target.type == "checkbox") {
    selectNode(event.target.id);
  }
});

findNodesButton.onclick = () => {
  findNodes();
};

selectAll.onclick = () => {
  console.log("SELECT!");
};

const selectNode = (value) => {
  parent.postMessage(
    {
      pluginMessage: {
        type: "selectNode",
        value: value,
      },
    },
    "*"
  );
};

// Posting messages to Main
const findNodes = () => {
  parent.postMessage(
    {
      pluginMessage: {
        type: "find-all",
        value: countInput.value,
      },
    },
    "*"
  );
};

// On receiving messages from Main
onmessage = (event) => {
  const mainMessage = event.data.pluginMessage;

  if (mainMessage.messageType == "search") {
    let data = mainMessage.data;
    let nodeList = [];

    // Add search result list
    for (i = 0; i < data.length; i++) {
      let message = `
        <div class="checkbox">
          <input id="${data[i].id}" type="checkbox" class="checkbox__box">
          <label for="${data[i].id}" class="checkbox__label">${data[i].name}</label>
        </div>
      `;

      nodeList.push(message);
    }

    // Change the html layout
    document.getElementById("searchResultLayout").innerHTML = nodeList.join("");
  }
};
