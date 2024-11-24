// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardItemTemplate = cardTemplate.content.querySelector('.places__item');
const placesList = document.querySelector('.places__list');

// @todo: Функция создания и удаления карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardItemTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

//@todo: Вывести карточки на страницу
function renderCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardContent = createCard(cardData, deleteCard);
    placesList.appendChild(cardContent);
  });
}

renderCards(initialCards);