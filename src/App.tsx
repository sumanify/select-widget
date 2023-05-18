import React from "react";
import { SelectWidget } from "./SelectWidget/SelectWidget";

const options = [
  { value: "1", label: "One" },
  { value: "2", label: "Two" },
  { value: 3, label: "Three" },
];

interface ISelectOption {
  value: number | string;
  label: string;
}

function App() {
  const [value, setValue] = React.useState<ISelectOption | undefined>(
    options[1]
  );

  return (
    <div>
      <SelectWidget
        onChange={(value) => setValue(value)}
        options={options}
        value={value}
      />
    </div>
  );
}

export default App;
