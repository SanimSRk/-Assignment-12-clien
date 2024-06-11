import { useQuery } from '@tanstack/react-query';
import useAxiosPublice from '../../Hooks/AxiosPublic/useAxiosPublice';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';
const Testimonial = () => {
  const axiosPublice = useAxiosPublice();
  const { data } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data } = await axiosPublice.get('/testimonials-users');
      return data;
    },
  });
  console.log(data);

  return (
    <div className="mb-[110px]">
      <div className="lg:w-2/3 md:w-2/3 mx-auto text-center">
        <h2 className="text-2xl font-bold text-green-400 mb-2">
          Testimonials From Our Clients
        </h2>
        <p>
          Hear directly from our Microworkers about their positive experiences
          with our platform. Their feedback speaks volumes about our commitment
          to providing valuable opportunities.
        </p>
      </div>

      <div className="mt-12">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {data?.map(items => (
            <SwiperSlide key={items._id}>
              <div className="w-full grid justify-center text-center rounded-lg shadow-md p-6  border border-green-500 ">
                <div className="justify-center grid">
                  <img
                    className="w-32 border p-1 border-green-500 rounded-full h-32 object-cover object-center"
                    src={items?.image}
                    alt=""
                  />
                </div>
                <Rating
                  className="text-center text-xl mt-3"
                  style={{ maxWidth: 250 }}
                  value={items?.rating}
                  readOnly
                />
                <p className="mt-4 font-semibold">{items?.name}</p>
                <p className="mt-3">{items?.quote}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
