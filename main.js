'use strict';

window.addEventListener('load', () => {

    const controlsId = [
        'canvas', 'draw', 'del', 'add', 'alias', 'val', 'data'
    ];
    const controller = new Controller(controlsId);
    controller.activateListeners();

});