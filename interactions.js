
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;


const cardName = 'teddy';
const cardWidth = 50;
const cardHeight = 72;
const cardPadding = 10;


let imagesCanvas = {};



function canvasApp() {

    drawScreen();

    function drawScreen() {
        ctx.fillStyle = 'rgb(235, 173, 132)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }


    // drawGate();


    function drawGate() {

        x = 200, y = canvasHeight - 100, length = 40, angle = 0, dlt = -2;

        (function animate() {


            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            ctx.beginPath();
            lineToAngle(ctx, x, y, length, angle);
            ctx.lineWidth = 10;
            ctx.stroke();

            angle += dlt;
            if (angle < -90 || angle > 0) dlt = -dlt;

            requestAnimationFrame(animate);
        })();

        function lineToAngle(ctx, x1, y1, length, angle) {

            angle *= Math.PI / 180;

            var x2 = x1 + length * Math.cos(angle),
                y2 = y1 + length * Math.sin(angle);

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);

            return { x: x2, y: y2 };
        }

    }

    // createInitialWaitingListScene({ name: cardName });

    function calculateQueueLength() {


    }


    moveTeddy({
        name: cardName,
        frame: 0,
        frames: 100,
        xFrom: 0,
        xTo: 50,
        yFrom: 0,
        yTo: 50
    });


    function moveTeddy(params) {



        let name = params.name;
        if (imagesCanvas[name] === undefined) {
            imagesCanvas[name] = document.createElement('canvas');
        }
        imagesCanvas[name].width = cardWidth;
        imagesCanvas[name].height = cardHeight;

        let image = document.getElementById(name);
        let imageCtx = imagesCanvas[name].getContext('2d');
        imageCtx.clearRect(0, 0, cardWidth, cardHeight);
        imageCtx.drawImage(image, 0, 0, cardWidth, cardHeight);


        ctx.drawImage(imagesCanvas[name], 0, 0, 200, 200, getX(params), getY(params), 200, 200);


        console.log(imagesCanvas[name]);
        //drw queue leftside
        let posY = 130
        for (i = 0; i < 5; i++) {
            ctx.drawImage(imagesCanvas[name], 50, (i * cardHeight) + posY);

        }


        //drw queue rightside
        for (j = 0; j < 5; j++) {
            ctx.drawImage(imagesCanvas[name], canvasWidth - cardPadding - cardWidth, (j * cardHeight) + posY);

        }

        // fiunction to remove from right List 




        if (params.frame < params.frames) {
            params.frame = params.frame + 1;
            window.requestAnimationFrame(drawScreen);
            window.requestAnimationFrame(moveTeddy.bind(null, params))
        }


        function getX(params) {
            let distance = params.xTo - params.xFrom;
            let steps = params.frames;
            let progress = params.frame;
            return distance / steps * progress;
        }

        function getY(params) {
            let distance = params.yTo - params.yFrom;
            let steps = params.frames;
            let progress = params.frame;
            return distance / steps * progress;
        }

    }

    // function removeFromList(teddyCount) {

    //     const teddyCount = teddyCount - 2
    //     return teddyCount


    // }

    // setTimeout(removeFromList, 2000)


}

window.onload = canvasApp;





