webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return store; });
function Store() {
	this.geometry = {};
	this.material = {};
	this.texture = {};
}

var store = new Store();


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_js__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return debug; });
/* harmony export (immutable) */ __webpack_exports__["a"] = addDebugToStore;
/* harmony export (immutable) */ __webpack_exports__["b"] = initDebug;
/* harmony export (immutable) */ __webpack_exports__["c"] = resetDebug;





const degToRad = 3.14159265359 / 180;

var debug;

function addDebugToStore(store) {
	store.geometry.debug = {};
	store.material.debug = {};
	var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["CircleBufferGeometry"](1, 64);
	var material = new __WEBPACK_IMPORTED_MODULE_0_three__["MeshBasicMaterial"]({
		color: 0x444444
	});
	store.geometry.debug.circle = geometry;
	store.material.debug.circle = material;
	var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["CircleBufferGeometry"](0.25, 64);
	var material = new __WEBPACK_IMPORTED_MODULE_0_three__["MeshBasicMaterial"]({
		color: 0x00ff00
	});
	store.geometry.debug.dot = geometry;
	store.material.debug.dot = material;


	var v = new Float32Array([
		0, -0.5, 0,
		1, -0.5, 0,
		1, 0.5, 0,
		0, 0.5, 0
	]);
	var i = new Uint32Array([
		0, 1, 2,
		0, 2, 3
	]);
	var u = new Float32Array([
		0, 0,
		1, 0,
		1, 1,
		1, 1
	]);

	var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["BufferGeometry"]();
	geometry.addAttribute("position", new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](v, 3));
	geometry.addAttribute("uv", new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](u, 2));
	geometry.setIndex(new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](i, 1));

	var material = new __WEBPACK_IMPORTED_MODULE_0_three__["MeshBasicMaterial"]({
		color: 0x00ff00
	});

	store.geometry.debug.line = geometry;
	store.material.debug.line = material;
}

function initDebug(scene) {
	debug = new Debug();
	scene.add(debug);
}

function resetDebug() {
	debug.reset();
}

function Debug() {
	__WEBPACK_IMPORTED_MODULE_0_three__["Group"].call(this);

	this.circleIndex = 0;
	this.circles = [];
	for (var i = 0; i < 10; i++) {
		var circle = new __WEBPACK_IMPORTED_MODULE_0_three__["Mesh"](__WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].geometry.debug.circle, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].material.debug.circle);
		this.circles.push(circle);
		this.add(circle);
		circle.visible = false;
	}

	this.dotIndex = 0;
	this.dots = [];
	for (var i = 0; i < 10; i++) {
		var dot = new __WEBPACK_IMPORTED_MODULE_0_three__["Mesh"](__WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].geometry.debug.dot, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].material.debug.dot);
		this.dots.push(dot);
		this.add(dot);
		dot.visible = false;
	}

	this.lineIndex = 0;
	this.lines = [];
	for (var i = 0; i < 10; i++) {
		var line = new __WEBPACK_IMPORTED_MODULE_0_three__["Mesh"](__WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].geometry.debug.line, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].material.debug.line);
		this.lines.push(line);
		this.add(line);
		line.visible = false;
	}

	this.type = 'Debug';
};

Debug.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0_three__["Group"].prototype), {
	reset: function() {
		this.dotIndex = 0;
		for (var i = 0; i < this.dots.length; i++) {
			this.dots[i].visible = false;
		}
		this.circleIndex = 0;
		for (var i = 0; i < this.circles.length; i++) {
			this.circles[i].visible = false;
		}
		this.lineIndex = 0;
		for (var i = 0; i < this.lines.length; i++) {
			this.lines[i].visible = false;
		}
	},
	drawDot: function(x, y) {
		if (this.dotIndex > this.dots.length - 1) {
			console.log("max value on dot buffer");
			return;
		}

		var dot = this.dots[this.dotIndex++];
		dot.position.x = x;
		dot.position.y = y;
		dot.position.z = 0.5;
		dot.visible = true;
	},
	drawCircle: function(x, y, radius) {
		if (this.circleIndex > this.circles.length - 1) {
			console.log("max value on circle buffer");
			return;
		}

		var circle = this.circles[this.circleIndex++];
		circle.position.x = x;
		circle.position.y = y;
		circle.position.z = -1;
		circle.scale.x = radius;
		circle.scale.y = radius;
		circle.visible = true;
	},
	drawLine: function(x0, y0, x1, y1) {
		if (this.lineIndex > this.lines.length - 1) {
			console.log("max value on line buffer");
			return;
		}

		var from = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](x0, y0);
		var to = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](x1, y1);
		to.sub(from);
		var length = to.length();
		var angle = to.angle();

		/*
		if (to.y < 0) {
			angle = -angle;
		}
		*/

		var line = this.lines[this.lineIndex++];
		line.position.x = x0;
		line.position.y = y0;
		line.position.z = 0.25;
		line.scale.x = length;
		line.scale.y = 0.1;
		line.setRotationFromAxisAngle(new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"](0, 0, 1), angle);
		line.visible = true;
	}
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utility_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_js__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["b"] = addFontToStore;
/* harmony export (immutable) */ __webpack_exports__["a"] = loadFont;
/* harmony export (immutable) */ __webpack_exports__["d"] = getWidth;
/* harmony export (immutable) */ __webpack_exports__["c"] = getMesh;







var fonts = {};

function addFontToStore(store) {
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utility_js__["a" /* loadUriTexture */])(store.texture, 'font', __WEBPACK_IMPORTED_MODULE_1__data_js__["a" /* fontTexture */]);

	var vertexShader = `
  varying vec2 vUv;
  void main() {
  vUv = uv;
  gl_Position =   projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `;

	var fragmentShader = `
  uniform sampler2D texture;
  uniform float threshold;
  uniform vec4 myColor;
  varying vec2 vUv;
  void main() {
    gl_FragColor = myColor;
    float a = texture2D(texture, vUv).a;
    gl_FragColor.a = smoothstep(0.4, 0.5, a);
  }
  `;

	var uniforms = {
		texture: {
			value: store.texture.font
		},
		threshold: {
			value: 0.4
		},
		myColor: {
			value: new __WEBPACK_IMPORTED_MODULE_0_three__["Vector4"](1, 1, 1, 1)
		}
	};

	var material = new __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"]({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: __WEBPACK_IMPORTED_MODULE_0_three__["DoubleSide"],
		transparent: true
	});

	store.material.font = material;
}


function loadFont(name, data) {
	fonts[name] = parseData(data);
	createMesh(fonts[name]);
}

function getWhiteSpaceCount(str) {
	var length = str.length;
	var sub = 0;

	for (var i = 0; i < length; i++) {
		var code = str.charCodeAt(i);
		if (code === 10 || code === 32) {
			sub += 0;
		}
	}

	return length - sub;
}

function getWidth(font, str) {
	var resultX = 0;

	if (!fonts[font]) {
		return resultX;
	}

	var font = fonts[font];
	var currentX = 0;
	var currentY = 0;

	var length = str.length;
	for (var demo = 0; demo < length; demo++) {
		var c = font.chars[str.charCodeAt(demo)];
		var cNext = str.charCodeAt(demo + 1);
		if (!c) {
			return;
		}

		if (c.id == 32) { //"space"
			currentX += c.xOffset + c.xAdvance;
			continue;
		}

		if (c.id == 10) { //"new line"
			if (currentX > resultX) {
				resultX = currentX
			}
			currentX = 0;
			currentY -= font.common.lineHeight;
			continue;
		}

		//offset
		currentX += c.xOffset + c.xAdvance;

		//kerning
		if (font.kerning.hasOwnProperty(c.id)) {
			if (font.kerning[c.id].hasOwnProperty(cNext)) {
				currentX += font.kerning[c.id][cNext];
			}
		}
	}

	if (currentX > resultX) {
		resultX = currentX
	}
	return resultX;
}

function getMesh(font, str) {
	if (!fonts[font]) {
		return;
	}

	var count = getWhiteSpaceCount(str);
	var posV = 0;
	var posI = 0;
	var posN = 0;
	var posU = 0;

	var mesh = new __WEBPACK_IMPORTED_MODULE_0_three__["BufferGeometry"]();

	var vertices = new Float32Array(count * 12);
	var indices = new Uint32Array(count * 6);
	var normals = new Int16Array(count * 12);
	var uvs = new Float32Array(count * 8);

	var font = fonts[font];
	var currentX = 0;
	var currentY = 0;
	var currentIndice = -4;

	var length = str.length;
	for (var demo = 0; demo < length; demo++) {
		var c = font.chars[str.charCodeAt(demo)];
		var cNext = str.charCodeAt(demo + 1);
		if (!c) {
			return;
		}

		if (c.id == 32) { //"space"
			currentX += c.xOffset + c.xAdvance;
			continue;
		}

		if (c.id == 10) { //"new line"
			currentX = 0;
			currentY -= font.common.lineHeight;
			continue;
		}

		var i;
		var iLength;
		var m = c.mesh;
		var cPosition = c.mesh.attributes.position.array;
		currentX += c.xOffset;
		iLength = cPosition.length;
		for (i = 0; i < iLength; i++) {
			var test = i % 3;
			if (test === 0) {
				vertices[posV++] = cPosition[i] + currentX;
			} else if (test === 1) {
				vertices[posV++] = cPosition[i] + currentY;
			} else {
				vertices[posV++] = cPosition[i];
			}
		}
		//currentX -= c.xOffset;
		currentX += c.xAdvance;

		//kerning
		if (font.kerning.hasOwnProperty(c.id)) {
			if (font.kerning[c.id].hasOwnProperty(cNext)) {
				currentX += font.kerning[c.id][cNext];
			}
		}

		var cNormals = c.mesh.attributes.nomal.array;
		iLength = cNormals.length;
		for (i = 0; i < iLength; i++) {
			normals[posN++] = cNormals[i];
		}

		var cUvs = c.mesh.attributes.uv.array;
		iLength = cUvs.length;
		for (i = 0; i < iLength; i++) {
			uvs[posU++] = cUvs[i];
		}

		var cIndices = c.mesh.index.array;
		currentIndice += 4;
		iLength = cIndices.length;
		for (i = 0; i < iLength; i++) {
			indices[posI++] = cIndices[i] + currentIndice;
		}
	}

	mesh.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](vertices, 3));
	mesh.addAttribute('nomal', new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](normals, 3));
	mesh.addAttribute('uv', new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](uvs, 2));
	mesh.setIndex(new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](indices, 1));
	return mesh;
}

