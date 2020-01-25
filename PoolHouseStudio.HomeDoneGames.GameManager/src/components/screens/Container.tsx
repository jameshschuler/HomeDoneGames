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
import {
  connectToHub,
  generateRoomCode,
  joinGroup
} from "../../store/actions/ManageActions";
import { GameState } from "../../store/reducers/GameStateReducer";
import { RootState } from "../../store/reducers/RootReducer";
import GameMenu from "./GameMenu";
import GameTypeSelect from "./GameTypeSelect";

interface ContainerProps {
  gameState: GameState;
  gameTypes: GameType[];
  loading: boolean;
  connectToHub: Function;
  generateRoomCode: (gameTypeID: number) => any;
  getGameTypes: Function;
  joinGroup: Function;
  setGameState: (gameState: GameStateEnum) => any;
  setGameType: (gameType: GameType) => any;
}

const Container: React.FC<ContainerProps> = ({
  gameState,
  gameTypes,
  loading,
  connectToHub,
  generateRoomCode,
  getGameTypes,
  joinGroup,
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
      await connectToHub();
      await joinGroup();
      await generateRoomCode(gameState.selectedGameType?.gameTypeID!);
    }
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
  connectToHub,
  generateRoomCode,
  getGameTypes,
  joinGroup,
  setGameState,
  setGameType
})(Container);
