const accesskey = "bXz_ApXEKnZNHnjxE_rwYChSbgE1tfXX0DgQ4fvhJPo";

const search = document.getElementById("search");
const button = document.getElementById("button");
const imgcontainer = document.querySelector(".grid");
const show = document.querySelector(".showmore");

let page = 1;
let searchQuery = "";

async function fetchImages(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=${accesskey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
}

function renderImages(results) {
    results.forEach((result) => {
        const outer = document.createElement("div");
        outer.classList.add("bg-white", "rounded-lg", "shadow-lg", "overflow-hidden", "cursor-pointer", "mb-8");
        
        const img = document.createElement("img");
        img.src = result.urls.small;
        img.alt = result.alt_description;
        img.classList.add("w-full", "h-60", "object-cover");

        const a = document.createElement("a");
        a.href = result.links.html;
        a.target = "_blank";
        a.textContent = result.alt_description || "View Image";
        a.classList.add("block", "p-4", "text-lg", "font-semibold", "text-gray-800");

        outer.appendChild(img);
        outer.appendChild(a);
        imgcontainer.appendChild(outer);
    });
    page++;

    if (page > 1) {
        show.style.display = "block";
    }
}

async function loadDefaultImages() {
    const results = await fetchImages('human');
    renderImages(results);
}

async function searchImages() {
    searchQuery = search.value.trim();
    if (!searchQuery) return;

    page = 1;
    imgcontainer.innerHTML = "";
    const results = await fetchImages(searchQuery);
    renderImages(results);
}

async function loadMoreImages() {
    if(searchQuery==""){
        const results = await fetchImages("human beings");
        renderImages(results);
    }else{
        const results = await fetchImages(searchQuery);
        renderImages(results);
    }
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    searchImages();
});

show.addEventListener("click", (e) => {
    e.preventDefault();
    loadMoreImages();
});

loadDefaultImages();
