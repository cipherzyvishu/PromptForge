import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export const profileService = {
  // Get profile by user ID
  async getProfile(userId: string): Promise<Profile | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data
  },

  // Get profile by username
  async getProfileByUsername(username: string): Promise<Profile | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (error) {
      console.error('Error fetching profile by username:', error)
      return null
    }

    return data
  },

  // Update profile
  async updateProfile(userId: string, updates: ProfileUpdate): Promise<Profile | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating profile:', error)
      return null
    }

    return data
  },

  // Create profile (usually handled by trigger, but can be used manually)
  async createProfile(profile: ProfileInsert): Promise<Profile | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single()

    if (error) {
      console.error('Error creating profile:', error)
      return null
    }

    return data
  },

  // Search profiles by username
  async searchProfiles(query: string): Promise<Profile[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .ilike('username', `%${query}%`)
      .limit(10)

    if (error) {
      console.error('Error searching profiles:', error)
      return []
    }

    return data || []
  }
}
