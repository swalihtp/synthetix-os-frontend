import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function RecommendationCard({ title, tools }) {
  
  return (
    <Card className="bg-white border border-black/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition duration-200">
      
      <CardHeader className="flex flex-row items-start justify-between">
        
        <div className="flex gap-2 items-start">
          
          {/* AI Icon */}
          <Sparkles className="size-4 text-black mt-1 opacity-70" />

          <CardTitle className="text-black text-sm font-medium leading-snug">
            {title}
          </CardTitle>
        </div>

        <Button
          size="icon-sm"
          variant="outline"
          className="rounded-full border-white/10 hover:bg-white/10"
        >
          <ArrowRight className="size-4 border-black" />
        </Button>

      </CardHeader>

      <CardContent>
        <p className="text-xs text-gray-500 mb-2">
          Uses:
        </p>

        <div className="flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-black/5 border-black/10 text-black/300"
            >
              {tool}
            </Badge>
          ))}
        </div>
      </CardContent>

    </Card>
  );
}