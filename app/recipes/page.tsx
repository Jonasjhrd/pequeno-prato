'use client';

import { useState } from 'react';
import { recipes } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import RecipeFilter from '@/components/RecipeFilter';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import '@/globals.css';

export default function RecipesPage() {
  const [selectedAge, setSelectedAge] = useState('');
  const [userPoints] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem('userPoints');
    return saved ? parseInt(saved) : 0;
  });

  const [completedRecipes] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('completedRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  const filtered = selectedAge 
    ? recipes.filter(r => r.idade === selectedAge)
    : recipes;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header points={userPoints} />
      <main className="flex-1 py-12 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-neutral-dark mb-3">Nossas Receitas</h1>
          <p className="text-neutral-dark/70 mb-8">Encontre receitas perfeitas para a idade do seu pequeno</p>

          <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-sm font-semibold text-neutral-dark mb-4">Filtrar por idade:</p>
            <RecipeFilter selectedAge={selectedAge} onAgeChange={setSelectedAge} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe}
                completed={completedRecipes.includes(recipe.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-dark text-lg">Nenhuma receita encontrada para essa faixa etária</p>
            </div>
          )}
        </div>
      </main>
      <Navigation />
      <Footer />
    </div>
  );
}
