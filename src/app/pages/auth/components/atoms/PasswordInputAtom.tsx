import React, { useState } from "react";

type Props = {
    children: JSX.Element
}

const PasswordInputAtom = ({ children }: Props) => {
    const [show, setShow] = useState(false);
    return (
        <div className="input-group">
            {React.cloneElement(children, {
                type: show ? "text" : "password"
            })}
            <div className="input-group-text border-0 cursor-pointer" onClick={() => setShow(prev => !prev)}>
                { show ? (
                    <i className="bi bi-eye-slash-fill"></i>
                ): (
                    <i className="bi bi-eye-fill"></i>
                )}
            </div>
        </div>
    )
}

export default PasswordInputAtom;