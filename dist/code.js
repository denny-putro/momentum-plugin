var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 360, height: 480 });
const selectedNodes = [];
let nodesFound = [];
function findAll(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const node = figma.currentPage;
        let myPromise = new Promise(function (resolve) {
            setTimeout(() => resolve(node.findAll((node) => {
                return node.name === message;
            })), 100);
        });
        return yield myPromise;
    });
}
figma.ui.onmessage = (message) => {
    if (message.type === "find-all") {
        const node = figma.currentPage;
        let sceneNode = [];
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
        }
        else {
            selectedNodes.push(selectedNode);
            figma.viewport.scrollAndZoomIntoView([selectedNode]);
        }
        figma.currentPage.selection = selectedNodes;
    }
    // figma.closePlugin();
};
