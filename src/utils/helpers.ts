export const debounce = (fn: (...args: never[]) => never, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: never[]) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export const isValidUrl = (url: string) => {
  try {
    const src = new URL(url);

    return src.protocol === "http:" || src.protocol === "https:";
  } catch (e) {
    console.log(e)
    return false;
  }
}

export const cropLongStrings = (value: string) =>
  `${value.slice(0, Math.round(10 / 2))}...${value.slice(-Math.round(10 / 2))}`