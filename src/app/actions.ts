'use server';

import { identifyIngredients as identifyIngredientsFlow, IdentifyIngredientsOutput } from '@/ai/flows/identify-ingredients';
import { generateRecipe as generateRecipeFlow, GenerateRecipeInput, GenerateRecipeOutput } from '@/ai/flows/generate-recipe';

export async function processImageAction(photoDataUri: string): Promise<string[]> {
  try {
    // Validate data URI format (basic check)
    if (!photoDataUri.startsWith('data:image/') || !photoDataUri.includes(';base64,')) {
      throw new Error('Invalid image data URI format.');
    }
    const result: IdentifyIngredientsOutput = await identifyIngredientsFlow({ photoDataUri });
    return result.ingredients;
  } catch (error) {
    console.error("Error identifying ingredients:", error);
    // It's better to throw a more specific error or a generic one that client can handle
    if (error instanceof Error) {
        throw new Error(`Failed to identify ingredients: ${error.message}`);
    }
    throw new Error("An unknown error occurred while identifying ingredients.");
  }
}

export async function generateRecipeAction(data: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  try {
    if (!data.ingredients || data.ingredients.length === 0) {
        // if manual ingredients are also empty, then throw error
        if(!data.manualIngredients || data.manualIngredients.length === 0) {
            throw new Error("Cannot generate recipe without any ingredients.");
        }
    }
    const result: GenerateRecipeOutput = await generateRecipeFlow(data);
    return result;
  } catch (error) {
    console.error("Error generating recipe:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate recipe: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating recipe.");
  }
}
