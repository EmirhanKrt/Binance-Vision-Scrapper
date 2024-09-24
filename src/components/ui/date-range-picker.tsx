"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

import { DownloadHistoricalDataFormData } from "@/lib/types";

import useFormData from "@/hooks/use-form-data";

import { TypographyLabel } from "@/components/ui/typography-label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function DateRangePicker({
  startDate,
  endDate,
  label,
  disabled = true
}: {
  startDate: {
    id: string;
    name: string;
  };
  endDate: {
    id: string;
    name: string;
  };
  label: string;
  disabled?: boolean;
}) {
  const [isDateRangePickerOpen, setIsDateRangePickerOpen] =
    useState<boolean>(false);

  const {
    [startDate.id as keyof DownloadHistoricalDataFormData]: startDateValue = "",
    [endDate.id as keyof DownloadHistoricalDataFormData]: endDateValue = "",
    formDataHandler
  } = useFormData();

  const handleDateRangePickerOpen = () => {
    if (disabled) return;

    setIsDateRangePickerOpen((o) => !o);
  };

  const handleChange = (range: DateRange | undefined) => {
    if (!range) return;

    if (range.from) {
      formDataHandler({
        type: "SELECT_INPUT_CHANGE",
        data: {
          field: "StartDate",
          value: range.from.toString()
        }
      });
    }

    if (range.to) {
      formDataHandler({
        type: "SELECT_INPUT_CHANGE",
        data: {
          field: "EndDate",
          value: range.to.toString()
        }
      });
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <TypographyLabel htmlFor={startDate.id}>{label}</TypographyLabel>

      <Popover
        open={isDateRangePickerOpen}
        onOpenChange={handleDateRangePickerOpen}
      >
        <PopoverTrigger asChild>
          <div
            className={`flex items-center gap-3 rounded-md border border-input bg-background px-3 py-2 cursor-pointer hover:bg-accent ease-in-out duration-300 ${
              disabled
                ? "cursor-not-allowed opacity-50 hover:bg-background"
                : ""
            } `}
          >
            <CalendarIcon className="h-4 w-4" />
            {startDateValue ? (
              endDateValue ? (
                <>
                  {format(startDateValue, "LLL dd, y")} -{" "}
                  {format(endDateValue, "LLL dd, y")}
                </>
              ) : (
                format(startDateValue, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}

            <input
              readOnly
              type="string"
              id={startDate.id}
              name={startDate.name}
              value={startDateValue || ""}
              className="hidden"
            />
            <input
              readOnly
              type="string"
              id={endDate.id}
              name={endDate.name}
              value={endDateValue || ""}
              className="hidden"
            />
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={new Date(startDateValue)}
            selected={{
              from: new Date(startDateValue),
              to: new Date(endDateValue)
            }}
            onSelect={handleChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
