interface IMap {
  name: string;
  label: string;
  levels: {
    lvl: number;
    label: string;
    descr: string
  }[];
}

export default IMap;