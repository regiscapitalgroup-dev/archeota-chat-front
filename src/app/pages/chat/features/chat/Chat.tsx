import ChatBot from "../../components/ChatBot";

const Chat = () => {
    return (
        <div className="d-flex flex-column h-100">
            <div className="card flex-grow-1 d-flex flex-column">
                <ChatBot />
            </div>
        </div>
    )
};

export default Chat;