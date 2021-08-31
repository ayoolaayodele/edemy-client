import { currencyFormatter } from "../../utils/helpers";
import { Badge, Modal } from "antd";
import ReactPlayer from "react-player";

const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
}) => {
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
    <div className='jumbotron bg-primary square'>
      <div className='row'>
        <div className='col-md-8'>
          {/* title */}
          <h1 className='font-weight-bold'>{name}</h1>
          {/* description */}
          <p className='lead'>
            {description && description.substring(0, 160)}...
          </p>
          {/* category */}
          <Badge count={category} className='pb-4 mr-2' />
          {/* author */}
          <h6 className='font-weight-bold'>Created By {instructor.name}</h6>
          {/* updatedAt */}
          <p>Last updated {new Date(updatedAt).toLocaleDateString()}</p>
          {/* price */}
          <h4 className='bold'>
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4>
        </div>
        <div className='col-md-4'>
          {/* show video preview or course image */}
          {lessons[0].video && lessons[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(lessons[0].video.Location);
                setShowModal(!showModal); //It can be true/false depending on the default
              }}
            >
              <ReactPlayer
                className='react-player-div'
                url={lessons[0].video.Location}
                light={image.Location}
                width='100%'
                height='225px'
              />
            </div>
          ) : (
            <>
              <img
                src={image.Location}
                alt={name}
                width='100%'
                height='100%'
                className='img img-fluid'
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseJumbotron;
