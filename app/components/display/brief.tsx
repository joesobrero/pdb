const Brief = ({ content }: { content: string }) => {
  // Split the content by newlines and filter out empty lines
  const paragraphs = content.split("\n").filter((p) => p.trim().length > 0);

  return (
    <div className="w-full p-6 rounded-lg border border-dashed">
      {paragraphs.length > 0 ? (
        <div className="prose max-w-none">
          {paragraphs.map((paragraph, index) => {
            // Check if the paragraph is a heading (starts with # or ##)
            if (paragraph.trim().startsWith("# ")) {
              return (
                <h1 key={index} className="text-xl font-bold mb-3">
                  {paragraph.substring(2)}
                </h1>
              );
            }

            if (paragraph.trim().startsWith("## ")) {
              return (
                <h2 key={index} className="text-lg font-semibold mb-2">
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
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};

export default Brief;
