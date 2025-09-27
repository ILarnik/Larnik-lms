import { Search } from "lucide-react";

export default function SearchBar() {
return (
  <div className="flex items-center w-full max-w-md px-4 py-2 rounded-full mx-auto m-4 bg-white shadow-lg border border-gray-200 focus-within:ring-2 focus-within:ring-green-400 transition">
    {/* Icon */}
    <Search className="text-green-500 mr-3 w-5 h-5" />

    {/* Input */}
    <input
      type="text"
      placeholder="Search..."
      className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-400 text-sm"
      aria-label="Search"
    />
  </div>
);

}
