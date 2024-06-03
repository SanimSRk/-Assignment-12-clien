import register from '..//..//assets/new-user-registration.webp';
import complted from '..//..//assets/Task-Management.jpg';
import reawords from '..//..//assets/online-rewards-concept-earn.jpg';
const Works = () => {
  return (
    <div>
      <div className="lg:w-2/3 mx-auto text-center">
        <p className="font-bold text-green-500">.....How It Works.....</p>
        <p className="p-3">
          Our platform is designed to be easy and intuitive, guiding you through
          each step to ensure a seamless experience. Follow these three simple
          steps to get started and make the most out of our services TaskStream
        </p>
      </div>
      <div className="mt-12">
        <div className=" lg:flex gap-4">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold">
              Register for Exclusive Access and Personalized Rewards
            </h2>
            <p className="mt-4">
              Embark on an exciting journey with us by registering for your
              account today. Our user-friendly registration process ensures a
              seamless start to your experience. You have the option to sign up
              using your email and password, or you can simplify the process
              with one-click registration through Google. But registration is
              just the beginning. Once you're in, unlock a world of exclusive
              benefits tailored to your preferences. From personalized
              recommendations to special offers and rewards, every interaction
              with our platform is designed to enhance your experience. Join our
              vibrant community today and discover a new world of opportunities
              waiting for you.
            </p>
          </div>
          <div className="lg:w-1/2 ">
            <img src={register} alt="" />
          </div>
        </div>
        <div className="lg:flex gap-4 mt-12 flex-row-reverse">
          <div className="lg:w-1/2 ">
            <h2 className="text-3xl font-bold">
              Explore, Engage, and Earn Rewards by Completing Tasks
            </h2>
            <p className="mt-4">
              Discover a wealth of opportunities tailored to your unique
              interests and preferences. Dive into our platforms diverse array
              of tasks, from surveys and challenges to interactive activities,
              designed to keep you engaged and motivated. With each completed
              task, youll earn valuable rewards and unlock new levels of
              achievement. Join us today and start your journey towards success
              and fulfillment.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src={complted} alt="" />
          </div>
        </div>
        <div className="lg:flex gap-4 mt-14 ">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold">
              Elevate Your Experience: Earn Rewards and Enjoy a World of Perks
            </h2>
            <p className="mt-4">
              Take your journey to the next level with our rewarding system. As
              you immerse yourself in our platform and diligently complete
              tasks, you'll accumulate points that unlock a treasure trove of
              exclusive benefits. From coveted discounts on premium services to
              access to VIP events and personalized recommendations tailored
              just for you, the rewards are limitless. Join our community of
              achievers today and embark on a journey where every effort is met
              with rich rewards and unforgettable experiences.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src={reawords} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
