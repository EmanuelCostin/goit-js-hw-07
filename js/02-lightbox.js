import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-image');
const closeModal = document.querySelector('.close');
let currentIndex = 0;

// Function to create gallery items
function createGalleryItem(item, index) {
  const listItem = document.createElement('li');
  listItem.classList.add('gallery__item');

  const imageLink = document.createElement('a');
  imageLink.classList.add('gallery__link');
  imageLink.href = '#';

  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = item.preview;
  image.alt = item.description;

  // Add click event listener to open modal
  imageLink.addEventListener('click', (event) => {
    event.preventDefault();
    currentIndex = index;
    openModal();
    updateModalImage();
  });

  imageLink.appendChild(image);
  listItem.appendChild(imageLink);

  return listItem;
}

// Populate gallery
galleryItems.forEach((item, index) => {
  const galleryItem = createGalleryItem(item, index);
  galleryList.appendChild(galleryItem);
});

// Open modal
function openModal() {
  modal.style.display = 'block';
}

// Close modal
function closeModalHandler() {
  modal.style.display = 'none';
}

// Update modal image
function updateModalImage() {
  modalImg.src = galleryItems[currentIndex].original;
}

// Close modal when click on close button
closeModal.addEventListener('click', closeModalHandler);

// Close modal when press ESC key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModalHandler();
  }
});

// Change image on arrow key press
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateModalImage();
  } else if (event.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateModalImage();
  }
});

// Create and append arrows to modal
const prevArrow = document.createElement('button');
prevArrow.classList.add('prev');
prevArrow.innerHTML = '&lt;';
prevArrow.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateModalImage();
});

const nextArrow = document.createElement('button');
nextArrow.classList.add('next');
nextArrow.innerHTML = '&gt;';
nextArrow.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateModalImage();
});

modal.appendChild(prevArrow);
modal.appendChild(nextArrow);

// Move next arrow to the right
modal.appendChild(nextArrow);
modal.insertBefore(nextArrow, modalImg.nextSibling);
