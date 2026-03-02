import { forwardRef } from "react";

interface HeroTrackProps {
  children: React.ReactNode;
}

const HeroTrack = forwardRef<HTMLDivElement, HeroTrackProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full overflow-hidden"
        style={{ height: "100vh", backgroundColor: "#d1d1d1" }}
      >
        {children}
      </div>
    );
  }
);

HeroTrack.displayName = "HeroTrack";

export default HeroTrack;
