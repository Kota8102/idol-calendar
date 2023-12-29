import React from 'react'

function CreateLink(text: string) {
	return text.split('\n').map((line, i) => {
		if (line.startsWith('http')) {
			return (
				<a
					key={i}
					href={line}
					target="_blank"
					rel="noopener noreferrer"
				>
					{line}
				</a>
			)
		} else {
			return <span key={i}>{line}</span>
		}
	})
}

export default CreateLink
