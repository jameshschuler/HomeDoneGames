import React, { useEffect } from "react";
import { connect } from "react-redux";
import GameStateEnum from "../../models/enums/GameState";
import GameType from "../../models/GameType";
import { setGameType } from "../../store/actions/GameStateActions";
import { RootState } from "../../store/reducers/RootReducer";
import GameMenu from "./GameMenu";
import GameTypeSelect from "./GameTypeSelect";

interface ContainerProps {
  gameStateValue: GameStateEnum;
  setGameType: (gameType: GameType) => any;
}

const Container: React.FC<ContainerProps> = ({
  gameStateValue,
  setGameType
}) => {
  useEffect(() => {
    renderSwitch(gameStateValue);
  }, [gameStateValue]);

  const selectGameType = (gameType: GameType) => {
    console.log(gameType);
    setGameType(gameType);
  };

  const renderSwitch = (gameStateValue: GameStateEnum) => {
    switch (gameStateValue) {
      case GameStateEnum.GameTypeMenu:
        return <GameMenu />;
      case GameStateEnum.GameTypeSelect:
        return <GameTypeSelect selectGameType={selectGameType} />;
      default:
        return <GameTypeSelect selectGameType={selectGameType} />;
    }
  };

  return <>{renderSwitch(gameStateValue)}</>;
};

const mapStateToProps = (state: RootState) => {
  return {
    gameStateValue: state.gameState.gameStateValue
  };
};

export default connect(mapStateToProps, { setGameType })(Container);
