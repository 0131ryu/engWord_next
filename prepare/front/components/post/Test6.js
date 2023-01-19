const Test6 = () => {
  return (
    <>
      <h1>이미지 1개</h1>
      <div className="">
        <div className="bg-red-500 rounded-lg shadow-xl min-h-[50px]" />
      </div>
      <h1>이미지 2개</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3">
        <div className="bg-orange-500 rounded-lg shadow-xl min-h-[50px]" />
        <div className="bg-yellow-500 rounded-lg shadow-xl min-h-[50px]" />
      </div>
      <h1>이미지 3개</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3">
        <div className="bg-green-500 rounded-lg shadow-xl min-h-[50px] row-span-2" />
        <div className="bg-teal-500 rounded-lg shadow-xl min-h-[50px]" />
        <div className="bg-blue-500 rounded-lg shadow-xl min-h-[50px]" />
      </div>
      <h1>이미지 4개</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3">
        <div className="bg-indigo-500 rounded-lg shadow-xl min-h-[50px]" />
        <div className="bg-purple-500 rounded-lg shadow-xl min-h-[50px]" />
        <div className="bg-pink-500 rounded-lg shadow-xl min-h-[50px]" />
        <div className="bg-slate-500 rounded-lg shadow-xl min-h-[50px]" />
      </div>
    </>
  );
};

export default Test6;
