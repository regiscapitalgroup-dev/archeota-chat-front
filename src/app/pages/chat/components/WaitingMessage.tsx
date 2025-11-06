import clsx from "clsx";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";

type Props = {
    animate: boolean;
};

const WaitingMessage = ({ animate }: Props) => {
    return (
        <div className="wait-message">
            <div className={clsx("info", animate?'animate': '')}>
                <img src={toAbsoluteUrl('/media/avatars/blank.png')} />
                Archeota AI
            </div>
            <div className="waiting animate">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
};

export default WaitingMessage;