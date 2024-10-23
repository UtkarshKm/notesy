import { useEffect, useRef, useState } from "react";
import Trash from "../icons/Trash";
import {setNewOffset , autoGrow, bringCardToFront , bodyParser} from "../utils/utils";

// NoteCard Component
const NoteCard = ({ note }) => {
	const textAreaRef = useRef(null);
	const cardRef = useRef(null);
	const [position, setPosition] = useState(JSON.parse(note.position));
	const colors = JSON.parse(note.colors);
	const body = bodyParser(note.body);

	let mouseStartPos = { x: 0, y: 0 };

	// Mouse event handlers
	const mouseDown = (e) => {
		mouseStartPos.x = e.clientX;
		mouseStartPos.y = e.clientY;

		bringCardToFront(cardRef.current);

		document.addEventListener("mousemove", mouseMove);
		document.addEventListener("mouseup", mouseUp);
	};

	const mouseMove = (e) => {
		// Calculate move direction
		let mouseMoveDir = {
			x: mouseStartPos.x - e.clientX,
			y: mouseStartPos.y - e.clientY,
		};

		// Update start position for next move
		mouseStartPos.x = e.clientX;
		mouseStartPos.y = e.clientY;

		const newPosition = setNewOffset(cardRef.current, mouseMoveDir);

		// Update card top and left position
		setPosition(newPosition);
	};

	const mouseUp = () => {
		document.removeEventListener("mousemove", mouseMove);
		document.removeEventListener("mouseup", mouseUp);
	};

	// Effect to auto-grow the textarea on mount
	useEffect(() => {
		autoGrow(textAreaRef);
	}, []);

	return (
		<div
			ref={cardRef}
			className="card"
			style={{
				backgroundColor: colors.colorBody,
				left: `${position.x}px`,
				top: `${position.y}px`,
			}}
		>
			<div
				className="card-header"
				onMouseDown={mouseDown}
				style={{ backgroundColor: colors.colorHeader }}
			>
				<Trash />
			</div>
			<div className="card-body">
				<textarea
					onFocus={() => bringCardToFront(cardRef.current)}
					onInput={() => autoGrow(textAreaRef)}
					ref={textAreaRef}
					style={{ 
						backgroundColor: colors.colorBody,  // Background color
						color: colors.colorText               // Text color
					}}
					defaultValue={body}
				></textarea>
			</div>
		</div>
	);
};

export default NoteCard;
