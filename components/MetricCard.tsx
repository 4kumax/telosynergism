import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type MetricCardProps = {
  title: string;
  value: string;
  badge?: string;
  description?: string;
};

export default function MetricCard({
  title,
  value,
  badge,
  description,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {badge && <Badge variant="outline">{badge}</Badge>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{value}</div>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
