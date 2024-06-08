const Test = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open fixed z-10  ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center  w-full justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn w-full btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}

            <li>
              <a>Sidebar Item hello wold</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Test;
