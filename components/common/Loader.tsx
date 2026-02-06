import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="w-16 h-16 animate-spin">
        <Image
          src="/logo.png"
          alt="Loading"
          width={64}
          height={64}
          className="w-full h-full"
        />
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 mt-1">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
