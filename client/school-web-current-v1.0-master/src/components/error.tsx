import { FC } from "react";

export const ErrorPage: FC<any> = ({ message }) => {
  return (
    <>
      <div
        className="
    flex
    items-center
    justify-center
    w-screen
    h-screen
    bg-gradient-to-r
    from-green-700
    to-green-300
  "
      >
        <div className="px-40 py-20 bg-white rounded-md shadow-xl">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-green-600 text-9xl">404</h1>

            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> {message}
            </h6>

            <p className="mb-8 text-center text-gray-500 md:text-lg">
              {/* {message} */}
            </p>

            {/* <a
              href="#"
              className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
            >
              Go home
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
};
