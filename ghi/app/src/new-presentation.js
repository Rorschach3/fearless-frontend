import React, { useState, useEffect } from "react";

const PresentationForm = () => {
  const [presenterName, setPresenterName] = useState("");
  const [presenterEmail, setPresenterEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [conference, setConference] = useState("");
  const [conferences, setConferences] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setConferences(data.conferences);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      presenter_name: presenterName,
      presenter_email: presenterEmail,
      company_name: companyName,
      title,
      synopsis,
      conference,
    };
    const presentationUrl = `http://localhost:8000/api/conferences/${conference}/presentations/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(presentationUrl, fetchConfig);
    if (response.ok) {
      const newPresentation = response.json();
      console.log(newPresentation);
      setCompanyName("");
      setPresenterEmail("");
      setPresenterName("");
      setTitle("");
      setSynopsis("");
      setConference("");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new presentation</h1>
          <form id="create-presentation-form">
            <div className="form-floating mb-3">
              <input
                onChange={(e) => {
                  setPresenterName(e.target.value);
                }}
                value={presenterName}
                placeholder="Presenter Name"
                required
                type="text"
                name="presenter_name"
                id="presenter_name"
                className="form-control"
              />
              <label htmlFor="presenter_name">Presenter Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => {
                  setPresenterEmail(e.target.value);
                }}
                value={presenterEmail}
                placeholder="Presenter Email"
                required
                type="text"
                name="presenter_email"
                id="presenter_email"
                className="form-control"
              />
              <label htmlFor="presenter_email">Presenter Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
                value={companyName}
                placeholder="Company Name"
                required
                type="text"
                name="company_name"
                id="company_name"
                className="form-control"
              />
              <label htmlFor="company_name">Company Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                placeholder="Title"
                required
                type="text"
                name="title"
                id="title"
                className="form-control"
              />
              <label htmlFor="title">Title</label>
            </div>
            <label htmlFor="synopsis">Synopsis</label>
            <div className="form-floating mb-3">
              <textarea
                onChange={(e) => {
                  setSynopsis(e.target.value);
                }}
                value={synopsis}
                required
                type="text"
                name="synopsis"
                id="synopsis"
                className="form-control"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <select
                onChange={(e) => {
                  setConference(e.target.value);
                }}
                value={conference}
                required
                id="conference"
                name="conference"
                className="form-select"
              >
                <option value="">Choose a conference</option>
                {conferences.map((conference) => (
                  <option key={conference.id} value={conference.id}>
                    {conference.name}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PresentationForm;
