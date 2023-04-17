window.addEventListener("DOMContentLoaded", async () => {
  const selectTag = document.getElementById("conference");

  const url = "http://127.0.0.1:8000/api/conferences/";
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();

    for (let conference of data.conferences) {
      const option = document.createElement("option");
      option.value = conference.href;
      option.innerHTML = conference.name;
      selectTag?.appendChild(option);
    }

    const loadingTag = document.getElementById("loading-conference-spinner");
    loadingTag.classList.add("d-none");
    selectTag.classList.remove("d-none");

    const attendeeForm = document.getElementById("create-attendee-form");
    attendeeForm?.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(attendeeForm);
      const data = Object.fromEntries(formData.entries());

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch("http://127.0.0.1:8001/api/attendees/");
      if (response.ok) {
        const successAlert = document.getElementById("success-message");
        successAlert.classList.remove("d-none");
        attendeeForm.classList.add("d-none");
      }
    });
  }
});
