"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils/shadcn-ui";
import {
  ComboBoxValueListType,
  DownloadHistoricalDataFormData
} from "@/lib/types";

import useFormData from "@/hooks/use-form-data";

import { TypographyLabel } from "@/components/ui/typography-label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { TypographyP } from "./typography-p";

export default function ComboBox({
  id,
  name,
  label,
  valueList = [],
  searchable = false,
  disabled = true
}: {
  id: string;
  name: string;
  label: string;
  valueList: ComboBoxValueListType[];
  searchable?: boolean;
  disabled?: boolean;
}) {
  const [isComboboxOpen, setIsComboboxOpen] = useState<boolean>(false);

  const {
    [id as keyof DownloadHistoricalDataFormData]: value,
    formDataHandler
  } = useFormData();

  const handleComboboxOpen = () => {
    if (disabled) return;

    setIsComboboxOpen((o) => !o);
  };

  const defaultValue = valueList.find((iValue) => iValue.value === value);

  return (
    <div className="flex flex-col gap-1">
      <TypographyLabel htmlFor={id}>{label}</TypographyLabel>

      <Popover open={isComboboxOpen} onOpenChange={handleComboboxOpen}>
        <PopoverTrigger asChild>
          <div
            className={`flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 cursor-pointer hover:bg-accent ease-in-out duration-300 ${
              disabled
                ? "cursor-not-allowed opacity-50 hover:bg-background"
                : ""
            } `}
          >
            <TypographyP>
              {defaultValue ? defaultValue.label : "Select from list..."}
            </TypographyP>
            <ChevronsUpDown />

            <input
              readOnly
              type="text"
              id={id}
              name={name}
              value={value}
              disabled={disabled}
              className="hidden"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 max-w-80 p-0">
          <Command>
            {searchable && <CommandInput placeholder="Search ticker..." />}
            <CommandList>
              <CommandEmpty>No ticker found.</CommandEmpty>
              <CommandGroup>
                {valueList.map((iValue) => (
                  <CommandItem
                    key={iValue.value}
                    value={iValue.value}
                    onSelect={(newValue) => {
                      formDataHandler({
                        type: "SELECT_INPUT_CHANGE",
                        data: {
                          field: id as keyof DownloadHistoricalDataFormData,
                          value: newValue
                        }
                      });
                      setIsComboboxOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === iValue.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {iValue.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
