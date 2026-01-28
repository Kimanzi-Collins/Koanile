import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '../../lib/supabase'
import { theme } from '../../theme'

const AuthCallback = () => {
  const router = useRouter()
  const { code } = useLocalSearchParams<{ code?: string }>()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      if (!supabase) {
        setError('Supabase is not configured. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.')
        return
      }
      if (!code || Array.isArray(code)) {
        setError('Missing auth code. Please try signing in again.')
        return
      }
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      if (exchangeError) {
        setError(exchangeError.message)
        return
      }
      router.replace('/')
    }
    run()
  }, [code, router])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.ink} />
      <Text style={styles.text}>{error ? error : 'Finishing sign-in...'}</Text>
    </View>
  )
}

export default AuthCallback

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    paddingHorizontal: 24,
    gap: 12,
  },
  text: {
    color: theme.colors.muted,
    textAlign: 'center',
  },
})
