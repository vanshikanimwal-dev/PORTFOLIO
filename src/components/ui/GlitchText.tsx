import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  children?: ReactNode;
};

export function GlitchText({ text, as: Tag = "span", className, id }: Props) {
  return (
    <Tag id={id} className={cn("glitch", className)} data-text={text}>
      {text}
    </Tag>
  );
}
