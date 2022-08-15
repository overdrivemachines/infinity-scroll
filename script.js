const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'fqL0CaHVUzQJIizi6yIgKW7qtVD4NMCEwN6rqiAa7DA';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // After the initial load of 5 images, the next time load 30 images
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}


// Helper Function to SetAttributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}


// Create Elements For Links & Photos,Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Upslash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular
      });
    if (photo.alt_description != null) {
      setAttributes(img, {
        alt: photo.alt_description,
        title: photo.alt_description
      });
    }

    // Event Listner, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both inside .imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch(error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page.
// If so, load more photos
window.addEventListener('scroll', () => {

  if ((window.innerHeight + window.scrollY > document.body.offsetHeight - 1000) && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
