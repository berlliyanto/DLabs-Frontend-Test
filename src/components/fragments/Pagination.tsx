import { Button } from "../ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, handlePreviousPage, handleNextPage}) => {
  return (
    <div className="flex justify-center mt-4">
      <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </Button>
      <span className="px-4">
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
