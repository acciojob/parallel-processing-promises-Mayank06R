// script.js

const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download an image and return a promise
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image from ${url}`));
    img.src = url;
  });
}

// Main function to download all images using Promise.all
function downloadImages() {
  // Show loading spinner
  loadingDiv.style.display = 'block';

  // Hide any previous errors or outputs
  errorDiv.style.display = 'none';
  output.innerHTML = '';

  // Use Promise.all to download all images in parallel
  Promise.all(images.map(image => downloadImage(image.url)))
    .then(images => {
      // Hide loading spinner after successful download
      loadingDiv.style.display = 'none';

      // Append each image to the output div
      images.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(error => {
      // Hide loading spinner if an error occurs
      loadingDiv.style.display = 'none';

      // Display error message in the error div
      errorDiv.style.display = 'block';
      errorDiv.textContent = error.message;
    });
}

// Attach event listener to the button to start downloading images when clicked
btn.addEventListener('click', downloadImages);