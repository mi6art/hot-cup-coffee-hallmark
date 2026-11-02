import React from 'react';
import {AbsoluteFill, CanvasImage, Composition, Interactive, staticFile, useCurrentFrame} from 'remotion';

// Every movement is periodic, including the steam, so the exported film loops cleanly.
export const CoffeeFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const phase = frame / 240 * Math.PI * 2;
  const zoom = 1.015 + .015 * Math.sin(phase);
  return <AbsoluteFill style={{background:'#120905',overflow:'hidden'}}>
    <Interactive.Div name="Cappuccino and camera" style={{position:'absolute',inset:0,transform:`scale(${zoom}) translate(${Math.sin(phase)*8}px, ${Math.cos(phase)*4}px)`,transformOrigin:'73% 58%'}}>
      <CanvasImage src={staticFile('assets/cinematic-coffee.png')} premountFor={30} style={{width:1920,height:1080,objectFit:'cover'}} />
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}>
        <defs>
          <filter id="steam-soft"><feGaussianBlur stdDeviation="13" /></filter>
          <linearGradient id="steam-tone" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#ffecd2" stopOpacity=".05"/><stop offset=".5" stopColor="#fff7e6" stopOpacity=".45"/><stop offset="1" stopColor="#fff7e6" stopOpacity="0"/></linearGradient>
        </defs>
        {Array.from({length:7},(_,i)=>{
          const t=(frame/240+i/7)%1;
          const x=1300+i*37+Math.sin(t*6.28+i)*32;
          const y=205-t*380;
          return <ellipse key={i} cx={x} cy={y} rx={14+t*28} ry={70+t*45} fill="url(#steam-tone)" opacity={Math.sin(t*Math.PI)*.43} filter="url(#steam-soft)" transform={`rotate(${Math.sin(t*6.28+i)*14} ${x} ${y})`} />;
        })}
      </svg>
    </Interactive.Div>
    <Interactive.Div name="Warm light breathing" style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 85% 10%, rgba(255,179,87,.15), transparent 55%)',opacity:.4+.25*Math.sin(phase+1),mixBlendMode:'screen'}} />
  </AbsoluteFill>;
};

export const FilmComposition = () => <Composition id="CoffeeFilm" component={CoffeeFilm} width={1920} height={1080} fps={30} durationInFrames={240} />;
