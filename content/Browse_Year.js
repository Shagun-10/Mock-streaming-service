let allMovies = [];

//Sets up the json file
fetch("../data/data.json")
.then(res => res.json())
.then(data => {
    allMovies = data.movies;
    populateFilters(allMovies);
    renderMovies(sortYear(sortAZ(allMovies)));
});

//Sorts the movies alphabetically
function sortAZ(movies){
    return [...movies].sort((a,b)=> a.title.localeCompare(b.title));
}

//New to the year html, it sorts similarly to A-Z, but with the year instead
function sortYear(movies){
    return [...movies].sort((a, b) => b.year - a.year);
}

//Adds the filter content to the dropdown options
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

//Applies the filter content to the search
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
    renderMovies(sortYear(sortAZ(filtered)));
});

//Renders the movies and adds the movie details when hovering
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

//Switches the HTML page when different sort method is selected
document.getElementById("sortSelect").addEventListener("change",(e)=>{
    const value = e.target.value;

    if(value==="genre"){
        window.location.href="Browse_Genre.html";
    }
    if(value==="az"){
        window.location.href="Browse_AZ.html";
    }
});
