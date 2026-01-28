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

const SignUp = () => {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)

  const handleSignUp = async () => {
    if (!supabase) {
      setError('Supabase is not configured. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.')
      return
    }
    if (!email || !password) {
      setError('Enter your email and password to continue.')
      return
    }
    setError(null)
    setStatus(null)
    setLoading(true)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    setLoading(false)
    if (signUpError) {
      setError(signUpError.message)
      return
    }
    if (!data.session) {
      setStatus('Check your inbox to confirm your email before signing in.')
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
    setStatus(null)
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
          <Text style={styles.headline}>Create your account</Text>
          <Text style={styles.subhead}>Join the brightest drop in the store.</Text>

          <View style={[styles.card, glassSurface]}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              placeholder="Your name"
              placeholderTextColor={theme.colors.muted}
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
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
              placeholder="Create a password"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {status ? <Text style={styles.statusText}>{status}</Text> : null}
            <Pressable style={styles.primaryButton} onPress={handleSignUp} disabled={loading}>
              <Text style={styles.primaryButtonText}>
                {loading ? 'Creating...' : 'Create account'}
              </Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => handleOAuth('apple')}
              disabled={oauthLoading !== null}
            >
              <FontAwesome name="apple" size={16} color={theme.colors.ink} />
              <Text style={styles.secondaryButtonText}>
                {oauthLoading === 'apple' ? 'Connecting...' : 'Sign up with Apple'}
              </Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => handleOAuth('google')}
              disabled={oauthLoading !== null}
            >
              <FontAwesome name="google" size={16} color={theme.colors.ink} />
              <Text style={styles.secondaryButtonText}>
                {oauthLoading === 'google' ? 'Connecting...' : 'Sign up with Google'}
              </Text>
            </Pressable>
          </View>

          <Pressable onPress={() => router.push('/auth/sign-in')} style={styles.linkRow}>
            <Text style={styles.linkMuted}>Already have an account?</Text>
            <Text style={styles.linkStrong}>Sign in</Text>
          </Pressable>

          <Pressable onPress={() => router.replace('/')} style={styles.skipRow}>
            <Text style={styles.skipText}>Back to shop</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#120F2C',
  },
  flex: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#120F2C',
  },
  glowOne: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255, 184, 77, 0.55)',
  },
  glowTwo: {
    position: 'absolute',
    bottom: -90,
    right: -30,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(146, 230, 167, 0.55)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
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
    backgroundColor: '#FF5E7E',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#240512',
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
  statusText: {
    marginTop: 10,
    color: '#FFB84D',
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
    color: '#FFB84D',
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
