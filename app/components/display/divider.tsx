import { cn } from "@/app/lib/utils";

const Divider = ({
  direction = "horizontal",
}: {
  direction?: "horizontal" | "vertical";
}) => {
  return (
    <div
      className={cn(
        "bg-base-300",
        direction === "vertical" ? "h-full w-px" : "h-px w-full"
      )}
    />
  );
};

export default Divider;
