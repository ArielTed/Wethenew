export interface Message {
  body: string;
  date: string;
  id: number;
  read: boolean;
  subject: string;
  type: string;
  contact: {
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
  };
}
