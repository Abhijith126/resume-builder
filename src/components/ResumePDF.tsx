import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Resume, TemplateType } from '../types';

const premiumStyles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica',
    fontSize: 9,
    lineHeight: 1.3,
    color: '#1e293b',
  },
  header: {
    backgroundColor: '#1e293b',
    color: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  headerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  headerDivider: {
    height: 2,
    backgroundColor: '#60a5fa',
    width: 50,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'column',
    gap: 2,
    fontSize: 8,
  },
  contactItem: {
    flexDirection: 'row',
    gap: 4,
  },
  contactLabel: {
    color: '#60a5fa',
  },
  headerPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#60a5fa',
  },
  mainContent: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 24,
  },
  leftColumn: {
    flex: 0.6,
  },
  rightColumn: {
    flex: 0.4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#1e293b',
    marginBottom: 8,
    borderBottom: '1.5 solid #cbd5e1',
    paddingBottom: 4,
  },
  summaryText: {
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.4,
  },
  entry: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  entryDate: {
    fontSize: 8,
    color: '#64748b',
  },
  entrySubtitle: {
    color: '#3b82f6',
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  bullet: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 2,
  },
  bulletPoint: {
    width: 10,
    fontSize: 8,
    color: '#94a3b8',
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.3,
  },
  skillItem: {
    fontSize: 8,
    marginBottom: 6,
    paddingBottom: 4,
    borderBottom: '0.5 solid #cbd5e1',
  },
  certItem: {
    marginBottom: 8,
    paddingBottom: 6,
    borderBottom: '0.5 dashed #cbd5e1',
  },
  projectItem: {
    marginBottom: 8,
    paddingBottom: 6,
    borderBottom: '0.5 dashed #cbd5e1',
  },
  projectName: {
    fontWeight: 'bold',
    fontSize: 9,
    marginBottom: 2,
  },
  projectTech: {
    color: '#3b82f6',
    fontSize: 7,
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.3,
  },
});

const defaultStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333',
  },
  header: {
    marginBottom: 15,
    borderBottom: '2 solid #2563eb',
    paddingBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
  contact: {
    fontSize: 9,
    color: '#666',
    marginBottom: 2,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 6,
    borderBottom: '1 solid #e5e7eb',
    paddingBottom: 2,
  },
  entry: {
    marginBottom: 8,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  entrySubtitle: {
    color: '#666',
    fontSize: 9,
  },
  entryDate: {
    color: '#888',
    fontSize: 8,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 2,
    marginLeft: 6,
  },
  bulletPoint: {
    width: 8,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skill: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    fontSize: 8,
  },
});

interface Props {
  resume: Resume;
  template?: TemplateType;
}

export default function ResumePDF({ resume, template = 'premium' }: Props) {
  if (template === 'premium') {
    return <PremiumPDF resume={resume} />;
  }

  return <DefaultPDF resume={resume} />;
}

