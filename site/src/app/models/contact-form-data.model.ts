import { AddressData } from "./address-data.model";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  address?: AddressData;
}
