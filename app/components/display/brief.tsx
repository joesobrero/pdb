"use client";

interface BriefProps {
  content: string;
  isLoading?: boolean;
  error?: string;
}

export default function Brief({
  content,
  isLoading = false,
  error,
}: BriefProps) {
  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <p className="text-gray-500">
          Generate a brief preview to see the content here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg border border-dashed">
      <div className="prose max-w-none">
        {/* Split the content by newlines and render paragraphs */}
        {content.split("\n").map((paragraph, index) => {
          // Skip empty paragraphs
          if (!paragraph.trim()) return null;

          // Check if the paragraph is a heading (starts with # or ##)
          if (paragraph.startsWith("# ")) {
            return (
              <h1 key={index} className="text-2xl font-bold mb-4">
                {paragraph.substring(2)}
              </h1>
            );
          }

          if (paragraph.startsWith("## ")) {
            return (
              <h2 key={index} className="text-xl font-semibold mb-3">
                {paragraph.substring(3)}
              </h2>
            );
          }

          // Regular paragraph
          return (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          );
        })}
      </div>
    </div>
  );
}
