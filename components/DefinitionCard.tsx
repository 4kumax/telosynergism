import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DefinitionCardProps = {
  title: string;
  description: string;
};

export default function DefinitionCard({
  title,
  description,
}: DefinitionCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {description}
      </CardContent>
    </Card>
  );
}
