import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className='mb-4'
          cover={
            <img
              src={image.Location}
              alt={name}
              style={{ height: "250px", objectFit: "cover" }}
              className='p-1'
            />
          }
        >
          <h2 className='font-weight-bold'></h2>
          <p className='font-weight-bold'>By {instructor.name}</p>
          <Badge count={category} className='pb-2 mr-2' />
          <h4 className='pt-2'>
            {price
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
