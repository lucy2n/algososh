import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from './sorting-page.module.css'
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<Array<number>>([])

  const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomArr = () => {
    setArr(Array.from({length: randomInteger(3, 17)}, () => Math.floor(Math.random() * 100)))
  }

  useEffect(() => {
    randomArr()
  },[])

  return (
    <SolutionLayout title="Сортировка массива">
        <div className={styles.main}>
          <div className={styles.flex}>
            <RadioInput extraClass={styles.radio} label="Выбор"/>
            <RadioInput label="Пузырёк"/>
          </div>
          <div className={styles.flex}>
            <Button extraClass={styles.button} text='По возрастанию' sorting={Direction.Ascending}/>
            <Button text='По убыванию' sorting={Direction.Descending}/>
          </div>
          <Button text='Новый массив' onClick={randomArr}/>
        </div>
        <div className={styles.diagram}>
          {arr.map((item) => 
              <Column index={item}/> )
          }
        </div>
    </SolutionLayout>
  );
};
