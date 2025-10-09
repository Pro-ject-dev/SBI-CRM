export interface Lead {
  id: string;
  name: string;
  date: string;
  email: string;
  phoneNumber: string; // Changed from 'phone' to 'phoneNumber'
  module: string;
  source: string;
  isOrder: string; // Changed from 'number' to 'string' based on example "0"
  status: string; // New field
  createdAt: string; // New field
}