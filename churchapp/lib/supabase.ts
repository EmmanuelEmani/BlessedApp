import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qvbgxeafhhhtsdewhdwl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2Ymd4ZWFmaGhodHNkZXdoZHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NjExMDgsImV4cCI6MjA1MDEzNzEwOH0.Gv5VSA8Ap7Yzk7y_fwG0m-d12OMUC-lNPkFBPJfVk1s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

