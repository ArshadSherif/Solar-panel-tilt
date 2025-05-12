import Scene from "./Scene";

const SolarPanelModel = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {/* Background image */}
      <img
        src="/public/WhatsApp Image 2025-05-12 at 01.29.50_5dc94653.jpg"
        alt="background-img"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
      />

      {/* Foreground model */}
      <div className="z-10">
        <Scene className="h-full w-full" />
      </div>
    </div>
  );
};

export default SolarPanelModel;
