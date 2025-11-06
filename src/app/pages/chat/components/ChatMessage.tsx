import clsx from "clsx";
import { MessageModel, toAbsoluteUrl } from "../../../../_metronic/helpers";

type Props = {
    message: MessageModel;
    animate: boolean;
};


const ChatMessage = ({ message, animate }: Props) => {


    return (
        <div className={clsx('message', message.type)}>
            <div className={clsx("info", animate?'animate': '')}>
                <span className="hour">{message.time}</span>
                <span className="name"> {message.type=='in'?'You':'Archeota AI'}</span>
                <img src={toAbsoluteUrl('/media/avatars/blank.png')} />
            </div>
            <div className={clsx('message-content', animate ? 'animate': '', message.type=='in'?'bg-light-primary':'')}>
                { message.text }
            </div>
        </div>
    );
};

export default ChatMessage;