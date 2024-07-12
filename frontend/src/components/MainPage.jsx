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
      const response = await axios.post(`${BASE_URL}list-books`, reqBody);
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
      await axios.post(`${BASE_URL}add-book`, {
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
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Book List</h1>
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddBook}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Book
        </button>
      </div>
      <div className="mb-6">
        <textarea
          className="w-full h-20 p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        ></textarea>
      </div>
      <ul className="bg-white rounded-lg shadow-md">
        {books.map((item) => (
          <li
            key={item.id}
            className="border-b border-gray-200 last:border-b-0"
          >
            <div className="p-4">
              <div className="mb-2">
                <p className="text-lg font-semibold">{item?.name}</p>
              </div>
              <div className="mb-2">
                <p className="text-gray-700">{item?.description}</p>
              </div>
              <div className="mb-2">
                <p className="text-gray-500">{item?.published}</p>
              </div>
              <div>
                <p className="text-gray-800 font-medium">${item?.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={paginate}
        className="mt-6"
      />

      <Modal
        isOpen={showAddBookModal}
        onRequestClose={() => setShowAddBookModal(false)}
        contentLabel="Add Book Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Name:
                <input
                  type="text"
                  name="name"
                  value={newBook.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Description:
                <textarea
                  name="description"
                  value={newBook.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Published:
                <DatePicker
                  selected={newBook.published}
                  onChange={(date) =>
                    setNewBook((prev) => ({ ...prev, published: date }))
                  }
                  dateFormat="yyyy-MM-dd"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Price:
                <input
                  type="text"
                  name="price"
                  value={newBook.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveBook}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </form>
          <button
            onClick={() => setShowAddBookModal(false)}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MainPage;
