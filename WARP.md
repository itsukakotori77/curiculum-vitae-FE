# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- **Start development server**: `npm run dev`
  - Uses Next.js with Turbopack for faster builds
  - Runs on localhost:3000
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Lint code**: `npm run lint`

### Code Quality
The project uses ESLint with Next.js config and Prettier for formatting:
- Prettier config: semi: false, singleQuote: true, trailingComma: 'all'
- ESLint is configured with relaxed rules (many TypeScript strict rules are disabled)
- No console warnings are treated as warnings, not errors

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.3.2 with React 19
- **Styling**: TailwindCSS with DaisyUI components
- **State Management**: Zustand with persistence
- **Forms**: React Hook Form with Yup validation
- **Data Fetching**: TanStack React Query
- **UI Animations**: Framer Motion
- **Export Functionality**: html2canvas + jsPDF for CV export
- **Icons**: FontAwesome and Lucide React
- **Date Handling**: Moment.js and dayjs

### Project Structure
```
src/
├── app/                    # Next.js 13+ App Router
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout with QueryProvider
│   ├── about/             # About page
│   ├── curiculumVitae/    # CV generator main page
│   └── faq/               # FAQ page
├── components/
│   ├── CultUI/            # Custom UI component library
│   └── globals/layouts/   # Layout components
├── data/                  # Static data and mock CV data
├── interface/             # TypeScript interface definitions
├── libs/                  # Constants and configuration
├── services/              # API layer with TanStack Query
├── utils/                 # Utility functions and helpers
└── assets/               # Styles and animations
```

### Core Application Logic

**CV Generation Flow**:
The application follows a multi-step CV generation process managed by Zustand stores:

1. **Step 1**: Personal information (firstName, lastName, nickname, role, profile)
2. **Step 2**: Work experience with date ranges and job descriptions
3. **Step 3**: Education background with degrees and institutions
4. **Step 4**: Skills (with levels) and certifications
5. **Step 5**: Contact information and social links
6. **Step 6**: CV customization and export

**State Management Architecture**:
- Each step has its own Zustand store (useCVStep1Store through useCVStep5Store)
- `useCVMainStore` coordinates all steps and transforms data into final `ICurrVitae` format
- `useCVNavigationStore` manages step navigation and form visibility
- `useCVSettingStore` handles color customization and styling
- All stores use Zustand persistence middleware for data retention

**Data Transformation**:
The `transformToICurrVitae` function in `utils/parseToForm.ts` converts form data from all steps into the unified `ICurrVitae` interface for CV generation.

**Export System**:
Complex export functionality in `utils/export.ts` handles:
- PNG export using html2canvas
- PDF export with single/multi-page support
- Color conversion for problematic CSS (OKLCH/LAB to RGB)
- Batch export capabilities
- Loading state management during export

### Key Components

**Custom UI Library (CultUI)**:
- Custom design system with variant-based components using `class-variance-authority`
- Button component with multiple intents (primary, secondary, success, info, default)
- Integrated with Framer Motion for animations
- Uses TailwindCSS for styling with custom shadow effects

**Form Management**:
- Extensive TypeScript interfaces for type safety across all CV data structures
- Complex union types for experience (current vs past jobs) and skills (with/without levels)
- Form validation using React Hook Form + Yup schema validation

**CV Templates**:
The application supports multiple CV template styles with customizable:
- Sidebar colors and primary colors (RGBA support)
- Sidebar width adjustments  
- Text colors and skill bar colors
- Multiple theme support through the template system

### Development Notes

**Environment Variables**:
- `NEXT_PUBLIC_URL`: Application URL
- `NEXT_PUBLIC_API_URL`: Backend API endpoint  
- `NEXT_PUBLIC_VERSION`: Application version

**Path Aliases**:
- `@/*` maps to `./src/*` for clean imports

**Styling Approach**:
- TailwindCSS as primary styling solution
- DaisyUI for pre-built component themes (light, dark, cupcake)
- Custom CSS classes for specialized CV styling
- Framer Motion for micro-interactions and animations

**State Persistence**:
All CV data is persisted to localStorage via Zustand persistence middleware, allowing users to resume CV creation across sessions.

**Export Considerations**:
The export system handles complex CSS-to-canvas conversions and includes fallbacks for unsupported CSS color formats (OKLCH, LAB) by converting them to RGB equivalents before export.
