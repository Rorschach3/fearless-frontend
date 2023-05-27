function createCard(name, description, pictureUrl, starts, ends, location) {
    const startDate = new Date(starts);
    const newStartDate = startDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    const endDate = new Date(ends);
    const newEndDate = endDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    return `
    <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
            <div class="card">
            <img src="${pictureUrl}" class="card-img-top shadow-lg p-3 mb-5 bg-white rounded">
            <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                        <p class="card-text">${description}</p>
                    <div class="card-footer">${newStartDate} - ${newEndDate}                        
                    </div>
                </div>
            </div>
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
            const column = document.querySelector('.col');
            
            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    console.log(details);
                    const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const ends = details.conference.ends;
                    const starts = details.conference.starts;
                    const location = details.conference.location.name;
                    const html = createCard(title, description, pictureUrl, starts, ends, location);
                    console.log(column);
                    column.innerHTML += html;
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
});
      