import React, { useEffect } from "react";
import { connect } from "react-redux";
import GameStateEnum from "../../models/enums/GameState";
import GameType from "../../models/GameType";
import { getGameTypes } from "../../store/actions/DataStoreActions";
import { setGameType } from "../../store/actions/GameStateActions";
import { RootState } from "../../store/reducers/RootReducer";
import GameMenu from "./GameMenu";
import GameTypeSelect from "./GameTypeSelect";

interface ContainerProps {
  gameStateValue: GameStateEnum;
  gameTypes: GameType[];
  getGameTypes: () => any;
  loading: boolean;
  setGameType: (gameType: GameType) => any;
}

const Container: React.FC<ContainerProps> = ({
  gameStateValue,
  gameTypes,
  getGameTypes,
  loading,
  setGameType
}) => {
  useEffect(() => {
    getGameTypes();
  }, []);

  useEffect(() => {
    renderSwitch(gameStateValue);
  }, [gameStateValue, gameTypes]);

  const selectGameType = (gameType: GameType) => {
    setGameType(gameType);
  };

  const renderSwitch = (gameStateValue: GameStateEnum) => {
    switch (gameStateValue) {
      case GameStateEnum.GameTypeMenu:
        return <GameMenu />;
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

  return <>{renderSwitch(gameStateValue)}</>;
};

const mapStateToProps = (state: RootState) => {
  return {
    gameStateValue: state.gameState.gameStateValue,
    gameTypes: state.dataStore.gameTypes,
    loading: state.global.loading
  };
};

export default connect(mapStateToProps, { getGameTypes, setGameType })(
  Container
);
