'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { profileService } from '@/lib/services/profileService'
import { promptService } from '@/lib/services/promptService'
import { useAuth } from '@/lib/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, User, Calendar, Edit3, Save, X, Heart, TrendingUp, Plus } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Navigation from '@/components/Navigation'
import StorePromptModal from '@/components/StorePromptModal'

interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

interface Prompt {
  id: string
  title: string
  description: string
  tags: string[]
  likes: number
  usage_count: number
  created_at: string
}

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const userId = params.userId as string
  
  const [profile, setProfile] = useState<Profile | null>(null)
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showStoreModal, setShowStoreModal] = useState(false)
  const [editForm, setEditForm] = useState({
    username: '',
    full_name: ''
  })

  const isOwnProfile = user?.id === userId || userId === 'me'

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        let targetUserId = userId
        
        // Handle "me" route
        if (userId === 'me') {
          if (!user?.id) {
            router.push('/explore')
            return
          }
          targetUserId = user.id
        }

        // Fetch profile
        const profileData = await profileService.getProfile(targetUserId)
        if (!profileData) {
          toast.error('Profile not found')
          router.push('/explore')
          return
        }

        setProfile(profileData)
        setEditForm({
          username: profileData.username || '',
          full_name: profileData.full_name || ''
        })

        // Fetch user's prompts
        const promptsData = await promptService.getPromptsByUser(targetUserId)
        setPrompts(promptsData)
      } catch (error) {
        console.error('Error fetching profile data:', error)
        toast.error('Failed to load profile')
        router.push('/explore')
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [userId, user, router])

  const handleSaveProfile = async () => {
    if (!profile || !user) return

    try {
      const updatedProfile = await profileService.updateProfile(profile.id, {
        username: editForm.username || null,
        full_name: editForm.full_name || null
      })

      if (updatedProfile) {
        setProfile(updatedProfile)
        setIsEditing(false)
        toast.success('Profile updated successfully!')
      } else {
        toast.error('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    }
  }

  const handleStorePromptSuccess = async () => {
    // Refresh the prompts list after storing a new prompt
    try {
      let targetUserId = userId
      if (userId === 'me' && user?.id) {
        targetUserId = user.id
      }
      const promptsData = await promptService.getPromptsByUser(targetUserId)
      setPrompts(promptsData)
    } catch (error) {
      console.error('Error refreshing prompts:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
            />
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Profile Not Found</h1>
            <p className="text-gray-400 text-lg mb-6">The profile you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/explore">
              <Button>Browse Prompts</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-6xl">
        <Link href="/explore" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Explore
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Profile Header */}
          <Card className="p-8 bg-black/40 backdrop-blur-sm border-white/20">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                  {profile.username ? profile.username[0].toUpperCase() : profile.full_name?.[0]?.toUpperCase() || <User className="w-8 h-8" />}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-grow space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Username</label>
                      <Input
                        value={editForm.username}
                        onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                        className="bg-black/20 border-white/20 text-white"
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Full Name</label>
                      <Input
                        value={editForm.full_name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                        className="bg-black/20 border-white/20 text-white"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} size="sm" className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="text-3xl font-bold text-white">
                        {profile.username || profile.full_name || 'Anonymous User'}
                      </h1>
                      {isOwnProfile && (
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => setShowStoreModal(true)} 
                            size="sm" 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Store Prompt
                          </Button>
                          <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                        </div>
                      )}
                    </div>
                    {profile.username && profile.full_name && (
                      <p className="text-xl text-gray-300 mb-2">{profile.full_name}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {new Date(profile.created_at).toLocaleDateString()}
                      </div>
                      <div>{prompts.length} prompts</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* User's Prompts */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              {isOwnProfile ? 'Your Prompts' : `${profile.username || profile.full_name || 'User'}'s Prompts`}
            </h2>
            
            {prompts.length === 0 ? (
              <Card className="p-8 bg-black/40 backdrop-blur-sm border-white/20 text-center">
                <p className="text-gray-400 text-lg mb-4">
                  {isOwnProfile ? "You haven't created any prompts yet." : "This user hasn't created any prompts yet."}
                </p>
                {isOwnProfile && (
                  <Link href="/builder">
                    <Button>Create Your First Prompt</Button>
                  </Link>
                )}
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prompts.map((prompt, index) => (
                  <motion.div
                    key={prompt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/20 hover:border-white/30 transition-colors group">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {prompt.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {prompt.tags.length > 2 && (
                            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                              +{prompt.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {prompt.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                            {prompt.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {prompt.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {prompt.usage_count}
                            </div>
                          </div>
                          <span>{new Date(prompt.created_at).toLocaleDateString()}</span>
                        </div>
                        
                        <Link href={`/playground/${prompt.id}`}>
                          <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Try Prompt
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Store Prompt Modal */}
      <StorePromptModal 
        isOpen={showStoreModal}
        onClose={() => setShowStoreModal(false)}
        onSuccess={handleStorePromptSuccess}
      />
    </div>
  )
}
