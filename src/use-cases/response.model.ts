export type MessageResponse = {
  msg: string;
};

export const MsgResponse = (message: string): MessageResponse => ({
  msg: message,
});
