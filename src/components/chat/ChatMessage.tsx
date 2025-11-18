interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
  children?: React.ReactNode;
}

export function ChatMessage({ message, isBot, timestamp, children }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {/* Bot Avatar */}
      {isBot && (
        <div className="size-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
          <svg 
            viewBox="0 0 24 24" 
            fill="white" 
            className="size-4"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
      )}
      
      {/* Message Content */}
      <div className={`flex flex-col max-w-[75%] ${isBot ? 'items-start' : 'items-end'}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isBot 
            ? 'bg-gray-100 text-gray-900 rounded-tl-sm' 
            : 'bg-red-600 text-white rounded-tr-sm'
        }`}>
          {message && <p className="text-sm leading-relaxed whitespace-pre-line">{message}</p>}
          {children}
        </div>
        {timestamp && (
          <span className="text-xs text-gray-500 mt-1 px-2">{timestamp}</span>
        )}
      </div>
      
      {/* User Avatar Placeholder */}
      {!isBot && (
        <div className="size-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 text-xs text-gray-600">
          You
        </div>
      )}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4">
      <div className="size-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
        <svg 
          viewBox="0 0 24 24" 
          fill="white" 
          className="size-4"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1">
          <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}