import React, { useEffect } from "react";
import { connect } from "react-redux";
import GameMenuOption from "../../models/enums/GameMenuOption";
import GameStateEnum from "../../models/enums/GameState";
import GameType from "../../models/GameType";
import { Room } from "../../models/Room";
import { getGameTypes } from "../../store/actions/DataStoreActions";
import {
  setGameState,
  setGameType
} from "../../store/actions/GameStateActions";
import { play } from "../../store/actions/ManageActions";
import { GameState } from "../../store/reducers/GameStateReducer";
import { RootState } from "../../store/reducers/RootReducer";

interface ContainerProps {
  gameState: GameState;
  gameTypes: GameType[];
  loading: boolean;
  room: Room;
  getGameTypes: () => any;
  play: (gameTypeID: number) => any;
  setGameState: (gameState: GameStateEnum) => any;
  setGameType: (gameType: GameType) => any;
}

const Container: React.FC<ContainerProps> = ({
  gameState,
  gameTypes,
  loading,
  room,
  getGameTypes,
  play,
  setGameState,
  setGameType
}) => {
  useEffect(() => {
    getGameTypes();
  }, []);

  useEffect(() => {}, [gameState.gameStateValue, gameTypes]);

  const selectGameType = (gameType: GameType) => {
    setGameType(gameType);
  };

  const selectGameMenuOption = async (gameMenuOption: GameMenuOption) => {
    if (gameMenuOption === GameMenuOption.Play) {
      await play(gameState.selectedGameType?.gameTypeID!);
    }
  };

  return <div>T</div>;
};

const mapStateToProps = (state: RootState) => {
  return {
    gameState: state.gameState,
    gameTypes: state.dataStore.gameTypes,
    loading: state.global.loading,
    room: state.manage.room
  };
};

export default connect(mapStateToProps, {
  getGameTypes,
  play,
  setGameState,
  setGameType
})(Container);
