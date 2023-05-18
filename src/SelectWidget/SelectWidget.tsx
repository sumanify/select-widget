import { useEffect, useRef, useState } from "react";
import styles from "./selectwidget.module.css";

export interface ISelectOption {
  value: number | string;
  label: string;
}

interface ISingleSelect {
  multiple?: false;
  onChange: (value: ISelectOption | undefined) => void;
  value?: ISelectOption;
}

interface IMultiSelect {
  multiple: true;
  onChange: (value: ISelectOption[]) => void;
  value?: ISelectOption[];
}

type TSelectProps = {
  options: ISelectOption[];
} & (ISingleSelect | IMultiSelect);

export function SelectWidget({
  multiple,
  value,
  onChange,
  options,
}: TSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleClearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function handleSelectOption(option: ISelectOption) {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value?.filter((v) => v !== option));
      } else {
        onChange([...(value || []), option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function getIsOptionSelected(option: ISelectOption) {
    return multiple ? value?.includes(option) : option.value === value?.value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const containerCurrent = containerRef.current;
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;

      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (!isOpen) handleSelectOption(options[highlightedIndex]);
          break;

        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }

        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    containerCurrent?.addEventListener("keydown", handler);

    return () => {
      containerCurrent?.removeEventListener("keydown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={styles.container}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={styles.value}>
        {multiple
          ? value?.map((v) => (
              <button
                key={v.value}
                className={styles["option-badge"]}
                onClick={(event) => {
                  event.stopPropagation();
                  handleSelectOption(v);
                }}
              >
                {v.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
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
