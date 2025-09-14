function NoChatSelected() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 bg-white/10 backdrop-blur-lg shadow-2xl p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
        Welcome to Rizz
      </h1>
      <p className="text-lg md:text-xl text-gray-200">Select User to start chatting!</p>
    </div>
  );
}

export default NoChatSelected