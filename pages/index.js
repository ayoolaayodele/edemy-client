import { useState, useEffect } from "react";
import axios from "axios";

const Index = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <>
      <h1 className='p-5 mb-4 bg-primary rounded-3 text-center square'>
        Online Education MarketPlace
      </h1>
      <div className='container-fluid'>
        <div className='row'>
          {courses.map((course) => (
            <div key={course._id} className='col-md-4'>
              {
                <div>
                  <pre>{JSON.stringify(course, null, 4)}</pre>
                </div>
              }
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
