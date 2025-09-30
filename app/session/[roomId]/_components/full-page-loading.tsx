export function FullPageLoading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-100 via-purple-50 to-blue-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-purple-500 animate-pulse flex items-center justify-center shadow-lg" />

        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full bg-purple-600 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-purple-600 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-purple-600 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
