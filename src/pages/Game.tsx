import { LocalPlayerArea } from '../components/LocalPlayerArea';
import { DrawCardArea } from '../components/DrawCardArea';
import { Gameboard } from '../components/Gameboard';
import { PlayersArea } from '../components/PlayersArea';
import { GameController } from '../controllers/GameController';
import { Stack } from '@mui/material';
import tileBlack from '../images/backgrounds/tile-black.jpg';
import { USCities } from '../model/USCities';
import { DestinationCard } from '../model/DestinationCard';
import { useState } from 'react';
import { TrainCard } from '../model/TrainCard';

export type GameProps = {
  game: GameController;
}

export const Game = (props: GameProps) => {
  const [selectedCities, setSelectedCities] = useState<USCities[]>([]);
  const [faceUpTrainCards, setFaceUpTrainCards] = useState(props.game.faceUpTrainCards);

  const handleSelectedDestinationCardChange = (card: DestinationCard | null) => {
    if (card) {
      setSelectedCities([card.city1, card.city2]);
    } else {
      setSelectedCities([]);
    }
  }

  const handleDrawTrainCardFromDeck = () => {
    const card = props.game.drawTrainCardFromDeck();
  }

  const handleDrawFaceUpTrainCard = (card: TrainCard) => {
    props.game.drawFaceUpTrainCard(card);
    setFaceUpTrainCards(props.game.faceUpTrainCards);
  }

  const handleDrawDestinationCards = () => {

  }

  return (
    <Stack style={{ backgroundImage: `url(${tileBlack})`, backgroundRepeat: 'repeat' }} >
      <Stack direction='row' justifyContent='space-between'>
        <PlayersArea
          players={props.game.players}
          activePlayer={props.game.activePlayer}
          localPlayer={props.game.localPlayer} />
        <Gameboard
          map={props.game.map}
          highlightCities={selectedCities}
          extraProps={{ height: '80vh', width: '100%' }} />
        <DrawCardArea
          trainCardDeck={props.game.trainCardDeck}
          faceUpTrainCards={props.game.faceUpTrainCards}
          destinationCardDeck={props.game.destinationCardDeck}
          cities={props.game.map.cities}
          canDrawTrainCards={props.game.activePlayer.name === props.game.localPlayer.name}
          canDrawDestinationCards={props.game.activePlayer.name === props.game.localPlayer.name}
          onDrawTrainCardFromDeck={handleDrawTrainCardFromDeck}
          onDrawFaceUpTrainCard={handleDrawFaceUpTrainCard}
          onDrawDestinationCards={handleDrawDestinationCards} />
      </Stack>
      <LocalPlayerArea
        player={props.game.players[0]}
        cities={props.game.map.cities}
        onSelectedDestinationCardChange={handleSelectedDestinationCardChange}
        extraProps={{ height: '20vh' }} />
    </Stack>
  );
}