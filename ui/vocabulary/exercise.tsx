'use client'
import {
  closestCenter,
  DndContext, KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {arrayMove, horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates, useSortable} from '@dnd-kit/sortable';
import {ReactNode, useState} from "react";
import {SiTeratail} from "react-icons/si";
import {CSS} from "@dnd-kit/utilities";

export function Exercise() {
  const [items, setItems] = useState(["word1", "word2"]);
  console.log(items)
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  
  return (
    <DndContext sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-2">
        
        {/* answer droppable */}
        <div className="flex w-full border-t-2 border-b-2 border-zinc-300 min-h-16">
          {/*  draggable items */}

          
        </div>
        {/* choice droppable */}
        <Choice id={1} words={items}/>
      </div>
    </DndContext>
  );
  
  function handleDragEnd(event:any) {
    console.log(items)
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}


export function Sortable({children, word}: { children?: ReactNode, word: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: word});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <button
      ref={setNodeRef} style={style} {...listeners} {...attributes}
      className="flex items-center justify-center px-4 py-1 text-zinc-700 font-normal text-lg min-h-14 rounded-xl border border-b-4 border-zinc-300 bg-white">
      <span>{word}</span>
    </button>
  )
}
export function Choice({id, words} : {id:number, words: string[]}) {
  const { setNodeRef } = useDroppable({ id });
  
  return (
    <SortableContext
      items={words}
      strategy={horizontalListSortingStrategy}
    >
      <div className="flex items-center justify-center w-full gap-2 flex-wrap" ref={setNodeRef}>
        {/* word that I will wrap as the draggable */}
        {
          words.map((word) => {
            return <Sortable key={word} word={word}/>
          })
        }
      </div>
    </SortableContext>
  )
}

export function Droppable({children, id}: { children?: ReactNode, id: string }) {
  const {isOver, setNodeRef} = useDroppable({
    id: id
  })
  return (
    <div ref={setNodeRef} style={isOver ? {color: 'green'} : undefined}
         className="w-full h-full">
      {children}
    </div>
  )
}

export function MessageSvg() {
  return (
    // <SiTeratail className="text-gray-500 -mr-0.5 bg-white" style={{rotate:"-90deg"}}/>
    <svg height="20" viewBox="0 0 18 20" width="18">
      <path className="text-white fill-white"
            d="M2.00358 19.0909H18V0.909058L0.624575 15.9561C-0.682507 17.088 0.198558 19.0909 2.00358 19.0909Z"></path>
      <path className="fill-zinc-200" clipRule="evenodd"
            d="M18 2.48935V0L0.83037 15.6255C-0.943477 17.2398 0.312833 20 2.82143 20H18V18.2916H16.1228H2.82143C1.98523 18.2916 1.56646 17.3716 2.15774 16.8335L16.1228 4.12436L18 2.48935Z"
            fillRule="evenodd"></path>
    </svg>
  )
}
