interact('.upper-canvas').resizable({
  edges: {
	top   : true,       // Use pointer coords to check for resize.
	left  : false,      // Disable resizing from left edge.
	bottom: '.resize-s',// Resize if pointer target matches selector
	right : handleEl    // Resize if pointer target is the given Element
  }
});