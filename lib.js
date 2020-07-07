'use strict';


class Record {

    constructor() {
        this._alias = '';
        this._val = 0.0;
    }

}


class DataManager {

    constructor() {
        this._records = [];
    }

    addRecord(record) {
        this._records.push(record);
    }

    clearRecords() {
        this._records.splice(0, this._records.length);
    }

}


class DrawManager {

    constructor(canvas) {
        this._width = canvas.width;
        this._height = canvas.height;
        this._context = canvas.getContext('2d');
    }

    drawTest1() {
        this._context.fillRect(0, 0, 100, 100);
        this._context.strokeRect(120, 120, 100, 100);
        this._context.clearRect(0, 0, 50, 50);
    }

    drawLine(x1, y1, x2, y2) {
        this._context.moveTo(x1, y1);
        this._context.lineTo(x2, y2);
    }
  
    drawTest2() {
        this._context.beginPath();
        this._context.lineWidth = 3;
        this._context.strokeStyle = 'darkcyan';
        this.drawLine(400, 30, 475, 135);
        this.drawLine(475, 135, 325, 135);
        this.drawLine(325, 135, 400, 30);
        this._context.closePath();
        this._context.stroke();
    }

    drawSector(x, y, r, a1, a2, color1, color2) {
        let ar1 = (Math.PI / 180) * a1;
        let ar2 = (Math.PI / 180) * a2;
        this._context.beginPath();
        this._context.lineWidth = 1;
        this._context.fillStyle = color1;
        this._context.strokeStyle = color2;
        this._context.arc(x, y, r, ar1, ar2);
        this._context.lineTo(x, y);
        this._context.closePath();
        this._context.fill();
        this._context.stroke();
    }

    drawTest3() {
        this.drawSector(400, 250, 75, 0, 45, 'green', 'yellow');
        this.drawSector(400, 250, 75, 45, 135, 'red', 'yellow');
        this.drawSector(400, 250, 75, 135, 210, 'purple', 'yellow');
    }

    drawText(font, color, text, x, y) {
        this._context.font = font;
        this._context.fillStyle = color;
        this._context.fillText(text, x, y);
    }

    drawTest4() {
        this.drawText('14px Consolas', 'navy', 'Пример круговой диаграммы', 360, 200);
        this.drawText('16px Verdana', 'darkcyan', 'Демонстрация графических примитивов', 20, 400);
    }

    clearCanvas() {
        this._context.clearRect(0, 0, this._width, this._height);
    }

}


class Controller {

    constructor(controlsId) {
        this._canvas = document.getElementById(controlsId[0]);
        this._draw = document.getElementById(controlsId[1]);
        this._del = document.getElementById(controlsId[2]);
        this._add = document.getElementById(controlsId[3]);
        this._alias = document.getElementById(controlsId[4]);
        this._val = document.getElementById(controlsId[5]);
        this._data = document.getElementById(controlsId[6]);

        this._drawManager = new DrawManager(this._canvas);
        this._data.disabled = true;
    }

    activateListeners() {
        this._draw.addEventListener('click', () => { 
            this._drawManager.drawTest1(); 
            this._drawManager.drawTest2();
            this._drawManager.drawTest3();
            this._drawManager.drawTest4();
        });
        this._del.addEventListener('click', () => { 
            this._drawManager.clearCanvas();
            this._alias.value = '';
            this._val.value = '';
            this._data.value = ''; 
        });
        this._add.addEventListener('click', () => {
            let alias = this._alias.value;
            let val = this._val.value;
            if (alias === '' || val === '') {
                alert('Вы не ввели всех исходных данных!');
            } else {
                let val_num = parseFloat(val);
                let out_str = `${alias} - ${val_num}`;
                this._data.value += out_str + '\n';
                this._alias.value = '';
                this._val.value = '';
                this._alias.focus();
            }
        });
    }

}
