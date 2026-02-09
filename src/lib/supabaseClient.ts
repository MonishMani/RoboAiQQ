import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ylxilvjhdwookcgdqqwp.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlseGlsdmpoZHdvb2tjZ2RxcXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NDM4MjUsImV4cCI6MjA4NjIxOTgyNX0.Go-zqN9dhdQFYwmVAzoCbJv2p1QX1XoTHFH9jmNx1c8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