function createMesh(fontData) {
	var scaleW = fontData.common.scaleW;
	var scaleH = fontData.common.scaleH;
	var base = fontData.common.base;

	var chars = fontData.chars;
	for (var c in chars) {
		var current = chars[c];

		var x0 = current.x;
		var y0 = 1 - current.y - current.textureHeight;
		var x1 = current.x + current.textureWidth;
		var y1 = 1 - current.y;

		var height = current.height;
		var width = current.width;
		var yOffset = current.yOffset;
		var pushDown = (height + yOffset) - base

		var vertices = new Float32Array([0, -pushDown, 0,
			width, -pushDown, 0,
			width, height - pushDown, 0,
			0, height - pushDown, 0
		]);

		var indices = new Uint32Array([
			0, 1, 2,
			2, 3, 0
		]);

		var normals = new Int16Array([
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		]);

		var uvs = new Float32Array([
			x0, y0,
			x1, y0,
			x1, y1,
			x0, y1
		]);

		current.mesh = new __WEBPACK_IMPORTED_MODULE_0_three__["BufferGeometry"]();
		current.mesh.addAttribute('position', new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](vertices, 3));
		current.mesh.addAttribute('nomal', new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](normals, 3));
		current.mesh.addAttribute('uv', new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](uvs, 2));
		current.mesh.setIndex(new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](new Uint32Array(indices), 1));
	}
}

function parseData(data) {
	var regInfo = /info face="(.+)" size=(-\d+|\d+) bold=(-\d+|\d+) italic=(-\d+|\d+) charset="" unicode=(-\d+|\d+) stretchH=(-\d+|\d+) smooth=1 aa=(-\d+|\d+) padding=(-\d+|\d+),(-\d+|\d+),(-\d+|\d+),(-\d+|\d+) spacing=(-\d+|\d+),(-\d+|\d+)/g;
	var regCommon = /common lineHeight=(-\d+|\d+)\s+base=(-\d+|\d+)\s+scaleW=(-\d+|\d+)\s+scaleH=(-\d+|\d+)\s+/g;
	var regKerning = /kerning first=(-\d+|\d+)\s+second=(-\d+|\d+)\s+amount=(-\d+|\d+)/g;
	var regCharacters = /char id=(-\d+|\d+)\s+x=(-\d+|\d+)\s+y=(-\d+|\d+)\s+width=(-\d+|\d+)\s+height=(-\d+|\d+)\s+xoffset=(-\d+|\d+)\s+yoffset=(-\d+|\d+)\s+xadvance=(-\d+|\d+)/g;

	var common = {};
	var chars = {};
	var kerning = {};
	var match = null;

	if ((match = regInfo.exec(data)) !== null) {
		common = {
			face: ~~match[1],
			size: ~~match[2],
			bold: ~~match[3],
			italic: ~~match[4],
			strechH: ~~match[5],
			smooth: ~~match[6],
			aa: ~~match[7],
			padding: ~~match[8],
			spacing: ~~match[12]
		}
	}


	var size = common.size

	if ((match = regCommon.exec(data)) !== null) {
		common.lineHeight = (~~match[1]) / size,
			common.base = (~~match[2]) / size,
			common.scaleW = ~~match[3],
			common.scaleH = ~~match[4]
	}

	var scaleW = common.scaleW;
	var scaleH = common.scaleH;
	var padding = common.padding;
	var padding2 = common.padding * 2;

	while ((match = regCharacters.exec(data)) !== null) {
		var char = {
			id: ~~match[1],
			x: (~~match[2]) / scaleW,
			y: (~~match[3]) / scaleH,
			textureWidth: (~~match[4]) / scaleW,
			textureHeight: (~~match[5]) / scaleH,
			width: (~~match[4] + padding2) / size,
			height: (~~match[5] + padding2) / size,
			xOffset: (~~match[6] + padding) / size,
			yOffset: (~~match[7]) / size,
			xAdvance: (~~match[8]) / size
		}
		chars[char.id] = char;
	}

	while ((match = regKerning.exec(data)) !== null) {
		var first = ~~match[1];
		var secound = ~~match[2];
		var amount = (~~match[3]) / size;

		if (!kerning[first]) {
			kerning[first] = {};
		}

		if (!kerning[first][secound]) {
			kerning[first][secound] = amount;
		}
	}

	return {
		common: common,
		chars: chars,
		kerning: kerning
	};
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = ForceGraph;



const MAX_NODES = 20;
const MAX_EDGES = 50;
const FORCE_PUSH = 100;
const FORCE_DAMPENING = 0.001;
const FORCE_SPRING = 0.005;

function Node() {
	this.position = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
	this.velocity = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
	this.force = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
}

function Edge() {
	this.a = -1;
	this.b = -1;
}

function getRandom() {
	return Math.random();
}

function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ForceGraph() {
	this.numNodes = 20;
	this.nodes = []
	for (var i = 0; i < MAX_NODES; i++) {
		this.nodes.push(new Node());
	}
	this.numEdges = 50;
	this.edges = [];
	for (var i = 0; i < MAX_EDGES; i++) {
		this.edges.push(new Edge());
	}
	this.steps = 0;
	this.done = false;
}

ForceGraph.prototype = Object.assign(Object.create(Object.prototype), {
	resetForceGraph: function() {
		this.steps = 0;
		this.done = false;
		this.numNodes = 0;
		this.numEdges = 0;

		for (var i = 0; i < this.edges.length; i++) {
			var edge = this.edges[i];
			edge.a = -1;
			edge.b = -1;
		}
	},

	generateGraph: function(numNodes, numEdges) {
		var fg = this;
		this.resetForceGraph();

		fg.numNodes = numNodes;
		fg.numEdges = numEdges;

		for (var i = 0; i < numNodes; i++) {
			var n = fg.nodes[i];
			n.position.set(getRandomFloat(-1.0, 1.0), getRandomFloat(-1.0, 1.0));

			if (i == 0) {
				continue;
			}

			var e = fg.edges[i - 1];
			e.a = i;

			var to = 0;
			do {
				to = getRandomInt(0, i);
			} while (to === i);
			e.b = to;
		}

		if (numNodes > numEdges) {
			return;
		}

		for (var i = numNodes - 1; i < numEdges; i++) {

			var e = fg.edges[i];
			var from = 0;
			var to = 0;
			var valid = false;

			while (!valid) {

				do {
					to = getRandomInt(0, numNodes);
					from = getRandomInt(0, numNodes);
				} while (to == from);

				var match = false;

				for (var a = 0; a < numEdges; a++) { //makes sure we do not get 2 edges that is the same
					var test = fg.edges[a];
					if (test.a == to && test.b == from || test.a == from && test.b == to) { //@Cleanup
						match = true;
						break;
					}
				}

				if (!match) {
					valid = true;
				}
			}

			e.a = from;
			e.b = to;
		}
	},

	simulateGraph() {
		var fg = this;
		var netForce = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
		var netVelocity = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
		var movement = 0;

		fg.steps += 1;

		var numNodes = fg.numNodes;
		for (var i = 0; i < numNodes; i++) {
			var n = fg.nodes[i];
			for (var j = 0; j < numNodes; j++) {
				if (i == j) {
					continue;
				}
				var m = fg.nodes[j];

				var force = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
				force.subVectors(n.position, m.position);
				force.multiplyScalar(FORCE_PUSH / force.lengthSq());
				n.force.add(force);
				netForce.add(force);
			}
		}

		for (var i = 0; i < numNodes; i++) {
			var n = fg.nodes[i];
			n.force.multiplyScalar(FORCE_DAMPENING);
		}

		var numEdges = fg.numEdges;
		for (var i = 0; i < numEdges; i++) {
			var e = fg.edges[i];
			var a = fg.nodes[e.a];
			var b = fg.nodes[e.b];

			var force = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
			force.subVectors(b.position, a.position);
			force.multiplyScalar(FORCE_SPRING);
			a.force.add(force);
			force.multiplyScalar(-1.0);
			b.force.add(force);
		}

		var test = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
		for (var i = 0; i < numNodes; i++) {
			var n = fg.nodes[i];
			n.velocity.add(n.force);
			n.velocity.multiplyScalar(0.8);
			test.set(n.velocity.x, n.velocity.y);
			test.multiplyScalar(4.0);
			n.position.add(test);
			movement += n.velocity.lengthSq();
		}

		if (movement < 0.000001) {
			console.log("numIterations: ", fg.steps);
			fg.done = true;
			return true;
		}
		return false;
	}


});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = isKeyPress;
/* harmony export (immutable) */ __webpack_exports__["d"] = isKeyDown;
/* harmony export (immutable) */ __webpack_exports__["e"] = isKeyUp;
/* harmony export (immutable) */ __webpack_exports__["b"] = updateKeyboardState;
/* harmony export (immutable) */ __webpack_exports__["a"] = addKeyboard;
/* unused harmony export removeKeyboard */
/* unused harmony export onKeyupHandler */
var keyState = new Int8Array(255);
var debug = false;

function isKeyPress(keyCode) {
	if (keyState[keyCode] == 2) {
		return true;
	}
	return false;
}

function isKeyDown(keyCode) {
	if (keyState[keyCode] == 3 || keyState[keyCode] == 2) {
		return true;
	}
	return false;
}

function isKeyUp(keyCode) {
	if (keyState[keyCode] == 0) {
		return true;
	}
	return false;
}

function updateKeyboardState() {
	for (var i = 0; i < keyState.length; i++) {
		if (keyState[i] !== 0) {
			keyState[i] += 1;
		}
		if (keyState[i] >= 3) {
			keyState[i] = 3;
		}
	}

}

function addKeyboard(element) {
	element.tabIndex = 1;
	element.addEventListener('keydown', onKeydownHandler);
	element.addEventListener('keyup', onKeyupHandler);
}

function removeKeyboard(element) {
	element.tabIndex = 0;
	element.removeEventListener('keydown', onKeydownHandler);
	element.removeEventListener('keyup', onKeyupHandler);
}

function onKeydownHandler(event) {
	var keyCode = event.keyCode;
	if (debug) {
		console.log("onKeyDown", keyCode);
	}

	if (keyState[keyCode] == 0) {
		keyState[keyCode] = 1;
	}
}

function onKeyupHandler(event) {
	var keyCode = event.keyCode;
	if (debug) {
		console.log("onKeyUp", keyCode);
	}
	keyState[keyCode] = 0;
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_js__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = addPlanetToStore;
/* harmony export (immutable) */ __webpack_exports__["b"] = Planet;






function addPlanetToStore(store) {
	var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["CircleBufferGeometry"](1, 32);
	var material = new __WEBPACK_IMPORTED_MODULE_0_three__["MeshBasicMaterial"]({
		color: 0x4422dd
	});
	store.geometry.planet = geometry;
	store.material.planet = material;
}

function Planet() {
	__WEBPACK_IMPORTED_MODULE_0_three__["Mesh"].call(this, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].geometry.planet, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].material.planet);

	this.type = 'Planet';
	this.radius = 1;
};

