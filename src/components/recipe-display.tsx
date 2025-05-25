'use client';

import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ChefHat, ClipboardList, ListOrdered, Utensils } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';

interface RecipeDisplayProps {
  recipe: GenerateRecipeOutput;
  onSaveRecipe: (recipe: GenerateRecipeOutput) => void;
  isFavorited: boolean;
}

export function RecipeDisplay({ recipe, onSaveRecipe, isFavorited }: RecipeDisplayProps) {
  if (!recipe) return null;

  return (
    <Card className="w-full shadow-xl animate-fadeIn">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-bold text-primary flex items-center gap-2">
              <ChefHat size={30} /> {recipe.recipeName}
            </CardTitle>
            <CardDescription className="text-md">Your AI-generated culinary creation!</CardDescription>
          </div>
          <Button
            variant={isFavorited ? "default" : "outline"}
            size="icon"
            onClick={() => onSaveRecipe(recipe)}
            aria-label={isFavorited ? "Remove from favorites" : "Save to favorites"}
            className="shrink-0"
          >
            <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
          <Image 
            src={`https://placehold.co/800x600.png?text=${encodeURIComponent(recipe.recipeName)}`} 
            alt={recipe.recipeName} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="food recipe" 
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-foreground">
            <ClipboardList size={22} className="text-accent" /> Ingredients
          </h3>
          <ScrollArea className="h-40 pr-3">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm flex items-center">
                  <Utensils size={14} className="mr-2 text-muted-foreground shrink-0" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-foreground">
            <ListOrdered size={22} className="text-accent" /> Instructions
          </h3>
          <ScrollArea className="h-64 pr-3">
            <div
              className="prose prose-sm max-w-none text-foreground recipe-instructions"
              dangerouslySetInnerHTML={{ __html: recipe.instructions.replace(/\n/g, '<br />') }}
            />
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Enjoy your meal! Remember to adjust seasonings to your taste.</p>
      </CardFooter>
    </Card>
  );
}
