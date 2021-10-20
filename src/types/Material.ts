interface IMaterial {
  map: string;
  title: string;
  subtitle?: string;
  type: string;
  lvl: number;
  order: number;
  sub?: number;
  duration?: string;
  url: string;
  engUrl?: string;
  project?: string;
  descr?: string;
  descr2?: string;
  _id?: string;
  id?: string;
}

export default IMaterial;