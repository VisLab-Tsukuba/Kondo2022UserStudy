// (C) Kazuo Misue (2020-2022)

window.addEventListener("load", () => {
    new App().init();
}, false);

import $ from "jquery";
import { Canvas } from "./canvas";

export class App {

    private taskId: number | undefined = undefined;
    private filename: string | undefined = undefined;

    private cvsWidth: number = 200;
    private cvsHeight: number = 200;
    private cvs: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private canvas: Canvas;

    private trialNum: number = 3;
    private answerCounter: number = 0;

    private resTimeList: number[] = [];
    private resResultList: number[] = [];

    constructor() {
        this.cvs = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.cvs.getContext("2d");
        this.cvs.width = this.cvsWidth;
        this.cvs.height = this.cvsHeight;
        this.canvas = new Canvas(this.ctx, [this.cvsWidth, this.cvsHeight]);

        const taskIdOp = $("#taskid").attr("value");
        if (taskIdOp == undefined) return;

        this.taskId = parseInt(taskIdOp);
        console.log("taskId:" + this.taskId);

        const trialNumOp = $("#trialnum").attr("value");
        if (trialNumOp != undefined) {
            this.trialNum = parseInt(trialNumOp);
        }
        console.log("taskId:" + this.trialNum);

        this.filename = $("#filename").attr("value");
        console.log("filename:" + this.filename);

        // Task 1の時にはキャンバス上でのクリックを取得する
        if (this.taskId == 1) {
            const me = this;
            this.cvs.addEventListener("click", function (e) {
                const rect = this.getBoundingClientRect();
                const point = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };
                console.log(`clock on (${point.x},${point.y})`);
                me.recordPos(point);
            });
        }

    }

    init(): void {
        // console.log("start");
        const me = this;

        if (this.taskId == undefined) {
            console.error("ERROR: taskId undefined.");
            return;
        }

        this.setupUI(this.taskId);
        this.canvas.draw();

    }

    setupUI(taskId: number) {
        console.log("setupUI");
        const me = this;

        if (taskId == 2) {
            const buttonS = <HTMLElement>document.getElementById("button_yes");
            buttonS.onclick = function () {
                me.answerYes();
            };

            const buttonR = <HTMLElement>document.getElementById("button_no");
            buttonR.onclick = function () {
                me.answerNo();
            };

            window.addEventListener("keydown", (e) => {
                const key = String.fromCharCode(e.which);
                switch (key) {
                    case "N":
                        me.answerNo();
                        break;
                    case "Y":
                        me.answerYes();
                        break;
                }
            });
        }

    }

    recordPos(point: { x: number, y: number }) {
        console.log(`pos=(${point.x}, ${point.y})`);
        const date = new Date();
        this.resTimeList.push(date.getTime());
        this.resResultList.push(point.x);
        if (++this.answerCounter >= this.trialNum) {
            this.writeData();
        }
    }

    answerYes() {
        console.log("answered yes");
        const date = new Date();
        this.resTimeList.push(date.getTime());
        this.resResultList.push(1);
        if (++this.answerCounter >= this.trialNum) {
            this.writeData();
        }
    }

    answerNo() {
        console.log("answered no");
        const date = new Date();
        this.resTimeList.push(date.getTime());
        this.resResultList.push(0);
        if (++this.answerCounter >= this.trialNum) {
            this.writeData();
        }
    }

    writeData() {
        const me = this;

        $.ajax({
            async: true,
            type: "POST",
            url: `./task0${me.taskId}-ans.php`,
            data: {
                res_time: this.resTimeList,
                res_result: this.resResultList,
            },
        })
            .done(function (re) {
                if (me.taskId == 1) {
                    window.location.href = `./task02-1.php`;
                } else if (me.taskId == 2) {
                    window.location.href = `./survey-1.php`;
                } else {
                    window.location.href = "./end-2.php";
                }
            })
            .fail(function (xhr, status, error) {
                //通信失敗
                console.log("error");
                console.log("status=" + status);
                console.log("xhr=" + xhr.status);
            })
            .always(function (xhr, status) {
            });
    }

}
