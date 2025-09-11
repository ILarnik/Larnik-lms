 
import React, { useState } from "react";
import CreateBlog from "../blog management/createblog";
import BlogList from "../blog management/BlogList";

import { deleteBlog } from "../../api/api";

export default function BlogManagerDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = () => setRefreshKey((prev) => prev + 1);
  const handleDelete = async (id) => {
    await deleteBlog(id);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="grid gap-6 p-6">
      <CreateBlog onCreated={handleCreated} />
      <BlogList key={refreshKey} onDelete={handleDelete} />
    </div>
  );
}
