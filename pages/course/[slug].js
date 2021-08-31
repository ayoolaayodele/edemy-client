import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SingleCourse = ({ course }) => {
  const router = useRouter();
  const { slug } = router.query;
  //destructure
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='jumbotron bg-primary square'>
            <div className='row'>
              <div className='col-md-8'>
                {/* title */}
                <h1 className='text-light font-weight-bold'>{name}</h1>
                {/* description */}
                <p className='lead'>
                  {description && description.substring(0, 160)}...
                </p>
                {/* category */}
                {/* author */}
                {/* updatedAt */}
                {/* price */}
              </div>
              <div className='col-md-4'>
                {/* show video preview or course image */}
                <p>Show course image</p>
                <p>Show Enrolled button</p>
                {/* enroll button */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
