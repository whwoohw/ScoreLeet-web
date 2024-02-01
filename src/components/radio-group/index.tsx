import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface CustomRadioGroup {
  title: string;
  disabled?: boolean;
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
  disabled,
  name,
  isRow,
  radioValue,
  changeRadio,
  radioItems,
}: CustomRadioGroup) {
  return (
    <FormControl>
      <FormLabel
        sx={
          !disabled
            ? { fontSize: "18px", fontWeight: "bold", color: "black" }
            : null
        }
        id="radio-label"
      >
        {title}
      </FormLabel>
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
            disabled={disabled}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
