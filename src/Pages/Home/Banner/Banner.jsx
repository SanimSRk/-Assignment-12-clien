import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3300,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="grid justify-center items-center rounded-lg md:h-[420px] h-[320px] lg:h-[600px] bg-center bg-cover bg-[linear-gradient(90deg,rgb(21,21,21,0.4),rgba(21,21,21,0.5)100%),url(/pexels-julia-m-cameron-4145354.jpg)] ">
            <div className="text-white lg:w-2/3 md:w-3/4 w-full mx-auto text-center">
              <h2 className="text-4xl font-bold  ">Data Entry Specialist</h2>
              <p className="mt-3">
                Accurately input data from a source document into a spreadsheet
                application like Excel or Google Sheets, ensuring precision and
                attention to detail.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid justify-center items-center rounded-lg md:h-[420px] h-[320px] lg:h-[600px] bg-center bg-cover bg-[linear-gradient(90deg,rgb(21,21,21,0.4),rgba(21,21,21,0.5)100%),url(/pexels-karolina-grabowska-4968541.jpg)] ">
            <div className="text-white lg:w-2/3 md:w-3/4 w-full mx-auto text-center">
              <h2 className="text-4xl font-bold  ">
                Test a specific feature of a web application and report bugs
              </h2>
              <p className="mt-3">
                Execute a series of test cases on a particular feature of a web
                app, documenting any bugs or issues encountered with detailed
                descriptions and screenshots.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid justify-center items-center rounded-lg md:h-[420px] h-[320px] lg:h-[600px] bg-center bg-cover bg-[linear-gradient(90deg,rgb(21,21,21,0.4),rgba(21,21,21,0.5)100%),url(/pexels-tima-miroshnichenko-6693656.jpg)] ">
            <div className="text-white lg:w-2/3 md:w-3/4 w-full mx-auto text-center">
              <h2 className="text-4xl font-bold  ">
                Test a specific feature of a web application and report bugs
              </h2>
              <p className="mt-3">
                Execute a series of test cases on a particular feature of a web
                app, documenting any bugs or issues encountered with detailed
                descriptions and screenshots.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid justify-center items-center rounded-lg md:h-[420px] h-[320px] lg:h-[600px] bg-center bg-cover bg-[linear-gradient(90deg,rgb(21,21,21,0.4),rgba(21,21,21,0.5)100%),url(/pexels-tima-miroshnichenko-6694543.jpg)] ">
            <div className="text-white lg:w-2/3 md:w-3/4 w-full mx-auto text-center">
              <h2 className="text-4xl font-bold  ">
                Social Media Follower Engagement Tasks
              </h2>
              <p className="mt-3">
                Engage with relevant content by liking and commenting on posts
                from industry leaders, influencers, and potential followers to
                increase visibility and interaction.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
