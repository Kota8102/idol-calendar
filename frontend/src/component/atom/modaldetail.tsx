import React, { ReactNode } from "react";

type Props = {
    children: ReactNode
    text?: string
}

const ModalDetail:React.FC<Props> = ({ children, text }) => {

    return(
        <div className="flex inline-flex items-center pt-2 pb-2">
            <div className="pr-5">{children}</div>
            <div className="whitespace-pre-wrap">{text}</div>
        </div>
    )
}

export default ModalDetail