// "use client";

// import { ShopOutlined } from "@ant-design/icons";
// import { Show } from "@refinedev/antd";
// import { useShow } from "@refinedev/core";
// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// // import "./App.css";

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

// // Recursive component for rendering tree nodes
// const TreeNode = ({ node }) => (
//   <Draggable
//     key={node.id}
//     draggableId={node.id}
//     index={0}
//     isDragDisabled={true}
//   >
//     {(provided) => (
//       <div
//         ref={provided.innerRef}
//         {...provided.draggableProps}
//         style={{
//           padding: "8px",
//           margin: "4px 0",
//           background: "lightgrey",
//           ...provided.draggableProps.style,
//         }}
//       >
//         {node.title}
//         {node.children && (
//           <Droppable droppableId={node.id} type="child">
//             {(provided) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 style={{ marginLeft: "20px" }}
//               >
//                 {node.children.map((childNode, childIndex) => (
//                   <Draggable
//                     key={childNode.id}
//                     draggableId={childNode.id}
//                     index={childIndex}
//                   >
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         style={{
//                           padding: "8px",
//                           margin: "4px 0",
//                           background: "lightgreen",
//                           ...provided.draggableProps.style,
//                         }}
//                       >
//                         {childNode.title}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         )}
//       </div>
//     )}
//   </Draggable>
// );

// const StoreShow = () => {
//   const { query } = useShow();
//   const [data, setData] = useState(initialData);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const parentId = result.source.droppableId;
//     const parentNode = data.find((node) => node.id === parentId);
//     if (!parentNode) return;

//     const reorderedChildren = Array.from(parentNode.children);
//     const [removed] = reorderedChildren.splice(result.source.index, 1);
//     reorderedChildren.splice(result.destination.index, 0, removed);

//     const newData = data.map((node) => {
//       if (node.id === parentId) {
//         return { ...node, children: reorderedChildren };
//       }
//       return node;
//     });

//     setData(newData);
//   };

//   return (
//     <Show isLoading={query.isLoading}>
//       <div style={{ width: "400px", margin: "0 auto", padding: "20px" }}>
//         <h2>Drag and Drop Tree Structure</h2>
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="tree" type="parent">
//             {(provided) => (
//               <div ref={provided.innerRef} {...provided.droppableProps}>
//                 {data.map((node) => (
//                   <TreeNode key={node.id} node={node} />
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>
//     </Show>
//   );
// };

// export default StoreShow;
// --------------------------------VVVVVV-----------------------
// import {
//     closestCenter,
//     DndContext,
//     PointerSensor,
//     useSensor,
//     useSensors,
//   } from "@dnd-kit/core";
//   import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
//   import {
//     arrayMove,
//     SortableContext,
//     useSortable,
//     verticalListSortingStrategy,
//   } from "@dnd-kit/sortable";
//   import { CSS } from "@dnd-kit/utilities";
//   import { useState } from "react";

//   // Sample tree data
//   const initialData = [
//     {
//       id: "1",
//       title: "Parent Node 1",
//       children: [
//         { id: "1.1", title: "Child Node 1.1" },
//         { id: "1.2", title: "Child Node 1.2" },
//       ],
//     },
//     {
//       id: "2",
//       title: "Parent Node 2",
//       children: [
//         { id: "2.1", title: "Child Node 2.1" },
//         { id: "2.2", title: "Child Node 2.2" },
//       ],
//     },
//   ];

//   // Sortable item component with animation
//   const SortableItem = ({ id, title, isParent }) => {
//     const { attributes, listeners, setNodeRef, transform, transition } =
//       useSortable({ id });

//     const style = {
//       transform: CSS.Transform.toString(transform),
//       transition,
//       padding: "8px",
//       margin: "4px 0",
//       backgroundColor: isParent ? "lightgrey" : "lightgreen", // Different background for parents/children
//       width: isParent ? "100%" : "80%", // Parents 100%, children 80%
//       borderRadius: "5px",
//     };

//     return (
//       <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//         {title}
//       </div>
//     );
//   };

//   // Droppable container for nodes
//   const DroppableContainer = ({ id, children }) => {
//     return (
//       <div style={{ padding: "10px", border: "1px dashed lightgrey" }}>
//         {children}
//       </div>
//     );
//   };

//   // Main DnD Tree Component
//   export default function DndTree() {
//     const [data, setData] = useState(initialData);

//     const sensors = useSensors(useSensor(PointerSensor));

//     const handleDragEnd = (event) => {
//       const { active, over } = event;
//       if (!over) return;

//       const sourceIndex = findNodeIndex(data, active.id);
//       const destinationIndex = findNodeIndex(data, over.id);

//       if (sourceIndex && destinationIndex) {
//         const newData = [...data];

//         // Handle parent reordering
//         if (sourceIndex.parentId === null && destinationIndex.parentId === null) {
//           // Parent node reordering
//           setData(arrayMove(newData, sourceIndex.index, destinationIndex.index));
//         } else if (
//           sourceIndex.parentId !== null &&
//           destinationIndex.parentId !== null
//         ) {
//           // Moving children within the same parent or different parents

//           // Get source and destination parents
//           const sourceParent = getNodeById(newData, sourceIndex.parentId);
//           const destinationParent = getNodeById(
//             newData,
//             destinationIndex.parentId
//           );

//           // Safely check if children arrays exist
//           if (!sourceParent.children) sourceParent.children = [];
//           if (!destinationParent.children) destinationParent.children = [];

//           // Moving within the same parent
//           if (sourceIndex.parentId === destinationIndex.parentId) {
//             sourceParent.children = arrayMove(
//               sourceParent.children,
//               sourceIndex.index,
//               destinationIndex.index
//             );
//           } else {
//             // Moving between parents
//             const [movedItem] = sourceParent.children.splice(
//               sourceIndex.index,
//               1
//             );

//             // If moving down, add to the bottom
//             if (destinationIndex.index > sourceIndex.index) {
//               destinationParent.children.push(movedItem);
//             } else {
//               // Otherwise, insert at the destination index
//               destinationParent.children.splice(
//                 destinationIndex.index,
//                 0,
//                 movedItem
//               );
//             }
//           }

//           setData(newData);
//         }
//       }
//     };

//     // Helper functions for finding and managing nodes
//     const findNodeIndex = (nodes, id) => {
//       for (let parentIndex = 0; parentIndex < nodes.length; parentIndex++) {
//         const parent = nodes[parentIndex];
//         const childIndex = parent.children?.findIndex((child) => child.id === id);
//         if (childIndex !== -1) {
//           return { parentId: parent.id, index: childIndex };
//         } else if (parent.id === id) {
//           return { parentId: null, index: parentIndex };
//         }
//       }
//       return null;
//     };

//     const getNodeById = (nodes, id) => {
//       if (id === null) return nodes;
//       return nodes.find((node) => node.id === id);
//     };

//     return (
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//         modifiers={[restrictToVerticalAxis]} // Optional: restrict to vertical dragging
//       >
//         <div style={{ width: "400px", margin: "0 auto", padding: "20px" }}>
//           <h2>Drag and Drop Tree Structure with Animations</h2>

//           {/ Parent Sortable Context /}
//           <SortableContext items={data} strategy={verticalListSortingStrategy}>
//             {data.map((node) => (
//               <DroppableContainer key={node.id} id={node.id}>
//                 {/ Parent Item /}
//                 <SortableItem id={node.id} title={node.title} isParent={true} />

//                 {/ Children Sortable Context /}
//                 {node.children && (
//                   <SortableContext
//                     items={node.children.map((child) => child.id)}
//                     strategy={verticalListSortingStrategy}
//                   >
//                     {node.children.map((childNode) => (
//                       <SortableItem
//                         key={childNode.id}
//                         id={childNode.id}
//                         title={childNode.title}
//                         isParent={false}
//                       />
//                     ))}
//                   </SortableContext>
//                 )}
//               </DroppableContainer>
//             ))}
//           </SortableContext>
//         </div>
//       </DndContext>
//     );
//   }
