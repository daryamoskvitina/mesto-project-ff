import { initialCards } from './cards.js';
import '../pages/index.css';
import { createCard, deleteCard, likeCard } from '../components/card.js';
import { openModal, closeModal, openPopupImage, closePopupOnEscape } from '../components/modal.js';

const editProfileBtn = document.querySelector('.profile__edit-button');
const addProfileBtn = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');
const popupContainer = document.body;
const popupNew = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const cardName = document.querySelector('[name="place-name"]'); 
const cardUrl = document.querySelector('[name="link"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formElementProfile = document.querySelector('[name="edit-profile"]');
const formElementCard = document.querySelector('[name="new-place"]');

// Открытие попапа редактирования имени и информации о себе
editProfileBtn.addEventListener('click', () => {
  openModal(popupEdit, profileTitle.textContent, profileDescr.textContent);
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

// Обработчик событий для закрытия попапов через кнопку "крестик"
popupContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__close')) {
    // Находим родительский попап, используя closest()
    const popup = event.target.closest('.popup');
    if (popup) {
      closeModal(popup);
    }
  }
});

// Закрытие попапа по оверлей 
popups.forEach(popup => { 
  popup.addEventListener('click', (event) => { 
    const openedPopup = event.currentTarget; 
    const popup = event.target.closest('.popup__content'); 
    if (!popup) { 
      closeModal(openedPopup); 
    } 
  });
});

popupContainer.addEventListener('keydown', closePopupOnEscape);

//@todo: Вывести карточки на страницу
function renderCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardContent = createCard(cardData, deleteCard, likeCard);
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

  popupEdit.classList.remove('popup_is-opened');
};

// Прикрепляем обработчик к форме:
formElementProfile.addEventListener('submit', handleFormSubmit);

function handleFormSubmitCards (evt) {
  evt.preventDefault();
  const newCard = {
  name: cardName.value,
  link: cardUrl.value};
  addNewCard(placesList, newCard);
  formElementCard.reset(); 

  popupNew.classList.remove('popup_is-opened');
};

formElementCard.addEventListener('submit', handleFormSubmitCards);

// Добавление новых карточек
function addNewCard(placesList, newCard) {
  const cardTemplate = document.querySelector('#card-template');
  const cardItemTemplate = cardTemplate.content.querySelector('.places__item');
  const cardElement = cardItemTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');

  cardImage.src = newCard.link;
  cardImage.alt = newCard.name;
  cardTitle.textContent = newCard.name;

  placesList.prepend(cardElement);

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  likeBtn.addEventListener('click', () => {
    likeCard(likeBtn);
  });
};

