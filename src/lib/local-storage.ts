import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe';

const FAVORITES_KEY = 'snapRecipeFavorites';

export function getFavoriteRecipes(): GenerateRecipeOutput[] {
  if (typeof window === 'undefined') {
    return [];
  }
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

export function saveFavoriteRecipe(recipe: GenerateRecipeOutput): void {
  if (typeof window === 'undefined') return;
  const favorites = getFavoriteRecipes();
  if (!favorites.find(fav => fav.recipeName === recipe.recipeName)) {
    favorites.push(recipe);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavoriteRecipe(recipeName: string): void {
  if (typeof window === 'undefined') return;
  let favorites = getFavoriteRecipes();
  favorites = favorites.filter(fav => fav.recipeName !== recipeName);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isRecipeFavorited(recipeName: string): boolean {
  if (typeof window === 'undefined') return false;
  const favorites = getFavoriteRecipes();
  return !!favorites.find(fav => fav.recipeName === recipeName);
}
