figma.showUI(__html__, { width: 400, height: 400 });
figma.ui.onmessage = (message) => {
    if (message.type === "find-all") {
        const node = figma.currentPage;
        let sceneNode = [];
        node.findAll((node) => {
            if (node.name === message.value) {
                sceneNode.push(node);
            }
            return true;
        });
        // figma.viewport.scrollAndZoomIntoView([oneSelection]);
        figma.currentPage.selection = sceneNode;
        figma.ui.postMessage(sceneNode.map((node) => {
            let object = {
                id: node.id,
                name: node.name,
                type: node.type,
            };
            return object;
        }));
    }
    // figma.closePlugin();
};
