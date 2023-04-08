import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormLabel, TextField } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";



const AddBook = () => {
    const history = useNavigate();
    const [input, setInputs] = useState({
        name: "",
        description: "",
        price: "",
        author: "",
        image: ""
    })

    const [checked, setChecked] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const sendRequest = async () => {
        axios.post("https://bookstore-backend-inky.vercel.app/books", {
            name: String(input.name),
            author: String(input.author),
            description: String(input.description),
            price: Number(input.price),
            image: String(input.image),
            available: Boolean(checked)
        }).then(res => res.data)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input, checked);
        sendRequest().then(() => history("/books"))
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" justifyContent="center" maxWidth={700} alignContent="center" alignSelf="center" marginLeft={"auto"} marginRight={"auto"} marginTop={"10px"}>
                <FormLabel>Name : </FormLabel>
                <TextField value={input.name} onChange={handleChange} margin='normal' fullWidth variant='outlined' name="name" />
                <FormLabel>Author : </FormLabel>
                <TextField value={input.author} onChange={handleChange} margin='normal' fullWidth variant='outlined' name="author" />
                <FormLabel>Description : </FormLabel>
                <TextField value={input.description} onChange={handleChange} margin='normal' fullWidth variant='outlined' name="description" />
                <FormLabel>Price : </FormLabel>
                <TextField value={input.price} onChange={handleChange} type='number' margin='normal' fullWidth variant='outlined' name="price" />
                <FormLabel>Image : </FormLabel>
                <TextField value={input.image} onChange={handleChange} margin='normal' fullWidth variant='outlined' name="image" />
                <FormControlLabel control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />} label="available" />
                <Button variant='contained' type='submit'>Add Book</Button>
            </Box>
        </form>
    )
}

export default AddBook