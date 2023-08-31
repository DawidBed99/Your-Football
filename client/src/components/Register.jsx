import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Alert, Box, Paper, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
    
    const [form,setForm] = useState({
    email: "",
    login: "",
    password: "",
    passwordRepeated: "",
    });
    const navigate = useNavigate();

    function updateForm(value){
        return setForm((prev)=>{
            return{...prev,...value};
        });
    }
  
    async function handleSubmit(e) {
        
        if(form.password === form.passwordRepeated){
            e.preventDefault();
           
            const response = await fetch("http://localhost:5000/register", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(form),
            }).catch((error) => {
                window.alert(error);
                return;
              });
              if (response.ok) {
                localStorage.setItem("login", form.login);
                setForm({
                  login: "",
                  email: "",
                  password: "",
                  passwordRepeated: "",
                });
                console.log("Created an account!");
                navigate("/mainSite/posts");
        }
        else if (!response.ok) {
            alert("Such login exists!");
          }
        } else {
            alert("Passwords are not matching!");
          }
    }
  return (
    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-evenly", height:"100vh", overflow:"hidden", bgcolor:"#dcdcde"}}>
      <Stack 
      sx={{height:"100vh", width:{xs:"100%", sm:"60%"}}} >
        <Paper  elevation={8}
          sx={{
            width: "100%",
            height: "100%",
            // bgcolor:"#33bfff",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-evenly",
            
          }}>
            
              <Typography textAlign="center"  fontWeight="400" sx={{fontSize:{xs:"2.5em", sm:"3em"} }} color="#1198f2" > Register an account, it's fast and easy!  </Typography>
              
            <Stack sx={{width:"100%", height:"80%", display:"flex", alignItems:"center"}}>
            <Paper sx={{
            width: "70%",
            height: "80%",
            boxShadow:"8px 8px 19px 0px rgba(66, 68, 90, 1)", p:"12px", mt:"24px", borderRadius:"12px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-evenly",
           alignItems:"center",
           
          }}>
            <Typography textAlign="center"  variant="h4" color="#1198f2" >Your data: </Typography>
            <form onSubmit={handleSubmit}>
            <Stack justifyContent="center" alignItems="center" gap="20px">
            <TextField required id="email" label="E-mail" variant="outlined"
            onChange={(e)=>updateForm({email:e.target.value})}
            />
            <TextField required id="login" label="Username" variant="outlined" 
            onChange={(e)=>updateForm({login:e.target.value})}
            />
            <TextField type="password" required id="password" label="Password" variant="outlined" 
            onChange={(e)=>updateForm({password:e.target.value})}
            />
            <TextField type="password" required id="passwordRepeated" label="Repeat password" variant="outlined"
            onChange={(e)=>updateForm({passwordRepeated:e.target.value})}
            />
            
          <Button 
          type="submit"
        //  onClick={()=>{navigate("/");}}
          variant="contained">Make an account</Button>
          </Stack>
          </form>
          <Link to="/"><Button>Login page</Button></Link>
          </Paper>
          </Stack>
            </Paper>
            
            </Stack>
      
   
    </Box>
  );
}

export default Register;
