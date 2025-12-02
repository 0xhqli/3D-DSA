# Final Presentation Program Explanation

## 1. Purpose & Experience

3D-DSA is an educational React + Vite web app that turns common algorithms and data structures into cinematic, interactive narratives. Learners can swap between algorithm runs and data-structure sandboxes, while a synchronized metrics panel and 3D glyphs explain the work being done in real time.

## 2. Core Application Flow (`App.tsx`)

`App` is the single top-level component that holds all global state and wires every subsystem together. It tracks:

- Simulation configuration (problem size `n`, input ordering) and the currently selected algorithm/data structure.
- Runtime state such as whether an algorithm trace is running, which step is active, speed controls, and keyboard shortcuts (`Space` toggles run/pause, `R` resets).
- Data-structure metrics, counts, and the latest user-triggered action so that the 3D scenes can animate inserts, pops, probes, etc.

On every configuration change, the selected algorithm’s `run` function is invoked to produce a deterministic trace (`RunResult`). A render loop (driven by `requestAnimationFrame`) advances through that trace at the requested speed and stops automatically at the end. `App` then distributes state down to the visual components (`Sidebar`, `TopBar`, `Viewport`, `MetricsPanel`) and listens for callbacks such as “run”, “pause”, “change DS”, or “perform stack push”. @src/App.tsx#11-188

## 3. UI Shell Components

1. **Sidebar** toggles among “Data Structures”, “Algorithms”, and the upcoming “Comparisons” view. It also displays contextual descriptions sourced from the metadata registries so the user always knows what they are looking at. @src/components/Sidebar.tsx#16-69
2. **TopBar** exposes the controls needed to configure and replay a run: problem size slider, input type, playback speed, reset view, and the run/pause/reset buttons. @src/components/TopBar.tsx#16-60
3. **MetricsPanel** adapts to the active tab:

   - In algorithm mode, it shows metadata (class, best/average/worst complexities) and live run metrics (steps, comparisons, swaps, memory footprint) with helper legends. @src/components/MetricsPanel.tsx#18-105
   - In data-structure mode, it swaps to contextual action buttons (e.g., push/pop, enqueue/dequeue) plus a live counter of operations, memory, and the last action performed. @src/components/MetricsPanel.tsx#18-77

## 4. 3D Visualization (`Viewport.tsx`)

`Viewport` orchestrates the entire WebGL scene using `@react-three/fiber` and `@react-three/drei` helpers:

- In **algorithm** mode, it renders animated bars that mirror the array at each trace step, tinting/swelling the active indices to show comparisons vs swaps. A companion “performance glyph” displays live, best, average, and worst cases as cylinders whose height/texture/color encode the asymptotic behavior. Tooltips explain what each visual element means. @src/three/Viewport.tsx#9-159, @src/three/Viewport.tsx#93-155
- In **data-structure** mode, `Viewport` switches to a library of mini-scenes (`ArrayDS`, `LinkedListDS`, `StackDS`, `QueueDS`, `BSTDS`, `HeapDS`, `HashTableDS`). Each scene responds to user actions by animating insertions, deletions, or probes—e.g., stacks smoothly push/pull blocks, queues slide cubes along a conveyor, heaps bubble nodes via sift-up/down, and hash tables light up chains during probes. @src/three/Viewport.tsx#231-695
- The `DSPerformanceGlyph` sits beside the structure scenes and converts aggregate metrics (total operations, estimated memory, activity rate) into a pulsing column whose height, radius, and color/pulse frequency visualize workload. @src/three/Viewport.tsx#176-229
- `ResettableOrbit` centralizes camera control so the TopBar “Reset View” button or the `R` shortcut can snap the scene back to a predictable vantage point. @src/three/Viewport.tsx#162-174

## 5. Algorithm Modules

All algorithms conform to the `AlgorithmDef` interface (`meta` + `run`). Each `run` produces both aggregate metrics and a full trace of array states so the renderer can replay the exact sequence of comparisons/swaps/sets. The registry lives in `src/algorithms/index.ts`, which exports both an ordered list (for dropdowns) and an ID lookup table. @src/algorithms/index.ts#1-25

Current implementations (Bubble, Selection, Insertion, Merge, Heap, Quick, Linear Search, Binary Search) each encapsulate their own helper routines but expose the same API, making it easy to add future algorithms by dropping a new module with the shared contract.

## 6. Data Structure Metadata

`src/datastructures/index.ts` defines a parallel registry for the structures showcased in the “Data Structures” tab. Each entry captures an ID, human-readable name, canonical definition, and a concise summary of strengths, weaknesses, and operation costs. Both the Sidebar and MetricsPanel consume this metadata so that textual explanations stay consistent with the visuals. @src/datastructures/index.ts#1-54

## 7. Shared Types & Utilities

- **Types:** `src/types/metrics.ts` standardizes complexity classes, algorithm metadata, run configs, trace steps, and run metrics, ensuring every module reports data in a predictable shape. @src/types/metrics.ts#1-44
- **Utilities:** Helpers such as `utils/complexity` (not shown above) estimate big-O steps for the glyphs, while `utils/format` renders human-friendly numbers and byte sizes for the panels. These utilities keep visual components lean and declarative.

## 8. Interaction Loop Summary

1. User selects an algorithm or data structure in the Sidebar and tweaks parameters via the TopBar.
2. `App` computes a new baseline trace or triggers the relevant data-structure action, updating both metrics and visualization state.
3. `Viewport` and `MetricsPanel` reactively render the new state: 3D geometry reflects structural changes, tooltips translate those visuals into plain English, and glyphs showcase complexity trends.
4. Keyboard shortcuts and playback controls let the learner pause, scrub (by toggling run/pause/reset), or reset the camera without losing context.

This layering—registries → orchestrator → UI shell → 3D scenes—keeps each concern isolated yet composable, which is why new algorithms or structures can be added by wiring metadata + run logic + an optional scene without rewriting the rest of the presentation layer.
