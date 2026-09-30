export type VirtualSlice = {
  start: number;
  end: number; // exclusive
  offset: number; // translateY for the first rendered item
  totalHeight: number;
};

/**
 * Simple fixed-item-height virtualizer.
 */
export function virtualize(args: {
  count: number;
  scrollTop: number;
  viewportHeight: number;
  itemHeight: number;
  overscan?: number;
}): VirtualSlice {
  const { count, scrollTop, viewportHeight, itemHeight, overscan = 4 } = args;
  const totalHeight = count * itemHeight;
  const rawStart = Math.floor(scrollTop / itemHeight) - overscan;
  const start = Math.max(0, rawStart);
  const visible = Math.ceil(viewportHeight / itemHeight) + overscan * 2;
  const end = Math.min(count, start + visible);
  const offset = start * itemHeight;
  return { start, end, offset, totalHeight };
}

export default virtualize;
