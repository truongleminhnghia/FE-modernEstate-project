import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input.jsx';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Tìm kiếm theo tiêu đề, địa chỉ..." 
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default SearchBar; 