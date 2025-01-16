import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

import FormOtpInput from "@/components/form/form-otp-input";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import formatPhoneNumber from "../../../../utils/formatPhoneNumber";
import { LoginConfirmFormType, LoginConfirmSchema } from "../../schema";
import { loginConfirm } from "./actions";

interface Props {
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
}

export default function LoginConfirmForm({ setShowConfirm }: Props) {
  const t = useTranslations();
  const [phone] = useQueryState("phone", parseAsString);

  const { execute, isPending } = useServerAction(loginConfirm);

  const form = useForm<LoginConfirmFormType>({
    defaultValues: { otp: "", phone: phone || "" },
    resolver: zodResolver(LoginConfirmSchema),
  });

  const onSubmit = async (values: LoginConfirmFormType) => {
    const [, err] = await execute(values);

    if (err) {
      toast.error(err.message);
    } else {
      setShowConfirm(true);
    }
  };

  useEffect(() => {
    form.setFocus("otp");

    return () => {
      form.reset();
    };
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DialogHeader className="mb-4">
          <DialogTitle className=" text-xl">{t("login_confirm")}</DialogTitle>
          <DialogDescription className="">{t("login_confirm_description")}</DialogDescription>
        </DialogHeader>
        <p>{`The code was sent to the number ${formatPhoneNumber(phone || "")}`}</p>
        <FormOtpInput name="otp" />
        <DialogFooter>
          <Button loading={isPending} type="submit" className="w-full" size="lg">
            {t("login")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
