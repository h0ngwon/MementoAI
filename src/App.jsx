import React, { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import data from "../data.json";
import Column from "./components/Column";

const App = () => {
	const [columns, setColumns] = useState(data.columnData);
	const [restrictedItemId, setRestrictedItemId] = useState(null);
	const [selectedItems, setSelectedItems] = useState([]);

	const isEven = useCallback((itemId) => {
		const number = parseInt(itemId.split("-")[1], 10);
		return number % 2 === 0;
	}, []);

	const sortItems = useCallback((items) => {
		return items.sort((a, b) => {
			const aNumber = parseInt(a.id.split("-")[1], 10);
			const bNumber = parseInt(b.id.split("-")[1], 10);
			return aNumber - bNumber;
		});
	}, []);

	const onDragEnd = useCallback(
		(result) => {
			setRestrictedItemId(null);

			if (!result.destination) return;

			const { source, destination } = result;

			if (
				source.droppableId === "column-1" &&
				destination.droppableId === "column-3"
			) {
				setRestrictedItemId(source.draggableId);
				alert(
					"첫 번째 컬럼에서 세 번째 컬럼으로는 이동할 수 없습니다."
				);
				setSelectedItems([]);
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

			const sourceItem = sourceItems[source.index];
			const destItem = destItems[destination.index];

			if (isEven(sourceItem.id) && destItem && isEven(destItem.id)) {
				setRestrictedItemId(source.draggableId);
				alert(
					"짝수 아이템은 다른 짝수 아이템 앞으로 이동할 수 없습니다."
				);
				setSelectedItems([]);
				return;
			}

			const itemsToMove = selectedItems.includes(sourceItem.id)
				? selectedItems.map((id) =>
						sourceItems.find((item) => item.id === id)
				  )
				: [sourceItem];

			if (source.droppableId !== destination.droppableId) {
				// 다른 컬럼으로 이동
				itemsToMove.forEach((item) => {
					const index = sourceItems.findIndex(
						(i) => i.id === item.id
					);
					sourceItems.splice(index, 1);
				});

				destItems.splice(destination.index, 0, ...itemsToMove);

				const newColumns = [...columns];
				newColumns[sourceColumnIndex] = {
					...sourceColumn,
					items: sortItems(sourceItems),
				};

				newColumns[destColumnIndex] = {
					...destColumn,
					items: sortItems(destItems),
				};

				setColumns(newColumns);
				setSelectedItems([]);
			} else {
				// 같은 컬럼 내 이동
				itemsToMove.forEach((item) => {
					const index = sourceItems.findIndex(
						(i) => i.id === item.id
					);
					sourceItems.splice(index, 1);
				});

				sourceItems.splice(destination.index, 0, ...itemsToMove);

				const newColumns = [...columns];
				newColumns[sourceColumnIndex] = {
					...sourceColumn,
					items: sortItems(sourceItems),
				};

				setColumns(newColumns);
				setSelectedItems([]);
			}
		},
		[columns, selectedItems, isEven]
	);

	const onSelectItem = (itemId) => {
		setSelectedItems((prevSelectedItems) =>
			prevSelectedItems.includes(itemId)
				? prevSelectedItems.filter((id) => id !== itemId)
				: [...prevSelectedItems, itemId]
		);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="flex justify-around">
				{columns.map((column) => (
					<Column
						key={column.id}
						columnId={column.id}
						column={column}
						restrictedItemId={restrictedItemId}
						selectedItems={selectedItems}
						onSelectItem={onSelectItem}
					/>
				))}
			</div>
		</DragDropContext>
	);
};

export default App;
