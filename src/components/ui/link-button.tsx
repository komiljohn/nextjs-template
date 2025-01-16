import { cva } from "class-variance-authority";
import { Loader } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const linkVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm leading-[22px]  transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-3",
        lg: "h-12 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface LinkProps {
  loading?: boolean;
  variant?: "default" | "outline" | "secondary" | "destructive" | "link" | "ghost";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isicon?: boolean;
  size?: "default" | "sm" | "md" | "lg" | "icon";
  href: string;
  className?: string;
  children: ReactNode;
}

function LinkButton({ className, variant, size, leftIcon, rightIcon, loading, href, ...props }: LinkProps) {
  return (
    <Link
      className={twMerge(
        linkVariants({
          variant,
          size: size,
        }),
        className
      )}
      {...props}
      href={href}
    >
      {leftIcon && !loading && leftIcon}
      {loading && <Loader className="animate-spin size-[22px]" />}
      <>{props.children}</>
      {rightIcon && rightIcon}
    </Link>
  );
}

LinkButton.displayName = "LinkButton";

export { LinkButton };
