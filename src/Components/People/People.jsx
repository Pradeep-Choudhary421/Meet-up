import React from "react";

const People = () => {
  return (
    <>
      <div className="w-[21%] h-screen bg-black z-50">
        <div></div>
        <div className="py-4 px-4 flex flex-col">
          <div className="text-2xl py-6">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search Friend "
              className="rounded-[4px] w-full"
            />
          </div>
          <ul className="flex flex-col gap-4">
            <li className="flex justify-start gap-8">
              <div className="rounded-[50%] overflow-hidden w-10 ">
                <img
                  className="object-contain"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyfMbSJsa9t2awHtzfrlwsF3XScq4k95tvQ&s"
                  alt=""
                />
              </div>
              <div>John Doe</div>
            </li>
            <li className="flex justify-start gap-8">
              <div className="rounded-[50%] overflow-hidden w-10 ">
                <img
                  className="object-contain"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyfMbSJsa9t2awHtzfrlwsF3XScq4k95tvQ&s"
                  alt=""
                />
              </div>
              <div>John Doe</div>
            </li>
            <li className="flex justify-start gap-8">
              <div className="rounded-[50%] overflow-hidden w-10 ">
                <img
                  className="object-contain"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyfMbSJsa9t2awHtzfrlwsF3XScq4k95tvQ&s"
                  alt=""
                />
              </div>
              <div>John Doe</div>
            </li>
            <li className="flex justify-start gap-8">
              <div className="rounded-[50%] overflow-hidden w-10 ">
                <img
                  className="object-contain"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyfMbSJsa9t2awHtzfrlwsF3XScq4k95tvQ&s"
                  alt=""
                />
              </div>
              <div>John Doe</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default People;
