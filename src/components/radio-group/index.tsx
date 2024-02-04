import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useMediaQuery,
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
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <FormControl>
      <FormLabel
        sx={
          disabled
            ? null
            : isMobile
            ? { fontSize: "14px", fontWeight: "bold", color: "black" }
            : { fontSize: "18px", fontWeight: "bold", color: "black" }
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
            sx={{ fontSize: "2px" }}
            key={i}
            disabled={disabled}
            value={item.value}
            control={
              <Radio
                size={isMobile ? "small" : "medium"}
                sx={{ padding: "6px" }}
              />
            }
            label={item.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
