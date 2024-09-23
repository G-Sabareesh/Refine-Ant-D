"use client";
import { ShopOutlined } from "@ant-design/icons";
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import React from "react";

const StoreShow = () => {
  const { query } = useShow();
  //   console.log(query?.data?.data);
  return (
    <Show isLoading={query.isLoading}>
      <div className="w-100 h-100 d-flex align-items-center justify-content-center flex-column">
        <span className="display-1">
          <ShopOutlined />
        </span>
        <br />
        <span>Comming Soon...</span>
      </div>
    </Show>
  );
};

export default StoreShow;

// import {
//   closestCenter,
//   DndContext,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
// import {
//   arrayMove,
//   SortableContext,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { useState } from "react";

// // Sample tree data
// const initialData = [
//   {
//     id: "1",
//     title: "Parent Node 1",
//     children: [
//       { id: "1.1", title: "Child Node 1.1" },
//       { id: "1.2", title: "Child Node 1.2" },
//     ],
//   },
//   {
//     id: "2",
//     title: "Parent Node 2",
//     children: [
//       { id: "2.1", title: "Child Node 2.1" },
//       { id: "2.2", title: "Child Node 2.2" },
//     ],
//   },
// ];

// // Sortable item component with animation
// const SortableItem = ({ id, title, isParent }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     padding: "8px",
//     margin: "4px 0",
//     backgroundColor: isParent ? "lightgrey" : "lightgreen",
//     width: isParent ? "100%" : "80%",
//     borderRadius: "5px",
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {title}
//     </div>
//   );
// };

// // Droppable container for nodes
// const DroppableContainer = ({ id, children }) => {
//   return (
//     <div style={{ padding: "10px", border: "1px dashed lightgrey" }}>
//       {children}
//     </div>
//   );
// };

// // Main DnD Tree Component
// export default function DndTree() {
//   const [data, setData] = useState(initialData);
//   const [originalData] = useState(initialData); // Store the original data for reset

//   const sensors = useSensors(useSensor(PointerSensor));

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     const sourceIndex = findNodeIndex(data, active.id);
//     const destinationIndex = findNodeIndex(data, over.id);

//     if (sourceIndex && destinationIndex) {
//       const newData = [...data];

//       // Handle parent reordering
//       if (sourceIndex.parentId === null && destinationIndex.parentId === null) {
//         setData(arrayMove(newData, sourceIndex.index, destinationIndex.index));
//       } else if (
//         sourceIndex.parentId !== null &&
//         destinationIndex.parentId !== null
//       ) {
//         // Moving children within the same parent or different parents

//         const sourceParent = getNodeById(newData, sourceIndex.parentId);
//         const destinationParent = getNodeById(
//           newData,
//           destinationIndex.parentId
//         );

//         if (!sourceParent.children) sourceParent.children = [];
//         if (!destinationParent.children) destinationParent.children = [];

//         if (sourceIndex.parentId === destinationIndex.parentId) {
//           sourceParent.children = arrayMove(
//             sourceParent.children,
//             sourceIndex.index,
//             destinationIndex.index
//           );
//         } else {
//           const [movedItem] = sourceParent.children.splice(
//             sourceIndex.index,
//             1
//           );

//           if (destinationIndex.index > sourceIndex.index) {
//             destinationParent.children.push(movedItem);
//           } else {
//             destinationParent.children.splice(
//               destinationIndex.index,
//               0,
//               movedItem
//             );
//           }
//         }

//         setData(newData);
//       }
//     }
//   };

//   // Helper functions for finding and managing nodes
//   const findNodeIndex = (nodes, id) => {
//     for (let parentIndex = 0; parentIndex < nodes.length; parentIndex++) {
//       const parent = nodes[parentIndex];
//       const childIndex = parent.children?.findIndex((child) => child.id === id);
//       if (childIndex !== -1) {
//         return { parentId: parent.id, index: childIndex };
//       } else if (parent.id === id) {
//         return { parentId: null, index: parentIndex };
//       }
//     }
//     return null;
//   };

//   const getNodeById = (nodes, id) => {
//     if (id === null) return nodes;
//     return nodes.find((node) => node.id === id);
//   };

//   // Save button handler: log current data state
//   const handleSave = () => {
//     console.log("Current order:", data);
//   };

//   // Reset button handler: reset to initial data
//   const handleReset = () => {
//     setData(originalData);
//   };

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//       modifiers={[restrictToVerticalAxis]}
//     >
//       <div style={{ width: "400px", margin: "0 auto", padding: "20px" }}>
//         <h2>Drag and Drop Tree Structure with Animations</h2>
//         <div style={{ marginBottom: "20px" }}>
//           <button onClick={handleSave} style={{ marginRight: "10px" }}>
//             Save
//           </button>
//           <button onClick={handleReset}>Reset</button>
//         </div>

//         <SortableContext items={data} strategy={verticalListSortingStrategy}>
//           {data.map((node) => (
//             <DroppableContainer key={node.id} id={node.id}>
//               <SortableItem id={node.id} title={node.title} isParent={true} />
//               {node.children && (
//                 <SortableContext
//                   items={node.children.map((child) => child.id)}
//                   strategy={verticalListSortingStrategy}
//                 >
//                   {node.children.map((childNode) => (
//                     <SortableItem
//                       key={childNode.id}
//                       id={childNode.id}
//                       title={childNode.title}
//                       isParent={false}
//                     />
//                   ))}
//                 </SortableContext>
//               )}
//             </DroppableContainer>
//           ))}
//         </SortableContext>
//       </div>
//     </DndContext>
//   );
// }
