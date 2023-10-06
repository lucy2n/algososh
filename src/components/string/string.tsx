import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './string.module.css'
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [arr, setArr] = useState<Array<string>>([])
  const addWord = () => {
    setArr(input.split(''))
    console.log(arr)
  }
  return (
    <SolutionLayout title="Строка">
      <div className={styles.main}> 
        <Input value={input} onChange={(e) => setInput(e.currentTarget.value)} isLimitText={true} maxLength={11} extraClass={styles.mr} />
        <Button text="Развернуть" onClick={addWord}/>
      </div>
      <div className={styles.letters}>
        {
          arr.map((item) => 
            <Circle extraClass={styles.letter} letter={item}></Circle>
          ) 
        }
      </div>
    </SolutionLayout>
  );
};
