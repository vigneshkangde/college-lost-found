
import { supabase } from './lib/supabaseClient'

async function testConnection() {
  const { data, error } = await supabase
    .from('items')
    .select('id')
    .limit(1)

  if (error) {
    console.error('Supabase connection test failed:', error.message)
    return
  }

  console.log('Supabase connection successful!')
  console.log('Items returned:', data.length)
}

testConnection()
