function handleAnswer(answer) {
    const additionalContent = document.getElementById('additional-content');
    additionalContent.innerHTML = ''; // Очищаем дополнительный контент перед добавлением нового

    if (answer === 'Да') {
        additionalContent.innerHTML = `
            <div class="question">Как вы считаете, ему есть прощение?</div>
            <div class="buttons">
                <button onclick="handleFollowUpAnswer('Да')">Да</button>
                <button onclick="handleFollowUpAnswer('Не знаю')">Не знаю</button>
                <button onclick="handleFollowUpAnswer('Зависит от его поведения!')">Зависит от его поведения!</button>
            </div>
        `;
    } else if (answer === 'Да, но чуть-чуть') {
        additionalContent.innerHTML = `
            <div class="question">Просто замечательно! Поверьте, Мария, он пошутил так совсем не специально... Может простим его?</div>
            <div class="buttons">
                <button onclick="handleFollowUpAnswer('Хорошо')">Хорошо</button>
                <button onclick="handleFollowUpAnswer('Я подумаю')">Я подумаю</button>
                <button onclick="handleFollowUpAnswer('Зависит от его поведения!')">Зависит от его поведения!</button>
            </div>
        `;
    }
}

function handleFollowUpAnswer(answer) {
    // Логика для перенаправления на новую страницу
    if (answer === 'Да' || answer === 'Не знаю' || answer === 'Зависит от его поведения!'|| answer === 'Хорошо' || answer === 'Я подумаю'|| answer === 'Зависит от его поведения!') {
        window.location.href = 'new_page.html';
    } else {
        alert('Вы выбрали: ' + answer);
    }
}
