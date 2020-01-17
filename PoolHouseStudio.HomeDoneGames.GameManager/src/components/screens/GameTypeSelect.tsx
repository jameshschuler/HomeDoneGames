import React, { useEffect, useState } from "react";
import gameTypeService, { GameType } from "../../services/gameTypeService";

interface GameTypeSelectProps {}

const GameTypeSelect: React.FC<GameTypeSelectProps> = () => {
  const [gameTypes, setGameTypes] = useState<GameType[]>([]);

  useEffect(() => {
    getGameTypes();
  }, []);

  // TODO: this should probably just be stored in redux store
  const getGameTypes = async () => {
    const response = await gameTypeService.getGameTypes();
    setGameTypes(response);
  };

  const formatGameNameUrl = (gameName: string) => {
    return gameName.replace(/\s+/g, "").toLowerCase();
  };

  return <div>Test</div>;
};

export default GameTypeSelect;
