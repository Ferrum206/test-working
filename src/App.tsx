import { useState } from "react";
import CourseCard from "./components/CourseCard";
import coursesData from "./data/courses.json";
import { Course } from "./types/index";
import "./App.css";

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const categories = [
    "all",
    "design",
    "development",
    "music",
    "sports",

    "management",
  ];

  const getFavorites = (): number[] => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  };

  let filteredCourses = coursesData as Course[];

  if (selectedCategory !== "all") {
    filteredCourses = filteredCourses.filter(
      (course) => course.category === selectedCategory
    );
  }

  if (showFavorites) {
    const favorites = getFavorites();
    filteredCourses = filteredCourses.filter((course) =>
      favorites.includes(course.id)
    );
  }

  if (searchQuery) {
    filteredCourses = filteredCourses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <>
      <div className="app">
        <header>
          <input
            type="text"
            placeholder="Search Course"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </header>
        <div className="filters">
          <button
            className={`favorites-btn ${showFavorites ? "active" : ""}`}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            Favorite Courses{" "}
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5.25C19 2.765 16.901 0.75 14.312 0.75C12.377 0.75 10.715 1.876 10 3.483C9.285 1.876 7.623 0.75 5.687 0.75C3.1 0.75 1 2.765 1 5.25C1 12.47 10 17.25 10 17.25C10 17.25 19 12.47 19 5.25Z"
                fill="white"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <nav>
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowFavorites(false);
                }}
              >
                {category === "all"
                  ? "All Course"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        <div className="course-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course: Course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <p>Курсы не найдены</p>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
