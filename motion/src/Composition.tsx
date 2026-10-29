import React from 'react';
import {AbsoluteFill, CanvasImage, Composition, Interactive, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

type CoffeeProps = {assetBase: string};
const colors = {yellow:'#ffd353', ink:'#252524', paper:'#fafaf8', ring:'#edbd3b', shadow:'rgba(60,38,6,.2)'};

export const CoffeeCollage: React.FC<CoffeeProps> = ({assetBase}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cycle = frame / (12 * fps) * Math.PI * 2;
  const asset = (name:string) => assetBase ? `${assetBase}${name}` : staticFile(`assets/${name}`);
  return <AbsoluteFill style={{background:colors.yellow,color:colors.ink,fontFamily:'"Golos Text", sans-serif',overflow:'hidden'}}>
    <div style={{position:'absolute',left:60,top:90,width:640,height:640,border:`1px solid ${colors.ring}`,borderRadius:'50%',scale:interpolate(Math.sin(cycle),[-1,1],[.93,1.04])}} />
    <div style={{position:'absolute',left:110,top:140,width:540,height:540,border:`1px solid ${colors.ring}`,borderRadius:'50%'}} />
    <Interactive.Div name="Hot Cup typography" style={{position:'absolute',left:40,top:18,fontSize:146,fontWeight:700,letterSpacing:-12,lineHeight:1,translate:`${interpolate(Math.sin(cycle),[-1,1],[-9,9])}px 0px`}}>HOT CUP</Interactive.Div>
    <Interactive.Div name="Waffles photograph" style={{position:'absolute',left:28,top:230,width:270,height:390,padding:10,background:colors.paper,borderRadius:14,boxShadow:`0 20px 50px ${colors.shadow}`,rotate:`${interpolate(Math.sin(cycle+1),[-1,1],[-16,-10])}deg`,translate:`0px ${interpolate(Math.sin(cycle+1),[-1,1],[-24,24])}px`}}>
      <CanvasImage src={asset('waffles.webp')} premountFor={fps} style={{width:250,height:370,objectFit:'cover',borderRadius:7}} />
    </Interactive.Div>
    <Interactive.Div name="Latte photograph" style={{position:'absolute',right:20,top:225,width:270,height:390,padding:10,background:colors.paper,borderRadius:14,boxShadow:`0 20px 50px ${colors.shadow}`,rotate:`${interpolate(Math.sin(cycle+3),[-1,1],[10,16])}deg`,translate:`0px ${interpolate(Math.sin(cycle+3),[-1,1],[-24,24])}px`}}>
      <CanvasImage src={asset('latte.webp')} premountFor={fps} style={{width:250,height:370,objectFit:'cover',borderRadius:7}} />
    </Interactive.Div>
    <Interactive.Div name="Your coffee moment" style={{position:'absolute',left:178,top:158,width:404,height:550,padding:12,background:colors.paper,borderRadius:16,boxShadow:`0 28px 60px ${colors.shadow}`,rotate:`${interpolate(Math.sin(cycle),[-1,1],[-5,3])}deg`,translate:`0px ${interpolate(Math.cos(cycle),[-1,1],[-12,12])}px`}}>
      <CanvasImage src={asset('coffee.webp')} premountFor={fps} style={{width:380,height:486,objectFit:'cover',objectPosition:'center 43%',borderRadius:8}} />
      <div style={{height:40,display:'flex',alignItems:'center',justifyContent:'center',fontSize:19,fontWeight:500}}>Твоя чашка. Твой момент.</div>
    </Interactive.Div>
    <Interactive.Div name="Pause seal" style={{position:'absolute',right:27,top:112,width:126,height:126,background:colors.ink,color:colors.yellow,borderRadius:'50%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:22,lineHeight:1.05,fontWeight:600,rotate:`${interpolate(Math.sin(cycle),[-1,1],[-12,12])}deg`}}><span>Можно</span><span>не спешить</span><svg width="30" height="30" viewBox="0 0 32 32" style={{marginTop:9}}><path d="M12 7v18M21 7v18" stroke="currentColor" strokeWidth="3"/></svg></Interactive.Div>
    <div style={{position:'absolute',left:42,right:42,bottom:28,display:'flex',justifyContent:'space-between',fontSize:17,borderTop:`1px solid ${colors.ink}`,paddingTop:16}}><span>Луховицы</span></div>
  </AbsoluteFill>;
};

export const MyComposition = () => <Composition id="CoffeeCollage" component={CoffeeCollage} width={760} height={800} fps={30} durationInFrames={360} defaultProps={{assetBase:''}} />;
