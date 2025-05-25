'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ImageUploader } from '@/components/image-uploader';
import { IngredientManager } from '@/components/ingredient-manager';
import { RecipeDisplay } from '@/components/recipe-display';
import { processImageAction, generateRecipeAction } from '../actions';
import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { saveFavoriteRecipe, isRecipeFavorited, removeFavoriteRecipe } from '@/lib/local-storage';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle, Sparkles, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [identifiedIngredients, setIdentifiedIngredients] = useState<string[]>([]);
  const [manualIngredients, setManualIngredients] = useState<string[]>([]);
  const [generatedRecipe, setGeneratedRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFavorited, setCurrentFavorited] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (generatedRecipe) {
      setCurrentFavorited(isRecipeFavorited(generatedRecipe.recipeName));
    }
  }, [generatedRecipe]);

  const handleImageProcessed = useCallback(async (dataUri: string) => {
    setImageDataUri(dataUri);
    setIdentifiedIngredients([]); // Clear previous ingredients
    setGeneratedRecipe(null); // Clear previous recipe
    setError(null);
    setIsLoadingIngredients(true);
    try {
      const ingredients = await processImageAction(dataUri);
      setIdentifiedIngredients(ingredients);
      if (ingredients.length === 0) {
        toast({
          title: "No Ingredients Found",
          description: "The AI couldn't identify any ingredients in the image. Try another photo or add ingredients manually.",
          variant: "default",
        });
      } else {
         toast({
          title: "Ingredients Identified!",
          description: `Found ${ingredients.length} ingredients. Review and add more if needed.`,
          variant: "default",
        });
      }
    } catch (e: any) {
      setError(e.message || 'Failed to process image.');
      toast({
        title: "Error Identifying Ingredients",
        description: e.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingIngredients(false);
    }
  }, [toast]);

  const handleGenerateRecipe = async () => {
    setError(null);
    setGeneratedRecipe(null);
    if (identifiedIngredients.length === 0 && manualIngredients.length === 0) {
      setError('Please add some ingredients first!');
      toast({
        title: "Missing Ingredients",
        description: "Add ingredients from an image or manually before generating a recipe.",
        variant: "destructive",
      });
      return;
    }
    setIsLoadingRecipe(true);
    try {
      const recipe = await generateRecipeAction({
        ingredients: identifiedIngredients,
        manualIngredients: manualIngredients,
      });
      setGeneratedRecipe(recipe);
      setCurrentFavorited(isRecipeFavorited(recipe.recipeName));
       toast({
        title: "Recipe Generated!",
        description: `Enjoy your new recipe: ${recipe.recipeName}`,
      });
    } catch (e: any) {
      setError(e.message || 'Failed to generate recipe.');
      toast({
        title: "Error Generating Recipe",
        description: e.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRecipe(false);
    }
  };

  const handleSaveRecipe = (recipe: GenerateRecipeOutput) => {
    if (isRecipeFavorited(recipe.recipeName)) {
      removeFavoriteRecipe(recipe.recipeName);
      setCurrentFavorited(false);
      toast({
        title: "Recipe Removed",
        description: `${recipe.recipeName} removed from favorites.`,
      });
    } else {
      saveFavoriteRecipe(recipe);
      setCurrentFavorited(true);
      toast({
        title: "Recipe Saved!",
        description: `${recipe.recipeName} added to your favorites.`,
        action: <CheckCircle className="text-green-500" />,
      });
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 space-y-8">
      <header className="text-center py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary">
          SnapRecipe
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Turn photos of your ingredients into delicious, AI-generated recipes in seconds!
        </p>
      </header>

      {error && (
        <Alert variant="destructive" className="shadow-md">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Oops! Something went wrong.</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <ImageUploader onImageDataUriReady={handleImageProcessed} isLoading={isLoadingIngredients || isLoadingRecipe} />
        </div>
        <div className="space-y-6">
          <IngredientManager
            identifiedIngredients={identifiedIngredients}
            setIdentifiedIngredients={setIdentifiedIngredients}
            manualIngredients={manualIngredients}
            setManualIngredients={setManualIngredients}
            isLoading={isLoadingIngredients}
          />
          {(identifiedIngredients.length > 0 || manualIngredients.length > 0) && (
            <Button
              onClick={handleGenerateRecipe}
              disabled={isLoadingRecipe || isLoadingIngredients}
              className="w-full py-6 text-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
              size="lg"
            >
              {isLoadingRecipe ? (
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-6 w-6" />
              )}
              Generate Recipe
            </Button>
          )}
        </div>
      </div>

      {isLoadingRecipe && (
        <div className="flex flex-col items-center justify-center text-center p-10 bg-card rounded-lg shadow-lg">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-xl font-semibold text-foreground">Crafting your recipe...</p>
          <p className="text-muted-foreground">Our AI chef is hard at work!</p>
        </div>
      )}

      {generatedRecipe && !isLoadingRecipe && (
         <Card className="mt-8 shadow-xl animate-fadeIn">
           <CardHeader>
             <CardTitle className="text-2xl">Your Culinary Creation</CardTitle>
           </CardHeader>
           <CardContent>
            <RecipeDisplay
                recipe={generatedRecipe}
                onSaveRecipe={handleSaveRecipe}
                isFavorited={currentFavorited}
              />
           </CardContent>
         </Card>
      )}
    </div>
  );
}
