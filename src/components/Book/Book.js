import axios from "axios";

import { Button } from '@mui/material';
import React from 'react';
import "./Book.css"
import { Link, useNavigate } from 'react-router-dom';

const Book = (props) => {
    const history = useNavigate();
    const { _id, name, author, description, price, image } = props.book;

    const deleteHandler = async () => {
        await axios
            .delete(`https://bookstore-backend-inky.vercel.app/books/${_id}`)
            .then(res => res.data)
            .then(() => history("/home"))
    }

    return (
        <div className='bookcard'>
            <img src={image} alt="name" />
            <article>By {author}</article>
            <h3>{name}</h3>
            <p>{description}</p>
            <h2>Rs. {price}</h2>
            <Button className="updatebottom" LinkComponent={Link} to={`/books/${_id}`}>Update</Button>
            <Button className="deletebottom" onClick={deleteHandler}>Delete</Button>
        </div>
    )

}

export default Book;