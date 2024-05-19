import  { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setErrorMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !phone || !dob) {
      setErrorMsg("Please fill out all fields.");
      return;
    }
    if (!email.includes("@")) {
      setErrorMsg("Invalid email. Please check your email address.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setErrorMsg(
        "Invalid phone number. Please enter a 10-digit phone number."
      );
      return;
    }
    const dobDate = new Date(dob);
    const currentDate = new Date();
    if (dobDate > currentDate) {
      setErrorMsg("Invalid Date of Birth. Please enter a valid date.");
      return;
    }
    setUsername("");
    setEmail("");
    setPhone("");
    setDob("");
    handleCloseModal();
  };

  return (
    <>
      <h1>User Details Modal</h1>
      <div className="modal">
        <div className="modal-content">
          <button className="open-form-button" onClick={(e) =>{e.stopPropagation(),handleOpenModal()}}>
            Open Form
          </button>
          {isOpen && (
            <div className="form-container" onClick={handleCloseModal}>
              <form
                className="form"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
              >
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <button type="submit" className="submit-button">
                  Submit
                </button>
                {errorMsg && <p className="error-msg">{errorMsg}</p>}
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
