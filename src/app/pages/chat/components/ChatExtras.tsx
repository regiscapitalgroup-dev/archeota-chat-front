import { IQuestion } from "../models/QuestionModel";

type Props = {
    extraQuestions: IQuestion[];
    extraInfo: IQuestion[];
    onQuestion: (question: string) => Promise<void>
};


const ChatExtras: React.FC<Props> = ({ extraQuestions, extraInfo, onQuestion }) => {
    const haveExtraInfo = ( extraQuestions.length > 0 || extraInfo.length > 0);

    return (
        <>
        { haveExtraInfo && (
            <div className="mt-10">
                <div className="row g-6">
                    <div className={!!extraInfo && extraInfo.length > 0 ? 'col-12 col-md-6' : 'col-12' }>
                        <div className='card bg-dark-700 border-0 shadow-sm h-100'>
                            <div className='card-header bg-dark ' style={{minHeight: '45px'}}>
                                <span className='card-title text-muted fs-6'>
                                    Would you like to know …
                                </span>
                            </div>
                            <div className='card-body'>
                                <div className='d-flex flex-column gap-4'>
                                    { extraQuestions.map((question, i) => (
                                        <div key={`question_${i}`} className="d-flex align-items-center">
                                            <div
                                                className='d-flex align-items-center justify-content-center me-3'
                                                style={{
                                                    width: 21,
                                                    height: 21,
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #23272f 100%)',
                                                    boxShadow: '0 1px 6px 0 rgba(48,81,255,0.18)',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <i
                                                    className='bi bi-question'
                                                    style={{
                                                    color: '#fff',
                                                    fontSize: 14,
                                                    lineHeight: 1,
                                                    display: 'block',
                                                    filter: 'drop-shadow(0 0 2pxrgba(6, 6, 8, 0.27))',
                                                    }}
                                                />
                                            </div>
                                            <div className='text-gray-600 fw-semibold fs-7 cursor-pointer text-hover-dark' onClick={() => onQuestion(question.question)}>
                                                {question.question}
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    { !!extraInfo && extraInfo.length > 0 && (
                        <div className="col-12 col-md-6">
                            <div className='card bg-dark-700 border-0 shadow-sm h-100'>
                                <div className='card-header bg-dark' style={{minHeight: '45px'}}>
                                    <span className='card-title text-muted fs-6'>
                                        Our expert want to know…
                                    </span>
                                </div>
                                <div className='card-body'>
                                    <div className='d-flex flex-column gap-4'>
                                        {extraInfo.map((info, i) => (
                                            <div key={`info_${i}`} className="d-flex align-items-center">
                                                <div
                                                    className='d-flex align-items-center justify-content-center me-3'
                                                    style={{
                                                        width: 21,
                                                        height: 21,
                                                        borderRadius: '50%',
                                                        background: 'linear-gradient(135deg, #23272f 100%)',
                                                        boxShadow: '0 1px 6px 0 rgba(48,81,255,0.18)',
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <i
                                                        className='bi bi-question'
                                                        style={{
                                                            color: '#fff',
                                                            fontSize: 14,
                                                            lineHeight: 1,
                                                            display: 'block',
                                                            filter: 'drop-shadow(0 0 2pxrgba(6, 6, 8, 0.27))',
                                                        }}
                                                    />
                                                </div>
                                                <div className='text-gray-600 fw-semibold fs-7 text-hover-dark'>
                                                    {info.question}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}
        </>
    )
};

export default ChatExtras;