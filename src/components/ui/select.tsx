"use client";

import { ChangeEvent } from "react";

import useFormData from "@/hooks/use-form-data";

import { TypographyLabel } from "@/components/ui/typography-label";
import { DownloadHistoricalDataFormData } from "@/lib/types";

export default function Select({
  children,
  id,
  name,
  label,
  disabled = false
}: {
  children: React.ReactNode;
  id: string;
  name: string;
  label: string;
  disabled?: boolean;
}) {
  const {
    [id as keyof DownloadHistoricalDataFormData]: value,
    formDataHandler
  } = useFormData();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    formDataHandler({
      type: "SELECT_INPUT_CHANGE",
      data: {
        field: event.target.id as keyof DownloadHistoricalDataFormData,
        value: event.target.value
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <TypographyLabel htmlFor={id}>{label}</TypographyLabel>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>option]:line-clamp-1"
      >
        {children}
      </select>
    </div>
  );
}
