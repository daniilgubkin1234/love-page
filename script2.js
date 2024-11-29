document.addEventListener('DOMContentLoaded', function() {
    const message = document.getElementById('love-message');
    const firstPart = 'Манечка, я люблю тебя бесконечно! Ты мой мир, мой свет и моя жизнь.';
    const secondPart = 'Извини, что порой бываю так нетактичен, душа моя.';
    const signature = document.getElementById('signature');
    message.innerText = '';
    signature.innerText = '';

    let messageIndex = 0;
    let part = 1;

    function showNextCharacter() {
        let text = part === 1 ? firstPart : secondPart;

        if (messageIndex < text.length) {
            const char = text[messageIndex];
            if (char === ' ') {
                message.innerHTML += '&nbsp;';
            } else {
                message.innerHTML += char;
            }
            messageIndex++;
            setTimeout(showNextCharacter, 100); // Задержка для плавного отображения текста
        } else if (part === 1) {
            // Переход ко второй части текста
            message.innerHTML += '<br>'; // Добавляем разрыв строки
            part = 2;
            messageIndex = 0;
            setTimeout(showNextCharacter, 500); // Небольшая задержка перед началом вывода второй части
        } else {
            setTimeout(moveMessageAndDrawHeart, 1000); // Задержка перед началом рисования сердца
        }
    }

    function moveMessageAndDrawHeart() {
        // Перемещаем сообщение вверх
        message.style.position = 'absolute';
        message.style.top = '10px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';

        // Создаем холст для рисования сердца
        const canvas = document.createElement('canvas');
        canvas.width = 1000; // Увеличенная ширина холста
        canvas.height = 1000; // Увеличенная высота холста
        canvas.style.position = 'absolute';
        canvas.style.top = '50%';
        canvas.style.left = '50%';
        canvas.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let t = 0;

        function drawHeart() {
            ctx.fillStyle = '#ff4d4d';

            if (t <= Math.PI * 2) {
                const scale = 25; // Масштаб сердца
                const centerX = canvas.width / 2; // Центр по X
                const centerY = canvas.height / 2 + 50; // Центр по Y, смещен немного вниз для корректного отображения
                const x = scale * (16 * Math.pow(Math.sin(t), 3));
                const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

                ctx.beginPath();
                ctx.arc(centerX + x, centerY + y, 3, 0, Math.PI * 2); // Смещаем центр сердца, чтобы оно помещалось в холст
                ctx.fill();

                t += 0.01; // Уменьшили шаг для более плавного рисования
                requestAnimationFrame(drawHeart);
            } else {
                fillHeart(); // После окончания рисования контура сердца начинаем заполнять его
            }
        }

        let alpha = 0.01;

        function fillHeart() {
            const scale = 25;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2 + 50;

            ctx.fillStyle = '#ff4d4d';

            if (alpha <= 1) {
                ctx.globalAlpha = alpha; // Используем альфа-канал для плавного появления сердца
                ctx.beginPath();
                for (let t = 0; t <= Math.PI * 2; t += 0.01) {
                    const x = scale * (16 * Math.pow(Math.sin(t), 3));
                    const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                    if (t === 0) {
                        ctx.moveTo(centerX + x, centerY + y);
                    } else {
                        ctx.lineTo(centerX + x, centerY + y);
                    }
                }
                ctx.closePath();
                ctx.fill();

                alpha += 0.01; // Плавное увеличение прозрачности
                requestAnimationFrame(fillHeart);
            } else {
                setTimeout(showSignature, 1000); // Печатаем подпись после завершения заполнения сердца
            }
        }

        drawHeart();
    }

    function showSignature() {
        const signatureText = 'Д.';
        let signatureIndex = 0;

        function typeSignature() {
            if (signatureIndex < signatureText.length) {
                signature.innerText += signatureText[signatureIndex];
                signatureIndex++;
                setTimeout(typeSignature, 100); // Задержка для печати подписи
            }
        }

        typeSignature();
    }

    showNextCharacter();
});
