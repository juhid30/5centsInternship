"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyToken, logoutUser } from "../../../utils/auth";
import axios from "axios";
import Link from "next/link";
import Sidebar from "../components/Sidebar";

const ITEMS_PER_PAGE = 6;

export default function Dashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [idFilter, setIdFilter] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const authUser = await verifyToken();
      if (!authUser) {
        router.push("/login");
        return;
      }
      setUser(authUser);

      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch posts. Please try again.");
      }
      setLoading(false);
    })();
  }, [router]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesIdFilter = idFilter
      ? post.id.toString().includes(idFilter)
      : true;
    return matchesSearch && matchesIdFilter;
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Button */}
      <button
        className="fixed bottom-4 right-4 z-50 md:hidden bg-primary text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={showSidebar ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} />
      {/* Main Content */}
      <main
        className={`transition-all duration-200 ${
          showSidebar ? "md:ml-64" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Welcome back!</h1>
            <p className="mt-1 text-lg text-gray-500">
              Here are your latest posts
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="input-field pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Filter by ID */}
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by ID"
                className="input-field"
                value={idFilter}
                onChange={(e) => setIdFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Posts Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post) => (
                <article
                  key={post.id}
                  className="card p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.body}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Post #{post.id}
                    </span>
                    <button className="text-primary hover:text-primary-dark font-medium ">
                      Read more
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
