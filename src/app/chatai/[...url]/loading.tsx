"use client";

import { Loader} from "lucide-react";
import { TypeAnimation } from "react-type-animation";

function Loading() {
  return (
    <div className="h-full w-full bg-secondary text-foreground text-xl flex flex-col justify-center items-center gap-4">
      <Loader className="size-10 animate-spin duration-700 text-chart-1"></Loader>
      <div className="text-foreground font-mono">
        <TypeAnimation
          sequence={[
            "Please wait while we Index the Website.....",
            750,
            "Extracting Texts....",
            750,
            "Filtering Complex Data....",
            750,
            "Converting To Vectors....",
            750,
            "Sorting the Vectors....",
            750,
            "Reading the next chunk....",
            750,
          ]}
          wrapper="span"
          speed={80}
          omitDeletionAnimation
          repeat={Infinity}
        />
      </div>
    </div>
  );
}

export default Loading;
