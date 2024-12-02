const Loading: React.FC = () => {

  // const gifs = [
  //   "/calculating1.webp",
  //   "/calculating2.webp",
  //   "/calculating3.webp",
  //   "/calculating4.webp",
  //   "/calculating5.webp",
  //   "/calculating6.webp",
  //   "/calculating7.webp",
  //   "/calculating8.webp"
  // ];

  // const randomGif = gifs[Math.floor(Math.random() * gifs.length)];


  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      {/* <img src={randomGif} alt="Loading..." className="w-full p-10 h-auto"/>  */}
      <p >Loading...</p>
    </div>
  )

};

export default Loading;
