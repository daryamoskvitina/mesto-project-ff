import { initialCards } from './cards.js';
import '../pages/index.css';
import { createCard, deleteCard, likeCard } from '../components/card.js';
import { openModal, closeModal, closePopupOnEscape } from '../components/modal.js';

const editProfileBtn = document.querySelector('.profile__edit-button');
const addProfileBtn = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');
const popupNew = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const cardName = document.querySelector('[name="place-name"]'); 
const cardUrl = document.querySelector('[name="link"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formElementProfile = document.querySelector('[name="edit-profile"]');
const formElementCard = document.querySelector('[name="new-place"]');
const popupImg = document.querySelector('.popup__image');
const popupCap = document.querySelector('.popup__caption');
const popupTypeImg = document.querySelector('.popup_type_image');

// Открытие попапа редактирования имени и информации о себе
editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
  openModal(popupEdit);
});

// Открытие попапа добавления карточек
addProfileBtn.addEventListener('click', () => {
  openModal(popupNew);
});

// Открытие попапов с изображениями
placesList.addEventListener('click', (event) => {
  if (event.target.classList.contains('card__image')) {
    openPopupImage(event.target);
  }
});

function openPopupImage(img) {
  const cardElement = img.closest('.card');
  const cardDescription = cardElement.querySelector('.card__title');
  const description = cardDescription;

  openModal(popupTypeImg);
  popupImg.src = img.src;
  popupImg.alt = description.textContent;
  popupCap.textContent = description.textContent;
};

// Обработчик событий для закрытия попапов через кнопку "крестик" и по оверлей 
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')){
      closeModal(popup);
    }
  });
});

//@todo: Вывести карточки на страницу
function renderCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardContent = createCard(cardData, deleteCard, likeCard, openPopupImage);
    placesList.appendChild(cardContent);
  });
};

renderCards(initialCards);

// Обработчик «отправки» формы редактирования данных
function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameInputNew = nameInput.value;
  const jobInputNew = jobInput.value;

  profileTitle.textContent = nameInputNew;
  profileDescr.textContent = jobInputNew;

  closeModal(popupEdit);
};

// Прикрепляем обработчик к форме:
formElementProfile.addEventListener('submit', handleFormSubmit);

function handleFormSubmitCards (evt) {
  evt.preventDefault();
  const cardData = {
  name: cardName.value,
  link: cardUrl.value};
  const cardElement = createCard(cardData, deleteCard, likeCard, openPopupImage, closePopupOnEscape);
  placesList.prepend(cardElement); 
  formElementCard.reset(); 

  closeModal(popupNew);
};

formElementCard.addEventListener('submit', handleFormSubmitCards);