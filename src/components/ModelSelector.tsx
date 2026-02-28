import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Check, Cpu, Filter, SortAsc, SortDesc } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Model } from '../data/models';

interface ModelSelectorProps {
  models: Model[];
  selectedModelId: string;
  onSelect: (modelId: string) => void;
  currentMode?: 'math' | 'coding' | 'playground';
}

type SortOption = 'name-asc' | 'name-desc' | 'provider-asc';

export const ModelSelector: React.FC<ModelSelectorProps> = ({ models, selectedModelId, onSelect, currentMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [providerFilter, setProviderFilter] = useState<string>('all');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedModel = models.find(m => m.id === selectedModelId) || { id: selectedModelId, name: selectedModelId, provider: 'Unknown' };

  // Get unique providers for filter
  const providers = useMemo(() => {
    const p = new Set(models.map(m => m.provider));
    return ['all', ...Array.from(p)].sort();
  }, [models]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opening
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const processedModels = useMemo(() => {
    let result = models.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          model.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesProvider = providerFilter === 'all' || model.provider === providerFilter;
      
      return matchesSearch && matchesProvider;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'provider-asc') {
        const providerComp = a.provider.localeCompare(b.provider);
        if (providerComp !== 0) return providerComp;
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [models, searchQuery, sortBy, providerFilter]);

  if (models.length === 0) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.03)' }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${
          isOpen 
            ? 'bg-white border-orange-200 shadow-sm ring-2 ring-orange-100' 
            : 'bg-white/50 border-gray-200 hover:border-orange-200 hover:shadow-sm'
        }`}
      >
        <div className="p-1 bg-orange-100 rounded-full text-orange-600">
          <Cpu size={12} />
        </div>
        <div className="flex flex-col items-start leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{selectedModel.provider}</span>
            {selectedModel.costPer1k && (
              <span className={`text-[9px] font-bold ${
                selectedModel.costPer1k < 0.001 ? 'text-emerald-500' :
                selectedModel.costPer1k < 0.01 ? 'text-orange-500' :
                'text-red-500'
              }`}>
                ${(selectedModel.costPer1k * 100).toFixed(2)}/100
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-gray-700 max-w-[120px] sm:max-w-[160px] truncate">
            {selectedModel.name}
          </span>
        </div>
        <ChevronDown 
          size={12} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-[340px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-top-left flex flex-col"
          >
            {/* Search Header */}
            <div className="p-3 border-b border-gray-100 bg-gray-50/50 space-y-2">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-gray-400"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1">
                  <Filter size={12} className="text-gray-400" />
                  <select 
                    value={providerFilter}
                    onChange={(e) => setProviderFilter(e.target.value)}
                    className="text-[11px] bg-transparent border-none focus:ring-0 w-full p-0 text-gray-600 cursor-pointer"
                  >
                    {providers.map(p => (
                      <option key={p} value={p}>{p === 'all' ? 'All Providers' : p}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1">
                  {sortBy === 'name-desc' ? <SortDesc size={12} className="text-gray-400" /> : <SortAsc size={12} className="text-gray-400" />}
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="text-[11px] bg-transparent border-none focus:ring-0 p-0 text-gray-600 cursor-pointer"
                  >
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="provider-asc">Provider</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Models List */}
            <div className="max-h-[320px] overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {processedModels.length > 0 ? (
                processedModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      onSelect(model.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 text-sm flex items-center justify-between group transition-colors ${
                      selectedModelId === model.id 
                        ? 'bg-orange-50' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium truncate ${selectedModelId === model.id ? 'text-orange-700' : 'text-gray-700'}`}>
                          {model.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                          {model.provider}
                        </span>
                        {model.recommendedFor?.includes('math') && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border flex items-center gap-0.5 font-bold uppercase tracking-tighter ${
                            currentMode === 'math' 
                              ? 'bg-blue-500 text-white border-blue-600 shadow-sm' 
                              : 'bg-blue-50 text-blue-600 border-blue-200'
                          }`}>
                            Math
                          </span>
                        )}
                        {model.recommendedFor?.includes('coding') && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border flex items-center gap-0.5 font-bold uppercase tracking-tighter ${
                            currentMode === 'coding' 
                              ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm' 
                              : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          }`}>
                            Code
                          </span>
                        )}
                        {model.recommendedFor?.includes('playground') && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full border flex items-center gap-0.5 font-bold uppercase tracking-tighter ${
                            currentMode === 'playground' 
                              ? 'bg-purple-500 text-white border-purple-600 shadow-sm' 
                              : 'bg-purple-50 text-purple-600 border-purple-200'
                          }`}>
                            Chat
                          </span>
                        )}
                      </div>
                      {model.costPer1k && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-gray-400 font-medium">
                            Est. <span className="text-gray-600">${(model.costPer1k * 100).toFixed(2)}</span> per 100 queries
                          </span>
                          <div className={`w-1 h-1 rounded-full ${
                            model.costPer1k < 0.001 ? 'bg-emerald-400' :
                            model.costPer1k < 0.01 ? 'bg-orange-400' :
                            'bg-red-400'
                          }`} />
                        </div>
                      )}
                    </div>
                    {selectedModelId === model.id && (
                      <Check size={16} className="text-orange-500 flex-shrink-0 ml-2" />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-400 text-sm">
                  <p>No models found</p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400 text-center font-medium uppercase tracking-wider flex justify-between items-center">
              <span>{processedModels.length} Models</span>
              <span className="flex items-center gap-1">Sorted by {sortBy.replace('-', ' ')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
