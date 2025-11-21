-- Subscriptions RLS Policies
create policy "Users can view their own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can update their own subscription"
  on public.subscriptions for update
  using (auth.uid() = user_id);

-- Completed Recipes RLS Policies
create policy "Users can view their own completed recipes"
  on public.completed_recipes for select
  using (auth.uid() = user_id);

create policy "Users can insert their own completed recipes"
  on public.completed_recipes for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own completed recipes"
  on public.completed_recipes for delete
  using (auth.uid() = user_id);

-- Community Posts RLS Policies
create policy "Anyone can view community posts"
  on public.community_posts for select
  using (true);

create policy "Users can insert their own posts"
  on public.community_posts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own posts"
  on public.community_posts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own posts"
  on public.community_posts for delete
  using (auth.uid() = user_id);

-- Post Likes RLS Policies
create policy "Anyone can view post likes"
  on public.post_likes for select
  using (true);

create policy "Users can insert their own likes"
  on public.post_likes for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own likes"
  on public.post_likes for delete
  using (auth.uid() = user_id);
