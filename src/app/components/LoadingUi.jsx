import Lottie from "lottie-react";
import loadingUi from "../../../public/lodingUi.json";

const LoadingAnimaition = () => {
  const style = {
    width: "300px",
  };
  return (
    <div>
      <Lottie style={style} animationData={loadingUi} loop={true} />
    </div>
  );
};

export default LoadingAnimaition;
