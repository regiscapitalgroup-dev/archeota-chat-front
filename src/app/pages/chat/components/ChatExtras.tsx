import clsx from "clsx";

type Props = {
    animate: boolean;
    content: string;
    questions: string[];
    summary: string[];
    clickQuestion: (question: string) => void;
};


const ChatExtras: React.FC<Props> = ({ content, questions, summary, animate, clickQuestion }) => {
    return (
        <div className="message extras">
            <div className='extras'>
                <div className={clsx("summary bg-light-info", animate?'animate':'')}>
                    {content}
                </div>
                <div className={clsx("infographies-wrapper", animate?'animate':'')}>
                    <div className="infography">
                        <div className="infography-head">
                            <span> Would you like to know... </span>
                        </div>
                        <ul className='infography-list'>
                            {questions.map((question, i) => (
                                <li className="selector" key={i} onClick={() => clickQuestion(question)}>
                                    <div className="vignette"> 
                                        <i className="bi bi-question"></i> 
                                    </div>
                                    { question }
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="infography">
                        <div className="infography-head">
                            <span> Our expert want to know… </span>
                        </div>
                        <ul className='infography-list'>
                            {summary.map((summary, i) => (
                                <li key={i}>
                                    <div className="vignette"> 
                                        <i className="bi bi-question"></i> 
                                    </div> 
                                    { summary }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ChatExtras;