Planet.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0_three__["Mesh"].prototype), {
	setFromNode: function(node) {
		this.position.set(node.position.x, node.position.y, 0);
	},
	updateScale: function() {
		this.scale.x = this.radius;
		this.scale.y = this.radius;
		this.scale.z = this.radius;
	}
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_js__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = addStarToStore;
/* harmony export (immutable) */ __webpack_exports__["b"] = Star;






function addStarToStore(store) {
	var v = new Float32Array([
		0.0, 0.0, 0.0,
		0.0, 0.5, 0.0,
		0.14695, 0.20225, 0.0,
		0.47553, 0.15451, 0.0,
		0.23776, -0.07725, 0.0,
		0.29389, -0.40451, 0.0,
		0.0, -0.25, 0.0, -0.29389, -0.40451, 0.0, -0.23776, -0.07725, 0.0, -0.47553, 0.15451, 0.0, -0.14695, 0.20225, 0.0,
	]);
	var i = new Uint32Array([
		0, 2, 1,
		0, 3, 2,
		0, 4, 3,
		0, 5, 4,
		0, 6, 5,
		0, 7, 6,
		0, 8, 7,
		0, 9, 8,
		0, 10, 9,
		0, 1, 10
	]);
	var u = new Float32Array([
		0.0, 0.0,
		0.0, 0.5,
		0.14695, 0.20225,
		0.47553, 0.15451,
		0.23776, -0.07725,
		0.29389, -0.40451,
		0.0, -0.25, -0.29389, -0.40451, -0.23776, -0.07725, -0.47553, 0.15451, -0.14695, 0.20225,
	]);

	var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["BufferGeometry"]();
	geometry.addAttribute("position", new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](v, 3));
	geometry.addAttribute("uv", new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](u, 2));
	geometry.setIndex(new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](i, 1));

	var material = new __WEBPACK_IMPORTED_MODULE_0_three__["MeshBasicMaterial"]({
		color: 0xffff00
	});
	store.geometry.star = geometry;
	store.material.star = material;
}

function Star() {
	__WEBPACK_IMPORTED_MODULE_0_three__["Mesh"].call(this, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].geometry.star, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].material.star);

	this.type = 'Star';
	this.radius = 0.5;
};

Star.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0_three__["Mesh"].prototype), {

});



/*
Vector3::set(&v[0], 0.0f, 0.5f, 0.0f);
		Vector3::set(&v[1], 0.14695f, 0.20225f, 0);
		Vector3::set(&v[2], 0.47553f, 0.15451f, 0);
		Vector3::set(&v[3], 0.23776f, -0.07725f, 0);
		Vector3::set(&v[4], 0.29389f, -0.40451f, 0);
		Vector3::set(&v[5], 0.0f, -0.25f, 0);
		Vector3::set(&v[6], -0.29389f, -0.40451f, 0);
		Vector3::set(&v[7], -0.23776f, -0.07725f, 0);
		Vector3::set(&v[8], -0.47553f, 0.15451f, 0);
		Vector3::set(&v[9], -0.14695f, 0.20225f, 0);
*/


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = loadUriTexture;


