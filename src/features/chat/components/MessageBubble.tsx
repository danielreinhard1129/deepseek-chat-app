import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: FC<MessageBubbleProps> = ({ message }) => {
  const isUserMessage = message.role === "user";
  const messageClass = isUserMessage ? "text-right" : "";
  const bubbleClass = isUserMessage
    ? "bg-primary text-primary-foreground"
    : "bg-secondary";

  return (
    <div className={`mb-4 ${messageClass}`}>
      <div className={`inline-block p-2 rounded-lg ${bubbleClass}`}>
        {isUserMessage ? (
          message.content
        ) : (
          <ReactMarkdown>{message.content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
