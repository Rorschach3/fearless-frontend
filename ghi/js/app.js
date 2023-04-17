function createCard(name, description, pictureUrl, starts, ends) {
  return `
        <div class="card">
            <img src="${pictureUrl}" class="card-img-top">
        < class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${description}</p>
            <div class="card-footer">
            ${dateStart} - ${dateEnd}
            </div>
        </div>
    </div>
</div>
`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://127.0.0.1:8000/api/conferences/";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Figure out what to do when the response is bad
    } else {
      const data = await response.json();

      let columnIndex = 1;
      for (let conference of data.conferences) {
        const detailUrl = `http://127.0.0.1:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const name = details.conference.name;
          const description = details.conference.description;
          const startDate = formatDate(details.conference.starts);
          const endDate = formatDate(details.conference.ends);
          const pictureUrl = details.conference.location.picture_url;
          const html = createCard(
            name,
            description,
            pictureUrl,
            startDate,
            endDate
          );
          const column = document.querySelector(`#column${columnIndex}`);
          column.innerHTML += html;
          columnIndex++;
          if (columnIndex > 3) {
            columnIndex = 1;
          }
        }
      }
    }
  } catch (e) {
    console.error("error", error);
    // Figure out what to do if an error is raised
  }
});
