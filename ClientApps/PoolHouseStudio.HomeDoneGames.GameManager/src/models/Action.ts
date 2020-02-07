import ActionType from "./enums/ActionType";

export interface IAction {
  type: ActionType;
  payload: any;
}
