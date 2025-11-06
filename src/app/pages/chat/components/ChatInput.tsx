import { useEffect, useRef, useState } from "react";
import { KTSVG } from "../../../../_metronic/helpers";

type Props = {
    loading: boolean;
    onSend: (value: string) => void;
}

const ChatInput = ({ loading, onSend }: Props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState("");

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = "auto";
        const newHeight = Math.min(textarea.scrollHeight, 200);
        textarea.style.height = `${newHeight}px`;
    }, [value]);

    const handleSend = () => {
        if(value.trim().length<=0)
            return;
        onSend(value);
        setValue('');
    };

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13 && e.shiftKey === false && !loading) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <>
            <textarea 
                ref={textareaRef} 
                placeholder='Type a message...' 
                rows={1} 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onEnterPress}
            ></textarea>
            { loading ? (
                <button className='loading'>
                    <KTSVG path='/media/icons/duotune/coding/cod005.svg' className='svg-icon-2'/>
                </button>
            ) : (
                <button onClick={handleSend}>
                    <KTSVG path='/media/icons/duotune/arrows/arr003.svg' className='svg-icon-2'/>
                </button>
            )}
        </>
    )
};

export default ChatInput;