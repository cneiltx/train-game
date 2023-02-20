import { TrainCardColor } from '../model/TrainCardColor';
import './DrawCardArea.css';
import { TrainCard } from './TrainCard';

export type DrawCardAreaProps = {
}

export const DrawCardArea = (props: DrawCardAreaProps) => {
  return (
    <div className='DrawCardArea'>
      <TrainCard width={200} color={TrainCardColor.Red} />
    </div>
  );
}