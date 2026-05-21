import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cjvsaqgomgzygkcryaom.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdnNhcWdvbWd6eWdrY3J5YW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NzIxOTYsImV4cCI6MjA5MjM0ODE5Nn0.Yyk-99H6T17pZYgDTefZ2QblLB6RUtmMvo9U4dHfMSs'

export const supabase = createClient(supabaseUrl, supabaseKey)