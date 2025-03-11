"use client"

export default function Home() {
  const handleClick = () => {
    window.location.href = "/home";
  };
  return (
    <>
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center">Private Chat App</h1>
          <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600
          mt-4" onClick={handleClick} >
            Start Chatting
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
