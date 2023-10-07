import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from './fibonacci.module.css'
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { sleep } from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [arr, setArr] = useState<Array<string>>([])
  const [buttonPressed, setButtonPressed] = useState<boolean>(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const getFibonacciNumbers = async (n: number) => {
    setArr([]);
    if(1 <= n && n <= 19)  {
      let tempArr: number[] = [0, 1];
      setArr(['1'])
      await sleep(SHORT_DELAY_IN_MS);
      for (let i = 2; i <= n + 1; i++) {
        tempArr.push(tempArr[i - 2] + tempArr[i - 1])   
        setArr(tempArr.slice(1).map((item) => item.toString()))
        await sleep(SHORT_DELAY_IN_MS);
      }
    }
    setButtonPressed(false)
  } 

  const calculate = () => {
    setButtonPressed(true)
    getFibonacciNumbers(+input)
  }
  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.main}> 
        <Input type='!text' value={input} onChange={onChange} isLimitText={true} max={19} extraClass={styles.mr} />
        <Button text="Рассчитать" onClick={calculate} isLoader={buttonPressed} disabled={buttonPressed}/>
      </div>
      <div className={styles.letters}>
        { arr.map((item, index) => <Circle index={index} letter={item}/>) }
      </div>
    </SolutionLayout>
  );
};
