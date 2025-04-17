import { useState, useEffect } from "react";
import { Course } from "../types/index";
import "./CourseCard.css";
import { HeartIcon } from "./HeartIcon";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const getFavorites = (): number[] => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  };

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.includes(course.id));
  }, [course.id]);

  const toggleFavorite = () => {
    const favorites = getFavorites();
    let updatedFavorites: number[];

    if (isFavorite) {
      updatedFavorites = favorites.filter((id: number) => id !== course.id);
    } else {
      updatedFavorites = [...favorites, course.id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <div className="course-card">
        <div className="course-image">
          <img src={course.image} alt={course.title} />
          <button className="favorite-btn" onClick={toggleFavorite}>
            <span className={`heart ${isFavorite ? "filled" : ""}`}>
              <HeartIcon />
            </span>
          </button>
        </div>
        <h3>{course.title}</h3>
        <div className="course-info">
          <span>
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="svgIcon"
            >
              <path
                d="M14 10.5C14 10.9688 13.7812 11.3438 13.5 11.625V14.1562C13.7812 14.3438 14 14.6562 14 15C14 15.5625 13.5312 16 13 16H3C1.3125 16 0 14.6875 0 13V3C0 1.34375 1.3125 0 3 0H6V6C6 6.4375 6.46875 6.65625 6.78125 6.40625L8.5 5L10.1875 6.375C10.5 6.625 11 6.40625 11 6V0H12.5C13.3125 0 14 0.6875 14 1.5V10.5ZM12 14V12H3C2.4375 12 2 12.4688 2 13C2 13.5625 2.4375 14 3 14H12Z"
                fill="#080808"
                fill-opacity="0.25"
              />
            </svg>
            Lessons: {course.lessons}
          </span>
          <span>
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="svgIcon"
            >
              <path
                d="M7 8C4.78125 8 3 6.21875 3 4C3 1.8125 4.78125 0 7 0C9.1875 0 11 1.8125 11 4C11 6.21875 9.1875 8 7 8ZM8.5625 9.5C11.5625 9.5 14 11.9375 14 14.9375C14 15.5312 13.5 16 12.9062 16H1.0625C0.46875 16 0 15.5312 0 14.9375C0 11.9375 2.40625 9.5 5.40625 9.5H8.5625Z"
                fill="#080808"
                fill-opacity="0.25"
              />
            </svg>
            Students: {course.students}
          </span>
          <span>
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="svgIcon"
            >
              <path
                d="M18.875 2.59375C18.875 2.6875 19.4688 5.25 17.75 7.6875C16.5625 9.4375 14.5938 10.6562 11.875 11.375C11.3125 11.5312 10.9062 12.0625 10.9062 12.6562C10.9062 13.4062 11.5 14 12.25 14H12.4062C13.2188 14 13.9062 14.6875 13.9062 15.5C13.9062 15.7812 13.7188 16 13.4375 16H6.46875C6.21875 16 6 15.7812 6 15.5C6 14.6875 6.65625 14 7.5 14H7.625C8.375 14 9 13.4062 8.96875 12.6562C8.96875 12.0625 8.59375 11.5312 8 11.375C5.28125 10.6562 3.3125 9.4375 2.15625 7.6875C0.5 5.25 1.09375 2.6875 1.09375 2.59375C1.1875 2.25 1.5 2 1.84375 2H5C4.96875 1.625 4.96875 1.28125 5 0.96875C5 0.4375 5.4375 0 6 0H13.9688C14.5312 0 14.9688 0.4375 14.9688 0.96875C15 1.28125 15 1.625 14.9688 2H18.125C18.4688 2 18.7812 2.25 18.875 2.59375ZM3.40625 6.875C4.125 7.96875 5.28125 8.8125 6.8125 9.4375C5.65625 7.625 5.1875 5.375 5 3.5H2.5C2.46875 4.25 2.53125 5.59375 3.40625 6.875ZM16.5625 6.875C17.4375 5.59375 17.5 4.25 17.4688 3.5H14.9688C14.7812 5.375 14.3125 7.625 13.1562 9.4375C14.6875 8.8125 15.8438 7.96875 16.5625 6.875Z"
                fill="#080808"
                fill-opacity="0.25"
              />
            </svg>

            {course.level === "beginner"
              ? "Beginner"
              : course.level === "advanced"
              ? "Advancer"
              : "Average"}
          </span>
        </div>
        <div className="course-footer">
          <button className="start-btn">
            Start Course{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.25 13C6.00391 13 5.78516 12.918 5.62109 12.7539C5.26562 12.4258 5.26562 11.8516 5.62109 11.5234L9.36719 7.75L5.62109 4.00391C5.26562 3.67578 5.26562 3.10156 5.62109 2.77344C5.94922 2.41797 6.52344 2.41797 6.85156 2.77344L11.2266 7.14844C11.582 7.47656 11.582 8.05078 11.2266 8.37891L6.85156 12.7539C6.6875 12.918 6.46875 13 6.25 13Z"
                fill="white"
              />
            </svg>
          </button>
          <span className="rating">⭐ {course.rating}</span>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
