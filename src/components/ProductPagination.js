import React from 'react'
import { Pagination } from 'react-bootstrap';

const ProductPagination = ({page, setPage, totalPage}) => {
     const handleClickOnFirst = () => {
    setPage(1);
  };
  const handleClickOnPrev = () => {
    if (page > 1) setPage((num) => num - 1);
  };

  const handleClickOnLast = () => {
    setPage(totalPage);
  };
  const handleClickOnNext = () => {
    if (page < totalPage) setPage((num) => num + 1);
  };

  const handleClickOnPage = (page) => {
    setPage(page);
  };
    return (
            <Pagination variant="light" className="mt-3 justify-content-center">
      <Pagination.First disabled={page === 1} onClick={handleClickOnFirst} />
      <Pagination.Prev disabled={page === 1} onClick={handleClickOnPrev} />
      <Pagination.Item
        active={page === 1}
        onClick={() => handleClickOnPage(1)}
      >
        {1}
      </Pagination.Item>
      {page > 2 && <Pagination.Ellipsis />}

      {page > 1 && page < totalPage && (
        <Pagination.Item active>{page}</Pagination.Item>
      )}

      {page < totalPage - 1 && <Pagination.Ellipsis />}
      {totalPage > 1 && (
        <Pagination.Item
          active={page === totalPage}
          onClick={() => handleClickOnPage(totalPage)}
        >
          {totalPage}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={page === totalPage}
        onClick={handleClickOnNext}
      />
      <Pagination.Last
        disabled={page === totalPage}
        onClick={handleClickOnLast}
      />
    </Pagination>
  );
};

export default ProductPagination;
