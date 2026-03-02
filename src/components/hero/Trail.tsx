import { forwardRef } from "react";

const Trail = forwardRef<HTMLDivElement, object>((_, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: 0,
        backgroundColor: "#45db7d",
        zIndex: 10,
        willChange: "width",
      }}
    />
  );
});

Trail.displayName = "Trail";

export default Trail;
