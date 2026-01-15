import { useState } from 'react';
import { X, Upload, Save } from 'lucide-react';
import { createProducts } from '@/lib/utils.products';
import toast from 'react-hot-toast';

const PopupCreate = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? value : value,
    }));
  };

  const handleCreate = () => {
    toast.promise(
      createProducts(formData),
      {
        loading: 'Đang tạo sản phẩm mới...',
        success: (res) => {
          if (res.success) {
            onSuccess();
            onClose();
            return 'Tạo sản phẩm thành công! 🎉';
          }

          throw new Error(res.message || 'Tạo sản phẩm thất bại');
        },
        error: (err) => {
          return err.message || 'Có lỗi xảy ra khi tạo sản phẩm';
        },
      },
      {
        duration: 4000,
        style: {
          minWidth: '250px',
          fontWeight: '500',
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
        className="relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-5">
          <h2 className="text-2xl font-bold text-zinc-800">
            Thêm sản phẩm mới
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Image */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-500 uppercase">
                Ảnh sản phẩm
              </label>

              <div className="flex aspect-square w-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  <Upload className="h-12 w-12 text-gray-300" />
                )}
              </div>

              <input
                required
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Dán URL hình ảnh..."
                className="w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-lime-500 focus:outline-none"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-gray-700">
                  Tên sản phẩm
                </label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Giá bán (VND)
                  </label>
                  <input
                    required
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 text-lime-600 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Số lượng kho
                  </label>
                  <input
                    required
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700">
                  Mô tả sản phẩm
                </label>
                <textarea
                  required
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 w-full resize-none rounded-xl border px-4 py-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 border-t bg-gray-50 px-8 py-5">
          <button
            onClick={onClose}
            className="rounded-xl px-6 py-2.5 font-semibold text-gray-500 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-lime-500 px-8 py-2.5 font-bold text-black shadow hover:bg-lime-600 active:scale-95"
          >
            <Save className="h-5 w-5" />
            Tạo sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupCreate;
