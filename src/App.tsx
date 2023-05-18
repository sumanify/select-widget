import React from "react";
import { ISelectOption, SelectWidget } from "./SelectWidget/SelectWidget";

const options = [
  { value: "1", label: "One" },
  { value: "2", label: "Two" },
  { value: 3, label: "Three" },
  { value: 4, label: "Four" },
  { value: 5, label: "Five" },
  { value: 6, label: "Six" },
  { value: 7, label: "Seven" },
  { value: 8, label: "Eight" },
  { value: 9, label: "Nine" },
  { value: 10, label: "Ten" },
];

function App() {
  const [value1, setValue1] = React.useState<ISelectOption | undefined>(
    options[1]
  );

  const [value2, setValue2] = React.useState<ISelectOption[]>([
    options[1],
    options[2],
  ]);

  return (
    <div>
      <SelectWidget
        onChange={(value) => setValue1(value)}
        options={options}
        value={value1}
      />

      <br />

      <SelectWidget
        multiple
        onChange={(value) => setValue2(value)}
        options={options}
        value={value2}
      />
    </div>
  );
}

export default App;
