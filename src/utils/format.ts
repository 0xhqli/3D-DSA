export function formatNumber(n: number): string {
  return n.toLocaleString(undefined)
}

export function formatBytes(bytes: number): string {
  const thresh = 1024
  if (bytes < thresh) return `${bytes.toLocaleString()} B`
  const units = ['KB','MB','GB','TB']
  let u = -1
  let val = bytes
  do { val /= 1024; u++ } while (val >= thresh && u < units.length - 1)
  return `${val.toFixed(1)} ${units[u]}`
}

