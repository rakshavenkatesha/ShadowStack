/**
 * Supabase Database Schema Migration
 * 
 * Run these SQL commands in your Supabase SQL editor
 * Database > SQL Editor > Create new query
 */

-- Create audits table
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  role VARCHAR(255),
  team_size INTEGER NOT NULL,
  primary_use_case VARCHAR(50) NOT NULL,
  total_current_monthly_spend DECIMAL(10, 2) NOT NULL,
  total_recommended_monthly_spend DECIMAL(10, 2) NOT NULL,
  estimated_monthly_savings DECIMAL(10, 2) NOT NULL,
  estimated_annual_savings DECIMAL(10, 2) NOT NULL,
  optimization_score INTEGER NOT NULL,
  severity VARCHAR(50) NOT NULL,
  ai_summary TEXT,
  tools_data JSONB NOT NULL,
  recommendations_data JSONB NOT NULL,
  insights_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  company_name VARCHAR(255),
  role VARCHAR(255),
  audit_id UUID REFERENCES audits(id) ON DELETE SET NULL,
  contacted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX audits_email_idx ON audits(email);
CREATE INDEX audits_created_at_idx ON audits(created_at DESC);
CREATE INDEX leads_email_idx ON leads(email);
CREATE INDEX leads_created_at_idx ON leads(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER audits_updated_at
BEFORE UPDATE ON audits
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security)
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow anonymous insert/select)
CREATE POLICY "Allow anonymous audit insertion" ON audits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous audit selection" ON audits
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous lead insertion" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous lead selection" ON leads
  FOR SELECT USING (true);
