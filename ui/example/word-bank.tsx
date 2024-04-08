// word bank
import {Container, Word} from "@/ui/example/exercise";
import {UniqueIdentifier, useDraggable, useDroppable} from "@dnd-kit/core";
import {Item} from "@/ui/example/item";
import {v4} from "uuid";

export function WordBank({container}: { container: Container }) {
  const {setNodeRef} = useDroppable({
    id: container.id, // wordbank-xxx-xxx-xxx-xxx...
    data: {type: "container"}
  });
  
  return (
    <div
      ref={setNodeRef}
      className="w-full min-h-16 flex flex-wrap justify-center gap-2">
      {container.items.map((item) => {
        return (
          <DroppableWord key={item.id} id={item.id} word={item.word} isItemInBank={item.isItemInBank}/>
        );
      })}
    </div>
  )
}

export function DroppableWord({id, word, isItemInBank}: { id: UniqueIdentifier, word: string, isItemInBank: boolean }) {
  const {setNodeRef} = useDroppable({
    id: `droppable-${id}`,
    data: {type: "droppable"}
  });
  return (
    <div className="bg-zinc-300 w-fit h-fit rounded-xl" ref={setNodeRef}>
      {
        isItemInBank
          ? <DraggableWord id={id} word={word}/>
          : <span
            className="flex md:h-12 min-h-12 items-center justify-center font-normal text-base rounded-xl border border-b-4 border-zinc-300 bg-transparent px-3 text-zinc-300 whitespace-nowrap">{word}</span>
      }
    </div>
  )
}

export function DraggableWord({id, word}: { id: UniqueIdentifier, word: string }) {
  const {setNodeRef, attributes, listeners, transform, isDragging} = useDraggable({
    id: `item-${id}`,
    data: {type: "item"}
  })
  return (
    <Item
      dragOverlay={false}
      ref={setNodeRef}
      value={word}
      dragging={isDragging}
      transform={transform}
      listeners={listeners}
    />
  )
}

