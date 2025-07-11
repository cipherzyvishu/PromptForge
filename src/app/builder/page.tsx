"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save, Eye, Sparkles } from "lucide-react";

interface Variable {
  id: string;
  name: string;
  placeholder: string;
  required: boolean;
}

interface PromptTemplate {
  title: string;
  description: string;
  template: string;
  variables: Variable[];
  category: string;
  tags: string[];
}

export default function BuilderPage() {
  const [promptTemplate, setPromptTemplate] = useState<PromptTemplate>({
    title: "",
    description: "",
    template: "",
    variables: [],
    category: "",
    tags: []
  });

  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [newVariableName, setNewVariableName] = useState("");
  const [newVariablePlaceholder, setNewVariablePlaceholder] = useState("");
  const [newTag, setNewTag] = useState("");
  const [previewKey, setPreviewKey] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // Load from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("promptTemplate");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPromptTemplate(parsed);
        // Initialize variable values
        const values: Record<string, string> = {};
        parsed.variables.forEach((variable: Variable) => {
          values[variable.name] = "";
        });
        setVariableValues(values);
      } catch (error) {
        console.error("Failed to load saved template:", error);
      }
    }
  }, []);

  // Auto-save to localStorage whenever template changes
  useEffect(() => {
    if (promptTemplate.title || promptTemplate.template) {
      localStorage.setItem("promptTemplate", JSON.stringify(promptTemplate));
    }
  }, [promptTemplate]);

  // Update preview when template or variables change
  useEffect(() => {
    setPreviewKey(prev => prev + 1);
  }, [promptTemplate.template, variableValues]);

  const addVariable = () => {
    if (newVariableName.trim()) {
      const variable: Variable = {
        id: Date.now().toString(),
        name: newVariableName.trim(),
        placeholder: newVariablePlaceholder.trim() || `Enter ${newVariableName}`,
        required: true
      };
      
      setPromptTemplate(prev => ({
        ...prev,
        variables: [...prev.variables, variable]
      }));
      
      setVariableValues(prev => ({
        ...prev,
        [variable.name]: ""
      }));
      
      setNewVariableName("");
      setNewVariablePlaceholder("");
    }
  };

  const removeVariable = (variableId: string) => {
    const variable = promptTemplate.variables.find(v => v.id === variableId);
    if (variable) {
      setPromptTemplate(prev => ({
        ...prev,
        variables: prev.variables.filter(v => v.id !== variableId)
      }));
      
      setVariableValues(prev => {
        const newValues = { ...prev };
        delete newValues[variable.name];
        return newValues;
      });
    }
  };

  const addTag = () => {
    if (newTag.trim() && !promptTemplate.tags.includes(newTag.trim())) {
      setPromptTemplate(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setPromptTemplate(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const generatePreview = () => {
    let preview = promptTemplate.template;
    
    // Replace variables in the template
    promptTemplate.variables.forEach(variable => {
      const value = variableValues[variable.name] || `{${variable.name}}`;
      const regex = new RegExp(`\\{${variable.name}\\}`, 'g');
      preview = preview.replace(regex, value);
    });
    
    return preview;
  };

  const saveTemplate = () => {
    // Save to localStorage (already happening via useEffect)
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-400" />
            Prompt Builder
          </h1>
          <p className="text-gray-400">Create and customize AI prompt templates with dynamic variables</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Basic Info */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Template Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Title</label>
                  <Input
                    value={promptTemplate.title}
                    onChange={(e) => setPromptTemplate(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter prompt title..."
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                  <Textarea
                    value={promptTemplate.description}
                    onChange={(e) => setPromptTemplate(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this prompt does..."
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Category</label>
                  <Input
                    value={promptTemplate.category}
                    onChange={(e) => setPromptTemplate(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Writing, Coding, Creative..."
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Template */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Prompt Template</CardTitle>
                <p className="text-sm text-gray-400">Use {`{variableName}`} to insert dynamic variables</p>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={promptTemplate.template}
                  onChange={(e) => setPromptTemplate(prev => ({ ...prev, template: e.target.value }))}
                  placeholder="Write your prompt template here... Use {variableName} for dynamic content."
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[200px] font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Variables */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Variables</CardTitle>
                <p className="text-sm text-gray-400">Define dynamic variables for your template</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Variable */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Input
                    value={newVariableName}
                    onChange={(e) => setNewVariableName(e.target.value)}
                    placeholder="Variable name"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    onKeyDown={(e) => e.key === 'Enter' && addVariable()}
                  />
                  <Input
                    value={newVariablePlaceholder}
                    onChange={(e) => setNewVariablePlaceholder(e.target.value)}
                    placeholder="Placeholder text"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    onKeyDown={(e) => e.key === 'Enter' && addVariable()}
                  />
                  <Button onClick={addVariable} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>

                {/* Variable List */}
                <div className="space-y-2">
                  <AnimatePresence>
                    {promptTemplate.variables.map((variable) => (
                      <motion.div
                        key={variable.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                      >
                        <div className="flex-1">
                          <span className="text-white font-medium">{variable.name}</span>
                          <p className="text-sm text-gray-400">{variable.placeholder}</p>
                        </div>
                        <Button
                          onClick={() => removeVariable(variable.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Variable Values for Preview */}
                {promptTemplate.variables.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-gray-700">
                    <h4 className="text-sm font-medium text-gray-300">Preview Values</h4>
                    {promptTemplate.variables.map((variable) => (
                      <div key={variable.id}>
                        <label className="text-xs text-gray-400 mb-1 block">{variable.name}</label>
                        <Input
                          value={variableValues[variable.name] || ""}
                          onChange={(e) => setVariableValues(prev => ({
                            ...prev,
                            [variable.name]: e.target.value
                          }))}
                          placeholder={variable.placeholder}
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {promptTemplate.tags.map((tag) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-purple-900/50 text-purple-300 border-purple-700 cursor-pointer hover:bg-purple-900/70"
                          onClick={() => removeTag(tag)}
                        >
                          {tag}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button 
              onClick={saveTemplate}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              size="lg"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </motion.div>

          {/* Right Column - Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={previewKey}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {promptTemplate.title && (
                      <div>
                        <h3 className="text-xl font-semibold text-white">{promptTemplate.title}</h3>
                        {promptTemplate.description && (
                          <p className="text-gray-400 text-sm mt-1">{promptTemplate.description}</p>
                        )}
                      </div>
                    )}

                    {promptTemplate.category && (
                      <Badge variant="outline" className="border-purple-500 text-purple-300">
                        {promptTemplate.category}
                      </Badge>
                    )}

                    {promptTemplate.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {promptTemplate.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Generated Prompt</h4>
                      <div className="text-white whitespace-pre-wrap font-mono text-sm leading-relaxed">
                        {generatePreview() || "Start typing your template to see the preview..."}
                      </div>
                    </div>

                    {promptTemplate.variables.length > 0 && (
                      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <h4 className="text-sm font-medium text-gray-300 mb-3">Variables Detected</h4>
                        <div className="space-y-2">
                          {promptTemplate.variables.map((variable) => (
                            <div key={variable.id} className="flex justify-between items-center text-sm">
                              <span className="text-purple-300">{`{${variable.name}}`}</span>
                              <span className="text-gray-400">{variable.placeholder}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            <Save className="h-4 w-4" />
            Template saved successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
