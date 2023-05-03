import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://egaeiimprrzelsjvoevf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnYWVpaW1wcnJ6ZWxzanZvZXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwNTA3MTMsImV4cCI6MTk5ODYyNjcxM30.NKLq2EHkDH49qYEL1rKR8ZNudW4Z2LS4Nbi30jLCweo'
    )