function loadUriTexture(store, name, uri) {
	var image = document.createElement('img');

	store[name] = new __WEBPACK_IMPORTED_MODULE_0_three__["Texture"](image);

	image.onload = function() {
		store[name].needsUpdate = true;
	};

	image.src = uri;
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getRandom */
/* harmony export (immutable) */ __webpack_exports__["c"] = getRandomFloat;
/* harmony export (immutable) */ __webpack_exports__["b"] = getRandomInt;
/* harmony export (immutable) */ __webpack_exports__["a"] = lerp;
function getRandom() {
	return Math.random();
}

function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function lerp(from, to, t) {
	if (t > 1) {
		t = 1
	}
	if (t < 0) {
		t = 0
	}
	return (1 - t) * from + t * to;
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "info face=\"Segoe UI\" size=50 bold=0 italic=0 charset=\"\" unicode=0 stretchH=100 smooth=1 aa=1 padding=10,10,10,10 spacing=-2,-2\r\ncommon lineHeight=85 base=54 scaleW=512 scaleH=512 pages=1 packed=0\r\npage id=0 file=\"sui.png\"\r\nchars count=97\r\nchar id=0       x=159  y=301  width=45   height=57   xoffset=-9   yoffset=7    xadvance=50   page=0    chnl=0 \r\nchar id=10      x=0    y=0    width=0    height=0    xoffset=-9   yoffset=0    xadvance=18   page=0    chnl=0 \r\nchar id=32      x=0    y=0    width=0    height=0    xoffset=-9   yoffset=0    xadvance=32   page=0    chnl=0 \r\nchar id=33      x=484  y=130  width=26   height=57   xoffset=-9   yoffset=7    xadvance=32   page=0    chnl=0 \r\nchar id=34      x=193  y=405  width=33   height=32   xoffset=-9   yoffset=7    xadvance=38   page=0    chnl=0 \r\nchar id=35      x=204  y=301  width=47   height=54   xoffset=-9   yoffset=7    xadvance=48   page=0    chnl=0 \r\nchar id=36      x=62   y=0    width=41   height=66   xoffset=-9   yoffset=3    xadvance=45   page=0    chnl=0 \r\nchar id=37      x=44   y=301  width=58   height=57   xoffset=-9   yoffset=7    xadvance=59   page=0    chnl=0 \r\nchar id=38      x=102  y=301  width=57   height=57   xoffset=-9   yoffset=7    xadvance=58   page=0    chnl=0 \r\nchar id=39      x=226  y=405  width=24   height=32   xoffset=-9   yoffset=7    xadvance=30   page=0    chnl=0 \r\nchar id=40      x=103  y=0    width=31   height=65   xoffset=-9   yoffset=7    xadvance=33   page=0    chnl=0 \r\nchar id=41      x=134  y=0    width=32   height=65   xoffset=-9   yoffset=7    xadvance=33   page=0    chnl=0 \r\nchar id=42      x=85   y=405  width=37   height=38   xoffset=-9   yoffset=7    xadvance=39   page=0    chnl=0 \r\nchar id=43      x=408  y=358  width=44   height=45   xoffset=-9   yoffset=17   xadvance=52   page=0    chnl=0 \r\nchar id=44      x=166  y=405  width=27   height=33   xoffset=-9   yoffset=37   xadvance=29   page=0    chnl=0 \r\nchar id=45      x=350  y=405  width=34   height=25   xoffset=-9   yoffset=27   xadvance=38   page=0    chnl=0 \r\nchar id=46      x=324  y=405  width=26   height=26   xoffset=-9   yoffset=38   xadvance=29   page=0    chnl=0 \r\nchar id=47      x=289  y=0    width=41   height=63   xoffset=-9   yoffset=7    xadvance=37   page=0    chnl=0 \r\nchar id=48      x=0    y=301  width=44   height=57   xoffset=-9   yoffset=7    xadvance=45   page=0    chnl=0 \r\nchar id=49      x=96   y=244  width=33   height=57   xoffset=-9   yoffset=7    xadvance=45   page=0    chnl=0 \r\nchar id=50      x=129  y=244  width=42   height=57   xoffset=-9   yoffset=7    xadvance=45   page=0    chnl=0 \r\nchar id=51      x=171  y=244  width=41   height=57   xoffset=-9   yoffset=7    xadvance=45   page=0    chnl=0 \r\nchar id=52      x=212  y=244  width=46   height=57   xoffset=-9   yoffset=7    xadvance=45   page=0    chnl=0 \r\nchar id=53      x=258  y=244  width=41   height=57   xoffset=-9   yoffset=7    xadvance=45   page=0    chnl=0 \r\nchar id=54      x=299  y=244  width=43   height=57   xoffset=-9   yoffset=7    xadvance=45   page=0    chnl=0 \r\nchar id=55      x=342  y=244  width=44   height=57   xoffset=-9   yoffset=7    xadvance=45   page=0    chnl=0 \r\nchar id=56      x=386  y=244  width=44   height=57   xoffset=-9   yoffset=7    xadvance=45   page=0    chnl=0 \r\nchar id=57      x=430  y=244  width=43   height=57   xoffset=-9   yoffset=7    xadvance=45   page=0    chnl=0 \r\nchar id=58      x=382  y=358  width=26   height=47   xoffset=-9   yoffset=17   xadvance=29   page=0    chnl=0 \r\nchar id=59      x=286  y=301  width=28   height=53   xoffset=-9   yoffset=17   xadvance=29   page=0    chnl=0 \r\nchar id=60      x=452  y=358  width=42   height=44   xoffset=-9   yoffset=17   xadvance=52   page=0    chnl=0 \r\nchar id=61      x=122  y=405  width=44   height=35   xoffset=-9   yoffset=22   xadvance=52   page=0    chnl=0 \r\nchar id=62      x=0    y=405  width=42   height=44   xoffset=-9   yoffset=17   xadvance=52   page=0    chnl=0 \r\nchar id=63      x=473  y=244  width=38   height=57   xoffset=-9   yoffset=7    xadvance=40   page=0    chnl=0 \r\nchar id=64      x=370  y=0    width=61   height=62   xoffset=-9   yoffset=7    xadvance=66   page=0    chnl=0 \r\nchar id=65      x=434  y=71   width=50   height=57   xoffset=-9   yoffset=7    xadvance=50   page=0    chnl=0 \r\nchar id=66      x=0    y=130  width=42   height=57   xoffset=-9   yoffset=7    xadvance=47   page=0    chnl=0 \r\nchar id=67      x=42   y=130  width=47   height=57   xoffset=-9   yoffset=7    xadvance=49   page=0    chnl=0 \r\nchar id=68      x=89   y=130  width=49   height=57   xoffset=-9   yoffset=7    xadvance=53   page=0    chnl=0 \r\nchar id=69      x=138  y=130  width=39   height=57   xoffset=-9   yoffset=7    xadvance=43   page=0    chnl=0 \r\nchar id=70      x=177  y=130  width=38   height=57   xoffset=-9   yoffset=7    xadvance=42   page=0    chnl=0 \r\nchar id=71      x=215  y=130  width=49   height=57   xoffset=-9   yoffset=7    xadvance=52   page=0    chnl=0 \r\nchar id=72      x=264  y=130  width=47   height=57   xoffset=-9   yoffset=7    xadvance=54   page=0    chnl=0 \r\nchar id=73      x=484  y=71   width=25   height=57   xoffset=-9   yoffset=7    xadvance=31   page=0    chnl=0 \r\nchar id=74      x=311  y=130  width=34   height=57   xoffset=-9   yoffset=7    xadvance=36   page=0    chnl=0 \r\nchar id=75      x=345  y=130  width=44   height=57   xoffset=-9   yoffset=7    xadvance=47   page=0    chnl=0 \r\nchar id=76      x=389  y=130  width=39   height=57   xoffset=-9   yoffset=7    xadvance=42   page=0    chnl=0 \r\nchar id=77      x=428  y=130  width=56   height=57   xoffset=-9   yoffset=7    xadvance=63   page=0    chnl=0 \r\nchar id=78      x=0    y=187  width=49   height=57   xoffset=-9   yoffset=7    xadvance=55   page=0    chnl=0 \r\nchar id=79      x=49   y=187  width=54   height=57   xoffset=-9   yoffset=7    xadvance=56   page=0    chnl=0 \r\nchar id=80      x=103  y=187  width=42   height=57   xoffset=-9   yoffset=7    xadvance=46   page=0    chnl=0 \r\nchar id=81      x=431  y=0    width=57   height=61   xoffset=-9   yoffset=7    xadvance=56   page=0    chnl=0 \r\nchar id=82      x=145  y=187  width=45   height=57   xoffset=-9   yoffset=7    xadvance=48   page=0    chnl=0 \r\nchar id=83      x=190  y=187  width=42   height=57   xoffset=-9   yoffset=7    xadvance=45   page=0    chnl=0 \r\nchar id=84      x=232  y=187  width=45   height=57   xoffset=-9   yoffset=7    xadvance=44   page=0    chnl=0 \r\nchar id=85      x=277  y=187  width=47   height=57   xoffset=-9   yoffset=7    xadvance=52   page=0    chnl=0 \r\nchar id=86      x=324  y=187  width=51   height=57   xoffset=-9   yoffset=7    xadvance=49   page=0    chnl=0 \r\nchar id=87      x=375  y=187  width=65   height=57   xoffset=-9   yoffset=7    xadvance=65   page=0    chnl=0 \r\nchar id=88      x=440  y=187  width=48   height=57   xoffset=-9   yoffset=7    xadvance=48   page=0    chnl=0 \r\nchar id=89      x=0    y=244  width=48   height=57   xoffset=-9   yoffset=7    xadvance=46   page=0    chnl=0 \r\nchar id=90      x=48   y=244  width=48   height=57   xoffset=-9   yoffset=7    xadvance=47   page=0    chnl=0 \r\nchar id=91      x=166  y=0    width=30   height=65   xoffset=-9   yoffset=7    xadvance=33   page=0    chnl=0 \r\nchar id=92      x=330  y=0    width=40   height=63   xoffset=-9   yoffset=7    xadvance=37   page=0    chnl=0 \r\nchar id=93      x=196  y=0    width=29   height=65   xoffset=-9   yoffset=7    xadvance=33   page=0    chnl=0 \r\nchar id=94      x=42   y=405  width=43   height=42   xoffset=-9   yoffset=7    xadvance=52   page=0    chnl=0 \r\nchar id=95      x=384  y=405  width=42   height=23   xoffset=-9   yoffset=48   xadvance=39   page=0    chnl=0 \r\nchar id=96      x=250  y=405  width=30   height=29   xoffset=-9   yoffset=5    xadvance=31   page=0    chnl=0 \r\nchar id=97      x=314  y=301  width=41   height=47   xoffset=-9   yoffset=17   xadvance=43   page=0    chnl=0 \r\nchar id=98      x=0    y=71   width=44   height=59   xoffset=-9   yoffset=5    xadvance=47   page=0    chnl=0 \r\nchar id=99      x=355  y=301  width=40   height=47   xoffset=-9   yoffset=17   xadvance=41   page=0    chnl=0 \r\nchar id=100     x=44   y=71   width=44   height=59   xoffset=-9   yoffset=5    xadvance=47   page=0    chnl=0 \r\nchar id=101     x=395  y=301  width=43   height=47   xoffset=-9   yoffset=17   xadvance=44   page=0    chnl=0 \r\nchar id=102     x=88   y=71   width=36   height=59   xoffset=-9   yoffset=5    xadvance=34   page=0    chnl=0 \r\nchar id=103     x=124  y=71   width=44   height=59   xoffset=-9   yoffset=17   xadvance=47   page=0    chnl=0 \r\nchar id=104     x=168  y=71   width=42   height=59   xoffset=-9   yoffset=5    xadvance=46   page=0    chnl=0 \r\nchar id=105     x=408  y=71   width=26   height=58   xoffset=-9   yoffset=6    xadvance=30   page=0    chnl=0 \r\nchar id=106     x=24   y=0    width=38   height=70   xoffset=-9   yoffset=6    xadvance=30   page=0    chnl=0 \r\nchar id=107     x=210  y=71   width=41   height=59   xoffset=-9   yoffset=5    xadvance=43   page=0    chnl=0 \r\nchar id=108     x=251  y=71   width=25   height=59   xoffset=-9   yoffset=5    xadvance=30   page=0    chnl=0 \r\nchar id=109     x=438  y=301  width=57   height=47   xoffset=-9   yoffset=17   xadvance=61   page=0    chnl=0 \r\nchar id=110     x=0    y=358  width=42   height=47   xoffset=-9   yoffset=17   xadvance=46   page=0    chnl=0 \r\nchar id=111     x=42   y=358  width=46   height=47   xoffset=-9   yoffset=17   xadvance=47   page=0    chnl=0 \r\nchar id=112     x=276  y=71   width=44   height=59   xoffset=-9   yoffset=17   xadvance=47   page=0    chnl=0 \r\nchar id=113     x=320  y=71   width=44   height=59   xoffset=-9   yoffset=17   xadvance=47   page=0    chnl=0 \r\nchar id=114     x=88   y=358  width=34   height=47   xoffset=-9   yoffset=17   xadvance=35   page=0    chnl=0 \r\nchar id=115     x=122  y=358  width=37   height=47   xoffset=-9   yoffset=17   xadvance=39   page=0    chnl=0 \r\nchar id=116     x=251  y=301  width=35   height=53   xoffset=-9   yoffset=11   xadvance=35   page=0    chnl=0 \r\nchar id=117     x=159  y=358  width=41   height=47   xoffset=-9   yoffset=17   xadvance=46   page=0    chnl=0 \r\nchar id=118     x=200  y=358  width=44   height=47   xoffset=-9   yoffset=17   xadvance=42   page=0    chnl=0 \r\nchar id=119     x=244  y=358  width=54   height=47   xoffset=-9   yoffset=17   xadvance=54   page=0    chnl=0 \r\nchar id=120     x=298  y=358  width=42   height=47   xoffset=-9   yoffset=17   xadvance=41   page=0    chnl=0 \r\nchar id=121     x=364  y=71   width=44   height=59   xoffset=-9   yoffset=17   xadvance=42   page=0    chnl=0 \r\nchar id=122     x=340  y=358  width=42   height=47   xoffset=-9   yoffset=17   xadvance=41   page=0    chnl=0 \r\nchar id=123     x=225  y=0    width=32   height=64   xoffset=-9   yoffset=8    xadvance=33   page=0    chnl=0 \r\nchar id=124     x=0    y=0    width=24   height=71   xoffset=-9   yoffset=5    xadvance=30   page=0    chnl=0 \r\nchar id=125     x=257  y=0    width=32   height=64   xoffset=-9   yoffset=8    xadvance=33   page=0    chnl=0 \r\nchar id=126     x=280  y=405  width=44   height=29   xoffset=-9   yoffset=25   xadvance=52   page=0    chnl=0 \r\nkernings count=339\r\nkerning first=101 second=39 amount=-3\r\nkerning first=102 second=41 amount=3\r\nkerning first=102 second=45 amount=-2\r\nkerning first=76 second=63 amount=-2\r\nkerning first=86 second=81 amount=-1\r\nkerning first=79 second=90 amount=-1\r\nkerning first=102 second=93 amount=3\r\nkerning first=75 second=101 amount=-1\r\nkerning first=40 second=106 amount=6\r\nkerning first=84 second=109 amount=-4\r\nkerning first=84 second=110 amount=-4\r\nkerning first=84 second=112 amount=-4\r\nkerning first=86 second=117 amount=-2\r\nkerning first=114 second=120 amount=1\r\nkerning first=102 second=125 amount=2\r\nkerning first=86 second=100 amount=-3\r\nkerning first=65 second=42 amount=-3\r\nkerning first=68 second=46 amount=-3\r\nkerning first=86 second=113 amount=-3\r\nkerning first=75 second=74 amount=2\r\nkerning first=74 second=97 amount=-1\r\nkerning first=83 second=122 amount=-1\r\nkerning first=114 second=121 amount=2\r\nkerning first=84 second=103 amount=-5\r\nkerning first=76 second=42 amount=-5\r\nkerning first=81 second=86 amount=-1\r\nkerning first=98 second=120 amount=-1\r\nkerning first=82 second=89 amount=-1\r\nkerning first=65 second=85 amount=-1\r\nkerning first=88 second=71 amount=-1\r\nkerning first=80 second=88 amount=-1\r\nkerning first=80 second=101 amount=-2\r\nkerning first=84 second=99 amount=-5\r\nkerning first=86 second=83 amount=-1\r\nkerning first=89 second=74 amount=-2\r\nkerning first=82 second=59 amount=2\r\nkerning first=70 second=44 amount=-4\r\nkerning first=102 second=118 amount=1\r\nkerning first=75 second=118 amount=-2\r\nkerning first=82 second=67 amount=-1\r\nkerning first=119 second=44 amount=-2\r\nkerning first=42 second=74 amount=-4\r\nkerning first=81 second=65 amount=-1\r\nkerning first=76 second=90 amount=1\r\nkerning first=88 second=84 amount=1\r\nkerning first=84 second=86 amount=1\r\nkerning first=65 second=90 amount=1\r\nkerning first=75 second=121 amount=-2\r\nkerning first=112 second=120 amount=-1\r\nkerning first=107 second=45 amount=-3\r\nkerning first=80 second=87 amount=1\r\nkerning first=107 second=58 amount=2\r\nkerning first=71 second=84 amount=-1\r\nkerning first=114 second=100 amount=-1\r\nkerning first=70 second=65 amount=-3\r\nkerning first=87 second=44 amount=-3\r\nkerning first=112 second=102 amount=-1\r\nkerning first=84 second=81 amount=-2\r\nkerning first=114 second=99 amount=-1\r\nkerning first=42 second=99 amount=-2\r\nkerning first=89 second=112 amount=-3\r\nkerning first=82 second=111 amount=-1\r\nkerning first=89 second=83 amount=-1\r\nkerning first=88 second=67 amount=-1\r\nkerning first=99 second=89 amount=-2\r\nkerning first=80 second=113 amount=-2\r\nkerning first=86 second=79 amount=-1\r\nkerning first=117 second=39 amount=-2\r\nkerning first=80 second=97 amount=-2\r\nkerning first=76 second=81 amount=-2\r\nkerning first=80 second=44 amount=-8\r\nkerning first=69 second=87 amount=1\r\nkerning first=87 second=103 amount=-1\r\nkerning first=84 second=65 amount=-4\r\nkerning first=65 second=86 amount=-3\r\nkerning first=65 second=59 amount=2\r\nkerning first=114 second=116 amount=1\r\nkerning first=84 second=59 amount=-1\r\nkerning first=75 second=79 amount=-2\r\nkerning first=75 second=113 amount=-1\r\nkerning first=118 second=46 amount=-3\r\nkerning first=68 second=90 amount=-1\r\nkerning first=76 second=86 amount=-3\r\nkerning first=86 second=112 amount=-2\r\nkerning first=89 second=100 amount=-4\r\nkerning first=83 second=118 amount=-1\r\nkerning first=107 second=46 amount=2\r\nkerning first=86 second=101 amount=-3\r\nkerning first=86 second=74 amount=-2\r\nkerning first=42 second=100 amount=-2\r\nkerning first=107 second=111 amount=-1\r\nkerning first=102 second=44 amount=-3\r\nkerning first=67 second=81 amount=-1\r\nkerning first=90 second=84 amount=1\r\nkerning first=76 second=121 amount=-2\r\nkerning first=81 second=44 amount=-2\r\nkerning first=121 second=63 amount=-2\r\nkerning first=76 second=67 amount=-2\r\nkerning first=84 second=74 amount=-3\r\nkerning first=89 second=79 amount=-1\r\nkerning first=87 second=65 amount=-2\r\nkerning first=84 second=89 amount=1\r\nkerning first=116 second=63 amount=-1\r\nkerning first=114 second=118 amount=2\r\nkerning first=65 second=84 amount=-4\r\nkerning first=76 second=119 amount=-2\r\nkerning first=75 second=103 amount=-1\r\nkerning first=111 second=34 amount=-4\r\nkerning first=76 second=65 amount=1\r\nkerning first=112 second=97 amount=-1\r\nkerning first=102 second=46 amount=-3\r\nkerning first=76 second=84 amount=-3\r\nkerning first=75 second=88 amount=1\r\nkerning first=69 second=74 amount=2\r\nkerning first=123 second=106 amount=5\r\nkerning first=74 second=46 amount=-2\r\nkerning first=65 second=119 amount=-1\r\nkerning first=86 second=110 amount=-2\r\nkerning first=89 second=101 amount=-4\r\nkerning first=68 second=84 amount=-2\r\nkerning first=86 second=103 amount=-3\r\nkerning first=79 second=89 amount=-1\r\nkerning first=70 second=46 amount=-4\r\nkerning first=67 second=79 amount=-1\r\nkerning first=114 second=101 amount=-1\r\nkerning first=79 second=84 amount=-2\r\nkerning first=82 second=99 amount=-1\r\nkerning first=75 second=86 amount=1\r\nkerning first=84 second=121 amount=-3\r\nkerning first=107 second=99 amount=-1\r\nkerning first=84 second=67 amount=-2\r\nkerning first=88 second=46 amount=1\r\nkerning first=102 second=116 amount=1\r\nkerning first=84 second=113 amount=-5\r\nkerning first=114 second=113 amount=-1\r\nkerning first=42 second=113 amount=-2\r\nkerning first=65 second=116 amount=-1\r\nkerning first=79 second=65 amount=-1\r\nkerning first=106 second=106 amount=1\r\nkerning first=89 second=71 amount=-1\r\nkerning first=65 second=89 amount=-4\r\nkerning first=75 second=81 amount=-2\r\nkerning first=87 second=99 amount=-1\r\nkerning first=114 second=59 amount=2\r\nkerning first=75 second=100 amount=-1\r\nkerning first=89 second=113 amount=-4\r\nkerning first=68 second=65 amount=-1\r\nkerning first=118 second=97 amount=-1\r\nkerning first=114 second=44 amount=-4\r\nkerning first=117 second=34 amount=-2\r\nkerning first=84 second=111 amount=-5\r\nkerning first=42 second=103 amount=-2\r\nkerning first=89 second=44 amount=-4\r\nkerning first=84 second=84 amount=1\r\nkerning first=114 second=103 amount=-1\r\nkerning first=86 second=109 amount=-2\r\nkerning first=84 second=79 amount=-2\r\nkerning first=86 second=71 amount=-1\r\nkerning first=111 second=39 amount=-4\r\nkerning first=89 second=81 amount=-1\r\nkerning first=71 second=87 amount=-1\r\nkerning first=87 second=84 amount=1\r\nkerning first=70 second=74 amount=-2\r\nkerning first=86 second=44 amount=-5\r\nkerning first=90 second=121 amount=-1\r\nkerning first=80 second=100 amount=-2\r\nkerning first=116 second=100 amount=-1\r\nkerning first=111 second=120 amount=-1\r\nkerning first=89 second=103 amount=-4\r\nkerning first=87 second=111 amount=-1\r\nkerning first=76 second=89 amount=-3\r\nkerning first=65 second=67 amount=-1\r\nkerning first=80 second=46 amount=-8\r\nkerning first=75 second=71 amount=-2\r\nkerning first=102 second=119 amount=1\r\nkerning first=102 second=63 amount=2\r\nkerning first=75 second=44 amount=1\r\nkerning first=68 second=87 amount=-1\r\nkerning first=81 second=84 amount=-2\r\nkerning first=110 second=39 amount=-3\r\nkerning first=114 second=119 amount=2\r\nkerning first=111 second=102 amount=-1\r\nkerning first=67 second=67 amount=-1\r\nkerning first=84 second=101 amount=-5\r\nkerning first=86 second=46 amount=-6\r\nkerning first=75 second=87 amount=1\r\nkerning first=86 second=115 amount=-2\r\nkerning first=65 second=121 amount=-1\r\nkerning first=75 second=89 amount=1\r\nkerning first=34 second=114 amount=-1\r\nkerning first=103 second=106 amount=1\r\nkerning first=113 second=106 amount=2\r\nkerning first=75 second=59 amount=1\r\nkerning first=116 second=120 amount=1\r\nkerning first=84 second=120 amount=-4\r\nkerning first=82 second=74 amount=1\r\nkerning first=85 second=65 amount=-1\r\nkerning first=89 second=67 amount=-1\r\nkerning first=79 second=44 amount=-2\r\nkerning first=39 second=115 amount=-2\r\nkerning first=67 second=71 amount=-1\r\nkerning first=65 second=79 amount=-1\r\nkerning first=119 second=46 amount=-2\r\nkerning first=89 second=115 amount=-3\r\nkerning first=114 second=46 amount=-4\r\nkerning first=71 second=121 amount=-1\r\nkerning first=74 second=65 amount=-1\r\nkerning first=83 second=120 amount=-1\r\nkerning first=86 second=111 amount=-3\r\nkerning first=84 second=118 amount=-2\r\nkerning first=89 second=102 amount=-1\r\nkerning first=82 second=113 amount=-1\r\nkerning first=70 second=97 amount=-2\r\nkerning first=76 second=79 amount=-2\r\nkerning first=65 second=44 amount=2\r\nkerning first=121 second=39 amount=1\r\nkerning first=87 second=101 amount=-1\r\nkerning first=84 second=97 amount=-5\r\nkerning first=79 second=87 amount=-1\r\nkerning first=87 second=46 amount=-3\r\nkerning first=65 second=87 amount=-2\r\nkerning first=116 second=99 amount=-1\r\nkerning first=80 second=99 amount=-2\r\nkerning first=75 second=67 amount=-2\r\nkerning first=114 second=58 amount=2\r\nkerning first=87 second=113 amount=-1\r\nkerning first=102 second=121 amount=1\r\nkerning first=76 second=74 amount=2\r\nkerning first=99 second=84 amount=-2\r\nkerning first=76 second=87 amount=-1\r\nkerning first=102 second=58 amount=2\r\nkerning first=88 second=44 amount=2\r\nkerning first=89 second=110 amount=-3\r\nkerning first=81 second=89 amount=-1\r\nkerning first=110 second=34 amount=-3\r\nkerning first=65 second=74 amount=2\r\nkerning first=76 second=118 amount=-2\r\nkerning first=84 second=119 amount=-3\r\nkerning first=114 second=45 amount=-3\r\nkerning first=98 second=97 amount=-1\r\nkerning first=75 second=111 amount=-1\r\nkerning first=121 second=34 amount=1\r\nkerning first=90 second=74 amount=2\r\nkerning first=84 second=114 amount=-4\r\nkerning first=76 second=85 amount=-1\r\nkerning first=71 second=122 amount=-1\r\nkerning first=42 second=101 amount=-2\r\nkerning first=89 second=111 amount=-4\r\nkerning first=87 second=97 amount=-2\r\nkerning first=42 second=65 amount=-4\r\nkerning first=107 second=100 amount=-1\r\nkerning first=80 second=103 amount=-2\r\nkerning first=42 second=111 amount=-2\r\nkerning first=114 second=111 amount=-1\r\nkerning first=65 second=118 amount=-1\r\nkerning first=89 second=46 amount=-5\r\nkerning first=84 second=71 amount=-2\r\nkerning first=80 second=65 amount=-4\r\nkerning first=34 second=115 amount=-2\r\nkerning first=84 second=44 amount=-3\r\nkerning first=79 second=46 amount=-2\r\nkerning first=75 second=90 amount=1\r\nkerning first=89 second=84 amount=1\r\nkerning first=82 second=103 amount=-1\r\nkerning first=79 second=86 amount=-1\r\nkerning first=84 second=102 amount=-2\r\nkerning first=88 second=59 amount=2\r\nkerning first=75 second=116 amount=-1\r\nkerning first=68 second=88 amount=-1\r\nkerning first=68 second=86 amount=-1\r\nkerning first=39 second=114 amount=-1\r\nkerning first=116 second=45 amount=-3\r\nkerning first=84 second=87 amount=1\r\nkerning first=82 second=100 amount=-1\r\nkerning first=66 second=89 amount=-2\r\nkerning first=86 second=99 amount=-3\r\nkerning first=82 second=101 amount=-1\r\nkerning first=84 second=100 amount=-5\r\nkerning first=70 second=83 amount=-1\r\nkerning first=84 second=46 amount=-4\r\nkerning first=84 second=115 amount=-4\r\nkerning first=86 second=114 amount=-2\r\nkerning first=76 second=71 amount=-2\r\nkerning first=86 second=97 amount=-4\r\nkerning first=71 second=88 amount=-1\r\nkerning first=83 second=119 amount=-1\r\nkerning first=114 second=122 amount=1\r\nkerning first=107 second=101 amount=-1\r\nkerning first=81 second=87 amount=-1\r\nkerning first=75 second=99 amount=-1\r\nkerning first=86 second=84 amount=1\r\nkerning first=80 second=74 amount=-3\r\nkerning first=121 second=44 amount=-2\r\nkerning first=75 second=120 amount=1\r\nkerning first=81 second=46 amount=-3\r\nkerning first=74 second=44 amount=-2\r\nkerning first=65 second=71 amount=-1\r\nkerning first=111 second=97 amount=-1\r\nkerning first=84 second=83 amount=-1\r\nkerning first=88 second=81 amount=-1\r\nkerning first=80 second=111 amount=-2\r\nkerning first=89 second=99 amount=-4\r\nkerning first=102 second=59 amount=2\r\nkerning first=83 second=116 amount=-2\r\nkerning first=86 second=67 amount=-1\r\nkerning first=84 second=122 amount=-3\r\nkerning first=88 second=79 amount=-1\r\nkerning first=76 second=116 amount=-1\r\nkerning first=118 second=44 amount=-3\r\nkerning first=82 second=71 amount=-1\r\nkerning first=81 second=90 amount=-1\r\nkerning first=101 second=34 amount=-3\r\nkerning first=74 second=74 amount=-2\r\nkerning first=86 second=65 amount=-3\r\nkerning first=107 second=113 amount=-1\r\nkerning first=89 second=97 amount=-5\r\nkerning first=89 second=109 amount=-3\r\nkerning first=91 second=106 amount=6\r\nkerning first=114 second=102 amount=1\r\nkerning first=107 second=44 amount=2\r\nkerning first=66 second=84 amount=-2\r\nkerning first=75 second=119 amount=-1\r\nkerning first=71 second=86 amount=-1\r\nkerning first=107 second=59 amount=2\r\nkerning first=99 second=74 amount=2\r\nkerning first=121 second=46 amount=-3\r\nkerning first=84 second=58 amount=-1\r\nkerning first=89 second=114 amount=-3\r\nkerning first=82 second=84 amount=-1\r\nkerning first=88 second=74 amount=2\r\nkerning first=68 second=44 amount=-3\r\nkerning first=83 second=121 amount=-1\r\nkerning first=84 second=117 amount=-4\r\nkerning first=89 second=117 amount=-3\r\nkerning first=107 second=103 amount=-1\r\nkerning first=81 second=88 amount=-1\r\nkerning first=79 second=88 amount=-1\r\nkerning first=87 second=100 amount=-1\r\nkerning first=89 second=65 amount=-4\r\n"

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__engineMath_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forceGraph_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__planet_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__star_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__portal_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__debug_js__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = Level;















const LEVEL_STATE_SIMULATE = 0;
const LEVEL_STATE_READY = 1;
const LEVEL_STATE_ACTIVE = 2;
const MAX_STARS = 10;
const PI = 3.14159265359;
const SEGMENT_ANGLE = 2 * PI / 8;

function Level() {
	this.state = LEVEL_STATE_SIMULATE;

	this.forceGraph = new __WEBPACK_IMPORTED_MODULE_2__forceGraph_js__["a" /* ForceGraph */]();
	this.center = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
	this.radius = 0;
	this.starHeight = 2;

	this.numPlanets = 10;
	this.planets = [];
	this.numStars = 0;
	this.stars = [];
	this.entry = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](0, 0);
	this.entryDirection = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](0, 1);

	this.portal = new __WEBPACK_IMPORTED_MODULE_5__portal_js__["b" /* Portal */]();

	for (var i = 0; i < this.numPlanets; i++) {
		this.planets.push(new __WEBPACK_IMPORTED_MODULE_3__planet_js__["b" /* Planet */]());
	}
	for (var i = 0; i < MAX_STARS; i++) {
		var s = new __WEBPACK_IMPORTED_MODULE_4__star_js__["b" /* Star */]();
		s.visible = false;
		this.stars.push(s);
	}
}

