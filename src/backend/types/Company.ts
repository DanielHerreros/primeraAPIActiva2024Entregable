export interface Company {
  id?: string; 
  companyName: string;
  distributor: string; 
  contract_duration: number; 
  penalty_period: number; 
  start_date: Date;
  active: boolean;
}