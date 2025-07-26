'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PromptCard from "@/components/PromptCard";
import Navigation from "@/components/Navigation";
import StorePromptModal from "@/components/StorePromptModal";
import { promptService } from "@/lib/services/promptService";
import { profileService } from "@/lib/services/profileService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Plus } from "lucide-react";
import Link from "next/link";
import { Database } from "@/lib/supabase/types";
import { useAuth } from "@/lib/auth/AuthProvider";

// Use the database Prompt type
type Prompt = Database['public']['Tables']['prompts']['Row'] & {
  profiles?: {
    username: string | null
    full_name: string | null
  }
}

export default function ExplorePage() {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [userSearchQuery, setUserSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([]) // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isSearching, setIsSearching] = useState(false) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [showStoreModal, setShowStoreModal] = useState(false)

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const data = await promptService.getAllPrompts()
        setPrompts(data)
        setFilteredPrompts(data)
      } catch (error) {
        console.error('Error fetching prompts:', error)
        // Set empty arrays on error
        setPrompts([])
        setFilteredPrompts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPrompts()
  }, [])

  const handlePromptSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredPrompts(prompts)
      return
    }

    const filtered = prompts.filter(prompt =>
      prompt.title.toLowerCase().includes(query.toLowerCase()) ||
      prompt.description.toLowerCase().includes(query.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredPrompts(filtered)
  }

  const handleUserSearch = async (query: string) => {
    setUserSearchQuery(query)
    
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    try {
      const profiles = await profileService.searchProfiles(query)
      setSearchResults(profiles)
    } catch (error) {
      console.error('Error searching users:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const filterByUser = async (username: string) => {
    try {
      const userPrompts = await promptService.getPromptsByUsername(username)
      setFilteredPrompts(userPrompts)
      setSearchQuery(`by: ${username}`)
      setUserSearchQuery('')
      setSearchResults([])
    } catch (error) {
      console.error('Error filtering by user:', error)
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setUserSearchQuery('')
    setSearchResults([])
    setFilteredPrompts(prompts)
  }

  const handleStorePromptSuccess = () => {
    // Refresh prompts list after successful creation
    const fetchPrompts = async () => {
      try {
        const data = await promptService.getAllPrompts()
        setPrompts(data)
        setFilteredPrompts(data)
      } catch (error) {
        console.error('Error fetching prompts:', error)
      }
    }
    fetchPrompts()
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <Navigation />
      
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-700/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gray-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-800/3 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Explore Prompts</h1>
              {user && (
                <Button
                  onClick={() => setShowStoreModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Store Prompt
                </Button>
              )}
            </div>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4">
              Discover powerful AI prompts created by the community. Test them instantly and enhance your workflow.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Prompt Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search prompts by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => handlePromptSearch(e.target.value)}
                className="pl-10 bg-black/40 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-500"
              />
            </div>

            {/* User Search */}
            <div className="flex gap-4 relative">
              <div className="relative flex-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search for users..."
                  value={userSearchQuery}
                  onChange={(e) => handleUserSearch(e.target.value)}
                  className="pl-10 bg-black/40 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-500"
                />
              </div>
              {searchQuery && (
                <Button onClick={clearFilters} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Clear Filters
                </Button>
              )}
            </div>

            {/* User Search Results */}
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-md p-4 space-y-2"
              >
                <p className="text-sm text-gray-400 mb-2">Users found:</p>
                {searchResults.map((profile) => (
                  <div key={profile.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded">
                    <div>
                      <p className="text-white font-medium">{profile.username || profile.full_name || 'Anonymous'}</p>
                      {profile.username && profile.full_name && (
                        <p className="text-sm text-gray-400">{profile.full_name}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => filterByUser(profile.username)}
                        className="border-white/20 text-white hover:bg-white/10 text-xs"
                      >
                        View Prompts
                      </Button>
                      <Link href={`/profile/${profile.id}`}>
                        <Button size="sm" className="text-xs">
                          Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Results Count */}
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-400 text-sm">
              {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
          
          {/* Prompts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
            {filteredPrompts.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-400 text-lg mb-4">No prompts found matching your search.</p>
                <Button onClick={clearFilters} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Clear Search
                </Button>
              </div>
            ) : (
              filteredPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PromptCard prompt={prompt} />
                </motion.div>
              ))
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
  );
}
