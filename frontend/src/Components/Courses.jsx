import React, { useEffect, useState } from 'react';
import useFetch from '../Hooks/useFetch';
import './courses.css'; // Make sure to import the CSS file

function Courses() {
    const { data, error, loading } = useFetch("http://localhost:3000/course/preview");

    // Check for loading or error states
    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className="courses-container">
            {data.course.map((course) => (
                <CourseBlock 
                    key={course._id} 
                    title={course.courseTitle} 
                    description={course.courseDescription} 
                    price={course.coursePrice} 
                    imageUrl={course.ImageUrl} 
                />
            ))}
        </div>
    );
}

function CourseBlock({ title, description, price, imageUrl }) {
    return (
        <div className='courseBox'>
            <img src={imageUrl}  />
            <h1>{title}</h1>
            <p>{description}</p>
            <br />
            <p>Price: ${price}</p>
            <br />
            <button>View Course</button>
            <button style={{marginTop: '10px'}}>Purchase Course</button>
        </div>
    );
}

export default Courses;
