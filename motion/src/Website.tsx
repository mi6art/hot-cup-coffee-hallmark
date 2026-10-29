import {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef} from '@remotion/player';
import {CoffeeCollage} from './Composition';

const mount = document.getElementById('hero-motion');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function WebsiteMotion() {
  const ref = useRef<PlayerRef>(null);
  const [paused, setPaused] = useState(reducedMotion.matches);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {threshold:.05});
    observer.observe(mount!);
    const onPreference = () => setPaused(reducedMotion.matches);
    reducedMotion.addEventListener('change', onPreference);
    mount?.parentElement?.classList.add('motion-ready');
    return () => {observer.disconnect(); reducedMotion.removeEventListener('change', onPreference);};
  }, []);
  useEffect(() => {
    const sync = () => {
      if(paused || !visible || document.hidden) ref.current?.pause();
      else ref.current?.play();
    };
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [paused, visible]);
  return <>
    <div className="motion-player" aria-hidden="true">
      <Player ref={ref} component={CoffeeCollage} inputProps={{assetBase:new URL('assets/', document.baseURI).href}}
        compositionWidth={760} compositionHeight={800} durationInFrames={360} fps={30} loop
        controls={false} clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false}
        numberOfSharedAudioTags={0} style={{width:'100%',height:'100%'}}
        // Plain browser fallback must also work when the Remotion composition fails.
        // eslint-disable-next-line @remotion/warn-native-media-tag, @remotion/no-string-assets
        errorFallback={() => <img src="assets/coffee.webp" alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />} />
    </div>
    <button type="button" className="motion-toggle" aria-pressed={paused} onClick={()=>setPaused(!paused)} aria-label={paused ? 'Включить анимацию фотографий' : 'Приостановить анимацию фотографий'}>
      {paused ? <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6Z" fill="currentColor"/></svg> : <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4v12M13 4v12" stroke="currentColor" strokeWidth="2"/></svg>}
      <span>{paused ? 'Продолжить' : 'Пауза'}</span>
    </button>
  </>;
}

if(mount) createRoot(mount).render(<WebsiteMotion />);
