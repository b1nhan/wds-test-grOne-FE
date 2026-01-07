import { useState } from 'react';
import { VNDformat } from '@/lib/utils';
import { Settings2Icon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from './ui/input-group';
import {
  validatePriceRange,
  getDefaultFilters,
  hasActiveFilters,
} from '@/lib/utils.productsSearch';

export default function ProductSearchFilter({ onSearch, defaultKeyword = '' }) {
  const [searchKeyword, setSearchKeyword] = useState(defaultKeyword);
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [error, setError] = useState('');

  const handleSearch = () => {
    // Validate giá
    const validation = validatePriceRange(minPrice, maxPrice);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    setError('');
    onSearch({
      keyword: searchKeyword.trim(),
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      sort: sortBy,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    const defaults = getDefaultFilters();
    setSearchKeyword(defaults.keyword);
    setMinPrice(defaults.minPrice);
    setMaxPrice(defaults.maxPrice);
    setSortBy(defaults.sort);
    setError('');
    onSearch(defaults);
  };

  const isFiltered = hasActiveFilters({
    minPrice,
    maxPrice,
    sort: sortBy,
  });

  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-8">
      <InputGroup className="max-w-xl rounded-full px-2 py-6">
        <InputGroupInput
          type="text"
          placeholder="Tìm kiếm"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <InputGroupAddon align="end">
          <InputGroupAddon>
            <button
              onClick={handleSearch}
              className="flex cursor-pointer items-center justify-center hover:text-blue-600"
            >
              <SearchIcon />
            </button>
          </InputGroupAddon>
          <InputGroupButton
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Settings2Icon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {/* Dropdown*/}
      {showFilters && (
        <div className="mt-4 w-full max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Bộ lọc</h3>
            <Button className="dark" size="lg" onClick={handleReset}>
              Xóa bộ lọc
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Price Range */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Khoảng giá
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Giá tối thiểu"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Giá tối đa"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Sắp xếp theo
            </label>
            <div className="space-y-2">
              {[
                { value: 'newest', label: 'Mới nhất' },
                { value: 'price_asc', label: 'Giá tăng dần' },
                { value: 'price_desc', label: 'Giá giảm dần' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              handleSearch();
              if (!error) setShowFilters(false);
            }}
          >
            Áp dụng bộ lọc
          </Button>
        </div>
      )}

      {searchKeyword && (
        <p className="mt-4 text-sm text-gray-600">
          Tìm kiếm kết quả cho: "
          <span className="font-semibold">{searchKeyword}</span>"
        </p>
      )}

      {isFiltered && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <span>Bộ lọc:</span>
          <div className="flex flex-wrap gap-2">
            {minPrice && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">
                Từ {VNDformat(minPrice)}
              </span>
            )}
            {maxPrice && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">
                Đến {VNDformat(maxPrice)}
              </span>
            )}
            {sortBy !== 'newest' && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">
                {sortBy === 'price_asc' ? 'Giá tăng' : 'Giá giảm'}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
