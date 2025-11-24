'use client';

import { useState } from 'react';
import { recipes, badges } from '@/data/recipes';
import GamificationBadge from '@/components/GamificationBadge';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Trophy } from 'lucide-react';

export default function ProfilePage() {
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

  const completedRecipesList = recipes.filter(r => completedRecipes.includes(r.id));
  const unlockedBadges = badges.filter(b => userPoints >= b.pontos);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header points={userPoints} />
      <main className="flex-1 py-12 pb-24 md:pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-neutral-dark mb-2">Seu Perfil</h1>

          <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-8 text-white shadow-lg mb-8 mt-8">
            <div className="flex items-center gap-4 mb-4">
              <Trophy className="w-12 h-12" />
              <div>
                <p className="text-white/80 text-sm">Seus Pontos</p>
                <p className="text-5xl font-bold">{userPoints}</p>
              </div>
            </div>
            <p className="text-white/70">Continue preparando receitas para ganhar mais pontos e badges!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-accent mb-2">{completedRecipes.length}</p>
              <p className="text-neutral-dark font-semibold">Receitas Feitas</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-primary mb-2">{unlockedBadges.length}</p>
              <p className="text-neutral-dark font-semibold">Badges Conquistados</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-primary-light mb-2">{recipes.length - completedRecipes.length}</p>
              <p className="text-neutral-dark font-semibold">Para Explorar</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Seus Badges</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {badges.map(badge => (
                <GamificationBadge 
                  key={badge.id} 
                  badge={badge}
                  unlocked={userPoints >= badge.pontos}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Receitas Feitas</h2>
            {completedRecipesList.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {completedRecipesList.map(recipe => (
                  <div key={recipe.id} className="bg-success/10 border-2 border-success rounded-xl p-4">
                    <p className="font-bold text-neutral-dark">{recipe.nome}</p>
                    <p className="text-sm text-neutral-dark/70">{recipe.idade}</p>
                    <p className="text-success text-sm font-semibold mt-2">✓ Completa</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-dark text-center py-8">Nenhuma receita feita ainda. Comece agora!</p>
            )}
          </div>
        </div>
      </main>
      <Navigation />
      <Footer />
    </div>
  );
}
