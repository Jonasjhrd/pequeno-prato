-- Function to create subscription when new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.subscriptions (user_id, plan_type)
  values (new.id, 'free');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create subscription for new users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
