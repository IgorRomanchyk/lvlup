interface IWorker {
  login: string;
  password: string;
  confirm: string;
  name?: string;
  surname?: string;
  email?: string;
  avatarUrl?: string;
  maps: string[];
  roles: string[];
}

export default IWorker;