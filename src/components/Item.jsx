import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Item = ({
	item,
	index,
	restrictedItemId,
	selectedItems,
	onSelectItem,
}) => {
	return (
		<Draggable
			key={item.id.toString()}
			draggableId={item.id.toString()}
			index={index}
		>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`select-none p-4 mb-2 min-h-[50px] text-white ${
						restrictedItemId === item.id
							? "bg-red-500"
							: snapshot.isDragging
							? "bg-[#263B4A]"
							: selectedItems.includes(item.id)
							? "bg-green-500"
							: "bg-[#456C86]"
					}`}
					style={provided.draggableProps.style}
					onClick={() => onSelectItem(item.id)}
				>
					{item.content}
				</div>
			)}
		</Draggable>
	);
};

export default Item;
