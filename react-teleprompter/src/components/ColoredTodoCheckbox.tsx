import React, { useId, useState, useEffect } from "react";
import { Checkbox } from "./Checkbox";
import { Label } from "./Label";

interface TodoItem {
  id: string;
  text: string;
  color: 'indigo' | 'emerald' | 'rose' | 'amber';
  completed: boolean;
}

interface ColoredTodoCheckboxProps {
  todos: TodoItem[];
  onTodoChange?: (id: string, completed: boolean) => void;
}

export const ColoredTodoCheckbox: React.FC<ColoredTodoCheckboxProps> = ({
  todos,
  onTodoChange
}) => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(todos);

  useEffect(() => {
    setTodoItems(todos);
  }, [todos]);

  const handleTodoChange = (id: string, completed: boolean) => {
    setTodoItems(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed } : todo
      )
    );
    onTodoChange?.(id, completed);
  };

  return (
    <div className="space-y-3">
      {todoItems.map((todo) => {
        const checkboxId = useId();
        return (
          <div 
            key={todo.id}
            className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
          >
            <Checkbox
              id={checkboxId}
              checked={todo.completed}
              onChange={(checked) => handleTodoChange(todo.id, checked)}
              color={todo.color}
            />
            <Label 
              htmlFor={checkboxId} 
              strikethrough={todo.completed}
            >
              {todo.text}
            </Label>
          </div>
        );
      })}
    </div>
  );
};
