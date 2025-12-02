import React from 'react'
import { algorithms, algorithmsById } from '@/algorithms'
import { dataStructures, dataStructuresById } from '@/datastructures'

export type SidebarTab = 'Data Structures' | 'Algorithms' | 'Comparisons'

interface Props {
  tab: SidebarTab
  setTab: (t: SidebarTab) => void
  selectedAlgoId: string
  onSelectAlgo: (id: string) => void
  selectedDSId: string
  onSelectDS: (id: string) => void
}

export default function Sidebar({ tab, setTab, selectedAlgoId, onSelectAlgo, selectedDSId, onSelectDS }: Props) {
  return (
    <aside className="sidebar">
      <div className="section">
        <div className="heading">Explore</div>
        <div className="tabs">
          {(['Data Structures', 'Algorithms', 'Comparisons'] as const).map(t => (
            <button key={t} className={"tab" + (tab === t ? ' active' : '')} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        {tab === 'Data Structures' && (
          <>
            <div className="row" style={{ marginBottom: 8 }}>
              <label style={{ minWidth: 70 }}>Structure</label>
              <select value={selectedDSId} onChange={(e) => onSelectDS(e.target.value)} style={{ width: '100%' }}>
                {dataStructures.map(ds => (
                  <option key={ds.id} value={ds.id}>{ds.name}</option>
                ))}
              </select>
            </div>
            <div className="section">
              <div className="heading">About</div>
              <div className="legend" style={{ color: 'var(--text)' }}>
                <strong>{dataStructuresById[selectedDSId].name}.</strong> {dataStructuresById[selectedDSId].definition}
                <div style={{ marginTop: 6 }}>{dataStructuresById[selectedDSId].summary}</div>
              </div>
            </div>
          </>
        )}
        {tab === 'Algorithms' && (
          <>
            <div className="row" style={{ marginBottom: 8 }}>
              <label style={{ minWidth: 70 }}>Algorithm</label>
              <select value={selectedAlgoId} onChange={(e) => onSelectAlgo(e.target.value)} style={{ width: '100%' }}>
                {algorithms.map(a => (
                  <option key={a.meta.id} value={a.meta.id}>{a.meta.name}</option>
                ))}
              </select>
            </div>
            <div className="section">
              <div className="heading">About</div>
              <div className="legend" style={{ color: 'var(--text)' }}>
                <strong>{algorithmsById[selectedAlgoId].meta.name}.</strong> {algorithmsById[selectedAlgoId].meta.definition}
                <div style={{ marginTop: 6 }}>{algorithmsById[selectedAlgoId].meta.summary}</div>
              </div>
            </div>
          </>
        )}
        {tab === 'Comparisons' && (
          <div style={{ opacity: 0.7 }}>Select multiple algorithms to compare (coming soon).</div>
        )}
      </div>
    </aside>
  )
}
