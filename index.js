const accessKey = "";
// enter api key here

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResultsElement = document.querySelector(".search-results");
const showMoreButtonElement = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
// functions
async function searchImages() {
  inputData = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const result = await fetch(url);
  //   we get raw data from result,needs to be transformed to json
  const data = await result.json();
  //   console.log(data);
  if (page === 1) {
    searchResultsElement.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    // to open in new page,_blank
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    searchResultsElement.appendChild(imageWrapper);
  });
  //   console.log(results);

  if (page > 1) {
    showMoreButtonElement.style.display = block;
  }
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});
