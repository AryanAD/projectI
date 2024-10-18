import { CustomCSS } from "./CustomCSS";

interface ChipParams {
  text: string | undefined;
  role: string | undefined;
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
