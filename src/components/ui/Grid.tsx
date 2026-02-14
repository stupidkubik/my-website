import type { HTMLAttributes } from "react";

export function Grid({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`grid grid-cols-12 gap-5 xs:gap-6 ${className}`} {...props} />;
}

const colSpan = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12"
} as const;

const colSpanMd = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12"
} as const;

const colSpanLg = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12"
} as const;

type GridColProps = HTMLAttributes<HTMLDivElement> & {
  span?: keyof typeof colSpan;
  md?: keyof typeof colSpanMd;
  lg?: keyof typeof colSpanLg;
};

export function GridCol({ span = 12, md, lg, className = "", ...props }: GridColProps) {
  return (
    <div
      className={`min-w-0 ${colSpan[span]} ${md ? colSpanMd[md] : ""} ${lg ? colSpanLg[lg] : ""} ${className}`}
      {...props}
    />
  );
}
