import React, {useState} from 'react';
import s from './Select.module.scss'
import cn from "classnames";
import arrow from '../../../assets/images/selectArrow.svg'
import {BrandType} from "../../../types";

type SelectProps = {
  selectItems: BrandType[],
  selectDefaultTitle: string,
  handleChoose: (chosenOptions: string[]) => void,
};

export const Select = (props: SelectProps) => {
  const {
    selectItems,
    selectDefaultTitle,
    handleChoose,
  } = props;

  const [selectTitle, setSelectTitle] = useState(selectDefaultTitle);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isSelectOpened, setSelectOpen] = useState(false);

  const handleSelectOpen = (e: any) => {
    setSelectOpen(!isSelectOpened)
  };

  const handleOptionClick = (e: any) => {
    const option = e.target.innerText;
    const optionIndex = selectedValues.indexOf(option);
    let newValue = [...selectedValues];
    if (optionIndex === -1) {
      newValue.push(option);
    } else {
      newValue.splice(optionIndex, 1);
    }
    setSelectTitle(`${newValue.length} of ${selectItems.length} selected`)
    setSelectedValues(newValue);
    handleChoose(newValue);
  };

  return (
    <div className={cn(s.selectWrapper, { [s.open]: isSelectOpened })}>
      <div className={s.select}>
        <div className={s.selectTrigger} onClick={handleSelectOpen}>
          <span className={s.selectedValue}>{selectTitle}</span>
          <img src={arrow} alt='' className={cn(s.arrow, { [s.open]: isSelectOpened })}/>
        </div>
        <div className={s.customOptions}>
          {selectItems.map((item) => (
            <span
              key={item.id}
              className={cn(s.customOption, { [s.active]: selectedValues.includes(item.title) })}
              data-value={item.title}
              onClick={handleOptionClick}
            >
              {item.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};