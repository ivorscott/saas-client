import { Alert, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";

import { client } from "../../services/APIService";

export const EarlyAccessForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEarlyAccessRequest = async () => {
    await client.post("/users/earlyaccess", { email });
    setSubmitted(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div
      style={{
        background: "#eee",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      <p>Request Early Access</p>
      {submitted && (
        <p>
          <Alert severity="success">Thank you for your interest!</Alert>
        </p>
      )}
      <div
        style={{
          display: "flex",
        }}
      >
        <TextField
          label="Email Address"
          variant="filled"
          disabled={submitted}
          fullWidth={true}
          onChange={handleChange}
        />
        <Button
          variant="outlined"
          disabled={submitted}
          onClick={handleEarlyAccessRequest}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
