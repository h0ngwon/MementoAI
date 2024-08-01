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
					className={`select-none p-6 mb-2 min-h-[50px] text-gray-700 rounded-3xl shadow-lg ${
						restrictedItemId === item.id
							? "bg-red-500"
							: snapshot.isDragging
							? "bg-gray-100"
							: selectedItems.includes(item.id)
							? "bg-blue-300"
							: "bg-white"
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
