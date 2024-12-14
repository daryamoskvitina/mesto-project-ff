export { createCard, deleteCard, likeCard };

// @todo: Функция создания и удаления карточки
function createCard(cardData, deleteCard, likeCard, openPopupImage) {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector('#card-template');
  const cardItemTemplate = cardTemplate.content.querySelector('.places__item');
  const cardElement = cardItemTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  likeBtn.addEventListener('click', () => {
    likeCard(likeBtn);
  });

  cardImage.addEventListener('click', () => {
    openPopupImage(cardImage);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(likeBtn) {
  likeBtn.classList.toggle('card__like-button_is-active');
}
