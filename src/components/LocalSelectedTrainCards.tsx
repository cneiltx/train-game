import { Button, Stack } from "@mui/material";
import { LocalTrainCardStack } from "./LocalTrainCardStack";
import { GameController, LocalSelectedRouteChangeEventArgs, LocalSelectedTrainCardsChangeEventArgs } from "../controllers/GameController";
import { useEffect, useState } from "react";
import { TrainCard } from "../model/TrainCard";

export interface LocalSelectedTrainCardsProps {
    game: GameController;
    extraProps?: any;
}

export const LocalSelectedTrainCards = (props: LocalSelectedTrainCardsProps) => {
    const trainCardsByColor: TrainCard[][] = [];
    const [localSelectedTrainCards, setLocalSelectedTrainCards] = useState(props.game.localSelectedTrainCards);
    const [selectedRoute, setSelectedRoute] = useState(props.game.localSelectedRoute);

    useEffect(() => {
        props.game.addEventListener("onLocalSelectedTrainCardsChange", (e) => handleLocalSelectedTrainCardsChange(e));
        return props.game.removeEventListener("onLocalSelectedTrainCardsChange", handleLocalSelectedTrainCardsChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLocalSelectedTrainCardsChange = (e: CustomEventInit<LocalSelectedTrainCardsChangeEventArgs>) => {
        setLocalSelectedTrainCards([...e.detail!.cards]);
    }

    useEffect(() => {
        props.game.addEventListener("onLocalSelectedRouteChange", (e) => handleLocalSelectedRouteChange(e));
        return props.game.removeEventListener("onLocalSelectedRouteChange", handleLocalSelectedRouteChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLocalSelectedRouteChange = (e: CustomEventInit<LocalSelectedRouteChangeEventArgs>) => {
        setSelectedRoute(e.detail!.route);
    }

    const handleClaimRoute = () => {
        if (selectedRoute) {
            props.game.claimRoute(selectedRoute, localSelectedTrainCards);
        }
    }

    for (const card of localSelectedTrainCards ?? []) {
        const index = trainCardsByColor.findIndex((value) => value[0].color === card.color);
        if (index === -1) {
            trainCardsByColor.push([card]);
        } else {
            trainCardsByColor[index].push(card);
        }
    }

    return (
        <Stack key={1} direction="column" padding="1.5vh" spacing="1vh" alignItems="center" {...props.extraProps}>
            {trainCardsByColor.length > 0 && <LocalTrainCardStack key={trainCardsByColor[0][0].color} cards={trainCardsByColor[0]} mode="playerHandSelected" game={props.game} />}
            {trainCardsByColor.length > 1 && <LocalTrainCardStack key={trainCardsByColor[1][0].color} cards={trainCardsByColor[1]} mode="playerHandSelected" game={props.game} />}
            <Button variant="outlined" size="small" disabled={!selectedRoute || localSelectedTrainCards.length < selectedRoute.segments.length} onClick={handleClaimRoute}>Claim Route</Button>
        </Stack>
    );
}