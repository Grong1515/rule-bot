export enum ChatTypes {
  PRIVATE = 'private',
  GROUP = 'group'
}

export default interface Chat {
  id: number;
  type: ChatTypes;
  title?: string;
}

