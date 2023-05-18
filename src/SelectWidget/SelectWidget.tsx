import { useEffect, useState } from "react";
import styles from "./selectwidget.module.css";

interface ISelectOption {
  value: number | string;
  label: string;
}

interface ISelectProps {
  onChange: (value: ISelectOption | undefined) => void;
  value?: ISelectOption;
  options: ISelectOption[];
}

export function SelectWidget({ value, onChange, options }: ISelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  function handleClearOptions() {
    onChange(undefined);
  }

  function handleSelectOption(option: ISelectOption) {
    if (option !== value) onChange(option);
  }

  function getIsOptionSelected(option: ISelectOption) {
    return option.value === value?.value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      tabIndex={0}
      className={styles.container}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(event) => {
          event.stopPropagation();
          handleClearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}> </div>
      <div className={styles.caret}> </div>

      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(event) => {
              event.stopPropagation();
              handleSelectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            className={`${styles.option} ${
              getIsOptionSelected(option) ? styles.selected : ""
            } ${index === highlightedIndex ? styles.highlighted : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
