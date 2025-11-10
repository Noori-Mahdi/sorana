export async function loadNextPageIfShort(
  page: number,
  setItems: React.Dispatch<React.SetStateAction<any[]>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  isLoading: React.MutableRefObject<boolean>,
  fetcher: (page: number) => Promise<any[]>
) {
  if (document.body.scrollHeight <= window.innerHeight && !isLoading.current) {
    isLoading.current = true
    const next = await fetcher(page)
    if (next.length > 0) {
      setItems((prev) => [...prev, ...next])
      setPage((p) => p + 1)
    }
    isLoading.current = false
  }
}

export function setupInfiniteScroll(
  page: number,
  setItems: React.Dispatch<React.SetStateAction<any[]>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  isLoading: React.MutableRefObject<boolean>,
  fetcher: (page: number) => Promise<any[]>,
  threshold = 200
) {
  const handleScroll = async () => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - threshold &&
      !isLoading.current
    ) {
      isLoading.current = true
      const next = await fetcher(page)
      if (next.length > 0) {
        setItems((prev) => [...prev, ...next])
        setPage((p) => p + 1)
      }
      isLoading.current = false
    }
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}
