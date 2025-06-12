# 🧠 Interactive Mindmap Profiler

An elegant, interactive web application for creating dynamic mindmaps from resume data and manual input. Transform complex information into beautiful, navigable visual representations with professional-grade features and intuitive controls.

![Mindmap Profiler](https://img.shields.io/badge/Status-Active-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![React](https://img.shields.io/badge/React-18.0-61dafb)

## 🌟 Overview

The Interactive Mindmap Profiler is a cutting-edge visualization tool that transforms structured data into beautiful, interactive mindmaps. Whether you're visualizing resume data, organizational structures, or complex topics, this application provides an intuitive and powerful platform for data exploration and presentation.

---

## ✨ Key Features

### 🎨 **Advanced Visualizations**
- **Curved Bezier Connections**: Elegant, smooth curves connecting related nodes
- **Animated Flow Effects**: Subtle animations showing data relationships
- **Gradient Backgrounds**: Professional color transitions and depth
- **Drop Shadows & Glows**: Enhanced visual depth and dimension
- **Responsive Node Sizing**: Adaptive sizing based on content length
- **Theme Support**: Beautiful light and dark mode themes

### 🖱️ **Interactive Controls**
- **Drag & Drop Nodes**: Freely reposition any node with smooth dragging
- **Zoom & Pan Navigation**: Smooth mouse wheel zoom and drag-to-pan
- **Context Menus**: Comprehensive right-click operations
- **Search & Highlight**: Quickly locate and navigate to specific nodes
- **Keyboard Shortcuts**: Efficient navigation and control
- **Touch Support**: Full mobile and tablet compatibility

### 📊 **Data Processing & Import**
- **Resume JSON Upload**: Drag-and-drop resume files for instant visualization
- **Manual Entry Mode**: Create custom mindmaps from scratch
- **Smart Data Parsing**: Automatically organizes data into logical sections
- **Multiple Input Formats**: Support for various data structures
- **Real-time Processing**: Instant visualization updates
- **Error Handling**: Robust validation and user feedback

### 🎯 **Professional Node Types**
- **Person Profiles**: Central identity with connected attributes
- **Experience Sections**: Work history with roles and responsibilities
- **Education Nodes**: Academic qualifications and achievements
- **Skills Mapping**: Technical and professional capabilities
- **Project Showcases**: Notable contributions and work samples
- **Contact Information**: Professional networking details
- **Reference Networks**: Professional recommendations and connections

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **Package Manager**: npm, yarn, or pnpm
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Installation

1. **Clone the Repository**
   \`\`\`bash
   git clone https://github.com/your-username/mindmap-profiler.git
   cd mindmap-profiler
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Start Development Server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

---

## 📖 Complete User Guide

### 🏠 **Home Screen**

#### **Getting Started**
1. **Choose Input Method**:
   - **Manual Entry**: Create mindmaps from scratch
   - **Upload Resume JSON**: Import structured resume data

2. **Manual Entry Mode**:
   - Enter profile name (e.g., "Dr. Jane Smith", "Google Inc.", "AI Ethics")
   - Select profile type: Person, Organization, or News Topic
   - Click "Generate Mindmap" to create initial structure

3. **Upload Mode**:
   - Drag and drop JSON file or click to browse
   - Supported formats: Resume JSON with standard structure
   - Automatic validation and error reporting
   - Real-time processing feedback

### 🗺️ **Mindmap Canvas**

#### **Navigation Controls**

**🔍 Zoom & Pan**
- **Mouse Wheel**: Zoom in/out (10% - 300%)
- **Click & Drag**: Pan around the canvas
- **Zoom Buttons**: Precise zoom control in bottom-left panel
- **Reset View**: Return to default zoom and position
- **Fit View**: Automatically frame all content optimally

**🎯 Search & Navigation**
- **Search Bar**: Type to find specific nodes
- **Enter Key**: Navigate to found node
- **Auto-Center**: Automatically centers on search results
- **Case Insensitive**: Flexible search matching

#### **Node Interactions**

**🖱️ Basic Operations**
- **Single Click**: Select node (shows selection ring)
- **Drag**: Move node to new position
- **Right Click**: Open context menu with options
- **Hover**: Show tooltip with additional information

**📋 Context Menu Options**
- **View Details**: Examine node information
- **Add Child Node**: Create connected sub-node
- **Edit Node**: Modify label and description
- **Link to Node**: Create custom connections
- **Customize Style**: Change colors and appearance
- **Delete Node**: Remove node and connections

**✏️ Editing Features**
- **Inline Editing**: Quick text modification
- **Rich Descriptions**: Multi-line content support
- **Type Assignment**: Categorize nodes by type
- **Validation**: Real-time input validation

#### **Advanced Features**

**🎨 Visual Customization**
- **Theme Toggle**: Switch between light and dark modes
- **Node Colors**: Automatic color coding by type
- **Connection Styles**: Curved, animated connection lines
- **Hover Effects**: Interactive visual feedback
- **Selection Indicators**: Clear visual selection states

**📤 Export & Sharing**
- **JSON Export**: Save complete mindmap structure
- **Timestamp**: Automatic export date tracking
- **File Naming**: Smart filename generation
- **Data Integrity**: Complete data preservation

### 🎛️ **Control Panels**

#### **Top Navigation Bar**
- **Back Button**: Return to home screen
- **Profile Title**: Current mindmap subject and type
- **Search Controls**: Find and navigate to nodes
- **Export Button**: Download mindmap data
- **Theme Toggle**: Light/dark mode switch

#### **Zoom Control Panel** (Bottom-Left)
- **Zoom In** (+): Increase magnification
- **Zoom Out** (-): Decrease magnification  
- **Reset View**: Return to default view
- **Fit View**: Auto-frame all content
- **Zoom Percentage**: Current zoom level display

### 📱 **Mobile & Touch Support**

**Touch Gestures**
- **Tap**: Select nodes
- **Long Press**: Open context menu
- **Pinch**: Zoom in/out
- **Two-Finger Drag**: Pan canvas
- **Double Tap**: Fit view to content

**Responsive Design**
- **Adaptive Layout**: Optimized for all screen sizes
- **Touch-Friendly Controls**: Larger touch targets
- **Mobile Navigation**: Simplified mobile interface
- **Orientation Support**: Portrait and landscape modes

---

## 🏗️ Technical Architecture

### **Frontend Stack**
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **Graphics**: SVG-based rendering for crisp visuals
- **State Management**: React hooks and context

### **Backend API**
- **Runtime**: Next.js API Routes
- **Processing**: Server-side resume data transformation
- **Validation**: Robust input validation and sanitization
- **Error Handling**: Comprehensive error management
- **Performance**: Optimized data processing algorithms

### **Key Components Architecture**

\`\`\`
mindmap-profiler/
├── 🏠 app/
│   ├── 🔌 api/process-resume/     # Resume processing endpoint
│   ├── 🎨 globals.css            # Global styles and themes
│   ├── 📄 layout.tsx             # Root application layout
│   └── 🏡 page.tsx               # Home page component
├── 🧩 components/
│   ├── 🎛️ ui/                    # Reusable UI components
│   ├── 📋 context-menu.tsx       # Right-click context menu
│   ├── 📁 file-upload.tsx        # Drag-and-drop file handler
│   ├── 🗺️ mindmap-canvas.tsx     # Main visualization container
│   └── 🔵 mindmap-node.tsx       # Individual node renderer
├── 📚 lib/
│   ├── 📊 sample-data.ts         # Sample data generators
│   └── 🛠️ utils.ts               # Utility functions
└── 📖 README.md                  # This documentation
\`\`\`

---

## 📊 Supported Data Formats

### **Resume JSON Structure**

The application accepts resume data in the following comprehensive format:

\`\`\`json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1 (555) 123-4567",
  "address": "123 Main St, City, State 12345",
  "linkedin": "https://linkedin.com/in/johndoe",
  "github": "https://github.com/johndoe",
  "website": "https://johndoe.com",
  "summary": "Experienced software engineer with expertise in full-stack development...",
  
  "education": [
    {
      "institution": "Massachusetts Institute of Technology",
      "degree": "Master of Science",
      "field": "Computer Science",
      "honor": "Magna Cum Laude",
      "GPA": "3.9",
      "country": "United States",
      "startDate": "2018-09-01",
      "endDate": "2020-06-01"
    }
  ],
  
  "workExperience": [
    {
      "jobTitle": "Senior Software Engineer",
      "company": "Tech Innovation Corp",
      "location": "San Francisco, CA",
      "startDate": "2020-07-01",
      "endDate": null,
      "responsibilities": [
        "Led development of microservices architecture",
        "Mentored junior developers and conducted code reviews",
        "Implemented CI/CD pipelines reducing deployment time by 60%"
      ]
    }
  ],
  
  "skills": [
    "JavaScript", "TypeScript", "React", "Node.js", 
    "Python", "AWS", "Docker", "Kubernetes"
  ],
  
  "references": [
    {
      "name": "Sarah Johnson",
      "relationship": "Former Manager",
      "title": "Engineering Director",
      "contact": "sarah.johnson@techcorp.com"
    }
  ]
}
\`\`\`

### **Validation Rules**
- **Required Fields**: `name` (minimum requirement)
- **Date Formats**: ISO 8601 format (YYYY-MM-DD)
- **Array Limits**: Maximum 10 items per section for optimal visualization
- **Text Limits**: Descriptions limited to 500 characters
- **URL Validation**: Proper URL format for links

---

## 🎨 Customization Guide

### **Adding Custom Node Types**

1. **Update Icon Mapping** (`mindmap-node.tsx`):
\`\`\`typescript
const getNodeIcon = (type: string) => {
  switch (type) {
    case "CustomType":
      return CustomIcon
    // ... existing cases
  }
}
\`\`\`

2. **Add Color Scheme** (`mindmap-node.tsx`):
\`\`\`typescript
const getNodeColor = (type: string, darkMode: boolean) => {
  const colors = {
    CustomType: darkMode ? "#custom-dark" : "#custom-light",
    // ... existing colors
  }
}
\`\`\`

3. **Update Type Definitions** (`sample-data.ts`):
\`\`\`typescript
// Add new type to data generation logic
\`\`\`

### **Styling Modifications**

**Color Themes**
- Edit color mappings in `getNodeColor` function
- Modify gradient definitions in node rendering
- Update connection line colors and effects

**Animation Customization**
- Adjust SVG animation parameters
- Modify transition durations and easing
- Customize hover and selection effects

**Layout Algorithms**
- Modify positioning logic in `sample-data.ts`
- Implement custom spacing calculations
- Add new layout patterns (radial, hierarchical, etc.)

### **API Extensions**

**New Endpoints**
\`\`\`typescript
// Add to app/api/
export async function POST(request: NextRequest) {
  // Custom processing logic
}
\`\`\`

**Database Integration**
- Add persistence layer with Supabase/PostgreSQL
- Implement user authentication
- Add collaborative features

---

## ⚙️ Configuration Options

### **Environment Variables**

Create `.env.local` for custom configuration:

\`\`\`env
# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Mindmap Profiler"

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_COLLABORATION=false

# API Configuration
API_RATE_LIMIT=100
MAX_FILE_SIZE=10MB
\`\`\`

### **Tailwind Customization**

Modify `tailwind.config.ts` for design system changes:

\`\`\`typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        // Custom color palette
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  }
}
\`\`\`

---

## 🚀 Deployment Guide

### **Vercel (Recommended)**

1. **Connect Repository**:
   - Push code to GitHub/GitLab
   - Import project in Vercel dashboard
   - Configure environment variables

2. **Automatic Deployment**:
   - Zero-configuration deployment
   - Automatic HTTPS and CDN
   - Preview deployments for branches

3. **Custom Domain**:
   - Add custom domain in Vercel settings
   - Configure DNS records
   - Automatic SSL certificate

### **Alternative Platforms**

**Netlify**
\`\`\`bash
# Build command
npm run build

# Publish directory
out/
\`\`\`

**Docker Deployment**
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

**Self-Hosted**
\`\`\`bash
# Build for production
npm run build

# Start production server
npm start

# Or serve static files
npm run export
\`\`\`

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get involved:

### **Development Workflow**

1. **Fork & Clone**:
   \`\`\`bash
   git clone https://github.com/your-username/mindmap-profiler.git
   cd mindmap-profiler
   \`\`\`

2. **Create Feature Branch**:
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`

3. **Development Setup**:
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

4. **Make Changes**:
   - Follow TypeScript best practices
   - Use Tailwind CSS for styling
   - Add comprehensive comments
   - Write descriptive commit messages

5. **Test Thoroughly**:
   - Test all interactive features
   - Verify responsive design
   - Check accessibility compliance
   - Validate data processing

6. **Submit Pull Request**:
   \`\`\`bash
   git add .
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   \`\`\`

### **Contribution Guidelines**

**Code Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow configured linting rules
- **Prettier**: Consistent code formatting
- **Comments**: Document complex logic and APIs

**Testing Requirements**
- **Unit Tests**: Test utility functions
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Accessibility**: WCAG 2.1 AA compliance

**Documentation**
- **Code Comments**: Explain complex algorithms
- **API Documentation**: Document all endpoints
- **User Guide**: Update for new features
- **Changelog**: Maintain version history

---

## 🐛 Troubleshooting

### **Common Issues**

**Installation Problems**
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

**Build Errors**
\`\`\`bash
# Check Node.js version
node --version  # Should be 18+

# Update dependencies
npm update

# Clear Next.js cache
rm -rf .next
\`\`\`

**Performance Issues**
- **Large Datasets**: Use data pagination or filtering
- **Memory Usage**: Implement node virtualization
- **Rendering**: Optimize SVG rendering for large mindmaps

**Browser Compatibility**
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile Support**: iOS 14+, Android 10+
- **Feature Detection**: Graceful degradation for older browsers

### **Getting Help**

**Documentation**

**Community Support**

- 📧 [Email Support](mailto:umangkochar1@gmail.com)

---

## 📝 License & Credits

### **License**
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### **Credits**

**🎯 Created by**: [Umang Kochar](https://www.linkedin.com/in/umangk01/)  

**🧭 Guidance by**: Parimeher

**Special Recognition**
- The open-source community for exceptional tools and libraries
- Contributors who continuously improve this project
- Users who provide invaluable feedback and suggestions
- Beta testers who helped refine the user experience

### **Third-Party Libraries**
- **Next.js**: React framework for production
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **TypeScript**: Type-safe JavaScript

---

## 🗺️ Roadmap & Future Features

### **🚀 Version 2.0 (Q2 2024)**
- [ ] **Real-time Collaboration**: Multi-user editing with live cursors
- [ ] **Database Integration**: Persistent storage with Supabase
- [ ] **User Authentication**: Secure login and profile management
- [ ] **Cloud Sync**: Cross-device synchronization
- [ ] **Version History**: Track and restore mindmap versions

### **🎨 Version 2.1 (Q3 2024)**
- [ ] **Advanced Templates**: Industry-specific mindmap templates
- [ ] **AI-Powered Insights**: Automated content analysis and suggestions
- [ ] **Custom Themes**: User-created color schemes and styles
- [ ] **Animation Presets**: Pre-built animation and transition effects
- [ ] **Layout Algorithms**: Automatic node arrangement options

### **📱 Version 2.2 (Q4 2024)**
- [ ] **Mobile App**: React Native iOS and Android applications
- [ ] **Offline Support**: Progressive Web App with offline capabilities
- [ ] **Voice Input**: Speech-to-text node creation
- [ ] **Gesture Controls**: Advanced touch and gesture recognition
- [ ] **AR/VR Support**: Immersive 3D mindmap exploration

### **🔗 Version 3.0 (2025)**
- [ ] **API Integrations**: LinkedIn, GitHub, Google Drive connections
- [ ] **Enterprise Features**: Team management and admin controls
- [ ] **Analytics Dashboard**: Usage insights and performance metrics
- [ ] **White-label Solution**: Customizable branding options
- [ ] **Plugin System**: Third-party extension support

### **📊 Analytics & Insights**
- [ ] **Usage Analytics**: Track user interaction patterns
- [ ] **Performance Monitoring**: Real-time performance metrics
- [ ] **A/B Testing**: Feature experimentation framework
- [ ] **User Feedback**: Integrated feedback collection system

---

## 📞 Support & Contact

### **Technical Support**
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/your-username/mindmap-profiler/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/your-username/mindmap-profiler/discussions)
- **📧 Direct Contact**: [umang.kochar@example.com](mailto:umang.kochar@example.com)

### **Community**
- **💬 Discord Server**: [Join our community](https://discord.gg/mindmap-profiler)
- **🐦 Twitter Updates**: [@MindmapProfiler](https://twitter.com/mindmapprofiler)
- **📺 YouTube Tutorials**: [Mindmap Profiler Channel](https://youtube.com/mindmapprofiler)

### **Business Inquiries**
- **🤝 Partnerships**: partnerships@mindmapprofiler.com
- **🏢 Enterprise Sales**: enterprise@mindmapprofiler.com
- **📰 Press & Media**: press@mindmapprofiler.com

---

## 📈 Version History

### **v1.2.0** - Current Release
- ✅ Enhanced canvas with 3000x2000px virtual space
- ✅ Improved node spacing and organization
- ✅ Added fit-view functionality
- ✅ Better mobile touch support
- ✅ Comprehensive documentation

### **v1.1.0** - Previous Release
- ✅ Added drag-and-drop node positioning
- ✅ Implemented curved connection lines
- ✅ Enhanced visual effects and animations
- ✅ Improved context menu functionality

### **v1.0.0** - Initial Release
- ✅ Core mindmap visualization
- ✅ Resume JSON processing
- ✅ Basic node interactions
- ✅ Theme switching
- ✅ Export functionality

---

<div align="center">

## 🌟 **Thank You for Using Mindmap Profiler!** 🌟

<p>
  <strong>Made with ❤️ by <a href="https://github.com/umangkochar">Umang Kochar</a></strong><br>
  <em>With guidance from <strong>Parimeher</strong></em>
</p>

<p>
  ⭐ <strong>Star this repository if you find it helpful!</strong> ⭐<br>
  🔄 <strong>Share with your network to spread the word!</strong> 🔄<br>
  🤝 <strong>Contribute to make it even better!</strong> 🤝
</p>

<p>
  <a href="https://github.com/your-username/mindmap-profiler/stargazers">
    <img src="https://img.shields.io/github/stars/your-username/mindmap-profiler?style=social" alt="GitHub Stars">
  </a>
  <a href="https://github.com/your-username/mindmap-profiler/network/members">
    <img src="https://img.shields.io/github/forks/your-username/mindmap-profiler?style=social" alt="GitHub Forks">
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20mindmap%20tool!&url=https://github.com/your-username/mindmap-profiler">
    <img src="https://img.shields.io/twitter/url?style=social&url=https://github.com/your-username/mindmap-profiler" alt="Tweet">
  </a>
</p>

---

<p><em>Transform your data into beautiful, interactive visualizations</em></p>

</div>
