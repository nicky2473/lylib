import { FC, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  /**
   * svg filename with .svg e.g down
   */
  filename: string;
}

const SVG: FC<Props> = ({ filename, ...props }) => {
  const { default: Component } = require(`./${filename}.svg`);
  return <Component {...props} />;
};

export default SVG;
