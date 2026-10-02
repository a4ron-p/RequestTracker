const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

export type RequestRecord = {
  id: string
  name: string
  details: string
  date: string
  status: string
  created_at?: string
}

function headers() {
  return {
    apikey: supabaseKey ?? '',
    Authorization: `Bearer ${supabaseKey ?? ''}`,
    'Content-Type': 'application/json',
  }
}

function endpoint(path = '') {
  if (!supabaseUrl || !supabaseKey) throw new Error('Supabase environment variables are missing.')
  return `${supabaseUrl}/rest/v1/requests${path}`
}

export async function createRequest(input: Pick<RequestRecord, 'name' | 'details' | 'date'>) {
  const response = await fetch(endpoint(), {
    method: 'POST',
    headers: { ...headers(), Prefer: 'return=minimal' },
    body: JSON.stringify({
      request_date: input.date,
      submitted_by: input.name,
      description: input.details,
      status: 'Submitted',
    }),
  })
  if (!response.ok) throw new Error('Unable to submit request.')
}

export async function listRequests() {
  const response = await fetch(endpoint('?select=id,request_date,submitted_by,description,status,created_at&order=request_date.desc,created_at.desc'), {
    headers: headers(),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('Unable to load requests.')

  const rows = (await response.json()) as Array<{
    id: string
    request_date: string
    submitted_by: string
    description: string
    status: string
    created_at?: string
  }>

  return rows.map((row) => ({
    id: row.id,
    date: row.request_date,
    name: row.submitted_by,
    details: row.description,
    status: row.status,
    created_at: row.created_at,
  }))
}

export async function updateRequestStatus(id: string, status: string) {
  const response = await fetch(endpoint(`?id=eq.${encodeURIComponent(id)}`), {
    method: 'PATCH',
    headers: { ...headers(), Prefer: 'return=minimal' },
    body: JSON.stringify({ status }),
  })
  if (!response.ok) throw new Error('Unable to update request status.')
}
