import React from "react";
import ReactMarkdown from "react-markdown";

import "../../styles/layout.sass"

type Props = {
    body : string
}

const Markdown:React.FC<Props> = ( {body} ) => {

    return (
        <div className="markdown prose max-w-none m-4 md:m-0">
            <ReactMarkdown>
                {body}
            </ReactMarkdown>
        </div>
    )
}


export default Markdown