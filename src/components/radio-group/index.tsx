import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface CustomRadioGroup {
  title: string;
  name?: string;
  isRow?: boolean;
  radioValue: string | number;
  changeRadio: (event: React.ChangeEvent<HTMLInputElement>) => void;
  radioItems: {
    value: string | number;
    label: string;
  }[];
}

export default function CustomRadioGroup({
  title,
  name,
  isRow,
  radioValue,
  changeRadio,
  radioItems,
}: CustomRadioGroup) {
  return (
    <FormControl>
      <FormLabel id="radio-label">{title}</FormLabel>
      <RadioGroup
        name={name}
        row={isRow}
        aria-labelledby="radio-label"
        value={radioValue}
        onChange={changeRadio}
      >
        {radioItems.map((item, i) => (
          <FormControlLabel
            key={i}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
