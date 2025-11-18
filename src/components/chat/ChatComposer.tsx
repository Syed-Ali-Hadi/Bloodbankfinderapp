import { useState } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ChatComposerProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatComposer({ onSendMessage, disabled = false }: ChatComposerProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-4">
      <div className="flex items-end gap-2">
        {/* Attachment Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="flex-shrink-0"
          disabled={disabled}
          aria-label="Attach file"
        >
          <Paperclip className="size-5 text-gray-500" />
        </Button>

        {/* Text Input */}
        <div className="flex-1">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type or choose an action..."
            disabled={disabled}
            className="resize-none"
            aria-label="Type your message"
          />
        </div>

        {/* Voice Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="flex-shrink-0"
          disabled={disabled}
          aria-label="Voice input"
        >
          <Mic className="size-5 text-gray-500" />
        </Button>

        {/* Send Button */}
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !message.trim()}
          className="flex-shrink-0 bg-red-600 hover:bg-red-700"
          aria-label="Send message"
        >
          <Send className="size-5" />
        </Button>
      </div>
    </form>
  );
}
