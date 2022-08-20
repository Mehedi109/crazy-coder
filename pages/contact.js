import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");
  // const [password,setPassword] = useState()setName]=useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone);
    const data = { name, phone, email, desc };

    fetch("http://localhost:3000/api/postcontact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);
        alert("Thanks for contacting us");
        setName("");
        setEmail("");
        setPhone("");
        setDesc("");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "desc") {
      setDesc(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formLabel}>
            Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formLabel}>
            Phone
          </label>
          <input
            className={styles.input}
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="desc" className={styles.formLabel}>
            Write Something
          </label>
          <textarea
            className={styles.input}
            type=""
            id="desc"
            name="desc"
            value={desc}
            rows="4"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
