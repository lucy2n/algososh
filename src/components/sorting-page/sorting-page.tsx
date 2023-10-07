import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from './sorting-page.module.css'
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
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
          <Button text='Новый массив'/>
        </div>
        <div className={styles.diagram}>
          <Column index={1}/>
        </div>
    </SolutionLayout>
  );
};
