"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EmptyState from "./components/EmptyState";
import MessageBubble from "./components/MessageBubble";
import { Message } from "./types";

const ChatPage = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setIsLoading(true);

    try {
      const userMessage = {
        role: "user",
        content: inputMessage,
      };

      setMessages((prev) => [...prev, userMessage]);

      const response = await fetch("http://127.0.0.1:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-r1:1.5b",
          messages: [...messages, userMessage],
          stream: true,
        }),
      });

      if (!response.ok) throw new Error("Failed");

      if (!response.body) throw new Error("Streaming Failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      const aiMessage = {
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Proses streaming data
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // Decode chunk data
        const chunk = decoder.decode(value, { stream: true });

        // Pisahkan chunk berdasarkan newline (jika ada multiple JSON objects)
        const jsonStrings = chunk
          .split("\n")
          .filter((line) => line.trim() !== "");

        for (const jsonString of jsonStrings) {
          try {
            // Parse setiap chunk sebagai JSON
            const parsedChunk = JSON.parse(jsonString);

            // Ekstrak konten dari `message.content`
            if (parsedChunk.message && parsedChunk.message.content) {
              accumulatedText += parsedChunk.message.content;

              // Perbarui pesan AI dengan konten yang diterima sejauh ini
              setMessages((prev) => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage.role === "assistant") {
                  // Jika pesan terakhir adalah dari AI, perbarui kontennya
                  return [
                    ...prev.slice(0, -1),
                    { ...lastMessage, content: accumulatedText },
                  ];
                } else {
                  // Jika tidak, tambahkan pesan AI baru
                  return [
                    ...prev,
                    { role: "assistant", content: accumulatedText },
                  ];
                }
              });
            }
          } catch (error) {
            console.error("Error parsing JSON chunk:", error);
          }
        }
      }

      setInputMessage("");
    } catch (error) {
      console.error("Streaming error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, an error occurred while processing your message.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto h-screen flex">
      {/* Main Chat Area */}
      <section
        className={`flex-grow md:w-2/3 lg:w-3/4 bg-white rounded-lg md:rounded-l-none flex flex-col`}
      >
        {/* Header */}
        <header className="p-3 md:p-4 border-b-2">
          <h1 className="text-xl font-bold">Chat App</h1>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-grow overflow-y-auto p-4">
          {!messages.length ? (
            <EmptyState />
          ) : (
            messages.map((message, idx) => (
              <MessageBubble key={idx} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Input Area */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t flex mt-auto"
        >
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" className="ml-2" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </section>
    </main>
  );
};

export default ChatPage;
