export const setNewOffset = (card, mouseMoveDir = {x: 0, y: 0}) => {
	const offsetLeft = card.offsetLeft - mouseMoveDir.x;
	const offsetTop = card.offsetTop - mouseMoveDir.y;

	return {
		x: offsetLeft < 0 ? 0 : offsetLeft,
		y: offsetTop < 0 ? 0 : offsetTop,
	};
};
export const autoGrow = (textAreaRef) => {
	textAreaRef.current.style.height = "auto";
	textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
};

export const bringCardToFront = (card) => {
	const cards = document.querySelectorAll(".card");
	let highestZIndex = 0;
	cards.forEach((c) => {
		const zIndex = parseInt(window.getComputedStyle(c).zIndex, 10) || 0;
		if (zIndex > highestZIndex) {
			highestZIndex = zIndex;
		}
	});
	card.style.zIndex = highestZIndex + 1;
};

export const bodyParser = ( value) => {
	try {
		JSON.parse(value);
		return JSON.parse(value);
	} catch (error) {	
		return value;
	}
}