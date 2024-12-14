export { openModal, closeModal, openPopupImage, closePopupOnEscape }

const popupImg = document.querySelector('.popup__image');
const popupCap = document.querySelector('.popup__caption');
const popupTypeImg = document.querySelector('.popup_type_image');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Функция открытия попапов
function openModal(popup, nameValue = '', jobValue = '') {
  popup.classList.add('popup_is-opened', 'popup_is-animated');
  if (popup === popupEdit) {
    nameInput.value = nameValue;
    jobInput.value = jobValue;
  }
};

function openPopupImage(img) {
  const cardElement = img.closest('.card');
  const cardDescription = cardElement.querySelector('.card__title');
  const description = cardDescription;

  popupTypeImg.classList.add('popup_is-opened', 'popup_is-animated');
  popupImg.src = img.src;
  popupImg.alt = description.textContent;
  popupCap.textContent = description.textContent;
};

// Функция закрытия попапов
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
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