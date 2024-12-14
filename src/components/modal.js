export { openModal, closeModal, closePopupOnEscape };

// Функция открытия попапов
function openModal(popup) {
  popup.classList.add('popup_is-opened', 'popup_is-animated');
  document.addEventListener('keydown', closePopupOnEscape);
};

// Функция закрытия попапов
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEscape);
}

// Функция закрытия попапов через клавишу Escape
function closePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened'); // Находим любой открытый попап
    if (openedPopup) {
      closeModal(openedPopup);
    }
  };
};