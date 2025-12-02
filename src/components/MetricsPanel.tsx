import { AlgorithmMetadata, RunMetrics } from '@/types/metrics'
import type { DSMetrics } from '@/types/ds'
import { formatBytes, formatNumber } from '@/utils/format'
import React from 'react'

interface AlgoProps {
  metrics: RunMetrics | null
  meta: AlgorithmMetadata
}

interface DSProps {
  tab: 'Data Structures' | 'Algorithms' | 'Comparisons'
  dsId: string
  onDSAction: (action: string) => void
  dsMetrics: DSMetrics
}

export default function MetricsPanel(props: AlgoProps & Partial<DSProps>) {
  if (props.tab === 'Data Structures' && props.dsId && props.onDSAction) {
    return (
      <aside className="right">
        <div className="heading">Operations</div>
        <div className="section" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {props.dsId === 'stack' && (
            <>
              <button className="primary" onClick={() => props.onDSAction!('stack:push')}>Push</button>
              <button onClick={() => props.onDSAction!('stack:pop')}>Pop</button>
            </>
          )}
          {props.dsId === 'queue' && (
            <>
              <button className="primary" onClick={() => props.onDSAction!('queue:enqueue')}>Enqueue</button>
              <button onClick={() => props.onDSAction!('queue:dequeue')}>Dequeue</button>
            </>
          )}
          {props.dsId === 'linked-list' && (
            <>
              <button className="primary" onClick={() => props.onDSAction!('list:insertHead')}>Insert Head</button>
              <button onClick={() => props.onDSAction!('list:deleteHead')}>Delete Head</button>
            </>
          )}
          {props.dsId === 'bst' && (
            <>
              <button className="primary" onClick={() => props.onDSAction!('bst:insert')}>Insert</button>
            </>
          )}
          {props.dsId === 'heap' && (
            <>
              <button className="primary" onClick={() => props.onDSAction!('heap:insert')}>Insert</button>
              <button onClick={() => props.onDSAction!('heap:extract')}>Extract Top</button>
            </>
          )}
          {props.dsId === 'hash-table' && (
            <>
              <button className="primary" onClick={() => props.onDSAction!('hash:put')}>Put</button>
              <button onClick={() => props.onDSAction!('hash:get')}>Get</button>
            </>
          )}
          {props.dsId === 'array' && (
            <div className="legend">Array operations coming soon (insert/delete/resize).</div>
          )}
        </div>
        <div className="heading">Status</div>
        <div className="section">
          <div className="metric"><span>Steps</span><span>{formatNumber(props.dsMetrics?.operations ?? 0)}</span></div>
          <div className="metric"><span>Memory</span><span>{props.dsMetrics ? formatBytes(props.dsMetrics.memoryBytes) : '—'}</span></div>
          <div className="metric"><span>Last action</span><span>{props.dsMetrics?.lastAction ?? '—'}</span></div>
        </div>
        <div className="heading">Legend</div>
        <div className="legend">
          <div>Height = steps (work done)</div>
          <div>Radius = size (elements)</div>
          <div>Color/pulse = activity (steps/sec)</div>
        </div>
      </aside>
    )
  }

  const { metrics, meta } = props as AlgoProps
  return (
    <aside className="right">
      <div className="heading">Metrics</div>
      <div className="section">
        <div className="metric"><span>Algorithm</span><span>{meta.name}</span></div>
        <div className="metric"><span>Class</span><span>{meta.class}</span></div>
        <div className="metric"><span>Best</span><span>{meta.best}</span></div>
        <div className="metric"><span>Average</span><span>{meta.average}</span></div>
        <div className="metric"><span>Worst</span><span>{meta.worst}</span></div>
      </div>
      <div className="heading">Live Run</div>
      <div className="section">
        <div className="metric"><span>Steps</span><span>{formatNumber(metrics?.steps ?? 0)}</span></div>
        <div className="metric"><span>Compares</span><span>{formatNumber(metrics?.comparisons ?? 0)}</span></div>
        <div className="metric"><span>Swaps</span><span>{formatNumber(metrics?.swaps ?? 0)}</span></div>
        <div className="metric"><span>Memory</span><span>{metrics ? formatBytes(metrics.memoryBytes) : '—'}</span></div>
      </div>
      <div className="heading">Legend</div>
      <div className="legend">
        <div>Height = steps (work done)</div>
        <div>Radius = memory (approx)</div>
        <div>Color: green (fast), yellow (medium), red (slow)</div>
      </div>
    </aside>
  )
}
