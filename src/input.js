export default class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouse = { x: 0, y: 0, clicked: false }; 
    this.tile = { x: 0, y: 0 };
    this.tileSize = 64;
    this._bind();
  }

  _bind() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      this.mouse.x = (e.clientX - rect.left) * scaleX;
      this.mouse.y = (e.clientY - rect.top) * scaleY;
      this.tile.x = Math.floor(this.mouse.x / this.tileSize);
      this.tile.y = Math.floor(this.mouse.y / this.tileSize);
    });

    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.mouse.clicked = true;
      }
    });

    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  consumeClick() {
    const wasClicked = this.mouse.clicked;
    this.mouse.clicked = false;
    return wasClicked;
  }
}
