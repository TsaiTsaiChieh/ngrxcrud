export interface Associates {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  address: string;
  associategrop: string;
  status: boolean;
}

export interface AssociateModel {
  list: Associates[];
  associateobj: Associates;
  errormessage: string;
}
