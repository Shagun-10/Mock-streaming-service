fetch("data/data.json")
  .then(res => res.json())
  .then(data => {

    const favoritesSet = new Set();
    const recommended = document.getElementById("recommended");
    const favorite = document.getElementById("favorite");
    const collection = document.getElementById("collection");

    data.movies.forEach((movie, index) => {

      const card = document.createElement("div");
      card.classList.add("movie-card");
      card.dataset.id = movie.id;

      card.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <div class="movie-info">
         <h4>${movie.title}</h4>
        <p>${movie.genre} • ${movie.year}</p>
         <p>${movie.time}</p>
         </div>

        <button class="heart">❤</button>
        `;
        
        const heart = card.querySelector(".heart");
        heart.addEventListener("click", (e) => {
        e.stopPropagation();
        if (favoritesSet.has(movie.id)) {
        favoritesSet.delete(movie.id);
        heart.style.color = "white";
        const favCards = favorite.querySelectorAll(".movie-card");
        favCards.forEach(f => {
if (f.dataset.id == movie.id) {
favorite.removeChild(f);
}
        });
        } else {
        favoritesSet.add(movie.id);
        heart.style.color = "red";
        const clone = card.cloneNode(true);
        clone.dataset.id = movie.id;
        favorite.appendChild(clone);
        }
        });
      
      if (index < 10) {
        recommended.appendChild(card);
      } else {
        collection.appendChild(card);
      }
    });
  });

document.querySelectorAll(".row-wrapper").forEach(wrapper => {
  const row = wrapper.querySelector(".movies-row");
  wrapper.querySelector(".left").addEventListener("click", () => {
    row.scrollBy({ left: -300, behavior: "smooth" });
  });
  wrapper.querySelector(".right").addEventListener("click", () => {
    row.scrollBy({ left: 300, behavior: "smooth" });
  });
});

const seeAllBtn = document.getElementById("seeAllBtn");
const collectionRow = document.getElementById("collection");
let expanded = false;

seeAllBtn.addEventListener("click", () => {
  if (!expanded) {
    collectionRow.style.flexWrap = "wrap"; 
    collectionRow.style.justifyContent = "flex-start"; 
    collectionRow.style.overflowX = "visible"; 
    seeAllBtn.textContent = "Show Less"; 
    expanded = true; 
  } else {
    collectionRow.style.flexWrap = "nowrap"; 
    collectionRow.style.overflowX = "auto"; 
    seeAllBtn.textContent = "See All";
    expanded = false;
  }
});

fetch("data/data.json")
  .then(res => res.json())
  .then(data => {
    const heroBanner = document.querySelector(".hero-banner");
    heroBanner.innerHTML = "";
    const shuffled = data.movies.sort(() => Math.random() - 0.5);
    const bannerMovies = shuffled.slice(0, 5);

    bannerMovies.forEach((movie, index) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      if (index === 0) slide.classList.add("active");
      let bannerDesc = "";
      switch(movie.genre.toLowerCase()) {
        case "comedy":
          bannerDesc = "Laughs, fun, and heartwarming moments for everyone";
          break;
        case "thriller":
          bannerDesc = "Mystery, suspense, and edge-of-your-seat tension";
          break;
        case "action":
          bannerDesc = "High-octane stunts, epic battles, and heroic moments";
          break;
        case "romance":
          bannerDesc = "Heartfelt connections, love stories, and emotional journeys";
          break;
        case "sci-fi":
          bannerDesc = "Futuristic adventures, mind-bending worlds, and imagination";
          break;
        case "horror":
          bannerDesc = "Chills, scares, and tension that keeps you on edge";
          break;
        case "family":
          bannerDesc = "Fun for all ages, heartwarming stories, and adventure";
          break;
        default:
          bannerDesc = movie.description.substring(0, 100) + "...";
      }

      slide.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <div class="slide-text">
          <h1>${movie.genre}</h1>
          <p>${bannerDesc}</p>
        </div>
      `;

      heroBanner.appendChild(slide);
    });
    const slides = document.querySelectorAll(".hero-banner .slide");
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000);
  });