'use client';

import { useParams, useRouter } from 'next/navigation';

// ✅ CORREÇÃO 1: Subimos 3 níveis (../../../) para chegar na pasta 'lib'
import { recipes } from '@/lib/recipes';

import { ArrowLeft, Clock, Users, Heart } from 'lucide-react';

// ✅ CORREÇÃO 2: Subimos 3 níveis para chegar na pasta 'components'
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

import { useState } from 'react';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  const recipe = recipes.find(r => r.id === id);

  const [userPoints] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem('userPoints');
    return saved ? parseInt(saved) : 0;
  });

  const [completedRecipes, setCompletedRecipes] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('completedRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  const isCompleted = completedRecipes.includes(id);

  const handleComplete = () => {
    if (!completedRecipes.includes(id)) {
      const newCompleted = [...completedRecipes, id];
      const newPoints = userPoints + 10;
      setCompletedRecipes(newCompleted);
      localStorage.setItem('completedRecipes', JSON.stringify(newCompleted));
      localStorage.setItem('userPoints', newPoints.toString());
    }
  };

  if (!recipe) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header points={userPoints} />
        <main className="flex-1 py-12 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-neutral-dark">Receita não encontrada</p>
            <button onClick={() => router.push('/recipes')} className="mt-4 text-primary font-semibold hover:underline">
              Voltar às receitas
            </button>
          </div>
        </main>
        <Navigation />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header points={userPoints} />
      <main className="flex-1 py-8 pb-24 md:pb-8">
        <div className="max-w-3xl mx-auto px-4">
          <button 
            onClick={() => router.push('/recipes')}
            className="flex items-center gap-2 text-primary font-semibold mb-6 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="relative rounded-3xl overflow-hidden mb-8 shadow-lg">
            <img 
              src={recipe.imagem || "/placeholder.svg"} 
              alt={recipe.nome}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-semibold capitalize">
              {recipe.categoria}
            </div>
            {isCompleted && (
              <div className="absolute inset-0 bg-success/20 flex items-center justify-center">
                <span className="text-6xl">✓</span>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-neutral-dark mb-4">{recipe.nome}</h1>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-primary/10 rounded-xl p-4 flex items-center gap-3">
              <Clock className="w-6 h-6 text-primary" />
              <div>
                <p className="text-xs text-neutral-dark/60">Tempo de preparo</p>
                <p className="font-bold text-primary">{recipe.tempo}</p>
              </div>
            </div>
            <div className="bg-accent/10 rounded-xl p-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-accent" />
              <div>
                <p className="text-xs text-neutral-dark/60">Faixa etária</p>
                <p className="font-bold text-accent">{recipe.idade}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">Ingredientes</h2>
              <ul className="space-y-3">
                {recipe.ingredientes.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                      •
                    </span>
                    <span className="text-neutral-dark">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-neutral-dark mb-4">Modo de Preparo</h2>
              <p className="text-neutral-dark leading-relaxed">{recipe.modoPreparo}</p>
            </div>

            <div className="bg-primary/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-neutral-dark mb-3">Informações Nutricionais</h2>
              <p className="text-primary-dark font-semibold">{recipe.nutrientes}</p>
            </div>

            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className={`w-full py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                isCompleted
                  ? 'bg-success/20 text-success-dark cursor-default'
                  : 'bg-success text-white hover:bg-success-dark shadow-lg'
              }`}
            >
              <Heart className="w-6 h-6 fill-current" />
              {isCompleted ? 'Receita Feita! +10 Pontos' : 'Marcar como Feita (+10 pontos)'}
            </button>
          </div>
        </div>
      </main>
      <Navigation />
      <Footer />
    </div>
  );
}
