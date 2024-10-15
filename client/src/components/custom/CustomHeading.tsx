interface HeadingText {
  heading: string;
}
const CustomHeading: React.FC<HeadingText> = ({ heading }) => {
  return (
    <>
      <h1 className="font-extrabold underline text-[#7D80FA] text-3xl uppercase">
        {heading}
      </h1>
    </>
  );
};

export default CustomHeading;
