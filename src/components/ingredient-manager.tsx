'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XCircle, PlusCircle, ListChecks, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface IngredientManagerProps {
  identifiedIngredients: string[];
  setIdentifiedIngredients: (ingredients: string[]) => void;
  manualIngredients: string[];
  setManualIngredients: (ingredients: string[]) => void;
  isLoading: boolean;
}

export function IngredientManager({
  identifiedIngredients,
  setIdentifiedIngredients,
  manualIngredients,
  setManualIngredients,
  isLoading,
}: IngredientManagerProps) {
  const [newIngredient, setNewIngredient] = useState('');

  const handleAddManualIngredient = () => {
    if (newIngredient.trim() && !manualIngredients.includes(newIngredient.trim())) {
      setManualIngredients([...manualIngredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const handleRemoveManualIngredient = (ingredientToRemove: string) => {
    setManualIngredients(manualIngredients.filter(ing => ing !== ingredientToRemove));
  };

  const handleRemoveIdentifiedIngredient = (ingredientToRemove: string) => {
    setIdentifiedIngredients(identifiedIngredients.filter(ing => ing !== ingredientToRemove));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
         <ListChecks className="text-primary" />
          Manage Ingredients
        </CardTitle>
        <CardDescription>Review identified ingredients and add your own.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">Identifying ingredients...</p>
          </div>
        )}

        {!isLoading && identifiedIngredients.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Identified by AI:</h3>
            <ScrollArea className="h-32 pr-3">
              <div className="flex flex-wrap gap-2">
                {identifiedIngredients.map((ingredient, index) => (
                  <Badge key={`identified-${index}`} variant="secondary" className="text-sm py-1 px-3 flex items-center gap-1">
                    {ingredient}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 ml-1 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveIdentifiedIngredient(ingredient)}
                      aria-label={`Remove ${ingredient}`}
                    >
                      <XCircle size={16} />
                    </Button>
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        
        {!isLoading && identifiedIngredients.length === 0 && (
           <p className="text-sm text-muted-foreground italic">No ingredients identified from image yet, or upload an image first.</p>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Add Manually:</h3>
          <div className="flex gap-2 mb-2">
            <Input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="e.g., Olive oil"
              className="flex-grow"
              onKeyDown={(e) => e.key === 'Enter' && handleAddManualIngredient()}
            />
            <Button onClick={handleAddManualIngredient} aria-label="Add manual ingredient">
              <PlusCircle size={18} className="mr-0 sm:mr-2" /> <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
          {manualIngredients.length > 0 && (
            <ScrollArea className="h-24 pr-3">
            <div className="flex flex-wrap gap-2">
              {manualIngredients.map((ingredient, index) => (
                <Badge key={`manual-${index}`} variant="outline" className="text-sm py-1 px-3 flex items-center gap-1 border-primary text-primary">
                  {ingredient}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 ml-1 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveManualIngredient(ingredient)}
                    aria-label={`Remove ${ingredient}`}
                  >
                    <XCircle size={16} />
                  </Button>
                </Badge>
              ))}
            </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
