import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './stack-page.module.css';
import { ElementStates } from "../../types/element-states";
import { Stack } from "./class-stack";
import { Circle } from "../ui/circle/circle";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { nanoid } from "nanoid";

type TStackElement = {
  value: string;
  id: string;
  index: number;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [stack, setStack ]= useState<Stack<TStackElement>>(new Stack<TStackElement>());
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)

  const maxLenght = 4;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((e.target.value).trim());
  };

  const addElement = async () => {
    const newElement: TStackElement = {value: input, id: nanoid(), index: stack.getSize(), state: ElementStates.Changing}
    stack.push(newElement)
    await sleep(SHORT_DELAY_IN_MS)
    setShouldUpdate(!shouldUpdate)
    await sleep(SHORT_DELAY_IN_MS)
    stack.pop()
    newElement.state = ElementStates.Default
    stack.push(newElement)
    setInput('')
  }

  const deleteElement = async () => {
    let lastElement = stack.peak();
    if (lastElement !== null) {
      lastElement.state = ElementStates.Changing;
      stack.pop();
      stack.push(lastElement);
    
      setShouldUpdate(!shouldUpdate)
      await sleep(SHORT_DELAY_IN_MS)
      stack.pop();
      setStack(stack)
      setShouldUpdate(!setShouldUpdate)
    }
  }

  const clear = () => {
    stack.clear()
    setShouldUpdate(!shouldUpdate)
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.main}>
        <div className={styles.stack}>
        <Input 
          value={input} 
          extraClass={styles.input} 
          type='text' 
          isLimitText={true} 
          maxLength={maxLenght} 
          onChange={onChange} 
        />
        <Button 
          text='Добавить' 
          onClick={addElement} 
          disabled={input === ''}
        />
        <Button 
          text='Удалить' 
          onClick={deleteElement} 
          disabled={stack.getElements().length === 0}
        />
        </div>
      <Button 
        text='Очистить' 
        onClick={clear} 
        disabled={stack.getElements().length === 0}
      />
      </div>
      <div className={styles.elements}>
        { stack.getElements().map((item ) => <Circle head={item.id === (stack.peak() as TStackElement).id ? 'top' : ''} key={item.id} state={item.state} letter={item.value} index={item.index}/>) }
      </div>
    </SolutionLayout>
  );
};
