import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function PageHeader({ title, description, icon, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="gradient-primary rounded-xl p-3">
            {icon}
          </div>
        )}
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}
