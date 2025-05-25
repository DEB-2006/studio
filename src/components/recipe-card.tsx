'use client';

import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Trash2, Utensils } from 'lucide-react';
import Image from 'next/image';

interface RecipeCardProps {
  recipe: GenerateRecipeOutput;
  onView: () => void;
  onRemove: () => void;
}

export function RecipeCard({ recipe, onView, onRemove }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={`https://placehold.co/400x300.png?text=${encodeURIComponent(recipe.recipeName)}`}
            alt={recipe.recipeName}
            layout="fill"
            objectFit="cover"
            data-ai-hint="recipe food"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold mb-1 truncate" title={recipe.recipeName}>
          {recipe.recipeName}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 flex items-center">
          <Utensils size={14} className="mr-1.5 text-primary" />
          {recipe.ingredients.slice(0, 3).join(', ')}{recipe.ingredients.length > 3 ? '...' : ''}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 border-t bg-muted/30 flex justify-between items-center">
        <Button variant="default" onClick={onView} size="sm">
          <Eye size={16} className="mr-2" /> View
        </Button>
        <Button variant="destructive" onClick={onRemove} size="sm">
          <Trash2 size={16} className="mr-0 sm:mr-2" /> <span className="hidden sm:inline">Remove</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
