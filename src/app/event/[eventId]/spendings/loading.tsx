const Loading: React.FC = () => {

  const gifs = [
    "/loading1.webp",
    "/loading2.webp",
    "/loading3.webp",
    "/loading4.webp",
    "/loading5.webp",
    "/loading6.webp",
    "/loading7.webp",
    "/loading8.webp"
  ];

  const randomGif = gifs[Math.floor(Math.random() * gifs.length)];


  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <img src={randomGif} alt="Loading..." className="w-full p-10 h-auto"/> 
      <p >Loading...</p>
    </div>
  )

};

export default Loading;
