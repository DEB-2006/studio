'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getFavoriteRecipes, removeFavoriteRecipe, isRecipeFavorited } from '@/lib/local-storage';
import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { RecipeCard } from '@/components/recipe-card';
import { RecipeDisplay } from '@/components/recipe-display';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { HeartCrack, Salad } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<GenerateRecipeOutput[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isRecipeDisplayOpen, setIsRecipeDisplayOpen] = useState(false);
  const { toast } = useToast();

  const loadFavorites = useCallback(() => {
    setFavoriteRecipes(getFavoriteRecipes());
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRemoveFavorite = (recipeName: string) => {
    removeFavoriteRecipe(recipeName);
    loadFavorites(); // Refresh the list
    toast({
      title: "Recipe Removed",
      description: `${recipeName} has been removed from your favorites.`,
    });
    if (selectedRecipe?.recipeName === recipeName) {
      setIsRecipeDisplayOpen(false); // Close dialog if current recipe is removed
      setSelectedRecipe(null);
    }
  };
  
  const handleToggleFavoriteInDialog = (recipe: GenerateRecipeOutput) => {
    // This function should only remove, as we are in favorites.
    // If it's somehow not favorited (state inconsistency), this check handles it.
    if (isRecipeFavorited(recipe.recipeName)) {
        removeFavoriteRecipe(recipe.recipeName);
        toast({
            title: "Recipe Removed",
            description: `${recipe.recipeName} removed from favorites.`,
        });
    }
    // This will close the dialog and refresh list.
    setIsRecipeDisplayOpen(false);
    loadFavorites();
  };


  const openRecipeDialog = (recipe: GenerateRecipeOutput) => {
    setSelectedRecipe(recipe);
    setIsRecipeDisplayOpen(true);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <header className="text-center py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary">
          Your Favorite Recipes
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
          All your saved culinary masterpieces, ready for another go!
        </p>
      </header>

      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-lg shadow-md">
          <HeartCrack size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">No Favorites Yet!</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't saved any recipes. <br/>
            Start by generating some delicious meals on the home page.
          </p>
          <Button asChild size="lg">
            <Link href="/">
              <Salad size={20} className="mr-2" /> Find Recipes
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipeName}
              recipe={recipe}
              onView={() => openRecipeDialog(recipe)}
              onRemove={() => handleRemoveFavorite(recipe.recipeName)}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <Dialog open={isRecipeDisplayOpen} onOpenChange={setIsRecipeDisplayOpen}>
          <DialogContent className="max-w-3xl p-0">
            <RecipeDisplay
              recipe={selectedRecipe}
              onSaveRecipe={() => handleToggleFavoriteInDialog(selectedRecipe)}
              isFavorited={isRecipeFavorited(selectedRecipe.recipeName)}
            />
             <DialogClose asChild>
                <Button type="button" variant="outline" className="m-4 absolute top-0 right-0 h-8 w-8 p-0 sm:h-auto sm:w-auto sm:relative sm:m-0 sm:mt-2 sm:mr-2">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
