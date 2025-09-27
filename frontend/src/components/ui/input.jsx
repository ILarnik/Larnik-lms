import * as React from "react"

import { cn } from "../../lib/utils.js"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
return (
  <input
    ref={ref}
    type={type}
    {...props}
    className={cn(
      // Base
      "flex h-10 w-full rounded-md border border-input bg-background",
      "px-3 py-2 text-base md:text-sm",
      "text-foreground placeholder:text-muted-foreground",
      // File input reset
      "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
      // Focus & states
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
  />
);

})
Input.displayName = "Input"

export { Input }
