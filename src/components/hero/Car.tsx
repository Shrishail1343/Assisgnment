import { forwardRef } from "react";
import Image from "next/image";

const Car = forwardRef<HTMLImageElement, object>((_, ref) => {
  return (
    <Image
      ref={ref}
      src="/car-top-view.png"
      alt="McLaren 720S top view"
      width={220}
      height={110}
      priority
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        zIndex: 20,
        willChange: "transform",
        objectFit: "contain",
      }}
    />
  );
});

Car.displayName = "Car";

export default Car;
