import { useChatEngine } from "@/lib/chat/useChatEngine";
import ChatUI from "@/components/ui/ChatUI";
import { promptItems } from "@/lib/chat/chatContent";

export default function Bot() {
  const { messages, sendMessage, isTyping } = useChatEngine();

  return (
    <ChatUI
      messages={messages}
      isTyping={isTyping}
      onSend={sendMessage}
      promptItems={promptItems}
    />
  );
}