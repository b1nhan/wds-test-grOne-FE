import { productAPI } from '@/api/product.api';

/**
 * @param {Object} filters 
 * @param {string} filters.keyword
 * @param {string} filters.minPrice
 * @param {string} filters.maxPrice
 * @param {string} filters.sort - newest, price_asc, price_desc
 * @param {number} filters.page
 * @param {number} filters.limit
 * @returns {Promise<Object>} Kết quả
 */
export const searchProducts = async (filters) => {
  try {
    const { keyword, minPrice, maxPrice, sort, page = 1, limit = 10 } = filters;

    const data = await productAPI.searchProducts(keyword || '', {
      minPrice,
      maxPrice,
      sort: sort || 'newest',
      page,
      limit
    });

    return {
      success: true,
      data: data.data
    };
  } catch (error) {
    console.error('Error in searchProducts util:', error);
    return {
      success: false,
      error: error.message || 'Có lỗi xảy ra khi tìm kiếm'
    };
  }
};

/**
/**
 * Kiểm tra xem có filter nào được áp dụng không
 * @param {Object} filters - Bộ lọc
 * @returns {boolean} True nếu có filter được áp dụng
 */
export const hasActiveFilters = (filters) => {
  return !!(
    filters.keyword?.trim() ||
    filters.minPrice ||
    filters.maxPrice ||
    (filters.sort && filters.sort !== 'newest')
  );
};

/**
 * @param {string} minPrice
 * @param {string} maxPrice
 * @returns {Object} Kết quả validate
 */
export const validatePriceRange = (minPrice, maxPrice) => {
  const min = parseFloat(minPrice);
  const max = parseFloat(maxPrice);

  if (minPrice && isNaN(min)) {
    return { valid: false, message: 'Giá min không hợp lệ' };
  }

  if (maxPrice && isNaN(max)) {
    return { valid: false, message: 'Giá max không hợp lệ' };
  }

  if (min < 0) {
    return { valid: false, message: 'Giá min phải lớn hơn 0' };
  }

  if (max < 0) {
    return { valid: false, message: 'Giá max phải lớn hơn 0' };
  }

  if (minPrice && maxPrice && min > max) {
    return { valid: false, message: 'Giá min phải nhỏ hơn giá tối đa' };
  }

  return { valid: true };
};

/**
 * @param {Object} filters 
 * @returns {string} Query 
 */
export const createSearchParams = (filters) => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });
  
  return params.toString();
};

/**
 * Reset
 * @returns {Object} Default filter
 */
export const getDefaultFilters = () => ({
  keyword: '',
  minPrice: '',
  maxPrice: '',
  sort: 'newest',
  page: 1,
  limit: 10
});