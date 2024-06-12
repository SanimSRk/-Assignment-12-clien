import { BsGithub, BsInstagram, BsTwitterX } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="mt-12">
      <div className=" bg-base-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 mt-4">TaskStream</h2>
          <div className="border-y py-4 flex gap-5 justify-center">
            <Link>
              {' '}
              <FaFacebook className="text-3xl"></FaFacebook>
            </Link>
            <Link to={'https://github.com/SanimSRk'}>
              {' '}
              <BsGithub className="text-3xl"></BsGithub>
            </Link>

            <Link>
              <BsTwitterX className="text-3xl"></BsTwitterX>
            </Link>
            <Link>
              <BsInstagram className="text-3xl"></BsInstagram>
            </Link>
          </div>
        </div>

        <footer className="footer p-10  text-base-content">
          <aside>
            <img className="w-16" src="/askstream-logo.png" alt="" />
            <p>
              ACME TaskStream Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Task complted</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Add Tasks</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
        <footer className="footer mt-8 footer-center p-4 bg-base-300 text-base-content">
          <aside>
            <p>Copyright © 2024 - All right reserved by ACME TaskStream</p>
          </aside>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
