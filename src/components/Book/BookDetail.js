import axios from "axios";

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Box, Button, Checkbox, FormControlLabel, FormLabel, TextField } from "@mui/material";


export const BookDetail = () => {

    const [input, setInputs] = useState({})
    const id = useParams().id;
    const [checked, setChecked] = useState(false);
    const history = useNavigate();
    useEffect(() => {
        const fetchHandler = async () => {
            await axios.get(`https://bookstore-backend-inky.vercel.app/books/${id}`)
                .then(res => res.data).then(data => setInputs(data.book));
        };
        fetchHandler();
    }, [id])

    const sendRequest = async () => {
        await axios.put(`https://bookstore-backend-inky.vercel.app/books/${id}`, {
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
        sendRequest().then(() => history("/books"))
    }

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div>
            {input && (<form onSubmit={handleSubmit}>
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
                    <Button variant='contained' type='submit'>Update Book</Button>
                </Box>
            </form>)}
        </div>
    )
}

export default BookDetail;
