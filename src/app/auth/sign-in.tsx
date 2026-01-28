import { FontAwesome } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../../lib/supabase'
import { glassSurface, theme } from '../../theme'

const SignIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)

  const handleSignIn = async () => {
    if (!supabase) {
      setError('Supabase is not configured. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.')
      return
    }
    if (!email || !password) {
      setError('Enter your email and password to continue.')
      return
    }
    setError(null)
    setLoading(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    if (signInError) {
      setError(signInError.message)
      return
    }
    router.replace('/')
  }

  const handleOAuth = async (provider: 'google' | 'apple') => {
    if (!supabase) {
      setError('Supabase is not configured. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.')
      return
    }
    setError(null)
    setOauthLoading(provider)
    const redirectTo = Linking.createURL('auth/callback')
    const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    })
    if (oauthError) {
      setOauthLoading(null)
      setError(oauthError.message)
      return
    }
    if (data?.url) {
      await Linking.openURL(data.url)
    } else {
      setError('Unable to start OAuth flow. Please try again.')
    }
    setOauthLoading(null)
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.background} />
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>K</Text>
            </View>
            <Text style={styles.brandName}>Koanile</Text>
          </View>
          <Text style={styles.headline}>Welcome back</Text>
          <Text style={styles.subhead}>Sign in to your drop-ready account.</Text>

          <View style={[styles.card, glassSurface]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="you@koanile.com"
              placeholderTextColor={theme.colors.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Pressable style={styles.primaryButton} onPress={handleSignIn} disabled={loading}>
              <Text style={styles.primaryButtonText}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => handleOAuth('apple')}
              disabled={oauthLoading !== null}
            >
              <FontAwesome name="apple" size={16} color={theme.colors.ink} />
              <Text style={styles.secondaryButtonText}>
                {oauthLoading === 'apple' ? 'Connecting...' : 'Continue with Apple'}
              </Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => handleOAuth('google')}
              disabled={oauthLoading !== null}
            >
              <FontAwesome name="google" size={16} color={theme.colors.ink} />
              <Text style={styles.secondaryButtonText}>
                {oauthLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
              </Text>
            </Pressable>
          </View>

          <Pressable onPress={() => router.push('/auth/sign-up')} style={styles.linkRow}>
            <Text style={styles.linkMuted}>New to Koanile?</Text>
            <Text style={styles.linkStrong}>Create an account</Text>
          </Pressable>

          <Pressable onPress={() => router.replace('/')} style={styles.skipRow}>
            <Text style={styles.skipText}>Back to shop</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F1020',
  },
  flex: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0F1020',
  },
  glowOne: {
    position: 'absolute',
    top: -140,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(0, 209, 255, 0.45)',
  },
  glowTwo: {
    position: 'absolute',
    bottom: -80,
    left: -40,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 94, 126, 0.45)',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  brandName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  headline: {
    marginTop: 20,
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },
  subhead: {
    marginTop: 6,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  card: {
    marginTop: 24,
    borderRadius: 24,
    padding: 18,
  },
  label: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.ink,
  },
  input: {
    marginTop: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: theme.colors.ink,
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: '#00D1FF',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#081018',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  errorText: {
    marginTop: 10,
    color: '#FF5E7E',
    fontSize: 12,
    fontWeight: '600',
  },
  secondaryButton: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  secondaryButtonText: {
    color: theme.colors.ink,
    fontWeight: '700',
    fontSize: 13,
  },
  linkRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  linkMuted: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  linkStrong: {
    color: '#00D1FF',
    fontWeight: '700',
  },
  skipRow: {
    marginTop: 14,
    alignItems: 'center',
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
})
