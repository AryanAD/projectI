import { CustomCSS } from "./CustomCSS";

interface ChipParams {
  text: string | undefined;
  role?: string | undefined;
  priority?: string | undefined;
}

const CustomChip: React.FC<ChipParams> = ({ text, role, priority }) => {
  return (
    <div
      className={
        role === "admin"
          ? CustomCSS.adminChip
          : role === "staff"
            ? CustomCSS.userChip
            : role === "client"
              ? CustomCSS.clientChip
              : priority === "normal"
                ? CustomCSS.normalPriorityChip
                : priority === "high"
                  ? CustomCSS.highPriorityChip
                  : priority === "very high"
                    ? CustomCSS.veryHighPriorityChip
                    : ""
      }
    >
      {text}
    </div>
  );
};

export default CustomChip;
