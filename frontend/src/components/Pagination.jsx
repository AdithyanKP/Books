
import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="bg-gray-100 px-4 py-3 flex items-center justify-between sm:px-6">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="inline-block">
                        <a
                            onClick={() => paginate(number)}
                            href="#"
                            className="px-3 py-1 bg-white border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
