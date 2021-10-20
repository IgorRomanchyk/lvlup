interface IWorker {
  login: string;
  name?: string;
  surname?: string;
  email?: string;
  avatarUrl?: string;
  maps: string[];
  roles: string[];
}

export default IWorker;