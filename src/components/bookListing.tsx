import React, { useEffect, useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  FunnelIcon,
  ArrowPathIcon,
  BookOpenIcon 
} from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hook';
import { getAllBooksAvailable, setFilters, resetFilters } from '../redux/slices/bookSlice';
import { FilterOptions } from '../types/book';
import { useDebounce } from '../redux/hooks/useDebounce';
import { BookCard } from './BookCard';

const BookDisplay: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books, loading, error, filters, genres } = useAppSelector((state) => state.book);
  const [searchInput, setSearchInput] = useState<string>(filters.search || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const debouncedSearch = useDebounce((value: string) => {
      dispatch(setFilters({ search: value }));
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      setSearchInput(value);
      debouncedSearch(value);
  };

  const handleFilterChange = (field: keyof FilterOptions, value: string): void => {
      dispatch(setFilters({ [field]: value }));
  };

  const handleResetFilters = (): void => {
      setSearchInput('');
      dispatch(resetFilters());
  };

  useEffect(() => {
      dispatch(getAllBooksAvailable(filters));
  }, [dispatch, filters]);

  const renderContent = () => {
      if (error) {
          return (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                  <div className="flex">
                      <div className="flex-shrink-0">
                          <XMarkIcon className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                          <p className="text-sm text-red-700">{error}</p>
                      </div>
                  </div>
              </div>
          );
      }

      if (!books || books.length === 0) {
          return (
              <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                      <BookOpenIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No books found</h3>
                  <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
          );
      }

      return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                  <BookCard key={book._id} book={book} />
              ))}
          </div>
      );
  };

  return (
          <div className="min-h-screen bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="flex justify-between items-center mb-8">
                      <div>
                          <h1 className="text-3xl font-bold text-gray-900">Book Collection</h1>
                          <p className="mt-1 text-sm text-gray-500">
                              Welcome back, ruth
                          </p>
                      </div>
                      <button
                          onClick={() => setIsFilterOpen(!isFilterOpen)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                          <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" />
                          Filters
                      </button>
                  </div>

                  <div className={`bg-white rounded-xl shadow-sm mb-8 transition-all duration-300 ${isFilterOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
                      <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="relative">
                                  <input
                                      type="text"
                                      placeholder="Search books..."
                                      value={searchInput}
                                      onChange={handleSearchChange}
                                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  />
                                  <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                              </div>

                              <select
                                  value={filters.genre || ''}
                                  onChange={(e) => handleFilterChange('genre', e.target.value)}
                                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                              >
                                  <option value="">All Genres</option>
                                  {genres.map((genre) => (
                                      <option key={genre} value={genre}>{genre}</option>
                                  ))}
                              </select>

                              <select
                                  value={filters.sortBy || 'title'}
                                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                              >
                                  <option value="title">Sort by Title</option>
                                  <option value="date">Sort by Date</option>
                                  <option value="rating">Sort by Rating</option>
                              </select>

                              <select
                                  value={filters.sortOrder || 'asc'}
                                  onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                              >
                                  <option value="asc">Ascending</option>
                                  <option value="desc">Descending</option>
                              </select>
                          </div>

                          <div className="mt-4 flex justify-end">
                              <button
                                  onClick={handleResetFilters}
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                              >
                                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                                  Reset Filters
                              </button>
                          </div>
                      </div>
                  </div>

                  {loading ? (
                      <div className="flex justify-center items-center py-12">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                      </div>
                  ) : (
                      renderContent()
                  )}
              </div>
          </div>
  );
};

export default BookDisplay;