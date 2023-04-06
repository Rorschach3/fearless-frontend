/*function createCard(name, description, pictureUrl, starts, ends) {
  return `
    <div class="card">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer">
          ${new Date(starts).toLocaleDateString()} - ${new Date(
    ends
  ).toLocaleDateString()}
      </div>
    </div>
  `;
}*/

window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000${conference.href}";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log(response.status);

      // Figure out what to do when the response is bad
      // We can use the response.status and response.statusText to help us
    } else {
      const data = await response.json();

      if (data.conferences && data.conferences.length > 0) {
        const conference = data.conferences[2];
        const nameTag = document.querySelector(".card-title");
        nameTag.innerHTML = conference.name;

        const detailUrl = "http://localhost:8000" + conference.href;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          console.log(details);
        }
      } else {
        // Figure out what to do when there are no conferences
        console.log(response.statusText);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
/*try {
    const response = await fetch(url);

    if (!response.ok) {
      // Figure out what to do when the response is bad
    } else {
      const data = await response.json();

      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          console.log(details.conference);
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const starts = details.conference.starts;
          const ends = details.conference.ends;
          const html = createCard(title, description, pictureUrl, starts, ends);
          const column = document.querySelector(".col");
          console.log(column);
          column.innerHTML += html;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
})};*/
