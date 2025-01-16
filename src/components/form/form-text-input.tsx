import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function FormTextInput({ name, label, placeholder, className, ...props }: Props) {
  const { control } = useFormContext();
  const t = useTranslations();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col items-start w-full", className)}>
          {label && <FormLabel className=" text-[#344054] dark:text-white">{t(label)}</FormLabel>}
          <FormControl className="w-full">
            <Input
              className="w-full"
              placeholder={placeholder ? t(placeholder) : ""}
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
              {...props}
            />
          </FormControl>
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
}
