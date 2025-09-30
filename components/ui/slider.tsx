"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="cursor-pointer transition-all relative h-2 w-full grow overflow-hidden rounded-full bg-gradient-to-r from-purple-600/15 to-cyan-600/15">
      <div className="absolute inset-0 flex items-center justify-between">
        {Array((props.max ?? 0) * 2 + 1)
          .fill(null)
          .map((x, i) => (
            <div key={i} className="h-full w-2 bg-sky-500 rounded-full"></div>
          ))}
      </div>
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-purple-600 to-cyan-600" />
    </SliderPrimitive.Track>
    <TooltipProvider>
      <Tooltip defaultOpen={true} open={true}>
        <TooltipTrigger asChild>
          <SliderPrimitive.Thumb className="cursor-pointer block h-6 w-6 rounded-full border-2 border-cyan-600 bg-background ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
        </TooltipTrigger>
        <TooltipContent className="-translate-y-1 bg-gradient-to-r px-4 from-purple-600 text-lg to-cyan-600 text-white">
          {props.value}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
