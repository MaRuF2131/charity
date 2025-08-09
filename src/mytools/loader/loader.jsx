import { Flex, Spinner } from "@radix-ui/themes";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Preloader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent">  

   <div className="w-30 h-30">
        <DotLottieReact
        src="https://lottie.host/8fe22964-2ef0-404a-9023-5e4db1efb1f4/F3XH19ScuM.lottie"
        loop
        autoplay
        />
    </div>

    </div>
  );
};

const Preloader2 = () => {
  return (
<div className=" overflow-hidden bg-transparent flex items-center justify-center">
  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
</div>
  );
};

export { Preloader, Preloader2};
