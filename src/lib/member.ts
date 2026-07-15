const MEMBER_KEY = 'longitude_member'

export type MemberProfile = {
  name: string
  email: string
  city: string
  phone?: string
  joinedAt: string
}

export function getMember(): MemberProfile | null {
  try {
    const raw = localStorage.getItem(MEMBER_KEY)
    if (!raw) return null
    return JSON.parse(raw) as MemberProfile
  } catch {
    return null
  }
}

export function saveMember(profile: Omit<MemberProfile, 'joinedAt'> & { joinedAt?: string }): MemberProfile {
  const member: MemberProfile = {
    ...profile,
    joinedAt: profile.joinedAt || new Date().toISOString(),
  }
  localStorage.setItem(MEMBER_KEY, JSON.stringify(member))
  return member
}

export function clearMember(): void {
  localStorage.removeItem(MEMBER_KEY)
}
