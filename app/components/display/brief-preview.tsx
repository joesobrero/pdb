import { cn } from "@/app/lib/utils";
import Link from "next/link";

interface BriefPreviewProps {
  id: number;
  name: string;
}

const BriefPreview = ({ id, name }: BriefPreviewProps) => {
  return (
    <Link
      href={`/dashboard/my-briefs/${id}`}
      className={cn(
        "w-full h-full p-1",
        "rounded-xl bg-content/80 aspect-[1.6/1]",
        "flex items-end",
        "hover:shadow-lg transition-shadow duration-300 animate-fade-in"
      )}
    >
      <div
        className={cn(
          "flex flex-row gap-2 rounded-lg p-2 w-full items-center",
          "bg-white/10  backdrop-blur-xl text-white"
        )}
      >
        <h6 className="font-medium">{name}</h6>
      </div>
    </Link>
  );
};

export default BriefPreview;
