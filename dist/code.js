figma.showUI(__html__, { width: 320, height: 480 });
const selectedNodes = [];
figma.ui.onmessage = (message) => {
    if (message.type === "find-all") {
        const node = figma.currentPage;
        let sceneNode = [];
        // Find all nodes
        node.findAll((node) => {
            if (node.name === message.value) {
                sceneNode.push(node);
            }
            return true;
        });
        // Construct node objects
        const nodeObjects = sceneNode.map((node) => {
            let object = {
                id: node.id,
                name: node.name,
                type: node.type,
                messageType: "search",
            };
            return object;
        });
        // Post message to UI
        figma.ui.postMessage({
            data: nodeObjects,
            messageType: "search",
        });
    }
    if (message.type === "selectNode") {
        const selectedNode = figma.currentPage.findOne((n) => n.id === message.value);
        // Add or remove to selection list
        if (selectedNodes.find((n) => n === selectedNode)) {
            selectedNodes.splice(selectedNodes.indexOf(selectedNode), 1);
        }
        else {
            selectedNodes.push(selectedNode);
            figma.viewport.scrollAndZoomIntoView([selectedNode]);
        }
        figma.currentPage.selection = selectedNodes;
    }
    // figma.closePlugin();
};
