import React from 'react';
import { StarIcon, BookOpenIcon} from '@heroicons/react/24/solid';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book}) => {
  return (
      <div className="group relative bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="aspect-[3/4] relative overflow-hidden rounded-t-xl">
              <img
                  src={book.coverImage || "/api/placeholder/300/400"}
                  alt={book.title}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium">{book.rating}</span>
              </div>
          </div>

          <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{book.title}</h3>
              
              <div className="flex items-center gap-2 mt-2">
                  <BookOpenIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{book.author}</span>
              </div>

              <div className="flex justify-between items-center mt-3">
                  <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
                      {book.genre}
                  </span>
                  <span className="text-lg font-bold text-indigo-600">
                      ${book.price.toFixed(2)}
                  </span>
              </div>

              <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                  {book.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                      Published: {new Date(book.publicationDate).toLocaleDateString()}
                  </span>
                  <span className={`text-xs font-medium ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                  </span>
              </div>
          </div>
      </div>
  );
};