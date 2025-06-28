// src/pages/Stats.jsx
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useAuth } from "../context/AuthContext";
import {
  ClipboardList,
  Calendar,
  Info,
  Search,
  SortAsc,
  SortDesc,
  Filter,
  X,
} from "lucide-react";

const PAGE_SIZE = 6; // Number of jobs to load per batch

export default function Stats() {
  const { jobs, SetSideBtns } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, title, deadline
  const [filterBy, setFilterBy] = useState("all"); // all, entry, intermediate, expert
  const observerRef = useRef();
  const loadingElementRef = useRef();

  // Get unique experience levels for filter
  const experienceLevels = useMemo(() => {
    const levels = [...new Set(jobs.map((job) => job.experienceLevel))];
    return levels.filter((level) => level); // Remove empty values
  }, [jobs]);

  // Filter and sort jobs
  const processedJobs = useMemo(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(search) ||
          job.description.toLowerCase().includes(search) ||
          job.experienceLevel.toLowerCase().includes(search)
      );
    }

    // Experience level filter
    if (filterBy !== "all") {
      filtered = filtered.filter(
        (job) => job.experienceLevel.toLowerCase() === filterBy.toLowerCase()
      );
    }

    // Sort jobs
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "title":
          return a.title.localeCompare(b.title);
        case "deadline":
          return new Date(a.endDate) - new Date(b.endDate);
        default:
          return 0;
      }
    });

    return sorted;
  }, [jobs, searchTerm, sortBy, filterBy]);

  // Calculate displayed jobs based on current page
  const displayedJobs = useMemo(() => {
    const endIndex = (currentPage + 1) * PAGE_SIZE;
    return processedJobs.slice(0, endIndex);
  }, [processedJobs, currentPage]);

  const hasMore = useMemo(() => {
    return displayedJobs.length < processedJobs.length;
  }, [displayedJobs.length, processedJobs.length]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, sortBy, filterBy]);

  // initial load
  useEffect(() => {
    SetSideBtns(2);
    setCurrentPage(0);
  }, [processedJobs, SetSideBtns]);

  // load next batch
  const loadMoreJobs = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const currentLoadingElement = loadingElementRef.current;

    if (!currentLoadingElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          loadMoreJobs();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(currentLoadingElement);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreJobs, hasMore, isLoading]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("newest");
    setFilterBy("all");
  };

  if (!jobs?.length) {
    return (
      <div className="max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-2xl p-8 text-center">
        <ClipboardList size={48} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-700">
          No Jobs Posted Yet
        </h2>
        <p className="mt-2 text-gray-600">
          Start by creating a new job to see statistics here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 pb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Jobs You've Posted
      </h1>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-400"
            />
            <input
              type="text"
              placeholder="Search jobs by title, description, or experience level..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border text-gray-800 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 text-gray-800 placeholder-gray-500 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="deadline">Deadline Soon</option>
            </select>
            <SortAsc
              size={16}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Experience Filter */}
          <div className="relative">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="appearance-none text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level.toLowerCase()}>
                  {level}
                </option>
              ))}
            </select>
            <Filter
              size={16}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Clear Filters Button */}
          {(searchTerm || sortBy !== "newest" || filterBy !== "all") && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <X size={16} />
              Clear
            </button>
          )}
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing {Math.min(displayedJobs.length, processedJobs.length)} of{" "}
            {processedJobs.length} jobs
            {processedJobs.length !== jobs.length && (
              <span className="text-indigo-600">
                {" "}
                (filtered from {jobs.length} total)
              </span>
            )}
          </div>
          {(searchTerm || filterBy !== "all") && (
            <div className="flex items-center gap-2">
              <span>Filters active:</span>
              {searchTerm && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                  Search: "{searchTerm}"
                </span>
              )}
              {filterBy !== "all" && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                  Level: {filterBy}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* No Results Message */}
      {processedJobs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-md">
          <Search size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Jobs Grid */}
      {processedJobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedJobs.map((job, idx) => (
            <div
              key={`${job.id || job.title}-${idx}`}
              className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs text-gray-400">#{idx + 1}</div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      job.experienceLevel.toLowerCase() === "entry"
                        ? "bg-green-100 text-green-700"
                        : job.experienceLevel.toLowerCase() === "intermediate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.experienceLevel}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title.length > 30
                    ? `${job.title.substring(0, 27)}...`
                    : job.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {job.description.length > 60
                    ? `${job.description.substring(0, 57)}...`
                    : job.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <Calendar size={16} className="text-blue-500" />
                  <span>
                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 border-t flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Deadline: {new Date(job.endDate).toLocaleDateString()}
                </span>
                <button className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
                  <ClipboardList size={18} className="mr-2" /> More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading trigger element */}
      {hasMore && processedJobs.length > 0 && (
        <div ref={loadingElementRef} className="text-center mt-8 py-8">
          {isLoading ? (
            <div className="inline-flex items-center px-4 py-2 text-gray-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mr-3"></div>
              Loading more jobs...
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              Scroll down to load more jobs...
            </div>
          )}
        </div>
      )}

      {/* End message */}
      {!hasMore && displayedJobs.length > 0 && (
        <div className="text-center text-gray-500 mt-8 p-6 bg-gray-50 rounded-lg">
          <ClipboardList size={32} className="mx-auto mb-2 text-gray-400" />
          <p className="text-lg font-semibold">
            🎉 You have seen all {processedJobs.length} jobs!
          </p>
          {processedJobs.length !== jobs.length && (
            <p className="text-sm mt-1">
              ({jobs.length - processedJobs.length} jobs hidden by filters)
            </p>
          )}
        </div>
      )}
    </div>
  );
}
