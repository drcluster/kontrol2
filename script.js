$(document).ready(function() {
    const symbols = [
        '🔥', '🌟', '🍀', '💎', '🎵', '❤️',
        '🌈', '☀️', '🌙', '⭐', '🍎', '🎈',
        '🐱', '🐶', '🐰', '🐸', '🐵', '🦄'
    ];

    const doubledSymbols = symbols.concat(symbols);
    const shuffledSymbols = shuffleArray(doubledSymbols);

    const gameBoard = $('#game-board');
    let firstCard = null;
    let secondCard = null;
    let preventClick = false;

    shuffledSymbols.forEach(symbol => {
        const card = $('<div class="card"></div>');
        const front = $('<div class="front">' + symbol + '</div>');
        const back = $('<div class="back">?</div>');
        card.append(front).append(back);
        gameBoard.append(card);

        card.click(function() {
            if (preventClick || card.hasClass('revealed') || card.hasClass('matched')) return;

            card.addClass('revealed');
            if (!firstCard) {
                firstCard = card;
            } else if (!secondCard) {
                secondCard = card;
                preventClick = true;

                if (firstCard.find('.front').text() === secondCard.find('.front').text()) {
                    firstCard.addClass('matched');
                    secondCard.addClass('matched');
                    resetCards();
                } else {
                    setTimeout(() => {
                        firstCard.removeClass('revealed');
                        secondCard.removeClass('revealed');
                        resetCards();
                    }, 1000);
                }
            }
        });
    });

    function resetCards() {
        firstCard = null;
        secondCard = null;
        preventClick = false;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
