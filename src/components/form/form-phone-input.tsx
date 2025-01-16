import { maskitoPhoneOptionsGenerator } from "@maskito/phone";
import { useMaskito } from "@maskito/react";
import metadata from "libphonenumber-js/min/metadata";
import { useTranslations } from "next-intl";
import type { RefCallback } from "react";
import { ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const options = maskitoPhoneOptionsGenerator({
  countryIsoCode: "UZ",
  metadata,
  separator: "-",
});

const withMaskitoRegister = (
  registerResult: ControllerRenderProps<FieldValues, string>,
  maskitoRef: RefCallback<HTMLElement | null>
): ControllerRenderProps<FieldValues, string> & {
  onInput: ControllerRenderProps<FieldValues, string>["onChange"];
} => {
  const ref: RefCallback<HTMLElement | null> = (node): void => {
    registerResult.ref(node);
    maskitoRef(node);
  };

  return {
    ...registerResult,
    ref,
    onInput: registerResult.onChange,
    onChange: registerResult.onChange,
  };
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

export default function FormPhoneInput({ name, type, label, placeholder, className, ...props }: Props) {
  const { control } = useFormContext();
  const t = useTranslations();
  const maskitoRef = useMaskito({ options });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col items-start w-full", className)}>
          {label && <FormLabel className=" text-[#344054] dark:text-white">{t(label)}</FormLabel>}
          <FormControl className="w-full">
            <Input
              type={type ?? "text"}
              className="w-full"
              placeholder={t(placeholder)}
              {...props}
              {...withMaskitoRegister(field, maskitoRef)}
            />
          </FormControl>
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
}
