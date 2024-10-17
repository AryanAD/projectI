import { CustomCSS } from "./CustomCSS";

interface ChipParams {
  text: string;
  role: string;
}

const CustomChip: React.FC<ChipParams> = ({ text, role }) => {
  return (
    <div
      className={role === "admin" ? CustomCSS.adminChip : CustomCSS.userChip}
    >
      {text}
    </div>
  );
};

export default CustomChip;