Level.prototype = Object.assign(Object.create(Object.prototype), {
	isSimulating: function() {
		if (this.state === LEVEL_STATE_SIMULATE) {
			return true;
		}
		return false;
	},

	isReady: function() {
		if (this.state === LEVEL_STATE_READY) {
			return true;
		}
		return false;
	},

	isActive: function() {
		if (this.state === LEVEL_STATE_ACTIVE) {
			return true;
		}
		return false;
	},

	createNewLevel() {
		for (var i = 0; i < this.planets.length; i++) {
			var p = this.planets[i];
			p.visible = false;
		}

		this.numPlanets = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__engineMath_js__["b" /* getRandomInt */])(5, 10);
		for (var i = 0; i < this.numPlanets; i++) {
			var p = this.planets[i];
			p.visible = true;
			p.radius = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__engineMath_js__["c" /* getRandomFloat */])(0.5, 1.5);
			p.updateScale();
		}
		//set planet radius;
		//set numStars;
		this.numStars = 5;

		this.forceGraph.generateGraph(this.numPlanets, 15);
	},

	simulate: function() {
		if (this.isReady()) {
			return;
		}

		if (!this.forceGraph.done) {
			for (var i = 0; i < 10; i++) {
				if (this.forceGraph.simulateGraph()) {
					break;
				}
			}
		} else {
			this.state = LEVEL_STATE_READY;
		}

		var numPlanets = this.forceGraph.numNodes;
		var planets = this.planets;
		var nodes = this.forceGraph.nodes;
		for (var i = 0; i < numPlanets; i++) {
			planets[i].setFromNode(nodes[i]);
		}
		this.setBounds();
	},

	setBounds: function() {
		//@cleanup use forceGraph in stead of planets, we might not set planet position before rendering;
		var starHeight = 1.0;
		var maxX = Number.MIN_VALUE;
		var minX = Number.MAX_VALUE;
		var maxY = Number.MIN_VALUE;
		var minY = Number.MAX_VALUE;

		var radius = 0.0;
		var numPlanets = this.numPlanets;
		for (var i = 0; i < numPlanets; i++) {
			var p = this.planets[i];
			if (p) {
				var testX = p.position.x;
				var testY = p.position.y;
				if (testX > maxX) {
					maxX = testX;
				}
				if (testX < minX) {
					minX = testX;
				}
				if (testY > maxY) {
					maxY = testY;
				}
				if (testY < minY) {
					minY = testY;
				}
			}
		}

		var centerX = minX + ((maxX - minX) / 2);
		var centerY = minY + ((maxY - minY) / 2);

		this.center.set(centerX, centerY);

		for (var i = 0; i < numPlanets; i++) {
			var p = this.planets[i];
			if (p) {
				var tmp = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
				tmp.set(p.position.x, p.position.y);
				tmp.sub(this.center);
				var test = tmp.length() + p.radius;
				if (test > radius) {
					radius = test;
				}
			}
		}

		this.radius = radius + this.starHeight + 5;
	},

	getStarPos() {
		//get random pos based on planets

		var valid = true;
		var v = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](0, 0);
		do {
			var index = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__engineMath_js__["b" /* getRandomInt */])(0, this.numPlanets - 1);
			var p = this.planets[index];
			var angle = SEGMENT_ANGLE * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__engineMath_js__["b" /* getRandomInt */])(0, 8);
			v.set(0, this.starHeight + p.radius);
			v.rotateAround(new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](), angle);
			v.add(p.position);

			valid = true;
			for (var i = 0; i < this.numPlanets; i++) {
				if (i === index) {
					continue;
				}
				var p = this.planets[i];
				if (v.distanceTo(p.position) < this.starHeight + p.radius + 1) {
					valid = false;
					break;
				}
			}

			for (var i = 0; i < this.numStars; i++) {
				var s = this.stars[i];
				if (!s.visible) {
					continue;
				}
				if (v.distanceTo(s.position) < 2) {
					valid = false;
					break;
				}
			}

			//check other stars
		} while (valid === false);

		return v;
	},

	spawnLevel() {
		for (var i = 0; i < this.numStars; i++) {
			var s = this.stars[i];
			var v = this.getStarPos();
			s.position.x = v.x;
			s.position.y = v.y;
			s.visible = true;
		}

		while (true) {
			//get possible entry
			this.entry.set(this.center.x, this.center.y);
			this.entry.add(new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](this.radius, 0));
			this.entry.rotateAround(this.center, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__engineMath_js__["c" /* getRandomFloat */])(0, PI * 2))

			//get direction
			var index = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__engineMath_js__["b" /* getRandomInt */])(0, this.numPlanets - 1);
			var p = this.planets[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__engineMath_js__["b" /* getRandomInt */])(0, this.numPlanets - 1)];
			var test = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](0, 0);
			test.subVectors(p.position, this.entry);
			test.normalize();
			test.set(test.y, -test.x);
			test.multiplyScalar(p.radius + this.starHeight);
			test.add(p.position);

			//check if entry is valid

			var valid = true;
			var t = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
			var pv = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();

			for (var i = 0; i < this.numPlanets; i++) {
				if (i === index) {
					continue;
				}
				var p = this.planets[i];
				pv.subVectors(test, this.entry);
				t.subVectors(p.position, this.entry);
				var dot = pv.dot(t);
				dot = dot / pv.lengthSq();
				pv.multiplyScalar(dot);
				t.addVectors(this.entry, pv);

				if (t.distanceTo(p.position) < p.radius + this.starHeight + 1) {
					valid = false;
					break;
				}
			}

			if (valid) {
				break;
			}
		}

		this.entryDirection.subVectors(test, this.entry);

		this.state = LEVEL_STATE_ACTIVE;
	},

	debug: function() {
		//debug.drawCircle(this.center.x, this.center.y, 0, 0.25);
		__WEBPACK_IMPORTED_MODULE_6__debug_js__["d" /* debug */].drawCircle(this.center.x, this.center.y, this.radius);

		__WEBPACK_IMPORTED_MODULE_6__debug_js__["d" /* debug */].drawDot(this.entry.x, this.entry.y);
		var test = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
		test.addVectors(this.entryDirection, this.entry);
		__WEBPACK_IMPORTED_MODULE_6__debug_js__["d" /* debug */].drawLine(this.entry.x, this.entry.y, test.x, test.y);
	}
});


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fontParser_js__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["a"] = Menu;







