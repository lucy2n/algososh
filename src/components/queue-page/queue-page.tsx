import React, { useMemo, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './queue-page.module.css';
import { Queue } from "./class-queue";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<string>(7))
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)
  const [input, setInput] = useState<string>('');
  const [headIndex, setHeadIndex] = useState<number>(0);
  const [tailIndex, setTailIndex] = useState<number>(0);
  const [highlightedElement, setHighlitghedElement] = useState<number | null>();

  const maxLength = 4;

  const elements = useMemo<(string | null)[]>(() => { return queue.getElements() }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((e.target.value).trim());
  };

  const enqueue = async () => {
    setHighlitghedElement(queue.getTail());
    await sleep(SHORT_DELAY_IN_MS);
    let queueElement = input
    queue.enqueue(queueElement)
    setTailIndex(queue.getTail())
    setHighlitghedElement(null);
    setShouldUpdate(!shouldUpdate)
    setInput('')
  }

  const dequeue = async () => {
    setHighlitghedElement(queue.getHead());
    await sleep(SHORT_DELAY_IN_MS);
    queue.dequeue()
    setHeadIndex(queue.getHead())
    setHighlitghedElement(null);
    setShouldUpdate(!shouldUpdate)
  }

  const clear = () => {
    setHeadIndex(0)
    setTailIndex(0)
    queue.clear()
    setShouldUpdate(!shouldUpdate)
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.main}>
        <div className={styles.stack}>
        <Input 
          value={input} 
          extraClass={styles.input} 
          type='text' 
          isLimitText={true} 
          maxLength={maxLength} 
          onChange={onChange}
        />
        <Button 
          text='Добавить' 
          onClick={enqueue} 
          disabled={input === ''}
        />
        <Button 
          text='Удалить' 
          onClick={dequeue} 
          disabled={queue.isEmpty()}
        />
        </div>
      <Button 
        text='Очистить' 
        onClick={clear} 
        disabled={queue.isEmpty()}
      />
      </div>
      <div className={styles.elements}>
        {
          queue.getElements().map((item, index) => 
          <Circle head={elements[headIndex] !== null && index === headIndex ? 'head': ''}
                  tail={elements[tailIndex - 1] !== null &&  index === tailIndex - 1 ? 'tail': ''}
                  index={index} 
                  key={index}
                  state={index === highlightedElement ? ElementStates.Changing: ElementStates.Default}
                  letter={item ?? ''}/>)
        }
      </div>
    </SolutionLayout>
  );
};
