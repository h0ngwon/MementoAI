import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ columnId, column }) => {
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
							<Draggable
								key={item.id.toString()}
								draggableId={item.id.toString()}
								index={index}
							>
								{(provided, snapshot) => {
									const isRestricted =
										columnId === "column-1" &&
										snapshot.draggingOver === "column-3";
									return (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className={`select-none p-4 mb-2 min-h-[50px] text-white ${
												isRestricted
													? "bg-red-500"
													: snapshot.isDragging
													? "bg-[#263B4A]"
													: "bg-[#456C86]"
											}`}
											style={
												provided.draggableProps.style
											}
										>
											{item.content}
										</div>
									);
								}}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Column;
