import { Particles } from "./Particles";
import loading from "../../src/assets/loadingAnimation.json";
import Lottie from "lottie-react";
import TextType from "./TextType";
import SplitText from "./SplitText";
function ScreenLoading() {
  return (
    <>
      <Particles className="w-full h-full" />
      <div className="flex justify-center items-center z-10 flex-col absolute top-0 left-0 right-0 bottom-0 ">
        <SplitText
          text="NGUYEN HAO QUANG"
          className="text-5xl font-extrabold text-center text-white Purple Neon drop-shadow-[0_0_15px_rgba(232,121,249,0.9)] py-4"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <div>
          <Lottie
            animationData={loading}
            loop={true}
            autoplay={true}
            style={{ width: 300, height: 300 }}
          />
        </div>

        <div className=" w-full text-center text-white text-lg">
          <TextType
            text={["Welcome to my portfolio!", "Let's explore this together!"]}
            className="text-5xl font-extrabold animate-gradient-x bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] py-4"
            cursorCharacter="|"
            cursorClassName="animate-gradient-x bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent drop-shadow-md"
            showCursor={true}
          />
        </div>
      </div>
    </>
  );
}

export default ScreenLoading;
