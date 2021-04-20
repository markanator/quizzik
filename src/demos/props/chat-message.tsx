import "./chat-message.css";

interface IProps {
  message: string;
  userName: string;
  date: string;
}

function ChatMessage({ message, userName, date }: IProps) {
  return (
    <div className="chat-message">
      <span className="chat-message__name">{userName}</span>
      <span className="chat-message__date">{date}</span>
      <div>{message}</div>
    </div>
  );
}

export default ChatMessage;
