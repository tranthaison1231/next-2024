import * as React from "react";

import { Button, type ButtonProps } from "@/core/components/atoms/button";

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, children, ...props }, ref) => {
    return (
      <Button ref={ref} {...props}>
        {loading && (
          <svg
            className="mr-2 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <title>loading</title>
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </Button>
    );
  },
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
