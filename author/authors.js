fetch("../data/data.json")
.then(res => res.json())
.then(data => {

const container = document.getElementById("authors-container");

data.authors.forEach(author => {

const card = document.createElement("div");

card.classList.add("author-card");

card.innerHTML = `
<img src="${author.image}" alt="${author.name}">
<h3>${author.name}</h3>
<p class="email">${author.email}</p>
<p>${author.bio}</p>
`;

container.appendChild(card);

});

})
.catch(err => console.error("Error loading authors:", err));