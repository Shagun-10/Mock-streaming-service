fetch("../data/data.json")
  .then(res => res.json())
  .then(data => {
    const faqContainer = document.getElementById("faqAccordion");

    data.faq.forEach((item, index) => {
        const faqItem = document.createElement("div");
        faqItem.classList.add("accordion-item");

        faqItem.innerHTML = `
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                    ${item.question}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    ${item.answer}
                </div>
            </div>
        `;

        faqContainer.appendChild(faqItem);
    });
  })
  .catch(err => console.error("Failed to load FAQ:", err));