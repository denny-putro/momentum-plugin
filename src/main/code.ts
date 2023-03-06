figma.showUI(__html__, { width: 360, height: 480 });

const selectedNodes: SceneNode[] = [];
let nodesFound: SceneNode[] = [];

async function findAll(message: string) {
  const node: PageNode = figma.currentPage;

  let myPromise = new Promise<SceneNode[]>(function (resolve) {
    setTimeout(
      () =>
        resolve(
          node.findAll((node) => {
            return node.name === message;
          })
        ),
      100
    );
  });

  return await myPromise;
}

figma.ui.onmessage = (message) => {
  if (message.type === "find-all") {
    const node: PageNode = figma.currentPage;
    let sceneNode: SceneNode[] = [];

    // Post message to UI
    figma.ui.postMessage({
      messageType: "show-loader",
    });

    findAll(message.value.toString()).then((n) => {
      sceneNode = n;

      // Save found node
      nodesFound = sceneNode;

      // Construct node objects
      const nodeObjects = sceneNode.map((node) => {
        let object = {
          id: node.id,
          name: node.name,
          type: node.type,
        };
        return object;
      });

      // Post message to UI
      figma.ui.postMessage({
        data: nodeObjects,
        messageType: "search",
      });
    });
  }

  if (message.type === "selectNode") {
    const selectedNode = nodesFound.find((n) => n.id === message.value);

    // Add or remove to selection list
    if (selectedNodes.find((n) => n === selectedNode)) {
      selectedNodes.splice(selectedNodes.indexOf(selectedNode), 1);
    } else {
      selectedNodes.push(selectedNode);
      figma.viewport.scrollAndZoomIntoView([selectedNode]);
    }

    figma.currentPage.selection = selectedNodes;
  }

  // figma.closePlugin();
};
