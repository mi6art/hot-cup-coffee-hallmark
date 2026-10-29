import { MyComposition } from "./Composition";
import {staticFile} from 'remotion';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <link rel="stylesheet" href={staticFile('assets/fonts.css')} />
      <MyComposition />
    </>
  );
};
