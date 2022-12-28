// (C) Kazuo Misue (2022)
var Canvas = /** @class */ (function () {
    function Canvas(ctx, canvasSize) {
        this.ctx = ctx;
        this.cvsWidth = canvasSize[0];
        this.cvsHeight = canvasSize[1];
    }
    // draw(graph: Graph, clock: number) {
    Canvas.prototype.draw = function () {
        // キャンバスをグレーで塗りつぶす
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(0, 0, this.cvsWidth, this.cvsHeight);
        // 黒の枠を描く
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.cvsWidth, this.cvsHeight);
        this.ctx.stroke();
    };
    return Canvas;
}());
export { Canvas };
//# sourceMappingURL=canvas.js.map