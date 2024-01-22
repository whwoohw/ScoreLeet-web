import { CSSProp } from "styled-components";

type MediaQueryProps = {
  mobile: number;
  tablet: number;
  desktop: number;
};

const sizes: MediaQueryProps = {
  mobile: 600,
  tablet: 950,
  desktop: 1024,
};

export const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
  (acc, label) => {
    acc[label] = (style: string) =>
      `@media (max-width: ${sizes[label] / 16}em) { ${style} }`;
    return acc;
  },
  {} as { [key in keyof typeof sizes]: (style: string) => CSSProp }
);
