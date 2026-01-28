import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { createClient } from '@supabase/supabase-js'

const extra = Constants.expoConfig?.extra ?? (Constants.manifest as any)?.extra ?? (Constants.manifest2 as any)?.extra ?? {}
const supabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL || (extra as { supabaseUrl?: string }).supabaseUrl
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  (extra as { supabaseAnonKey?: string }).supabaseAnonKey

if (!supabaseUrl || !supabaseAnonKey) {
  // Keeps app running while still signaling missing env.
  console.warn(
    'Supabase env missing. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your Expo env or app.json extra.'
  )
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
          flowType: 'pkce',
        },
      })
    : null
