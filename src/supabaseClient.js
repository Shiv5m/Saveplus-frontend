import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://kexckhlmrqaaefgszwgw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtleGNraGxtcnFhYWVmZ3N6d2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjE0MTYsImV4cCI6MjA2Nzg5NzQxNn0.23Oxmc-mYcKkaZ-j3WHK_Qc5D5NI1GpGvAcbX4RFexQ'
);

export { supabase };
