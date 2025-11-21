'use client';

import { useState } from 'react';
import { Heart, Upload } from 'lucide-react';
import { communityPosts as initialPosts } from '@/data/recipes';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import '@/index.css';

export default function CommunityPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recipeName, setRecipeName] = useState('');
  const [userName, setUserName] = useState('');
  const [posts, setPosts] = useState(initialPosts);
  
  const [userPoints] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem('userPoints');
    return saved ? parseInt(saved) : 0;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImage && recipeName && userName) {
      const newPost = {
        id: posts.length + 1,
        recipeNome: recipeName,
        user: userName,
        curtidas: 0,
        imagem: selectedImage,
        liked: false
      };
      setPosts([newPost, ...posts]);
      setSelectedImage(null);
      setRecipeName('');
      setUserName('');
    }
  };

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, curtidas: post.curtidas + (post.liked ? -1 : 1), liked: !post.liked } : post
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header points={userPoints} />
      <main className="flex-1 py-12 pb-24 md:pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-neutral-dark mb-2">Comunidade</h1>
          <p className="text-neutral-dark/70 mb-8">Compartilhe suas receitas e inspire outros pais!</p>

          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Compartilhe Sua Receita</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-2">
                  Seu Nome
                </label>
                <input
                  type="text"
                  placeholder="Como você se chama?"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral bg-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-2">
                  Nome da Receita
                </label>
                <input
                  type="text"
                  placeholder="Qual receita você preparou?"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral bg-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-2">
                  Adicionar Foto
                </label>
                <div 
                  onClick={() => document.getElementById('image-input')?.click()}
                  className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors"
                >
                  <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-primary font-semibold">Clique para adicionar foto</p>
                  <p className="text-neutral text-sm mt-1">ou arraste sua imagem aqui</p>
                </div>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setSelectedImage(event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </div>
              {selectedImage && (
                <div className="relative rounded-xl overflow-hidden">
                  <img src={selectedImage || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover" />
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}
              <button
                type="submit"
                disabled={!selectedImage || !recipeName || !userName}
                className="w-full bg-accent text-white font-bold py-3 rounded-xl hover:bg-accent-dark transition-colors disabled:bg-neutral-light disabled:cursor-not-allowed"
              >
                Compartilhar
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-dark">Feed da Comunidade</h2>
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={post.imagem || "/placeholder.svg"} alt={post.recipeNome} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-neutral-dark">{post.recipeNome}</h3>
                  <p className="text-neutral-dark/70 text-sm mb-4">por {post.user}</p>
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-2 text-neutral-dark hover:text-primary transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${post.liked ? 'fill-primary text-primary' : ''}`} />
                    <span className="font-semibold">{post.curtidas} curtidas</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Navigation />
      <Footer />
    </div>
  );
}
