const loadMoreBtn = document.getElementById('load-more');
const backBtn = document.getElementById('back-btn');
const grid = document.getElementById('meme-grid');

const extraMemes = [
  { img: '📚', caption: 'Когда в списке литературы 50 источников, а ты открыл только первый' },
  { img: '💤', caption: 'Сон? Не, не слышал. У меня лаба горит!' },
  { img: '💸', caption: 'Стипендия: приходит и сразу исчезает' },
  { img: '🎮', caption: 'Один часик в игру — и вот уже 5 утра' }
];

let loadedCount = 0;

// Функция проверки состояния кнопок при старте и после действий
function updateButtonsState() {
  const cards = grid.children.length;
  
  // Если мемов <= 4 (стартовые), кнопку "НАЗАД" скрываем
  if (cards <= 4) {
    backBtn.classList.add('hidden');
  } else {
    backBtn.classList.remove('hidden');
  }

  // Если все доп. мемы загружены, меняем текст и стиль кнопки "ЕЩЁ"
  if (loadedCount >= extraMemes.length) {
    loadMoreBtn.textContent = 'БОЛЬШЕ НЕТ СИЛ';
    loadMoreBtn.style.backgroundColor = '#444';
    loadMoreBtn.style.cursor = 'not-allowed';
  } else {
    loadMoreBtn.textContent = 'ЕЩЁ СТРАДАНИЙ';
    loadMoreBtn.style.backgroundColor = '#ffa31a';
    loadMoreBtn.style.cursor = 'pointer';
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  updateButtonsState();
});

loadMoreBtn.addEventListener('click', () => {
  const toLoad = extraMemes.slice(loadedCount, loadedCount + 2);
  
  toLoad.forEach(meme => {
    const card = document.createElement('div');
    card.className = 'meme-card';
    
    // Теперь только эмодзи, без API
    card.innerHTML = `
      <div class="img-placeholder">\${meme.img}</div>
      <p class="caption">\${meme.caption}</p>
    `;
    grid.appendChild(card);
  });

  loadedCount += toLoad.length;
  updateButtonsState(); // Обновляем состояние кнопок после добавления
});

backBtn.addEventListener('click', () => {
  const cards = Array.from(grid.children);
  // Удаляем последние 2 карточки
  if (cards.length > 4) {
    cards[cards.length - 1].remove();
    cards[cards.length - 2].remove();
    loadedCount -= 2;
    
    updateButtonsState(); // Обновляем состояние кнопок после удаления
  }
});
