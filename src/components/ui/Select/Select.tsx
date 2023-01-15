import React, {useState} from 'react';
import s from './Select.module.scss'
import cn from "classnames";
import arrow from '../../../assets/images/selectArrow.svg'
import {BrandType} from "../../../types";

type SelectProps = {
  selectItems: any,
  selectDefaultTitle: string,
  handleChoose: (chosenOptions: string[]) => void,
  isOnlyValueSelect?: boolean,
  styled?: boolean,
};

export const Select = (props: SelectProps) => {
  const {
    selectItems,
    selectDefaultTitle,
    handleChoose,
    isOnlyValueSelect,
    styled
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
    if (!isOnlyValueSelect) {
      if (optionIndex === -1) {
        newValue.push(option);
      } else {
        newValue.splice(optionIndex, 1);
      }
    } else {
      newValue = [];
      newValue.push(option);
      setSelectOpen(false);
    }
    isOnlyValueSelect ? setSelectTitle(newValue[0]) : setSelectTitle(`${newValue.length} of ${selectItems.length} selected`)
    setSelectedValues(newValue);
    handleChoose(newValue);
  };

  return (
    <div className={cn(s.selectWrapper, { [s.open]: isSelectOpened, [s.styled]: styled })}>
      <div className={s.select}>
        <div className={cn(s.selectTrigger, {[s.styled]: styled })} onClick={handleSelectOpen}>
          <span className={s.selectedValue}>{selectTitle}</span>
          <img src={arrow} alt='' className={cn(s.arrow, { [s.open]: isSelectOpened })}/>
        </div>
        <div className={s.customOptions}>
          {selectItems.map((item: any) => (
            <span
              key={item.id || ''}
              className={cn(s.customOption, { [s.active]: selectedValues.includes(item.title || item) })}
              data-value={item.title || item}
              onClick={handleOptionClick}
            >
              {item.title || item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};