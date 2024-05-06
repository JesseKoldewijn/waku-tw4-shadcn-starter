"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/utils/cn";

const Switch = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SwitchPrimitives.Root>) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer border-foreground focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-background data-[state=unchecked]:bg-input inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors hover:ring-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "bg-foreground block h-5 w-5 rounded-full border border-transparent ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
