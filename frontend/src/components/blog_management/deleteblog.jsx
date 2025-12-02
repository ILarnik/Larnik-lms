import { deleteBlog } from "../../api/api";

export default function DeleteBlog({ blogId, onDeleted }) {
  const handleDelete = async () => {
    try {
      await deleteBlog(blogId);
      alert("Blog deleted successfully!");
      if (onDeleted) onDeleted(blogId);
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting blog");
    }
  };

return (
  <button
    onClick={handleDelete}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-base font-medium transition transform hover:scale-105"
  >
    🗑 Delete
  </button>
);

}
