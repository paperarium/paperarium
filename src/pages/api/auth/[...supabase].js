/*
 * [...supabase].js
 * author: evan kirkiles
 * created on Tue Aug 30 2022
 * 2022 the nobot space,
 */
import { handleAuth } from '@supabase/auth-helpers-nextjs';

export default handleAuth({ logout: { returnTo: '/' } });
