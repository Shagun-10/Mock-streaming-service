let allMovies = [];

//Sets up the json file for A-Z
fetch("../data/data.json")
.then(res => res.json())
.then(data => {
    allMovies = data.movies;
    populateFilters(allMovies);
    renderMovies(sortAZ(allMovies));
});

//Sorts the movies in alphabetical order, used on every browse page
function sortAZ(movies) {
    return [...movies].sort((a,b)=> a.title.localeCompare(b.title));
}

//adds the values to each filter
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

//applies the filter values to the search
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

//Renders the movies to the section and adds movie detail overlay
function renderMovies(movies){
    const grid = document.getElementById("movieGrid");
    grid.innerHTML="";

    movies.forEach(movie=>{
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

        grid.appendChild(card);
    });
}

//Changes the HTML page based off of the sort style
document.getElementById("sortSelect").addEventListener("change",(e)=>{
    const value = e.target.value;

    if(value==="genre"){
        window.location.href="Browse_Genre.html";
    }
    if(value==="year"){
        window.location.href="Browse_Year.html";
    }
});