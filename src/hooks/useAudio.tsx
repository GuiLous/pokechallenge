import { useCallback, useEffect, useState } from 'react'

export const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying(!playing)

  audio.crossOrigin = 'anonymous'

  const controlAudio = useCallback(async () => {
    try {
      playing ? await audio.play() : audio.pause()
    } catch (error) {
      console.log(error)
    }
  }, [audio, playing])

  useEffect(() => {
    controlAudio()
  }, [controlAudio])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [audio])

  return [toggle]
}
