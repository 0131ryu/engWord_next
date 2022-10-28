import React from "react";

const PostSearch = () => {
  return (
    <div className="flex bg-dark-green m-2 p-2 rounded-lg">
      <form className="w-full h-full" action="#" method="POST">
        <div className="flex">
          <label htmlFor="word" className="sr-only">
            Email address
          </label>
          <input
            id="word"
            name="word"
            type="text"
            autoComplete="word"
            required
            className="group relative w-full justify-center rounded-md border border-transparent bg-white boder border-dark-green py-2 px-4 text-sm font-medium text-black hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2"
            placeholder="which one do you find?"
          />

          <button
            type="submit"
            className="group relative flex ml-2 w-20 justify-center rounded-md border border-transparent bg-light-orange py-2 px-4 text-sm font-medium text-white hover:bg-light-orange focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2"
          >
            search
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostSearch;
