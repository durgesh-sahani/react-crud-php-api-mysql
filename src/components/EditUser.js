import React, { useState, useEffect, useCallback } from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState({ name: "", email: "", mobile: "" });

  const getUserDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8888/api/user/${id}`);
      const userData = response.data;
      setInputs(userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getUserDetails();
    }
  }, [id, getUserDetails]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandle = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8888/api/user/${id}`, inputs);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error("Error Editing user:", error);
    }
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <h5>Create User</h5>
          <form onSubmit={submitHandle}>
            <FormControl>
              <TextField size="large" helperText="Please enter your name" id="name" label="Name" name='name' value={inputs.name} onChange={handleChange} />
              <TextField size="large" helperText="Please enter your Email" id="email" label="Email" name='email' value={inputs.email} onChange={handleChange} />
              <TextField size="large" helperText="Please enter your Mobile" id="mobile" label="Mobile" name='mobile' value={inputs.mobile} onChange={handleChange} />
              <Button size="large" type="submit" variant="contained" name='save'>
                Submit
              </Button>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default EditUser;
