const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let score = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
         jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
        //Subindo
        position += 20;
        dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
     if (cactusPosition < -60) {
        clearInterval(leftInterval);
        background.removeChild(cactus);
        score += 1;
        document.querySelector('.score').innerHTML = score;
       } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
        //Game Over
        clearInterval(leftInterval);
        document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1><div class="score-container"><h2>Score: <span class="score">'+score+'</span></h2><button class="restart-button" onClick="window.location.reload()">Recomeçar</button></div>'
       } else {
        cactusPosition -= 10;
       cactus.style.left = cactusPosition + 'px';
       }
    }, 20);

    setTimeout(createCactus, randomTime);
}


createCactus();
document.addEventListener('keyup', handleKeyUp);
document.querySelector('.score-container').style.display = 'none';

