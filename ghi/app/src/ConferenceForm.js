import React, { useEffect, useState } from "react";

function ConferenceForm(props) {
  const [name, setName] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [description, setDescription] = useState("");
  {
    /*const [max_presentations, setMaxPresentations] = useState(0);*/
  }
  {
    /*const [max_attendees, setMaxAttendees] = useState(0);*/
  }
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8000/api/locations/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      starts,
      ends,
      description,
      //   max_presentations: maxPresentations,
      //   max_attendees: maxAttendees,
      location,
    };
    const conferenceUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);
      setName("");
      setStarts("");
      setEnds("");
      setDescription("");
      //   setMaxPresentations(0);
      //   setMaxAttendees(0);
      setLocation({});
    }
  };

  return (
    <div class="row">
      <div class="offset-3 col-6">
        <div class="shadow p-4 mt-4">
          <h1>Create a new conference</h1>
          <form id="create-conference-form">
            <div class="form-floating mb-3">
              <input
                placeholder=""
                required
                type="text"
                id="name"
                class="form-control"
                name="name"
              />
              <label for="name">Name</label>
            </div>
            <div class="form-floating mb-3">
              <input
                placeholder=""
                required
                type="date"
                id="start_date"
                class="form-control"
                name="starts"
              />
              <label for="end_date">Start Date</label>
              <div class="form-floating mb-3">
                <input
                  placeholder=""
                  required
                  type="date"
                  id="end_date"
                  class="form-control"
                  name="ends"
                />
                <label for="end_date">End Date</label>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  class="form-control"
                  id="description"
                  cols="25"
                  rows="10"
                ></textarea>
              </div>
              <div class="form-floating mb-3">
                <input
                  placeholder=""
                  required
                  type="number"
                  id="max_presentation"
                  class="form-control"
                  name="max_presentations"
                />
                <label for="max_presentation">Max Presentations</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  placeholder=""
                  required
                  type="number"
                  id="max_attendees"
                  class="form-control"
                  name="max_attendees"
                />
                <label for="max_attendees">Max Attendees</label>
              </div>
              <div class="mb-3">
                <select
                  name="location"
                  required
                  id="location"
                  class="form-select"
                >
                  <option selected value="">
                    Choose Location
                  </option>
                </select>
              </div>
              <button class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConferenceForm;
