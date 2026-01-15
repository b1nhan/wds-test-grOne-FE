import { X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const PopupDelete = ({ product, onClose, onSuccess, onDelete }) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <Toaster />
      <div className="w-full max-w-sm rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-base font-semibold text-gray-800">Xác nhận</h2>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 text-center">
          <p className="text-sm text-gray-700">
            Bạn có muốn xóa sản phẩm này không?
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-4 border-t px-6 py-4">
          <button
            onClick={onDelete}
            className="cursor-pointer rounded-lg bg-red-500 px-6 py-2 text-sm font-semibold text-white hover:bg-red-600"
          >
            Có
          </button>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-gray-200 px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupDelete;
