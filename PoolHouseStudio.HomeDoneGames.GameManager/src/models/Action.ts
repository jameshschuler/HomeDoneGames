import ActionType from "./enums/ActionType";

export default interface Action {
  type: ActionType;
  payload: any;
}
