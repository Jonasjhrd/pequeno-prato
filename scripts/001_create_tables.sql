-- Tabela de assinaturas (subscriptions)
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  plan_type text not null check (plan_type in ('free', 'essential', 'premium')),
  status text not null check (status in ('active', 'cancelled', 'expired')) default 'active',
  started_at timestamp with time zone default now(),
  expires_at timestamp with time zone,
  stripe_subscription_id text,
  stripe_customer_id text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Tabela de receitas completadas (completed_recipes)
create table if not exists public.completed_recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  recipe_id integer not null,
  completed_at timestamp with time zone default now(),
  unique(user_id, recipe_id)
);

-- Tabela de posts da comunidade (community_posts)
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  recipe_name text not null,
  description text,
  image_url text not null,
  likes integer default 0,
  created_at timestamp with time zone default now()
);

-- Tabela de likes em posts
create table if not exists public.post_likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  post_id uuid references public.community_posts(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  unique(user_id, post_id)
);

-- Índices para performance
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_completed_recipes_user_id on public.completed_recipes(user_id);
create index if not exists idx_community_posts_user_id on public.community_posts(user_id);
create index if not exists idx_post_likes_user_post on public.post_likes(user_id, post_id);

-- Habilitar Row Level Security
alter table public.subscriptions enable row level security;
alter table public.completed_recipes enable row level security;
alter table public.community_posts enable row level security;
alter table public.post_likes enable row level security;
