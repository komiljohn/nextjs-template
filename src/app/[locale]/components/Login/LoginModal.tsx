import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import LoginConfirmForm from "./LoginConfirmForm";
import LoginForm from "./LoginForm";

interface Props {
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {showConfirm ? (
          <LoginConfirmForm setShowConfirm={setShowConfirm} />
        ) : (
          <LoginForm setShowConfirm={setShowConfirm} />
        )}
      </DialogContent>
    </Dialog>
  );
}
