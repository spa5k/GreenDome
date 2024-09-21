import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function SettingsWidget() {
  return (
    <Card className="col-span-1 row-span-1 overflow-hidden relative">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full">
          <Settings className="mr-2 h-4 w-4" /> Open Settings
        </Button>
      </CardContent>
      <div className="absolute -bottom-10 -right-10 opacity-10">
        <Settings className="h-32 w-32" />
      </div>
    </Card>
  );
}
