import React from 'react';

export default function Pagination ({ gamesPerPage, totalGames, paginate }) {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalGames / gamesPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
          <ul>
            {pageNumbers.map((number) => (
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(number);
                  }}
                >
                  {number}{" "}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      );
    };