function Menu() {
	__WEBPACK_IMPORTED_MODULE_0_three__["Group"].call(this);

	this.show = true;

	var titleString = 'Into Orbit';
	var titleGeometry = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fontParser_js__["c" /* getMesh */])('default', titleString);
	var title = new __WEBPACK_IMPORTED_MODULE_0_three__["Mesh"](titleGeometry, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].material.font);

	var scale = 2;
	var moveX = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fontParser_js__["d" /* getWidth */])('default', titleString) / 2 * scale;

	title.scale.set(scale, scale, scale);
	title.position.set(-moveX, 15, 0);
	this.add(title);

	var instructionString = '[Press space]';
	var instructionGeometry = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fontParser_js__["c" /* getMesh */])('default', instructionString);
	var instruction = new __WEBPACK_IMPORTED_MODULE_0_three__["Mesh"](instructionGeometry, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].material.font);

	scale = 1;
	moveX = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fontParser_js__["d" /* getWidth */])('default', instructionString) / 2 * scale;

	instruction.scale.set(scale, scale, scale);
	instruction.position.set(-moveX, -15, 0);
	this.add(instruction);
};

Menu.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0_three__["Group"].prototype), {

	showMenu: function() {
		this.show = true;
		for (var i = 0; i < this.children.length; i++) {
			var c = this.children[i];
			c.visible = true;
		}
	},
	hideMenu: function() {
		this.show = false;
		for (var i = 0; i < this.children.length; i++) {
			var c = this.children[i];
			c.visible = false;
		}
	}

});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__keyboard__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__debug_js__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = addShipToStore;
/* harmony export (immutable) */ __webpack_exports__["b"] = Ship;









