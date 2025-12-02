-- Create indexes for better performance
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_subscriptions_stripe_customer_id on public.subscriptions(stripe_customer_id);
create index if not exists idx_completed_recipes_user_id on public.completed_recipes(user_id);
create index if not exists idx_community_posts_user_id on public.community_posts(user_id);
create index if not exists idx_community_posts_created_at on public.community_posts(created_at desc);
create index if not exists idx_post_likes_post_id on public.post_likes(post_id);
create index if not exists idx_post_likes_user_id on public.post_likes(user_id);
