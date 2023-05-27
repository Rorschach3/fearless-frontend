function createCard(name, description, pictureUrl, location) {
    return `
        <div class="col">
        <div class="card h-100">
          <img src="${pictureUrl}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
            <p class="card-text">${description}</p>
            <div class="card-footer">
  
          </div>
        </div>         
    `;
}

  


window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);
        if (!response.ok) {
        //handle error response
            throw new Error('Response not OK');

        } else {
            const data = await response.json();
      
            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    console.log(details);
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    // const end = details.conference.end;
                    // const starts = details.conference.starts;
                    const location = details.conference.location.name;
                    const html = createCard(name, description, pictureUrl, location);
                    const cardContainer = document.querySelector('.card-container');
                    cardContainer.innerHTML += html;
                }
              }
            }
    } catch (error) {
    console.error("Error:", error);
    }
});
      