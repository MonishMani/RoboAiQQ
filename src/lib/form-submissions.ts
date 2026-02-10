import { supabase } from './supabaseClient'

export async function submitInterestForm(formData: {
  student_name: string
  age: number
  email: string
  phone: string
  interest: string
}) {
  try {
    const { data, error } = await supabase
      .from('interest_registrations')
      .insert([
        {
          student_name: formData.student_name,
          age: formData.age,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest
        }
      ])

    if (error) {
      console.error('Error submitting interest form:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function submitDemoForm(formData: {
  name: string
  email: string
  phone: string
  preferred_date?: string | null
  message: string
}) {
  try {
    const { data, error } = await supabase
      .from('demo_requests')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferred_date: formData.preferred_date || null,
          message: formData.message
        }
      ])

    if (error) {
      console.error('Error submitting demo form:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}
