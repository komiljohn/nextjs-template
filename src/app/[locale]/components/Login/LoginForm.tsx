import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";

import FormPhoneInput from "@/components/form/form-phone-input";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { LoginFormType, LoginSchema } from "../../schema";
import { login } from "./actions";

interface Props {
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({ setShowConfirm }: Props) {
  const t = useTranslations();
  const [, setPhone] = useQueryState("phone", parseAsString);

  const { execute, isPending } = useServerAction(login);

  const form = useForm<LoginFormType>({ defaultValues: { phone: "" }, resolver: zodResolver(LoginSchema) });

  const onSubmit = async (values: LoginFormType) => {
    const formattedPhone = values.phone.replaceAll("-", "").replaceAll(" ", "");
    const [, err] = await execute({ phone: formattedPhone });

    if (err) toast.error(err.message);
    else {
      setPhone(formattedPhone);
      setShowConfirm(true);
    }
  };

  useEffect(() => {
    return () => {
      form.reset();
    };
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DialogHeader>
          <DialogTitle className=" text-xl">{t("login")}</DialogTitle>
          <DialogDescription className="">{t("login_title")}</DialogDescription>
        </DialogHeader>
        <FormPhoneInput name="phone" label="phone" placeholder="enter_phone" />
        <DialogFooter>
          <Button loading={isPending} type="submit" className="w-full" size="lg">
            {t("login")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
