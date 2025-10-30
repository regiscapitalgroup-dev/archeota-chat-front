import clsx from "clsx";
import React from "react";
import { MessageModel, toAbsoluteUrl, UserInfoModel } from "../../../../_metronic/helpers";
import AIResponseBox from "../../../../_metronic/partials/chat/components/AIResponseBox";
import ChatSummaryBox from "../../../../_metronic/partials/chat/components/ChatSummaryBox";
import { UserModel } from "../../../modules/auth/models/UserModel";


const infoDefault = {
    bot: {
        first_name: 'Archeota AI',
        avatar: 'avatars/blank.png',
        email: 'support@archeota.com',
        online: true,
        position: 'Virtual Assistant'
    },
    default: {
        first_name: 'Unknown',
        avatar: 'avatars/blank.png',
        email: '',
        online: true,
        position: 'Invitated'
    }
}

type Props = {
    message: MessageModel;
    isDrawer: boolean;
    userInfo?: UserModel;
    summary?: string;
}; 

const ChatMessage: React.FC<Props> = ({ message, userInfo, isDrawer, summary }) => {
    const state = message.type === "in" ? 'info' : 'primary';
    const _user: UserInfoModel = ( message.type === 'in' ? 
        infoDefault.bot : 
        userInfo ? { 
            email: userInfo.email,
            first_name: userInfo.firstName,
            online: true,
            position: userInfo.role ?? 'Invitated',
            avatar: 'avatars/blank.png',
        } : infoDefault.default) 

    let templateAttr = {};
    if(!!message.template) {
        Object.defineProperty(templateAttr, 'data-kt-element', {
            value: `template-${message.type}`,
        })
    }

    const contentClass = `${isDrawer ? '' : 'd-flex'} justify-content-${message.type === 'in' ? 'start' : 'end'} mb-3`


    return (
        <div
            className={clsx('d-flex', contentClass, 'mb-5', {
                        'd-none': message.template,
                    })}
            {...templateAttr}
        >
            <div className={clsx('d-flex flex-column align-items', `align-items-${message.type === 'in' ? 'start' : 'end'}`)}>
                <div className="d-flex align-items-center mb-2">
                    { message.type === 'out' && (
                        <div className="me-3">
                            <span className="text-muted fs-7 mb-1">{message.time}</span>
                            <a className="fs-5 fw-bolder text-gray-900 text-hover-primary me-1">
                                You
                            </a>
                        </div>
                    )}
                    <div className='symbol  symbol-35px symbol-circle '>
                        <img alt='Pic' src={toAbsoluteUrl(`/media/${_user.avatar}`)} />
                    </div>
                    { message.type === 'in' && (
                        <div className="ms-3">
                            <a className="fs-5 fw-bolder text-gray-900 text-hover-primary me-1">
                                {_user.first_name}
                            </a>
                            <span className="text-muted fs-7 mb-1">{message.time}</span>
                        </div>
                    )}
                </div>

                { message.type === 'in' ? (
                        <>
                            { !!summary && <ChatSummaryBox text={summary}/> }
                            <AIResponseBox text={message.text}/>
                        </>
                    ):(
                        <div
                            className={clsx(
                                        'p-5 rounded',
                                        `bg-light-${state}`,
                                        'text-dark fw-bold w-100',
                                        `text-${(message.type as 'in' | 'out') === 'in' ? 'start' : 'end'}`
                                    )}
                            data-kt-element='message-text'
                            dangerouslySetInnerHTML={{__html: message.text}}
                        >
                        </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;