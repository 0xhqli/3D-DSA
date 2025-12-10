import { AlgorithmDef, AlgorithmMetadata, RunConfig, RunResult, TraceStep } from '@/types/metrics'
import {generateArray} from '@/algorithms/common'


export const InsertionSortMeta: AlgorithmMetadata = {
  id: 'insertion',
  name: 'Insertion Sort',
  class: 'Sorting',
  best: 'O(n)',
  average: 'O(n^2)',
  worst: 'O(n^2)',
  definition: 'Insertion Sort builds the final sorted array one item at a time by inserting each element into its correct position among the previously sorted elements.',
  summary: 'Good for small or nearly sorted arrays. It scans left from the current position and shifts larger items up until the correct spot is found. Best case O(n) (already sorted), average/worst O(n^2).'
}

export function runInsertionSort(cfg: RunConfig): RunResult {
  // build the source array according to size + input pattern
  const arr = generateArray(cfg.n, cfg.input)
  const a = arr.slice() // work on a copy so original stays untouched
  const trace: TraceStep[] = [{ type: 'set', array: a.slice() }] // seed visualization trace
  let steps = 0, comparisons = 0, swaps = 0 // counters for metrics panel

  for (let i = 1; i < a.length; i++) { // walk from second element to end
    const key = a[i] // value we want to insert into sorted prefix
    let j = i - 1 // scan left through the sorted portion
    while (j >= 0) { // keep moving as long as we have elements to compare
      comparisons++; steps++ // every loop does a comparison + step
      trace.push({ type: 'compare', i: j, j: i, array: a.slice() }) // log the comparison
      if (a[j] > key) { // shift bigger values one slot to the right
        a[j + 1] = a[j]; swaps++; steps++
        trace.push({ type: 'set', i: j + 1, array: a.slice() }) // show the shift
        j-- // continue scanning further left
      } else break // stop once the correct spot is found
    }
    a[j + 1] = key; steps++ // drop the key into the gap
    trace.push({ type: 'set', i: j + 1, array: a.slice() }) // record the placement
  }

  const memoryBytes = a.length * 8 + 64 // array footprint + overhead estimate
  return { metrics: { steps, comparisons, swaps, memoryBytes }, trace }
}

export const InsertionSort: AlgorithmDef = { meta: InsertionSortMeta, run: runInsertionSort }
