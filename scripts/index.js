// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
const cardTemplateContent = cardTemplate.content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания и удаления карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardContent = cardElement.content;

  const cardImage = cardContent.querySelector('.card__image');
  const cardTitle = cardContent.querySelector('.card__title');
  const deleteButton = cardContent.querySelector('.card__delete-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;


  deleteButton.addEventListener('click', function() {
    this.closest('.card').remove();
  });

  return cardContent;
}

function deleteCard(cardTemplate) {
  cardTemplate.remove();
}

//@todo: Вывести карточки на страницу
function renderCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardContent = createCard(cardData, deleteCard);
    placesList.appendChild(cardContent);
  });
}

renderCards(initialCards);