function PremiumPDF({ resume }: { resume: Resume }) {
  return (
    <Document>
      <Page size="A4" style={premiumStyles.page}>
        {/* Header */}
        <View style={premiumStyles.header}>
          <View style={premiumStyles.headerLeft}>
            <Text style={premiumStyles.headerName}>
              {resume.personalInfo.name || 'Your Name'}
            </Text>
            <View style={premiumStyles.headerDivider} />
            <View style={premiumStyles.contactRow}>
              {resume.personalInfo.email && (
                <View style={premiumStyles.contactItem}>
                  <Text style={premiumStyles.contactLabel}>✉</Text>
                  <Text>{resume.personalInfo.email}</Text>
                </View>
              )}
              {resume.personalInfo.phone && (
                <View style={premiumStyles.contactItem}>
                  <Text style={premiumStyles.contactLabel}>📱</Text>
                  <Text>{resume.personalInfo.phone}</Text>
                </View>
              )}
              {resume.personalInfo.location && (
                <View style={premiumStyles.contactItem}>
                  <Text style={premiumStyles.contactLabel}>📍</Text>
                  <Text>{resume.personalInfo.location}</Text>
                </View>
              )}
              {resume.personalInfo.website && (
                <View style={premiumStyles.contactItem}>
                  <Text style={premiumStyles.contactLabel}>🌐</Text>
                  <Text>{resume.personalInfo.website}</Text>
                </View>
              )}
            </View>
          </View>
          
          {/* Photo - Only if available */}
          {resume.personalInfo.photo && (
            <View style={{ width: 80, marginLeft: 20 }}>
              <Text style={{ 
                fontSize: 6, 
                color: '#94a3b8',
                width: 80,
                height: 80,
                backgroundColor: '#334155',
                borderWidth: 2,
                borderColor: '#60a5fa',
                borderRadius: 40,
                textAlign: 'center'
              }}>
                [Photo]
              </Text>
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={premiumStyles.mainContent}>
          {/* Left Column */}
          <View style={premiumStyles.leftColumn}>
            {/* Summary */}
            {resume.summary && (
              <View style={premiumStyles.section}>
                <Text style={premiumStyles.sectionTitle}>Professional Summary</Text>
                <Text style={premiumStyles.summaryText}>{resume.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {resume.experience.length > 0 && (
              <View style={premiumStyles.section}>
                <Text style={premiumStyles.sectionTitle}>Experience</Text>
                {resume.experience.map((exp) => (
                  <View key={exp.id} style={premiumStyles.entry}>
                    <View style={premiumStyles.entryHeader}>
                      <Text style={premiumStyles.entryTitle}>{exp.title}</Text>
                      <Text style={premiumStyles.entryDate}>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </Text>
                    </View>
                    <Text style={premiumStyles.entrySubtitle}>
                      {exp.company}
                      {exp.location ? ` • ${exp.location}` : ''}
                    </Text>
                    {exp.description && exp.description.split('\n').filter(Boolean).map((line, i) => (
                      <View key={i} style={premiumStyles.bullet}>
                        <Text style={premiumStyles.bulletPoint}>▸</Text>
                        <Text style={premiumStyles.bulletText}>{line}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {resume.education.length > 0 && (
              <View style={premiumStyles.section}>
                <Text style={premiumStyles.sectionTitle}>Education</Text>
                {resume.education.map((edu) => (
                  <View key={edu.id} style={premiumStyles.entry}>
                    <View style={premiumStyles.entryHeader}>
                      <Text style={premiumStyles.entryTitle}>{edu.degree}</Text>
                      <Text style={premiumStyles.entryDate}>
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </Text>
                    </View>
                    <Text style={premiumStyles.entrySubtitle}>{edu.institution}</Text>
                    {edu.gpa && <Text style={premiumStyles.entryDate}>GPA: {edu.gpa}</Text>}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column - Sidebar */}
          <View style={premiumStyles.rightColumn}>
            {/* Languages */}
            {resume.languages.length > 0 && (
              <View style={premiumStyles.section}>
                <Text style={premiumStyles.sectionTitle}>Languages</Text>
                {resume.languages.map((lang) => (
                  <Text key={lang.id} style={premiumStyles.skillItem}>
                    {lang.name} - {lang.proficiency}
                  </Text>
                ))}
              </View>
            )}

            {/* Skills */}
            {resume.skills.length > 0 && (
              <View style={premiumStyles.section}>
                <Text style={premiumStyles.sectionTitle}>Skills</Text>
                {resume.skills.map((skill) => (
                  <View key={skill} style={premiumStyles.skillItem}>
                    <Text>{skill}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {resume.certifications.length > 0 && (
              <View style={premiumStyles.section}>
                <Text style={premiumStyles.sectionTitle}>Certifications</Text>
                {resume.certifications.map((cert) => (
                  <View key={cert.id} style={premiumStyles.certItem}>
                    <Text style={premiumStyles.entryTitle}>{cert.title}</Text>
                    <Text style={premiumStyles.entrySubtitle}>{cert.issuer}</Text>
                    {cert.date && <Text style={premiumStyles.entryDate}>{cert.date}</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {resume.projects.length > 0 && (
              <View style={premiumStyles.section}>
                <Text style={premiumStyles.sectionTitle}>Projects</Text>
                {resume.projects.map((proj) => (
                  <View key={proj.id} style={premiumStyles.projectItem}>
                    <Text style={premiumStyles.projectName}>{proj.name}</Text>
                    {proj.technologies && (
                      <Text style={premiumStyles.projectTech}>{proj.technologies}</Text>
                    )}
                    <Text style={premiumStyles.projectDesc}>{proj.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

function DefaultPDF({ resume }: { resume: Resume }) {
  return (
    <Document>
      <Page size="A4" style={defaultStyles.page}>
        {/* Header */}
        <View style={defaultStyles.header}>
          <Text style={defaultStyles.name}>{resume.personalInfo.name || 'Your Name'}</Text>
          <Text style={defaultStyles.contact}>
            {[resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.location]
              .filter(Boolean)
              .join(' • ')}
          </Text>
          {resume.personalInfo.website && (
            <Text style={defaultStyles.contact}>{resume.personalInfo.website}</Text>
          )}
        </View>

        {/* Summary */}
        {resume.summary && (
          <View style={defaultStyles.section}>
            <Text style={defaultStyles.sectionTitle}>Professional Summary</Text>
            <Text>{resume.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <View style={defaultStyles.section}>
            <Text style={defaultStyles.sectionTitle}>Experience</Text>
            {resume.experience.map((exp) => (
              <View key={exp.id} style={defaultStyles.entry}>
                <View style={defaultStyles.entryRow}>
                  <Text style={defaultStyles.entryTitle}>{exp.title}</Text>
                  <Text style={defaultStyles.entryDate}>
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </Text>
                </View>
                <Text style={defaultStyles.entrySubtitle}>
                  {exp.company}
                  {exp.location ? `, ${exp.location}` : ''}
                </Text>
                {exp.description.split('\n').filter(Boolean).map((line, i) => (
                  <View key={i} style={defaultStyles.bullet}>
                    <Text style={defaultStyles.bulletPoint}>•</Text>
                    <Text style={defaultStyles.bulletText}>{line}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <View style={defaultStyles.section}>
            <Text style={defaultStyles.sectionTitle}>Education</Text>
            {resume.education.map((edu) => (
              <View key={edu.id} style={defaultStyles.entry}>
                <View style={defaultStyles.entryRow}>
                  <Text style={defaultStyles.entryTitle}>{edu.degree}</Text>
                  <Text style={defaultStyles.entryDate}>{edu.endDate}</Text>
                </View>
                <Text style={defaultStyles.entrySubtitle}>
                  {edu.institution}
                  {edu.location ? `, ${edu.location}` : ''}
                </Text>
                {edu.gpa && <Text style={defaultStyles.contact}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <View style={defaultStyles.section}>
            <Text style={defaultStyles.sectionTitle}>Skills</Text>
            <View style={defaultStyles.skillsRow}>
              {resume.skills.map((skill, i) => (
                <Text key={i} style={defaultStyles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <View style={defaultStyles.section}>
            <Text style={defaultStyles.sectionTitle}>Projects</Text>
            {resume.projects.map((proj) => (
              <View key={proj.id} style={defaultStyles.entry}>
                <Text style={defaultStyles.entryTitle}>{proj.name}</Text>
                {proj.technologies && (
                  <Text style={defaultStyles.entrySubtitle}>{proj.technologies}</Text>
                )}
                <Text style={defaultStyles.bulletText}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}