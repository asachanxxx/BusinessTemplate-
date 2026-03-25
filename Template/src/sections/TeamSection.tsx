import { Container } from '@/components/Container'
import type { TeamContent, TeamMember } from '@/types'

interface Props {
  content: TeamContent
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <li className="flex flex-col items-center rounded-[--radius] bg-surface p-6 text-center shadow-sm">
      {member.photoUrl ? (
        <img
          src={member.photoUrl}
          alt={member.name}
          width={120}
          height={120}
          className="mb-4 size-28 rounded-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="mb-4 flex size-28 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
          {member.name.charAt(0)}
        </div>
      )}

      <h3 className="font-heading text-lg font-semibold text-text">{member.name}</h3>
      <p className="mt-0.5 text-sm font-medium text-primary">{member.role}</p>

      {member.bio && (
        <p className="mt-3 text-sm leading-relaxed text-text-muted">{member.bio}</p>
      )}

      {member.socialLinks && member.socialLinks.length > 0 && (
        <div className="mt-4 flex gap-3">
          {member.socialLinks.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on ${s.platform}`}
              className="text-xs uppercase text-text-muted transition-colors hover:text-primary"
            >
              {s.platform}
            </a>
          ))}
        </div>
      )}
    </li>
  )
}

export function TeamSection({ content }: Props) {
  const { sectionTitle, sectionSubtitle, items } = content

  if (items.length === 0) return null

  return (
    <section id="team" className="bg-bg-alt py-20">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="mx-auto max-w-2xl text-lg text-text-muted">{sectionSubtitle}</p>
          )}
        </div>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
