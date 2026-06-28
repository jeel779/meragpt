import ReactMarkdown from "react-markdown";
import { useAuthStore } from "../../store/useAuthStore";
import SyntaxHighlighter from "react-syntax-highlighter";

type ChatItemProp = {
  content: string;
  role: "user" | "assistant";
};

export const ChatItem = ({ content, role }: ChatItemProp) => {
  const { authUser } = useAuthStore();

  const getInitials = () => {
    if (!authUser?.username) return "?";
    const parts = authUser.username.trim().split(/\s+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const renderContent = () => (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <h1 className="text-xl font-bold text-white mt-4 mb-2 first:mt-0">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-bold text-white mt-4 mb-2 first:mt-0">{children}</h2>,
        h3: ({ children }) => <h3 className="text-base font-semibold text-white mt-3 mb-1 first:mt-0">{children}</h3>,
        p: ({ children }) => <p className="mb-3 last:mb-0 whitespace-pre-wrap">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-sm text-text-main leading-relaxed">{children}</li>,
        a: ({ href, children }) => (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brand-secondary hover:underline cursor-pointer transition-colors"
          >
            {children}
          </a>
        ),
        hr: () => <hr className="border-t border-white/10 my-4" />,
        code: (props: any) => {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          const isInline = !match;
          
          return isInline ? (
            <code className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-xs text-white" {...rest}>
              {children}
            </code>
          ) : (
            <div className="my-2 overflow-x-auto rounded-xl">
              <SyntaxHighlighter 
                language={match[1]}
                customStyle={{
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  padding: "1.25rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-mono)",
                }}
                {...rest}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );

  return role === "assistant" ? (
    <div className="flex gap-4 items-start w-full max-w-4xl self-start font-sans">
      <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0 shadow-sm shadow-brand-primary/10">
        <img src="openai.png" alt="AI" className="w-5 h-5 invert opacity-80" />
      </div>
      <div className="flex flex-col gap-2 max-w-[85%] bg-white/[0.02] border border-white/5 px-5 py-3.5 rounded-2xl rounded-tl-none shadow-sm shadow-black/10">
        <span className="text-xs font-semibold text-brand-secondary font-mono tracking-wider">MeraGPT</span>
        <div className="text-sm text-text-main leading-relaxed flex flex-col font-sans font-light">
          {renderContent()}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex gap-4 items-start w-full max-w-4xl self-end flex-row-reverse font-sans">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-tertiary flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-md shadow-brand-primary/15">
        {getInitials()}
      </div>
      <div className="flex flex-col gap-2 max-w-[85%] bg-white/5 border border-white/5 px-5 py-3.5 rounded-2xl rounded-tr-none shadow-sm shadow-black/10">
        <div className="text-sm text-text-main leading-relaxed flex flex-col font-sans font-light">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;