import { Button } from '@/components/ui/button';

export const PaginationHome = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <Button
        variant="outline"
        className="border-gray-300 transition-colors hover:border-lime-500 hover:text-lime-600"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        ← Trang trước
      </Button>

      <div className="flex items-center gap-2 font-medium">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-500 text-white shadow-lg shadow-lime-200">
          {currentPage}
        </span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">{totalPages}</span>
      </div>

      <Button
        variant="outline"
        className="border-gray-300 transition-colors hover:border-lime-500 hover:text-lime-600"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Trang sau →
      </Button>
    </div>
  );
};
