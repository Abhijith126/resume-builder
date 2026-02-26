# Resume Builder

A modern, interactive resume builder application built with React and TypeScript. Create, customize, and export professional resumes with multiple templates and fonts.

#### Demo: https://abhijith126.github.io/resume-builder/

## Features

- 📝 **Multiple Templates**: Choose from 8 professionally designed resume templates (Editorial, Modern Minimalist, Arctic Frost, Desert Rose, Premium, Modern, Classic, Minimal)
- 🎨 **Font Customization**: 12 different font options to match your style
- 🖼️ **Photo Support**: Add and crop your profile photo (square or circle shape)
- 📋 **Comprehensive Sections**: 
  - Personal Information
  - Professional Summary
  - Work Experience
  - Education
  - Skills
  - Projects
  - Languages
  - Certifications
  - Key Achievements
  - Interests
- 🎯 **Flexible Layout**: Drag-and-drop sections between main content and sidebar columns
- 💾 **Auto-Save**: Resume data is automatically saved to browser storage
- 📤 **Export Options**: 
  - Download as PDF
  - Export resume data as JSON
- 📥 **Import**: Load previously saved resume data from JSON files
- 🖨️ **Print Support**: Print directly to PDF from your browser
- ⚡ **Real-time Preview**: See changes instantly as you edit

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **PDF Generation**: @react-pdf/renderer
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Drag & Drop**: @dnd-kit
- **UI Icons**: Heroicons (inline SVG)

## Project Structure

```
src/
├── components/
│   ├── sections/           # Resume section components
│   │   ├── PersonalInfoSection.tsx
│   │   ├── SummarySection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── LanguagesSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   └── InterestsSection.tsx
│   ├── Preview.tsx         # Resume preview component
│   ├── ResumePDF.tsx       # PDF export component
│   ├── Sidebar.tsx         # Editor sidebar
│   ├── SectionLayoutManager.tsx  # Layout customization
│   └── TemplateSelector.tsx      # Template & font selector
├── App.tsx                 # Main application component
├── types.ts                # TypeScript type definitions
├── index.css               # Global styles
└── main.tsx                # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and deploy to GitHub Pages

## Usage

1. **Fill in your information**: Start with the Personal Information section
2. **Add your details**: Fill in experience, education, skills, and other relevant sections
3. **Customize appearance**: 
   - Select a template from the template selector
   - Choose a font that matches your style
   - Add a profile photo if desired
4. **Arrange sections**: Switch to the Layout tab to drag-and-drop sections between columns
5. **Export your resume**:
   - Click "PDF" to download as PDF
   - Click "Export JSON" to save your data
   - Use your browser's print function for additional options

## Data Storage

- Resume data is automatically saved to your browser's localStorage
- You can export your resume as JSON for backup or transfer to other devices
- Import JSON files to load previously saved resumes

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser supporting ES2022

## Features Detail

### Template Options
- **Editorial**: Clean and professional
- **Modern Minimalist**: Minimalist black and white design
- **Arctic Frost**: Cool blue color scheme
- **Desert Rose**: Warm rose color scheme
- **Premium**: Multi-column layout with sidebar
- **Modern**: Contemporary design
- **Classic**: Traditional resume format
- **Minimal**: Simplistic and minimal design

### Font Options
- Helvetica Neue
- Georgia
- Arial
- Calibri
- Cambria
- Inter
- Playfair Display
- Poppins
- Roboto
- Lora
- EB Garamond
- Source Sans Pro
- Merriweather

## File Size & Performance

- Lightweight application (~500KB gzipped)
- Optimized for fast loading
- Smooth drag-and-drop interactions
- Real-time PDF preview generation

## Troubleshooting

### Resume not saving?
- Check if browser storage is enabled
- Try exporting as JSON as backup
- Clear browser cache and reload

### PDF not downloading?
- Ensure pop-ups are not blocked
- Try a different browser
- Check your download folder

### Photo not showing?
- Ensure image file is less than 5MB
- Try cropping the image again
- Use common formats (JPG, PNG)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the GitHub repository.

---

**Made with ❤️ for job seekers and professionals**