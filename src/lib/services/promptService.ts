import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

type Prompt = Database['public']['Tables']['prompts']['Row'] & {
  profiles?: {
    username: string | null
    full_name: string | null
  }
}
type PromptInsert = Database['public']['Tables']['prompts']['Insert']
type PromptUpdate = Database['public']['Tables']['prompts']['Update']

export const promptService = {
  // Get all prompts with author info
  async getAllPrompts(): Promise<Prompt[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('prompts')
      .select(`
        *,
        profiles (
          username,
          full_name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching prompts:', error)
      return []
    }

    return data || []
  },

  // Get prompt by ID
  async getPrompt(promptId: string): Promise<Prompt | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('prompts')
      .select(`
        *,
        profiles (
          username,
          full_name
        )
      `)
      .eq('id', promptId)
      .single()

    if (error) {
      console.error('Error fetching prompt:', error)
      return null
    }

    return data
  },

  // Get prompts by user ID
  async getPromptsByUser(userId: string): Promise<Prompt[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('prompts')
      .select(`
        *,
        profiles (
          username,
          full_name
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user prompts:', error)
      return []
    }

    return data || []
  },

  // Get prompts by username
  async getPromptsByUsername(username: string): Promise<Prompt[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('prompts')
      .select(`
        *,
        profiles!inner (
          username,
          full_name
        )
      `)
      .eq('profiles.username', username)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching prompts by username:', error)
      return []
    }

    return data || []
  },

  // Create new prompt
  async createPrompt(prompt: Omit<PromptInsert, 'id'>): Promise<Prompt | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('prompts')
      .insert(prompt)
      .select(`
        *,
        profiles (
          username,
          full_name
        )
      `)
      .single()

    if (error) {
      console.error('Error creating prompt:', error)
      return null
    }

    return data
  },

  // Update prompt
  async updatePrompt(promptId: string, updates: PromptUpdate): Promise<Prompt | null> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('prompts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', promptId)
      .select(`
        *,
        profiles (
          username,
          full_name
        )
      `)
      .single()

    if (error) {
      console.error('Error updating prompt:', error)
      return null
    }

    return data
  },

  // Delete prompt
  async deletePrompt(promptId: string): Promise<boolean> {
    const supabase = createClient()
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', promptId)

    if (error) {
      console.error('Error deleting prompt:', error)
      return false
    }

    return true
  },

  // Increment usage count
  async incrementUsage(promptId: string): Promise<void> {
    const supabase = createClient()
    // Use any type for RPC call since custom functions aren't in generated types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).rpc('increment_usage_count', { prompt_id: promptId })
  },

  // Search prompts
  async searchPrompts(query: string): Promise<Prompt[]> {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('prompts')
      .select(`
        *,
        profiles (
          username,
          full_name
        )
      `)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching prompts:', error)
      return []
    }

    return data || []
  }
}
