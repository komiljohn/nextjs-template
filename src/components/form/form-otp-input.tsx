import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

export default function FormOtpInput({
  name,
  slots = 6,
  label,
  className,
}: {
  name: string;
  label?: string;
  className?: string;
  slots?: number;
}) {
  const { control } = useFormContext();
  const t = useTranslations();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem className={cn("flex flex-col items-start w-full", className)}>
          {label && <FormLabel className=" text-[#344054] dark:text-white">{t(label)}</FormLabel>}
          <FormControl className="w-full">
            <InputOTP
              pattern="^[0-9]*$"
              maxLength={slots}
              value={value}
              onChange={onChange}
              containerClassName="w-full"
              inputMode="numeric"
            >
              <InputOTPGroup className="mx-auto w-full">
                {Array.from({ length: slots }).map((_, idx) => (
                  <InputOTPSlot key={idx} index={idx} className="w-full" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
}
