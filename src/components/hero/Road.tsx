import { forwardRef } from "react";

interface RoadProps {
  children: React.ReactNode;
}

const Road = forwardRef<HTMLDivElement, RoadProps>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute left-0 right-0"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        height: "200px",
        backgroundColor: "#1e1e1e",
        zIndex: 1,
      }}
    >
      {/* Road lane markings */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          height: "4px",
          background:
            "repeating-linear-gradient(to right, #555 0px, #555 40px, transparent 40px, transparent 80px)",
          opacity: 0.5,
        }}
      />
      {children}
    </div>
  );
});

Road.displayName = "Road";

export default Road;
