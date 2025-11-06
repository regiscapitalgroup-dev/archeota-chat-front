import { useEffect, useRef, useState } from "react";
import ChatWrapper from "../../components/ChatWrapper";
import { ChatMessageModel } from "../../models/ChatMessageModel";
import { ChatExtrasModel } from "../../models/ChatExtrasModel";
import { getCurrentTime } from "../../../../helpers/FormatDate";
import { sendMessageChat } from "../../../../services/chatService";


// const _extras: ChatExtrasModel = {
//     animate: true,
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione commodi animi sit, quis suscipit ducimus!', 
//     questions: [ "Lorem ipsum dolor sit.", "Lorem ipsum dolor sit.", "Lorem ipsum dolor sit." ], 
//     summary: [ "Lorem ipsum dolor sit.", "Lorem ipsum dolor sit.", "Lorem ipsum dolor sit." ] 
// }

// const _messages: ChatMessageModel[] = [
//     {
//         text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum natus, esse sed commodi ea eligendi in nulla debitis quaerat nostrum!',
//         time: '07:11 p.m.',
//         type: 'in',
//         animate: true
//     },
//     {
//         text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum natus, esse sed commodi ea eligendi in nulla debitis quaerat nostrum!',
//         time: '07:12 p.m.',
//         type: 'out',
//         animate: true
//     },
//     {
//         text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum natus, esse sed commodi ea eligendi in nulla debitis quaerat nostrum!',
//         time: '07:13 p.m.',
//         type: 'in',
//         animate: true
//     },
//     {
//         text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum natus, esse sed commodi ea eligendi in nulla debitis quaerat nostrum!',
//         time: '07:14 p.m.',
//         type: 'out',
//         animate: true
//     },
//     {
//         text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum natus, esse sed commodi ea eligendi in nulla debitis quaerat nostrum!',
//         time: '07:15 p.m.',
//         type: 'in',
//         animate: true
//     },
//     {
//         text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum natus, esse sed commodi ea eligendi in nulla debitis quaerat nostrum!',
//         time: '07:16 p.m.',
//         type: 'out',
//         animate: true
//     },
//     {
//         text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum natus, esse sed commodi ea eligendi in nulla debitis quaerat nostrum!',
//         time: '07:17 p.m.',
//         type: 'in',
//         animate: true
//     },
//     {
//         text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum natus, esse sed commodi ea eligendi in nulla debitis quaerat nostrum!',
//         time: '07:18 p.m.',
//         type: 'out',
//         animate: true
//     },
// ];


const Chat = () => {
    const [ loading, setLoading ] = useState(false);
    const [ sending, setSending ] = useState(false);
    const [ messages, setMessages ] = useState<ChatMessageModel[]>([]);
    const [ extras, setExtras ] = useState<ChatExtrasModel|undefined>(undefined);
    const isMountedRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);





    return (
        <ChatWrapper 
            sending={sending} 
            loading={loading} 
            onSubmit={(e) => {}}
        />
    )
};

export default Chat;