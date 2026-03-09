"use client";

import * as runtime from "react/jsx-runtime";

interface MdxContentProps {
  code: string;
}

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

export function MdxContent({ code }: MdxContentProps) {
  const Component = useMDXComponent(code);
  return <Component />;
}
