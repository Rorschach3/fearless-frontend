function createCard(name, description, pictureUrl, starts, end, location) {
    return `
        <div class="col">
        <div class="card h-100">
          <img src="${pictureUrl}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">${description}</p>
            <div class="card-footer">
  
          </div>
        </div>         
    `;
}

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);
        if (!response.ok) {
        //handle error response
        } else {
            const data = await response.json();
            
                //getting the data from first conference into HTML
            const conference = data.conferences[0];
            const nameTag = document.querySelector('.card-title');
            nameTag.innerHTML = conference.name;

            // getting the conference details data to render on screen
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();
                console.log(details);

                // creating image tag and rendering it on the screen
                
                const imageTag = document.querySelector('.card-img-top');
                imageTag.src = details.conference.location.picture_url;

            }

        }
    //handle error 
    } catch (e) {

    };
