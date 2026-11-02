import { MyComposition } from "./Composition";
import {staticFile} from 'remotion';
import {FilmComposition} from './CoffeeFilm';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <link rel="stylesheet" href={staticFile('assets/fonts.css')} />
      <MyComposition />
      <FilmComposition />
    </>
  );
};
