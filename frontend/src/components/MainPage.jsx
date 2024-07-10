import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [newBook, setNewBook] = useState({
    name: "",
    description: "",
    published: new Date(),
    price: "",
  });

  useEffect(() => {
    fetchBooks();
  }, [currentPage, search]);

  const fetchBooks = async () => {
    console.log("here we go");
    let reqBody = {
      page_number: currentPage,
      search: search,
      limit: 10,
    };
    try {
      const response = await axios.post(`${BASE_URL}api/list-books`, reqBody);
      setBooks(response.data);
      setTotalItems(response.count);
    } catch (error) {
      console.error("Error fetching Books:", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddBook = () => {
    setShowAddBookModal((prev) => !prev);
  };

  const handleSaveBook = async () => {
    try {
      await axios.post(`${BASE_URL}api/add-book`, {
        ...newBook,
        published: newBook.published.toISOString().split("T")[0],
      });
      fetchBooks();
      setShowAddBookModal(false);
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <div className="flex m-4">
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <div>
        <textarea
          className="border border-gray-400"
          onChange={(e) => setSearch(e.target.value)}
        ></textarea>
      </div>
      <ul>
        {books.map((item) => (
          <li key={item.id} className="border-b border-gray-200 py-2">
            <div className="flex p-2">
              <p>{item?.name}</p>
            </div>
            <div className="flex p-2">
              <p>{item?.description}</p>
            </div>
            <div className="flex p-2">
              <p>{item?.published}</p>
            </div>
            <div className="flex p-2">
              <p>{item?.price}</p>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={paginate}
      />

      <Modal
        isOpen={showAddBookModal}
        onRequestClose={() => setShowAddBookModal(false)}
        contentLabel="Add Book Modal"
      >
        <h2>Add New Book</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newBook.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={newBook.description}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Published:
            <DatePicker
              selected={newBook.published}
              onChange={(date) =>
                setNewBook((prev) => ({ ...prev, published: date }))
              }
              dateFormat="yyyy-MM-dd"
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={newBook.price}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="button" onClick={handleSaveBook}>
            Save
          </button>
        </form>
        <button onClick={() => setShowAddBookModal(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default MainPage;
