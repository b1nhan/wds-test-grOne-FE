import { Button } from '@/components/ui/button';

let AdminFooter = ({ total, curr, data, onPageChange }) => {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-10 flex h-20 items-center justify-center border-t bg-white/80 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-center gap-6 px-10">
        <Button
          variant="outline"
          className="border-gray-300 transition-colors hover:border-lime-500 hover:text-lime-600"
          disabled={data.pageIndex === 0}
          onClick={() =>
            onPageChange((prev) => ({
              ...prev,
              pageIndex: prev.pageIndex - 1,
            }))
          }
        >
          ← Trang trước
        </Button>

        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-500 text-white shadow-lg shadow-lime-200">
            {curr}
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{total}</span>
        </div>

        <Button
          variant="outline"
          className="border-gray-300 transition-colors hover:border-lime-500 hover:text-lime-600"
          disabled={curr >= total}
          onClick={() =>
            onPageChange((prev) => ({
              ...prev,
              pageIndex: prev.pageIndex + 1,
            }))
          }
        >
          Trang sau →
        </Button>
      </div>
    </div>
  );
};

export default AdminFooter;
