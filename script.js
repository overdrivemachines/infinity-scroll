const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'fqL0CaHVUzQJIizi6yIgKW7qtVD4NMCEwN6rqiAa7DA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  console.log('image loaded');
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log('ready =', ready);
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
  console.log('total images', totalImages)
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
    // console.log(photosArray);
    displayPhotos();
  } catch(error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page.
// If so, load more photos
window.addEventListener('scroll', () => {
  // console.log(window.scrollY);

  if ((window.innerHeight + window.scrollY > document.body.offsetHeight - 1000) && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
