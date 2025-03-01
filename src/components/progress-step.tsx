import { ChevronRight } from "lucide-react"

interface ProgressStep {
  label: string
  isActive: boolean
  isCompleted: boolean
}

interface ProgressStepsProps {
  steps: ProgressStep[]
}

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="flex items-center space-x-2 mb-8">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center">
          <div
            className={`px-4 py-2 rounded-lg ${step.isActive
                ? "bg-primary text-primary-foreground"
                : step.isCompleted
                  ? "bg-muted text-muted-foreground"
                  : "bg-background text-foreground"
              }`}
          >
            {step.label}
          </div>
          {index < steps.length - 1 && (
            <div className="mx-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}


