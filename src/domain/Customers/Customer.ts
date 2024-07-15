export interface Customer {
  id: number | null;
  title: string;
  name: string;
  lastName: string;
  phone: string;
  balance: number;
}

export const DEFAULT_CUSTOMER: Customer = {
  id: null,
  name: "",
  lastName: "",
  title: "",
  phone: "",
  balance: 0,
};
