import { cn } from "@/lib/utils"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function ProgressIndicator({ currentStep, totalSteps, labels }: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
                index + 1 <= currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted bg-background text-muted-foreground",
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "mt-2 text-xs font-medium",
                index + 1 <= currentStep ? "text-primary" : "text-muted-foreground",
              )}
            >
              {labels[index]}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute inset-0 flex items-center">
          <div className="h-0.5 w-full bg-muted"></div>
        </div>
        <div className="absolute inset-0 flex items-center">
          <div
            className="h-0.5 bg-primary transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

