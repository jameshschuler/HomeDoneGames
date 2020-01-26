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
import GameMenu from "./GameMenu";
import GameTypeSelect from "./GameTypeSelect";
import Lobby from "./Lobby";

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

  useEffect(() => {
    renderSwitch(gameState.gameStateValue);
  }, [gameState.gameStateValue, gameTypes]);

  const selectGameType = (gameType: GameType) => {
    setGameType(gameType);
  };

  const selectGameMenuOption = async (gameMenuOption: GameMenuOption) => {
    if (gameMenuOption === GameMenuOption.Play) {
      await play(gameState.selectedGameType?.gameTypeID!);
    }
  };

  const goToScreen = (from: GameStateEnum, to: GameStateEnum) => {
    // TODO: show warning when trying to leave a lobby
    setGameState(to);
  };

  const renderSwitch = (gameStateValue: GameStateEnum) => {
    switch (gameStateValue) {
      case GameStateEnum.GameOptionsMenu:
        return (
          <GameMenu
            goToScreen={goToScreen}
            selectGameMenuOption={selectGameMenuOption}
            gameType={gameState.selectedGameType}
          />
        );
      case GameStateEnum.GameSelect:
        return (
          <GameTypeSelect
            gameTypes={gameTypes}
            loading={loading}
            selectGameType={selectGameType}
          />
        );
      case GameStateEnum.Lobby:
        return <Lobby goToScreen={goToScreen} room={room} />;
      default:
        return (
          <GameTypeSelect
            gameTypes={gameTypes}
            loading={loading}
            selectGameType={selectGameType}
          />
        );
    }
  };

  return <>{renderSwitch(gameState.gameStateValue)}</>;
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
