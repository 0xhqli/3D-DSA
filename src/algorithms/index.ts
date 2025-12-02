import { AlgorithmDef } from '@/types/metrics'
import { BubbleSort } from './bubbleSort'
import { InsertionSort } from './insertionSort'
import { QuickSort } from './quickSort'
import { MergeSort } from './mergeSort'
import { SelectionSort } from './selectionSort'
import { HeapSort } from './heapSort'
import { LinearSearch } from './linearSearch'
import { BinarySearch } from './binarySearch'

export const algorithms: AlgorithmDef[] = [
  // Sorting
  BubbleSort,
  SelectionSort,
  InsertionSort,
  MergeSort,
  HeapSort,
  QuickSort,
  // Searching
  LinearSearch,
  BinarySearch,
]

export const algorithmsById = Object.fromEntries(algorithms.map(a => [a.meta.id, a])) as Record<string, AlgorithmDef>
