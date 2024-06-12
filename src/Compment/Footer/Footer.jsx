const Footer = () => {
  return (
    <div className="mt-12">
      <div className=" bg-base-200">
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
