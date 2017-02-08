//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}

function createElement(node) {
	const element = document.createElement(node.tag);
    if (node.props) {
        Object.keys(node.props).forEach((key) => {
			if (key == "className") {
                element.setAttribute("class", node.props[key]);
            } else if (key == "onClick") {
                element.addEventListener("click", function(e) {
                    node.props["onClick"](e);
                    update();
                });
            } else {
                element.setAttribute(key, node.props[key]);
            }
        })
    }

    if (node.children) {
        node.children.forEach((tag) => {
            if (typeof tag === "string") {
                element.innerHTML = tag;
            } 
            else {
                element.appendChild(createElement(tag));
            }
        });
    }
    return element;
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
            	node1.props.id && node2.props.id && 
            	node1.props.id != node2.props.id)
}

function updateElement(parent, newNode, oldNode, index=0) {
	// index will be needed when you traverse children
	// add the new node to the parent DOM element if
	// the new node is different from the old node 
	// at the same location in the DOM.
	// ideally we also handle inserts, but ignore that functionality for now.

    if (!oldNode) {
        parent.appendChild(createElement(newNode))
    } else {
		if (changed(newNode, oldNode)) {
            parent.children.splice(index, 0, createElement(newNode));
        } else if (newNode.children) {
        	// updateelement recursively
            if (newNode.children >= oldNode.children) {
                newNode.children.forEach((cNewNode, idx, array) => {
                    updateElement(parent.children[index], cNewNode, oldNode.children[idx], idx);
            	});
            } else {
                parent.removeChild(parent.children[index]);
                parent.appendChild(createElement(newNode));
            }
        }
    }
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        for (let p in obj.props) {
            props[p] = obj.props[p]
        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
	// compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

})(window);