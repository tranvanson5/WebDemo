import React, { useState } from "react";
import "./PaginationComponent.css";

function PaginationComponent({ total = 0, current = 0, element = 5, onPageChange }) {
    total = total === 0 ? 1 : total;
    const [currentPage, setCurrentPage] = useState(current || 0);
    const pages = Array.from({ length: total }, (_, index) => index);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        onPageChange(pageNumber);
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            const newPage = currentPage - 1;
            handlePageChange(newPage);
        }
    };

    const handleNext = () => {
        if (currentPage < total - 1) {
            const newPage = currentPage + 1;
            handlePageChange(newPage);
        }
    };

    // Calculate start and end indexes for visible page numbers
    const start = Math.max(0, Math.min(currentPage - Math.floor(element / 2), total - element));
    const end = Math.min(total - 1, start + element - 1);

    return (
        <div className="pagination-container">
            <a className="prev-container" onClick={handlePrev}>
                Prev
            </a>
            {pages.slice(start, end + 1).map((pageNumber) => (
                <a
                    className={`pagination-item ${
                        pageNumber === currentPage ? "pagination-item-current" : ""
                    }`}
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber + 1}
                </a>
            ))}
            <a className="next-container" onClick={handleNext}>
                Next
            </a>
        </div>
    );
}

export default PaginationComponent;
