import { MessageCircle } from "lucide-react";

const EmptyState = () => {
  return (
    <div className=" flex flex-col items-center justify-center h-[40vh] text-center p-4 ">
      <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
      <p className="text-gray-500">
        Start the conversation by typing a message below.
      </p>
    </div>
  );
};

export default EmptyState;
