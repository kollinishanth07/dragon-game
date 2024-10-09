let score = 0;
let cross = true;

const audio = new Audio('music.mp3');
const audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    console.log("Key pressed: ", e.key);
    const dino = document.querySelector('.dino');
    const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

    if (e.key === 'ArrowUp') {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    if (e.key === 'ArrowRight') {
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.key === 'ArrowLeft') {
        dino.style.left = (dinoX - 112) + "px";
    }
};

setInterval(() => {
    const dino = document.querySelector('.dino');
    const gameOver = document.querySelector('.gameOver');
    const obstacle = document.querySelector('.obstacle');

    const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    const dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    const ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    const oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    const offsetX = Math.abs(dx - ox);
    const offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            const aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            const newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 500);
    }
}, 10);

function updateScore(score) {
    let scoreCont = document.querySelector('#scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}

