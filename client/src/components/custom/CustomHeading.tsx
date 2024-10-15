import { Toolbar } from "@mui/material";

interface HeadingText {
  heading: string;
}
const CustomHeading: React.FC<HeadingText> = ({ heading }) => {
  return (
    <>
      <Toolbar />
      <h1 className="mt-[5rem] font-extrabold text-3xl uppercase">{heading}</h1>
    </>
  );
};

export default CustomHeading;
