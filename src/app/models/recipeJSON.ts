export interface RecipeJSON {
  id: number;
  name: string;
  tags: string[];
  servings: string;
  source: string;
  image: string;
  cooktime: number;
  preptime: number;
  ingredienttags: string[];
  ingredientlist: string[];
  directions: string;
}