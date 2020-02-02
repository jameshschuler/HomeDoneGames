import React from "react";
import { connect } from "react-redux";
import { IPlayer } from "../../models/Player";
import { IRootState } from "../../store/reducers/RootReducer";

interface ILobbyProps {
  players: IPlayer[];
}

const Lobby: React.FC<ILobbyProps> = ({ players }) => {
  return (
    <div>
      Lobby
      {players &&
        players.map((player: IPlayer, index: number) => {
          return <p>{player.name}</p>;
        })}
    </div>
  );
};

const mapStateToProps = (state: IRootState) => {
  return {
    players: state.hub.players
  };
};

export default connect(mapStateToProps)(Lobby);
