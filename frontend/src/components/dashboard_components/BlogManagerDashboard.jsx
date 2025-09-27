 
import React, { useState } from "react";
import CreateBlog from "../blog_management/createblog";
import BlogList from "../blog_management/BlogList";

import { deleteBlog } from "../../api/api";

export default function BlogManagerDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = () => setRefreshKey((prev) => prev + 1);
  const handleDelete = async (id) => {
    await deleteBlog(id);
    setRefreshKey((prev) => prev + 1);
  };

return (
  <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
    <CreateBlog onCreated={handleCreated} />
    <BlogList key={refreshKey} onDelete={handleDelete} />
  </div>
);

}
