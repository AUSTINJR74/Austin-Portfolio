import { useChatEngine } from "@/lib/chat/useChatEngine";
import ChatUI from "@/components/ui/ChatUI";
import { promptItems } from "@/lib/chat/chatContent";

export default function Bot() {
  const { messages, sendMessage, isTyping, typingText, typingColorClass, showPrompts } = useChatEngine();

  return (
    <ChatUI
      messages={messages}
      isTyping={isTyping}
      typingText={typingText}
      typingColorClass={typingColorClass}
      onSend={sendMessage}
      promptItems={promptItems}
      showPrompts={showPrompts}
    />
  );
}