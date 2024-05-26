

import React from "react";

const Pagination = ({
  handleNext,
  handlePrevious,
  pageCounts,
  page,
  setPage,
}) => {
  console.log(page);
  return (
    <div>
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item ">
            <a class="page-link" href="#" onClick={() => handlePrevious()}>
              Prev
            </a>
          </li>
          {Array(pageCounts)
            .fill(null)
            .map((element, index) => {
              return (
                <>
                  <li
                    key={index}
                    className={`page-item ${
                      page === index + 1 ? "active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                </>
              );
            })}
          <li class="page-item">
            <a class="page-link" href="#" onClick={() => handleNext()}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
