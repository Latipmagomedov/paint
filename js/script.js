let
    canv = document.querySelector('.canvas'),
    clearBtn = document.querySelector('.canvas-nav__clear'),
    saveBtn = document.querySelector('.canvas-nav__save'),
    replayBtn = document.querySelector('.canvas-nav__replay'),
    rangeInp = document.querySelector('.canvas-nav__range'),
    rangeInpTwo = document.querySelector('.canvas-nav__range'),
    rangeValue = document.querySelector('.range-value'),
    colorInp = document.querySelector('.canvas-nav__color'),
    bgColorInp = document.querySelector('.canvas-nav__bgColor'),
    ctx = canv.getContext('2d'),
    isMouseDown = false,
    coords = [],
    radius = rangeInp.value;


rangeInp.addEventListener('input', function () {

    radius = rangeInp.value;
    rangeValue.textContent = rangeInp.value;
    ctx.lineWidth = radius * 2;

});


bgColorInp.addEventListener('input', function () {
    ctx.fillStyle = bgColorInp.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})

colorInp.addEventListener('input', function () {
    ctx.strokeStyle = colorInp.value;
    // ctx.fillStyle = colorInp.value;
})


canv.width = window.innerWidth;
canv.height = window.innerHeight;

// code

canv.addEventListener('mousedown', function () {
    isMouseDown = true;
})

canv.addEventListener('mouseup', function () {
    isMouseDown = false;
    ctx.beginPath()
    coords.push('mouseup');
})

canv.addEventListener('mousemove', function (e) {

    if (isMouseDown) {

        coords.push([
            e.clientX,
            e.clientY,
            ctx.strokeStyle = colorInp.value,
            radius
        ]);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.strokeStyle = colorInp.value;

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2);
        ctx.lineWidth = radius * 2;
        ctx.fillStyle = colorInp.value;

        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);

    }

});


function save() {
    localStorage.setItem('coords', JSON.stringify(coords));
}

function clear() {
    ctx.fillStyle = bgColorInp.value
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.beginPath();
    // ctx.fillStyle = 'white';
}

function replay() {
    let
        timer = setInterval(function () {
            if (!coords.length) {
                clearInterval(timer);
                ctx.beginPath();
                return;
            }

            let
                crd = coords.shift(),
                e = {
                    clientX: crd['0'],
                    clientY: crd['1'],
                    colorLocal: crd['2'],
                    rangeLocal: crd['3'],
                };

            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            ctx.strokeStyle = e.colorLocal;

            ctx.beginPath();

            ctx.arc(e.clientX, e.clientY, e.rangeLocal, 0, Math.PI * 2);
            ctx.lineWidth = e.rangeLocal * 2;



            ctx.fillStyle = e.colorLocal;

            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);


        }, 10);


}


document.addEventListener('keydown', function (e) {
    if (e.keyCode == 83) {
        //save
        save();
    }

    if (e.keyCode == 82) {
        //replay
        coords = JSON.parse(localStorage.getItem('coords'));
        clear();
        replay();
    }

    if (e.keyCode == 67) {
        //clear
        clear();
    }
})

clearBtn.addEventListener('click', () => {
    clear();
    console.log('Clear');
});

saveBtn.addEventListener('click', () => {
    save();
    console.log('Save');
})

replayBtn.addEventListener('click', () => {
    console.log('Replay')
    coords = JSON.parse(localStorage.getItem('coords'));

    clear();
    replay();

})