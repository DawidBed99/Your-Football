import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import "./ball.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [form, setForm] = useState({
    login: "",
    password: "",
    id: "",
  });
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    console.log(response);
    if (response.ok) {
      localStorage.setItem("login", form.login);
      localStorage.setItem("id", form._id);
      console.log(form._id);
      navigate("/mainSite/posts");
    } else if (!response.ok) {
      alert("Incorrect Login or Password!");
    }
  }
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#dcdcde",
      }}
    >
      <Stack sx={{ height: "100vh", width: { xs: "100%", sm: "60%" } }}>
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            height: "100%",
            // bgcolor:"#33bfff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            textAlign="center"
            fontWeight="400"
            sx={{
              textDecoration: "underline",
              fontSize: { xs: "2.5em", sm: "3em" },
            }}
            color="#1198f2"
          >
            Welcome to Your Football!
          </Typography>

          <Typography
            textAlign="center"
            sx={{ fontSize: { xs: "1.5em", sm: "2em" } }}
          >
            Here You can find content related to Football!
          </Typography>
          <Typography
            textAlign="center"
            sx={{ fontSize: { xs: "2em", sm: "2.5em" } }}
          >
            Enjoy!
          </Typography>

          <Stack
            sx={{
              width: "100%",
              height: "60%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Paper
              sx={{
                width: "70%",
                height: "80%",
                boxShadow: "8px 8px 19px 0px rgba(66, 68, 90, 1)",
                p: "12px",
                mt: "24px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Typography textAlign="center" variant="h4" color="#1198f2">
                Sign In
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack
                  sx={{ gap: "20px", display: "flex", alignItems: "center" }}
                >
                  <TextField
                    required
                    id="login"
                    label="Username"
                    variant="outlined"
                    aria-label="required"
                    onChange={(e) => updateForm({ login: e.target.value })}
                  />

                  <TextField
                    type="password"
                    required
                    id="password"
                    label="Password"
                    variant="outlined"
                    aria-label="required"
                    onChange={(e) => updateForm({ password: e.target.value })}
                  />
                  <Button type="submit" variant="contained">
                    Sign in
                  </Button>
                </Stack>
              </form>
              <Typography>No account? Go ahead and register! </Typography>
              <Link to="/register">
                <Button variant="contained" color="success">
                  Register
                </Button>
              </Link>
            </Paper>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

export default LogIn;
