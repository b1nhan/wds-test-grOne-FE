import { useState, useEffect } from 'react';
import { X, Upload, Save, Trash2 } from 'lucide-react';
import { editProducts } from '@/lib/utils.products';
import toast, { Toaster } from 'react-hot-toast';

const PopupEdit = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    }
  }, [product]);

  if (!product) return null;

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleEdit = () => {
    toast.promise(
      editProducts(product.id, formData),
      {
        loading: 'Đang cập nhật sản phẩm...',
        success: (res) => {
          if (res.success) {
            onSuccess();
            onClose();
            return 'Cập nhật thành công!';
          }

          throw new Error(res.message || 'Cập nhật thất bại');
        },
        error: (err) => {
          return err.message || 'Có lỗi xảy ra khi sửa sản phẩm';
        },
      },
      {
        duration: 4000,
        style: {
          minWidth: '250px',
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
        }}
        className="relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-5">
          <div>
            <h2 className="text-2xl font-bold text-zinc-800">
              Chỉnh sửa sản phẩm
            </h2>
            <p className="text-sm text-gray-500">ID: {product.id}</p>
          </div>
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

              <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-gray-400">
                    <Upload className="h-12 w-12" />
                    <p className="mt-2 text-sm">Chưa có ảnh</p>
                  </div>
                )}
              </div>

              <input
                required
                name="imageUrl"
                value={formData.imageUrl || ''}
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
                  value={formData.name || ''}
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
                    value={formData.price ?? ''}
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
                    value={formData.stock ?? ''}
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
                  value={formData.description || ''}
                  onChange={handleChange}
                  className="mt-1 w-full resize-none rounded-xl border px-4 py-3 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t bg-gray-50 px-8 py-5">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
            <Trash2 className="h-5 w-5" />
            Xóa sản phẩm
          </button>

          <div className="flex gap-4">
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
              Lưu thay đổi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PopupEdit;
