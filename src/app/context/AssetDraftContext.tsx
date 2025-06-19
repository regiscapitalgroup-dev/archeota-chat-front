import React, { createContext, useContext, useState } from 'react'

export interface AssetDraftData {
  category?: any,
  attributes?: any
}

const AssetDraftContext = createContext<{
  draft: AssetDraftData | null
  setDraft: (data: AssetDraftData | null) => void
} | undefined>(undefined)

export const AssetDraftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draft, setDraft] = useState<AssetDraftData | null>(null)
  return (
    <AssetDraftContext.Provider value={{ draft, setDraft }}>
      {children}
    </AssetDraftContext.Provider>
  )
}

export const useAssetDraft = () => {
  const ctx = useContext(AssetDraftContext)
  if (!ctx) throw new Error('useAssetDraft must be used within AssetDraftProvider')
  return ctx
}
