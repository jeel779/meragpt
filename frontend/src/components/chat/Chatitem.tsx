import SyntaxHighlighter from "react-syntax-highlighter";
import { useAuthStore } from "../../store/useAuthStore";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    return message.split("```");
  }
  return null;
}

function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  );
}

type ChatItemProp = {
  content: string;
  role: "user" | "assistant";
};

export const ChatItem = ({ content, role }: ChatItemProp) => {
  const { authUser } = useAuthStore();
  const messageBlocks = extractCodeFromString(content);

  const getInitials = () => {
    if (!authUser?.username) return "?";
    const parts = authUser.username.trim().split(/\s+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return role === "assistant" ? (
    <>
      <img src="openai.png" alt="openai" width={"30px"} />
      {!messageBlocks && <span>{content}</span>}
      {messageBlocks &&
        messageBlocks.length > 0 &&
        messageBlocks.map((block, index) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter key={index} language="javascript">
              {block}
            </SyntaxHighlighter>
          ) : (
            <span key={index}>{block}</span>
          )
        )}
    </>
  ) : (
    <>
      <span className="avatar-initials">{getInitials()}</span>
      {!messageBlocks && <span>{content}</span>}
      {messageBlocks &&
        messageBlocks.length > 0 &&
        messageBlocks.map((block, index) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter key={index} language="javascript">
              {block}
            </SyntaxHighlighter>
          ) : (
            <span key={index}>{block}</span>
          )
        )}
    </>
  );
};

export default ChatItem;