-- Função para criar assinatura gratuita ao cadastrar usuário
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Criar assinatura gratuita para o novo usuário
  insert into public.subscriptions (user_id, plan_type, status)
  values (new.id, 'free', 'active');
  
  return new;
end;
$$;

-- Trigger para executar a função ao criar novo usuário
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Função para atualizar contador de likes
create or replace function public.update_post_likes_count()
returns trigger
language plpgsql
security definer
as $$
begin
  if TG_OP = 'INSERT' then
    update public.community_posts
    set likes = likes + 1
    where id = new.post_id;
  elsif TG_OP = 'DELETE' then
    update public.community_posts
    set likes = likes - 1
    where id = old.post_id;
  end if;
  return null;
end;
$$;

-- Trigger para atualizar likes ao adicionar/remover
drop trigger if exists update_likes_count on public.post_likes;
create trigger update_likes_count
  after insert or delete on public.post_likes
  for each row
  execute function public.update_post_likes_count();
