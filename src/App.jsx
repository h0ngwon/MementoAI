import React, { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { columnData } from "../data";
import Column from "./components/Column";

const App = () => {
	const [columns, setColumns] = useState(columnData);

	const onDragEnd = useCallback(
		(result) => {
			if (!result.destination) return;

			const { source, destination } = result;

			if (
				source.droppableId === "column-1" &&
				destination.droppableId === "column-3"
			) {
				return;
			}

			const sourceColumnIndex = columns.findIndex(
				(column) => column.id === source.droppableId
			);
			const destColumnIndex = columns.findIndex(
				(column) => column.id === destination.droppableId
			);

			const sourceColumn = columns[sourceColumnIndex];
			const destColumn = columns[destColumnIndex];

			const sourceItems = Array.from(sourceColumn.items);
			const destItems = Array.from(destColumn.items);

			if (source.droppableId !== destination.droppableId) {
				const [removed] = sourceItems.splice(source.index, 1);
				destItems.splice(destination.index, 0, removed);
				const newColumns = [...columns];
				newColumns[sourceColumnIndex] = {
					...sourceColumn,
					items: sourceItems,
				};
				newColumns[destColumnIndex] = {
					...destColumn,
					items: destItems,
				};
				setColumns(newColumns);
			} else {
				const [removed] = sourceItems.splice(source.index, 1);
				sourceItems.splice(destination.index, 0, removed);
				const newColumns = [...columns];
				newColumns[sourceColumnIndex] = {
					...sourceColumn,
					items: sourceItems,
				};
				setColumns(newColumns);
			}
		},
		[columns]
	);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="flex justify-around">
				{columns.map((column) => (
					<Column
						key={column.id}
						columnId={column.id}
						column={column}
					/>
				))}
			</div>
		</DragDropContext>
	);
};

export default App;
