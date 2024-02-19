
import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-image');
const closeModal = document.querySelector('.close');


function createGalleryItem(item) {
  const listItem = document.createElement('li');
  listItem.classList.add('gallery__item');

  const imageLink = document.createElement('a');
  imageLink.classList.add('gallery__link');
  imageLink.href = '#';

  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = item.preview;
  image.alt = item.description;


  imageLink.addEventListener('click', (event) => {
    event.preventDefault();
    modal.style.display = 'block';
    modalImg.src = item.original;
  });

  imageLink.appendChild(image);
  listItem.appendChild(imageLink);

  return listItem;
}


galleryItems.forEach(item => {
  const galleryItem = createGalleryItem(item);
  galleryList.appendChild(galleryItem);
});


closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});


window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
