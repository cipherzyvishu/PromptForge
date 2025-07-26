'use client'

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const { user, signOut, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const openAuthModal = (tab: 'signin' | 'signup') => {
    setAuthModalTab(tab);
    setShowAuthModal(true);
  };

  return (
    <>
      <nav className="border-b border-white/20 bg-black/10 backdrop-blur supports-[backdrop-filter]:bg-black/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            PromptForge
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="text-gray-300 hover:text-white transition-colors">
              Explore
            </Link>
            <Link href="/builder" className="text-gray-300 hover:text-white transition-colors">
              Builder
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <Link href="/profile/me">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openAuthModal('signin')}
                  className="text-white hover:bg-white/10"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => openAuthModal('signup')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/20 bg-black/90 backdrop-blur"
            >
              <div className="px-4 py-4 space-y-4">
                <Link
                  href="/explore"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Explore
                </Link>
                <Link
                  href="/builder"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Builder
                </Link>
                
                <div className="pt-4 border-t border-white/20">
                  {loading ? (
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
                  ) : user ? (
                    <div className="space-y-2">
                      <Link href="/profile/me" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-white/10"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full text-white hover:bg-white/10"
                        onClick={() => {
                          openAuthModal('signin');
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => {
                          openAuthModal('signup');
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
      />
    </>
  );
}
