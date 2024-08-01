import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Item from "./Item";

const Column = ({ columnId, column, restrictedItemId, selectedItems, onSelectItem }) => {
	return (
		<div className="flex flex-col items-center mt-10">
			<Droppable droppableId={columnId} key={columnId}>
				{(provided, snapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className={`p-1 w-64 min-h-[500px] ${
							snapshot.isDraggingOver
								? "bg-blue-400"
								: "bg-gray-300"
						}`}
					>
						{column.items.map((item, index) => (
							<Item
								key={item.id.toString()}
								item={item}
								index={index}
								restrictedItemId={restrictedItemId}
								selectedItems={selectedItems}
								onSelectItem={onSelectItem}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Column;