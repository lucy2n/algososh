import React, { useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './list-page.module.css'
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./class-list-page";
import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TLinkedListElement = {
  value: string;
  head: string | React.ReactElement | null;
  tail: string | React.ReactElement | null;
  state: ElementStates;
}

export const ListPage: React.FC = () => {

  const [linkedList] = useState<LinkedList<TLinkedListElement>>(new LinkedList<TLinkedListElement>())
  const [listElements, setListElements] = useState<TLinkedListElement[]>([]); 
  const [valueInput, setValueInput] = useState<string>('');
  const [indexInput, setIndexInput] = useState<string>('');

  const maxLenght = 6;
  const maxNumber = 100;
  const inputMaxLength = 4;

  const [buttonsState, setButtonsState] = useState<{[buttonName: string]: {isLoader?: boolean, disabled: boolean}}>
  (
    {
      addTail: {isLoader: false, disabled: false},
      addHead: {isLoader: false, disabled: false},
      deleteTail: {isLoader: false, disabled: false},
      deleteHead: {isLoader: false, disabled: false},
      deleteAt: {isLoader: false, disabled: false},
      addAt: {isLoader: false, disabled: false},
      valueInput: {disabled: false},
      indexInput : {disabled: false}
      
    }
  )

  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)

  const setButtonsDefault = () => {
    setButtonsState( {
      addTail: {isLoader: false, disabled: false},
      addHead: {isLoader: false, disabled: false},
      deleteTail: {isLoader: false, disabled: false},
      deleteHead: {isLoader: false, disabled: false},
      deleteAt: {isLoader: false, disabled: false},
      addAt: {isLoader: false, disabled: false},
      valueInput: {disabled: false},
      indexInput : {disabled: false}
    })
  }

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput((e.target.value).trim());
  };

  const onIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexInput((e.target.value).trim());
  };

  useEffect(() => {
    for(let i = 0; i < maxLenght; i++) {
      const randValue = Math.floor(Math.random() * maxNumber)
      linkedList.append({value: randValue.toString(), head: null, tail: null, state: ElementStates.Default})
    }
    setShouldUpdate(!shouldUpdate)
  }, [])

  const addElementByIndex = async () => {
    setButtonsState({
      addTail: {isLoader: false, disabled: true},
      addHead: {isLoader: false, disabled: true},
      deleteTail: {isLoader: false, disabled: true},
      deleteHead: {isLoader: false, disabled: true},
      deleteAt: {isLoader: false, disabled: true},
      addAt: {isLoader: true, disabled: true},
      valueInput: {disabled: true},
      indexInput : {disabled: true}
    })
    let element: TLinkedListElement = {value: valueInput, head: null, tail: null, state: ElementStates.Default}
    let array = linkedList.toArray()
    for(let i = 0; i <= +indexInput; i++)  {
      array[i].value.head = (<Circle letter={valueInput} isSmall={true} state={ElementStates.Changing}/>)
      setListElements(array.map(item => item.value))

      await sleep(SHORT_DELAY_IN_MS)
      array[i].value.head = null
      array[i].value.state = ElementStates.Changing
      setListElements(array.map(item => item.value))
    }
    await sleep(SHORT_DELAY_IN_MS)
    linkedList.insertAt(element, +indexInput)
    array = linkedList.toArray()
    array.map(item => item.value.state = ElementStates.Default)
    array[+indexInput].value.state = ElementStates.Modified
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    array[+indexInput].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    setButtonsDefault()
    setIndexInput('')
  }

  const deleteElementByIndex = async () => {
    setButtonsState({
      addTail: {isLoader: false, disabled: true},
      addHead: {isLoader: false, disabled: true},
      deleteTail: {isLoader: false, disabled: true},
      deleteHead: {isLoader: false, disabled: true},
      deleteAt: {isLoader: true, disabled: true},
      addAt: {isLoader: false, disabled: true},
      valueInput: {disabled: true},
      indexInput : {disabled: true}
    })
    let array = linkedList.toArray()
    for(let i = 0; i <= +indexInput; i++)  {
      await sleep(SHORT_DELAY_IN_MS)
      array[i].value.tail = null
      array[i].value.state = ElementStates.Changing
      setListElements(array.map(item => item.value))
    }
    array[+indexInput].value.tail = (<Circle letter={array[+indexInput].value.value} isSmall={true} state={ElementStates.Changing}/>)
    await sleep(SHORT_DELAY_IN_MS)
    array[+indexInput].value.value = '' 
    array[+indexInput].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    linkedList.deleteAt(+indexInput)
    array = linkedList.toArray()
    array.map(item => item.value.state = ElementStates.Default)
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    array[+indexInput].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    setButtonsDefault();
    setIndexInput('')
  }

  const addElementHead = async () => {
    setButtonsState({
      addTail: {isLoader: false, disabled: true},
      addHead: {isLoader: true, disabled: true},
      deleteTail: {isLoader: false, disabled: true},
      deleteHead: {isLoader: false, disabled: true},
      deleteAt: {isLoader: false, disabled: true},
      addAt: {isLoader: false, disabled: true},
      valueInput: {disabled: true},
      indexInput : {disabled: true}
    })
    let element: TLinkedListElement = {value: valueInput, head: null, tail: null, state: ElementStates.Default}
    let array = linkedList.toArray()
    array[0].value.head = (<Circle letter={valueInput} isSmall={true} state={ElementStates.Changing}/>)
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)

    linkedList.prepend(element)
    array = linkedList.toArray();
    array[1].value.head = null;
    array[0].value.state = ElementStates.Modified;
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    array[0].value.state = ElementStates.Default;
    setListElements(array.map(item => item.value))
    setButtonsDefault()
    setValueInput('')
  }

  const addElementTail = async () => {
    setButtonsState({
      addTail: {isLoader: true, disabled: true},
      addHead: {isLoader: false, disabled: true},
      deleteTail: {isLoader: false, disabled: true},
      deleteHead: {isLoader: false, disabled: true},
      deleteAt: {isLoader: false, disabled: true},
      addAt: {isLoader: false, disabled: true},
      valueInput: {disabled: true},
      indexInput : {disabled: true}
    })
    let element: TLinkedListElement = {value: valueInput, head: null, tail: null, state: ElementStates.Modified}
    let array = linkedList.toArray()
    array[array.length - 1].value.head = (<Circle letter={valueInput} isSmall={true} state={ElementStates.Changing}/>)
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    array[array.length - 1].value.head = null
    linkedList.append(element)
    array = linkedList.toArray()
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    array[array.length - 1].value.state = ElementStates.Default
    setListElements(array.map(item => item.value))
    setButtonsDefault()
    setValueInput('')
  }

  const deleteElementHead = async () => {
    setButtonsState({
      addTail: {isLoader: false, disabled: true},
      addHead: {isLoader: false, disabled: true},
      deleteTail: {isLoader: false, disabled: true},
      deleteHead: {isLoader: true, disabled: true},
      deleteAt: {isLoader: false, disabled: true},
      addAt: {isLoader: false, disabled: true},
      valueInput: {disabled: true},
      indexInput : {disabled: true}
    })
    let array = linkedList.toArray()
    array[0].value.tail = (<Circle letter={array[0].value.value} isSmall={true} state={ElementStates.Changing}/>)
    array[0].value.value = ''
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)

    linkedList.deleteHead()
    setShouldUpdate(!shouldUpdate)
    setButtonsDefault()
    setValueInput('')
  }

  const deleteElementTail = async () => {
    setButtonsState({
      addTail: {isLoader: false, disabled: true},
      addHead: {isLoader: false, disabled: true},
      deleteTail: {isLoader: true, disabled: true},
      deleteHead: {isLoader: false, disabled: true},
      deleteAt: {isLoader: false, disabled: true},
      addAt: {isLoader: false, disabled: true},
      valueInput: {disabled: true},
      indexInput : {disabled: true}
    })
    let array = linkedList.toArray()
    array[array.length - 1].value.tail = (<Circle letter={array[0].value.value} isSmall={true} state={ElementStates.Changing}/>)
    array[array.length - 1].value.value = ''
    setListElements(array.map(item => item.value))
    await sleep(SHORT_DELAY_IN_MS)
    linkedList.deleteTail()
    setShouldUpdate(!shouldUpdate)
    setButtonsDefault()
    setValueInput('')
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.main}>
        <div className={styles.column}>
          <Input 
            placeholder = "Введите значение" 
            value={valueInput} 
            onChange={onValueChange} 
            extraClass={styles.input} 
            type='text' isLimitText={true} 
            maxLength={inputMaxLength} 
            disabled={buttonsState.valueInput.disabled}
          />
          <Button 
            extraClass={styles.buttonsValue} 
            onClick={addElementHead} 
            text='Добавить в head' 
            isLoader={buttonsState.addHead.isLoader} 
            disabled={valueInput === '' ? true : false || buttonsState.addHead.disabled}
          />
          <Button
            extraClass={styles.buttonsValue}
            onClick={addElementTail} 
            text='Добавить в tail' 
            isLoader={buttonsState.addTail.isLoader} 
            disabled={valueInput === '' ? true : false || buttonsState.addTail.disabled}
          />
          <Button 
            extraClass={styles.buttonsValue} 
            onClick={deleteElementHead} 
            text='Удалить из head' 
            isLoader={buttonsState.deleteHead.isLoader} 
            disabled={buttonsState.deleteHead.disabled || linkedList.toArray().length === 0}
          />
          <Button 
            extraClass={styles.buttonsValue} 
            onClick={deleteElementTail} 
            text='Удалить из tail'  
            isLoader={buttonsState.deleteTail.isLoader} 
            disabled={buttonsState.deleteTail.disabled || linkedList.toArray().length === 0}
          />
        </div>
        <div className={styles.column}>
          <Input 
            placeholder = "Введите индекс" 
            value={indexInput} 
            onChange={onIndexChange} 
            extraClass={styles.input} 
            type='text' 
            disabled={buttonsState.indexInput.disabled} 
          />
          <Button 
            extraClass={styles.buttonsIndex}
            onClick={addElementByIndex} 
            isLoader={buttonsState.addAt.isLoader} 
            disabled={buttonsState.addAt.disabled || indexInput === '' || valueInput === '' || !/^\d+$/.test(indexInput)} 
            text='Добавить по индексу'
          />
          <Button 
            extraClass={styles.buttonsIndex}
            onClick={deleteElementByIndex} 
            isLoader={buttonsState.deleteAt.isLoader} 
            disabled={buttonsState.deleteAt.disabled || indexInput === '' || !/^\d+$/.test(indexInput)} 
            text='Удалить по индексу'
          />
        </div>
      </div>
      <div className={styles.elements}>
        {
          linkedList.toArray().map((item, index) => 
            <div className={styles.element} key={index}>
              <Circle 
                head={item.value.head === null && index === 0 ? 'head': item.value.head}
                tail={item.value.tail === null && index === (linkedList.getSize() - 1) ? 'tail': item.value.tail}
                index={index} 
                key={index} 
                letter={item.value.value}
                state={item.value.state}
                />
              { item.next !== null && <ArrowIcon key={nanoid()}/> }
            </div>
          )
        }
      </div>
    </SolutionLayout>
  );
};
