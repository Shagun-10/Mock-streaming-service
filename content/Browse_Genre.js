let allMovies = [];

//Sets up the json
fetch("../data/data.json")
.then(res => res.json())
.then(data => {
    allMovies = data.movies;
    populateFilters(allMovies);
    renderMovies(sortAZ(allMovies));
});

//Sorts the movies alphabetically
function sortAZ(movies) {
    return [...movies].sort((a,b)=> a.title.localeCompare(b.title));
}

//Adds the content in the dropdown filters to sort by
function populateFilters(movies){

    const genres = [...new Set(movies.map(m=>m.genre))].sort();
    const years = [...new Set(movies.map(m=>m.year))].sort((a,b)=>b-a);
    const leads = [...new Set(movies.map(m=>m.lead))].sort();

    const genreSelect = document.getElementById("genreFilter");
    const yearSelect = document.getElementById("yearFilter");
    const leadSelect = document.getElementById("leadFilter");

    genres.forEach(g=>{
        let option = document.createElement("option");
        option.value = g;
        option.textContent = g;
        genreSelect.appendChild(option);
    });

    years.forEach(y=>{
        let option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    });
    
    leads.forEach(l=>{
        let option = document.createElement("option");
        option.value = l;
        option.textContent = l;
        leadSelect.appendChild(option);
    });

}

//Applies the filters to the search
document.getElementById("applyFilters").addEventListener("click",()=>{

    let filtered = [...allMovies];

    const genre = document.getElementById("genreFilter").value;
    const year = document.getElementById("yearFilter").value;
    const lead = document.getElementById("leadFilter").value;
    const search = document.getElementById("searchBar").value.toLowerCase();

    if(genre){
        filtered = filtered.filter(m=>m.genre===genre);
    }
    if(year){
        filtered = filtered.filter(m=>m.year==year);
    }
    if(lead){
        filtered = filtered.filter(m=>m.lead===lead);
    }
    if(search){
        filtered = filtered.filter(m=>m.title.toLowerCase().includes(search));
    }

    document.getElementById("resultsTitle").textContent = "Results";
    renderMovies(sortAZ(filtered));
});

//Renders the movies into the grid, sectioned by the set list of genres
function renderMovies(movies){

    const grid = document.getElementById("movieGrid");
    grid.innerHTML = "";

    const genres = [
        "Action",
        "Sci-fi",
        "Comedy",
        "Romance",
        "Horror",
        "Thriller",
        "Family"
    ];

    //this adds the overlay of movie details
    genres.forEach(genre => {
        const genreMovies = movies.filter(m => m.genre === genre);
        if(genreMovies.length === 0) return;
        const section = document.createElement("div");

        section.classList.add("genre-section");
        section.innerHTML = `
            <h2 class="genre-title">${genre}</h2>

            <div class="row-wrapper">

                <button class="scroll-btn left">&#10094;</button>

                <div class="movies-row"></div>

                <button class="scroll-btn right">&#10095;</button>

            </div>
        `;

        const row = section.querySelector(".movies-row");

        genreMovies.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");
            card.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-info">
                    <h4>${movie.title}</h4>
                    <p>${movie.genre} • ${movie.year}</p>
                    <p>${movie.description}</p>
                    <p>${movie.time}</p>
                </div>
            `;
            row.appendChild(card);
        });
        grid.appendChild(section);
    });
    activateScrollButtons();
}

//allows the scroll buttons for the horizontal rows (verticle rows don't have this)
function activateScrollButtons(){
    document.querySelectorAll(".row-wrapper").forEach(wrapper => {
        const row = wrapper.querySelector(".movies-row");

        wrapper.querySelector(".left").addEventListener("click", () => {
            row.scrollBy({ left: -300, behavior: "smooth" });
        });
        wrapper.querySelector(".right").addEventListener("click", () => {
            row.scrollBy({ left: 300, behavior: "smooth" });
        });
    });
}

//changes the HTML page based on the selected sort method
document.getElementById("sortSelect").addEventListener("change",(e)=>{
    const value = e.target.value;

    if(value==="az"){
        window.location.href="Browse_AZ.html";
    }
    if(value==="year"){
        window.location.href="Browse_Year.html";
    }
});
