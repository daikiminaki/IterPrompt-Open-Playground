import { Image } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import React, { useRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/themes";
import { cn } from "@/lib/utils";

 
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
 
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "cursor-pointer",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export function PlaygroundIconButton({ icon, tooltip, onClick, disabled }: { 
  icon: React.ReactNode, 
  tooltip: string,
  onClick: () => void,
  disabled?: boolean
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip >
        <TooltipTrigger asChild>
          <div 
            className={cn(
              "p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer",
              disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-600"
            )} 
            onClick={onClick}
          >
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function SiderIconButton({ icon, tooltip, onClick }: { 
  icon: React.ReactNode, 
  tooltip: string,
  onClick: () => void
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip >
        <TooltipTrigger asChild>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer" onClick={onClick}>
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function ImageUploadButton({ onUpload }: { onUpload: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  }

  return (
    <>
      <PlaygroundIconButton 
        icon={<Image className="w-4 h-4" />} 
        tooltip="Upload Image" 
        onClick={() => {
          inputRef.current?.click();
        }} 
      />
      <input 
        ref={inputRef}
        type="file" 
        accept="image/*" 
        onChange={handleUpload} 
        className="hidden" 
      />
    </>
  )
}