const degToRad = 3.14159265359 / 180;
const radToDeg = 180 / 3.14159265359;
const SHIP_MAX_SPEED = 6;
const SHIP_MIN_SPEED = 3;
const SHIP_ACCELERATION = 3;

function addShipToStore(store) {
	var numFace = 1;
	var v = new Float32Array([
		0, 0.5, 0, -0.4, -0.5, 0,
		0.4, -0.5, 0
	]);
	var i = new Uint32Array([
		0, 1, 2
	]);
	var u = new Float32Array([
		0, 0.5, -0.4, -0.5,
		0.4, 0.5
	]);

	var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["BufferGeometry"]();
	geometry.addAttribute("position", new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](v, 3));
	geometry.addAttribute("uv", new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](u, 2));
	geometry.setIndex(new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](i, 1));

	var material = new __WEBPACK_IMPORTED_MODULE_0_three__["MeshBasicMaterial"]({
		color: 0xffffff
	});

	store.geometry.ship = geometry;
	store.material.ship = material;
}

function Ship() {
	__WEBPACK_IMPORTED_MODULE_0_three__["Mesh"].call(this, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].geometry.ship, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].material.ship);

	this.type = 'Ship';
	this.radius = 0.3;
	this.speed = SHIP_MAX_SPEED;
	this.direction = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"](0, 1, 0);
	this.planet = null;
	this.orbitRadius = 0;
	this.orbitAngle = 0;
	this.orbitRight = false;
	this.state = 'stop';
};

Ship.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0_three__["Mesh"].prototype), {

	simulate: function(level, dt) {
		/*
		if (this.planet != null) {
			debug.drawDot(this.planet.position.x, this.planet.position.y);
		}
		*/

		switch (this.state) {
			case 'stop':
				if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__keyboard__["d" /* isKeyDown */])(32)) {
					this.state = 'run';
				}
				break;
			case 'run':
				this.planet = this.getClosestPlanet(level);
				if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__keyboard__["d" /* isKeyDown */])(32)) {
					this.state = 'preOrbit';
				}
				break;
			case 'preOrbit':
				if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__keyboard__["e" /* isKeyUp */])(32)) {
					this.state = 'run';
				}
				break;
			case 'orbit':
				if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__keyboard__["e" /* isKeyUp */])(32)) {
					this.state = 'run';
				}
				break;
		}

		switch (this.state) {
			case 'stop':
				break;
			case 'run':
				if (this.speed < SHIP_MAX_SPEED) {
					this.speed += SHIP_ACCELERATION * dt;
				} else {
					this.speed = SHIP_MAX_SPEED;
				}
				this.position.addScaledVector(this.direction, this.speed * dt);
				break;
			case 'preOrbit':
				if (this.speed > SHIP_MIN_SPEED) {
					this.speed -= (SHIP_ACCELERATION * 2) * dt;
				} else {
					this.speed = SHIP_MIN_SPEED;
				}
				this.position.addScaledVector(this.direction, this.speed * dt);

				if (!this.planet) {
					break;
				}


				var delta = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
				delta.subVectors(this.planet.position, this.position);

				var anglePlanet = delta.angle() * radToDeg;
				var tmp = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
				tmp.copy(this.direction);
				var angleDirection = tmp.angle() * radToDeg

				if (Math.abs(anglePlanet - angleDirection) > 90) {
					var planetDirection = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
					planetDirection.subVectors(this.position, this.planet.position);
					this.orbitRadius = planetDirection.length();
					this.orbitAngle = planetDirection.angle();

					var shipRight = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](this.direction.y, -this.direction.x);
					if (shipRight.dot(planetDirection) > 0.0) {
						this.orbitRight = true;
					} else {
						this.orbitRight = false;
					}

					this.state = 'orbit';
				}
				break;
			case 'orbit':
				var angleSpeed = this.speed / this.orbitRadius;
				if (this.orbitRight) {
					this.orbitAngle += angleSpeed * dt;
				} else {
					this.orbitAngle -= angleSpeed * dt;
				}

				var nextPosition = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"]();
				nextPosition.x = this.orbitRadius * Math.cos(this.orbitAngle);
				nextPosition.y = this.orbitRadius * Math.sin(this.orbitAngle);
				nextPosition.add(this.planet.position);
				this.direction.subVectors(nextPosition, this.position);
				this.direction.normalize()

				this.position.copy(nextPosition);
				break;
		}

		/*
		if (isKeyDown(38)) {
			this.speed += 0.3;
			if (this.speed > 2) {
				this.speed = 2;
			}
		} else {
			this.speed -= 0.6;
			if (this.speed < 0) {
				this.speed = 0;
			}
		}

		if (isKeyDown(37)) {
			this.direction.applyAxisAngle(new Vector3(0, 0, 1), degToRad * 3);
		}

		if (isKeyDown(39)) {
			this.direction.applyAxisAngle(new Vector3(0, 0, 1), -degToRad * 3);
		}
		*/


		if (this.direction.x >= 0) {
			this.rotation.z = -this.direction.angleTo(new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"](0, 1, 0));
		} else {
			var a = this.direction.angleTo(new __WEBPACK_IMPORTED_MODULE_0_three__["Vector3"](0, 1, 0));
			this.rotation.z = a;
		}



		for (var i = 0; i < level.numStars; i++) {
			var s = level.stars[i];
			if (!s.visible) {
				continue;
			}
			if (this.position.distanceTo(s.position) < s.radius + this.radius) {
				s.visible = false;
			}
		}

		if (this.position.distanceTo(level.portal.position) < this.radius + level.portal.radius) {
			console.log('Entered portal!');
		}
	},

	getClosestPlanet(level) {
		var closest = Number.MAX_VALUE;
		var current = -1;

		for (var i = 0; i < level.numPlanets; i++) {
			var p = level.planets[i];
			var delta = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
			delta.subVectors(p.position, this.position);
			var dot = delta.dot(this.direction);
			if (dot > -0.75) {
				var distance = delta.lengthSq();
				if (distance < closest) {
					closest = distance;
					current = i;
				}
			}
		}
		if (current !== -1) {
			return level.planets[current];
		}
		return null;
	}

});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__engineMath_js__ = __webpack_require__(9);
/* harmony export (immutable) */ __webpack_exports__["a"] = addTargetToStore;
/* harmony export (immutable) */ __webpack_exports__["b"] = Target;








const PI = 3.14159265359;

