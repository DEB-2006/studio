// 'use server'

/**
 * @fileOverview Recipe generation flow.
 *
 * generateRecipe - A function that generates a recipe based on a list of ingredients.
 * GenerateRecipeInput - The input type for the generateRecipe function.
 * GenerateRecipeOutput - The return type for the generateRecipe function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients to generate a recipe for.'),
  manualIngredients: z
    .array(z.string())
    .optional()
    .describe('A list of manually entered ingredients to add to the recipe.'),
});

export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  instructions: z.string().describe('The instructions for the generated recipe.'),
  ingredients: z.array(z.string()).describe('The list of ingredients used in the recipe.')
});

export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const generateRecipePrompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  prompt: `You are a world-class chef. Generate a recipe based on the following ingredients.

Ingredients: {{#each ingredients}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{#if manualIngredients}}
Manual Ingredients: {{#each manualIngredients}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}

Please provide:
1.  recipeName: the name of the recipe, be creative.
2.  ingredients: a list of ingredients required.
3.  instructions: step by step cooking instructions.
`,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await generateRecipePrompt({
      ingredients: input.ingredients,
      manualIngredients: input.manualIngredients,
    });
    return output!;
  }
);
