import React, { useEffect } from "react";
import { connect } from "react-redux";
import GameMenuOption from "../../models/enums/GameMenuOption";
import GameStateEnum from "../../models/enums/GameState";
import GameType from "../../models/GameType";
import { getGameTypes } from "../../store/actions/DataStoreActions";
import {
  setGameState,
  setGameType
} from "../../store/actions/GameStateActions";
import { getRoomCode } from "../../store/actions/ManageActions";
import { GameState } from "../../store/reducers/GameStateReducer";
import { RootState } from "../../store/reducers/RootReducer";
import GameMenu from "./GameMenu";
import GameTypeSelect from "./GameTypeSelect";

interface ContainerProps {
  gameState: GameState;
  gameTypes: GameType[];
  getGameTypes: () => any;
  getRoomCode: () => any;
  loading: boolean;
  setGameState: (gameState: GameStateEnum) => any;
  setGameType: (gameType: GameType) => any;
}

const Container: React.FC<ContainerProps> = ({
  gameState,
  gameTypes,
  getGameTypes,
  getRoomCode,
  loading,
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

  const selectGameMenuOption = (gameMenuOption: GameMenuOption) => {
    console.log(gameMenuOption);
    getRoomCode();
  };

  const goToScreen = (gameState: GameStateEnum) => {
    setGameState(gameState);
  };

  const renderSwitch = (gameStateValue: GameStateEnum) => {
    switch (gameStateValue) {
      case GameStateEnum.GameTypeMenu:
        return (
          <GameMenu
            goToScreen={goToScreen}
            selectGameMenuOption={selectGameMenuOption}
            gameType={gameState.selectedGameType}
          />
        );
      case GameStateEnum.GameTypeSelect:
        return (
          <GameTypeSelect
            gameTypes={gameTypes}
            loading={loading}
            selectGameType={selectGameType}
          />
        );
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
    loading: state.global.loading
  };
};

export default connect(mapStateToProps, {
  getGameTypes,
  getRoomCode,
  setGameState,
  setGameType
})(Container);