function addTargetToStore(store) {
	var numSegments = 64;
	var radPerSegment = 2 * PI / numSegments;
	var thickness = 1.25;

	var v = new Float32Array(numSegments * 3 * 2);
	var dir = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"](0, 1);

	for (var i = 0; i < numSegments * 2; i++) {
		dir.set(0, 1);
		dir.rotateAround({
			x: 0,
			y: 0
		}, -radPerSegment * i);

		v[i * 3] = dir.x;
		v[i * 3 + 1] = dir.y;
		v[i * 3 + 2] = 0;
	}

	var indice = new Uint32Array(numSegments * 3 * 2);
	for (var i = 0; i < numSegments - 1; i++) {
		indice[i * 6] = i;
		indice[i * 6 + 1] = i + 1;
		indice[i * 6 + 2] = numSegments + i;

		indice[i * 6 + 3] = numSegments + i;
		indice[i * 6 + 4] = i + 1;
		indice[i * 6 + 5] = numSegments + i + 1;
	}

	indice[indice.length - 6] = numSegments - 1;
	indice[indice.length - 5] = 0;
	indice[indice.length - 4] = numSegments * 2 - 1;
	indice[indice.length - 3] = 0;
	indice[indice.length - 2] = numSegments;
	indice[indice.length - 1] = numSegments * 2 - 1;


	var vertexId = new Float32Array(numSegments * 2);
	var index = 0;
	for (var i = 0; i < numSegments * 2; i++) {
		vertexId[i] = index;
		index += 1
	}

	var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["BufferGeometry"]();
	geometry.addAttribute("position", new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](v, 3));
	geometry.addAttribute("positionDelta", new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](v, 3));
	geometry.addAttribute("vertexId", new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](vertexId, 1));
	geometry.setIndex(new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](indice, 1));


	var material = new __WEBPACK_IMPORTED_MODULE_0_three__["ShaderMaterial"]({
		side: __WEBPACK_IMPORTED_MODULE_0_three__["DoubleSide"],
		uniforms: {
			color: {
				value: new __WEBPACK_IMPORTED_MODULE_0_three__["Color"](0xffffff)
			},
			radius: {
				value: 5
			},
			thickness: {
				value: 0.15
			},
			segments: {
				value: 64.0
			}
		},
		vertexShader: `
			precision mediump float;
			precision mediump int;

			uniform float radius;
			uniform float thickness;
			uniform float segments;

			attribute float vertexId;
			attribute vec3 positionDelta;

			void main()	{

				vec3 newPos;

				if(vertexId < segments){
					newPos = position * (radius + thickness);
				} else {
					newPos = position * radius;
				}

				gl_Position = projectionMatrix * modelViewMatrix * vec4( newPos, 1.0 );
			}`,
		fragmentShader: `
			precision mediump float;
			precision mediump int;

			uniform vec3 color;

			void main()	{
				gl_FragColor = vec4( color, 1.0);
			}`
	});
	store.geometry.target = geometry;
	store.material.target = material;
}

function Target() {
	__WEBPACK_IMPORTED_MODULE_0_three__["Mesh"].call(this, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].geometry.target, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].material.target);

	this.type = 'Target';
	this.visible = false;
};

Target.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0_three__["Mesh"].prototype), {
	updateTarget: function(ship) {
		if (!ship || !ship.planet) {
			this.visible = false;
			return;
		}
		var planet = ship.planet;
		var delta = new __WEBPACK_IMPORTED_MODULE_0_three__["Vector2"]();
		delta.subVectors(planet.position, ship.position);
		var dot = delta.dot(ship.direction);
		dot = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__engineMath_js__["a" /* lerp */])(0, 0.5, dot / 4);

		this.position.copy(planet.position);
		__WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].material.target.uniforms.radius.value = planet.radius + dot;
		this.visible = true;
	}

});


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fontTexture; });
/* unused harmony export fontTextureB */

var fontTexture = 'data:image/png;base64,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';
var fontTextureB = 'data:image/png;base64,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';

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_sui_fnt__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_sui_fnt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__data_sui_fnt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fontParser_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ship_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__target_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__planet_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__star_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__portal_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__keyboard_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__forceGraph_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__level_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__store_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__menu_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__debug_js__ = __webpack_require__(2);
































__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__fontParser_js__["a" /* loadFont */])('default', __WEBPACK_IMPORTED_MODULE_2__data_sui_fnt___default.a);

//html
var element = document.createElement('div');
element.style.position = "absolute";
element.style.padding = "1px";
element.style.top = "0";
element.style.bottom = "0";
element.style.left = "0";
element.style.right = "0";
element.style.overflow = "hidden";
document.body.appendChild(element);

var scene = new __WEBPACK_IMPORTED_MODULE_0_three__["Scene"]();
var camera;
var renderer = new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderer"]({
	antialias: true
});
var textureLoader = new __WEBPACK_IMPORTED_MODULE_0_three__["TextureLoader"]();

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__ship_js__["a" /* addShipToStore */])(__WEBPACK_IMPORTED_MODULE_12__store_js__["a" /* store */]);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__planet_js__["a" /* addPlanetToStore */])(__WEBPACK_IMPORTED_MODULE_12__store_js__["a" /* store */]);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__debug_js__["a" /* addDebugToStore */])(__WEBPACK_IMPORTED_MODULE_12__store_js__["a" /* store */]);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__star_js__["a" /* addStarToStore */])(__WEBPACK_IMPORTED_MODULE_12__store_js__["a" /* store */]);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__target_js__["a" /* addTargetToStore */])(__WEBPACK_IMPORTED_MODULE_12__store_js__["a" /* store */]);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__fontParser_js__["b" /* addFontToStore */])(__WEBPACK_IMPORTED_MODULE_12__store_js__["a" /* store */]);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__portal_js__["a" /* addPortalToStore */])(__WEBPACK_IMPORTED_MODULE_12__store_js__["a" /* store */]);

var hudCamera;
var hud = new __WEBPACK_IMPORTED_MODULE_0_three__["Scene"]();
var menu = new __WEBPACK_IMPORTED_MODULE_13__menu_js__["a" /* Menu */]();
hud.add(menu);

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__debug_js__["b" /* initDebug */])(scene);

var forceGraph = new __WEBPACK_IMPORTED_MODULE_10__forceGraph_js__["a" /* ForceGraph */]();
var level = new __WEBPACK_IMPORTED_MODULE_11__level_js__["a" /* Level */]();
for (var i = 0; i < level.planets.length; i++) {
	scene.add(level.planets[i]);
}
for (var i = 0; i < level.stars.length; i++) {
	scene.add(level.stars[i]);
}
scene.add(level.portal);


var ship = new __WEBPACK_IMPORTED_MODULE_4__ship_js__["b" /* Ship */]();
var star = new __WEBPACK_IMPORTED_MODULE_7__star_js__["b" /* Star */]();
var target = new __WEBPACK_IMPORTED_MODULE_5__target_js__["b" /* Target */]();
scene.add(target);

function init() {

	level.createNewLevel();

	scene.add(ship);
	star.position.x = 3;

	setViewportSize(element.clientWidth, element.clientHeight);
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__keyboard_js__["a" /* addKeyboard */])(renderer.domElement);
	element.appendChild(renderer.domElement);
	renderer.domElement.focus();
	renderer.autoClear = false;


	console.log(hud);
}

function animate() {
	//setup
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__debug_js__["c" /* resetDebug */])();
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__keyboard_js__["b" /* updateKeyboardState */])();

	if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__keyboard_js__["c" /* isKeyPress */])(32) && menu.show == true) {
		menu.hideMenu();
	}


	//update
	if (level.isSimulating()) {
		level.simulate();
	} else if (level.isReady()) {
		level.spawnLevel();

		ship.position.set(level.entry.x, level.entry.y, 0);
		ship.direction.set(level.entryDirection.x, level.entryDirection.y, 0);
		ship.direction.normalize();

	} else {

	}

	level.debug();

	ship.simulate(level, 0.01666);
	target.updateTarget(ship);

	setCameraToShip(camera, ship);
	//render
	renderer.clear();
	renderer.render(scene, camera);
	renderer.clearDepth();
	renderer.render(hud, hudCamera);
	requestAnimationFrame(animate);
}

function setCameraToShip(camera, ship) {
	camera.position.set(ship.position.x, ship.position.y, 10);
}

function setCameraToLevel(camera, level) {
	camera.position.set(level.center.x, level.center.y, 10);
}

function setViewportSize(width, height) {
	var h = 20; //
	var w = width / height * h;
	camera = new __WEBPACK_IMPORTED_MODULE_0_three__["OrthographicCamera"](-w, w, h, -h, 1, 1000);
	hudCamera = new __WEBPACK_IMPORTED_MODULE_0_three__["OrthographicCamera"](-w, w, h, -h, 1, 1000);
	//camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 200);
	//camera.matrix.lookAt(new Vector3(5, 5, 5), new Vector3(0, 0, 0), new Vector3(0, 1, 0));
	camera.position.z = 10;
	hudCamera.position.z = 10;
	renderer.setSize((width - 2), (height - 2));
}



function main() {
	window.onresize = function() {
		setViewportSize(element.clientWidth, element.clientHeight);
	};

	init();
	animate();
}

main();


/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_js__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = addPortalToStore;
/* harmony export (immutable) */ __webpack_exports__["b"] = Portal;






function addPortalToStore(store) {
	var v = new Float32Array([
		0.0, 0.0, 0.0,
		0.0, 0.5, 0.0,
		0.14695, 0.20225, 0.0,
		0.47553, 0.15451, 0.0,
		0.23776, -0.07725, 0.0,
		0.29389, -0.40451, 0.0,
		0.0, -0.25, 0.0, -0.29389, -0.40451, 0.0, -0.23776, -0.07725, 0.0, -0.47553, 0.15451, 0.0, -0.14695, 0.20225, 0.0,
	]);
	var i = new Uint32Array([
		0, 2, 1,
		0, 3, 2,
		0, 4, 3,
		0, 5, 4,
		0, 6, 5,
		0, 7, 6,
		0, 8, 7,
		0, 9, 8,
		0, 10, 9,
		0, 1, 10
	]);
	var u = new Float32Array([
		0.0, 0.0,
		0.0, 0.5,
		0.14695, 0.20225,
		0.47553, 0.15451,
		0.23776, -0.07725,
		0.29389, -0.40451,
		0.0, -0.25, -0.29389, -0.40451, -0.23776, -0.07725, -0.47553, 0.15451, -0.14695, 0.20225,
	]);

	var geometry = new __WEBPACK_IMPORTED_MODULE_0_three__["BufferGeometry"]();
	geometry.addAttribute("position", new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](v, 3));
	geometry.addAttribute("uv", new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](u, 2));
	geometry.setIndex(new __WEBPACK_IMPORTED_MODULE_0_three__["BufferAttribute"](i, 1));

	var material = new __WEBPACK_IMPORTED_MODULE_0_three__["MeshBasicMaterial"]({
		color: 0xff0000
	});
	store.geometry.portal = geometry;
	store.material.portal = material;
}

function Portal() {
	__WEBPACK_IMPORTED_MODULE_0_three__["Mesh"].call(this, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].geometry.portal, __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].material.portal);

	this.type = 'Portal';
	this.radius = 0.5;
};

Portal.prototype = Object.assign(Object.create(__WEBPACK_IMPORTED_MODULE_0_three__["Mesh"].prototype), {

});


/***/ })
],[16]);