import React, { useEffect, useState } from 'react';
import "./Book.css"
import Book from './Book';

import axios from "axios";
const URL = "https://bookstore-backend-inky.vercel.app/books";



const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};


const Books = () => {
    const [books, setBooks] = useState();

    useEffect(() => {
        fetchHandler().then((data) => setBooks(data.books));
    }, [])

    return (
        <div>
            <ul>
                {books && books.map((book, i) => (

                    <li className='w' key={i}>
                        <Book book={book} />
                    </li>

                ))}
            </ul>
        </div>
    )
}

export default Books