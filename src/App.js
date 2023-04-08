import React from "react";
import Header from "./components/Header";
import { HashRouter Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Books from "./components/Book/Books";
import AddBook from "./components/AddBook";
import BookDetail from "./components/Book/BookDetail"

function App() {
    return <HashRouter>

        <header>
            <Header />
        </header>
        <main>
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/add" element={<AddBook />} exact />
                <Route path="/books" element={<Books />} exact />
                <Route path="/about" element={<About />} exact />
                <Route path="/books/:id" element={<BookDetail />} exact />

            </Routes>
        </main>
    </HashRouter>

}

export default App;
