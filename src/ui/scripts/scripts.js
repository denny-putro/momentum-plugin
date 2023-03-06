const findNodesButton = document.querySelector("#findNodesButton");
const shapeMenu = document.querySelector("#shape");
const countInput = document.querySelector("#count");

let selectedNodes = [];

// document.addEventListener("DOMContentLoaded", function () {
//   selectMenu.init();
//   disclosure.init();
// });

document.body.addEventListener("click", function (event) {
  if (event.target.type == "checkbox") {
    selectNode(event.target.id);
  }
});

findNodesButton.onclick = () => {
  findNodes();
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
    let searchResult = "";
    let nodeList = [];

    // Hide loader
    document.getElementById("overlay").classList.add("hide");

    // Add search result list
    if (data.length > 0) {
      for (i = 0; i < data.length; i++) {
        let message = `
          <div class="result__item">
            <input id="${data[i].id}" type="checkbox" class="checkbox__box">
            <label for="${data[i].id}" class="checkbox__label">${data[i].name}</label>
            <i class="checkbox__search material-icons">search</i>
          </div>
        `;

        nodeList.push(message);
      }
      searchResult = nodeList.join("");
    } else {
      searchResult = `<p class="result__notfound">Sorry, no results are found.<p>`;
    }

    // Change the html layout
    document.getElementById("searchResultLayout").innerHTML = searchResult;
  }

  if (mainMessage.messageType == "show-loader") {
    document.getElementById("overlay").classList.remove("hide");
  }
};
