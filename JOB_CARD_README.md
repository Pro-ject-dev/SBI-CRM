# Job Card Management System

## Overview
The Job Card Management System is a new feature added to the Operation Manager module that allows users to generate and download professional job cards for production orders.

## Features

### 1. Job Card Management Dashboard
- **Location**: Operation Manager → Job Cards
- **Purpose**: Centralized view of all orders with job card generation capabilities

### 2. Key Functionality
- **View Orders**: See all production orders in a data table format
- **Generate Job Cards**: Download individual job cards for specific orders
- **Bulk Download**: Download job cards for multiple orders at once
- **Search & Filter**: Find orders by ID, date, or status
- **Print View**: Print-friendly view of the job card management interface

### 3. Job Card Content
Each generated job card includes:

#### Header Section
- Company logo and branding
- Company address and contact information
- GSTIN and business details

#### Job Card Details
- Job Card Number (auto-generated)
- Order ID
- Project start and end dates
- Date issued

#### Client Information
- Client name and company
- Contact number and email

#### Order Details
- Item codes and descriptions
- Quantities and units
- Material specifications
- Special notes/remarks

#### Production Stages
- 7 standard production stages with calculated timelines
- Stage assignments and estimated durations
- Status tracking (Pending/In Progress/Completed)
- Space for actual time and remarks

#### Additional Sections
- Supervisor notes area
- Signature spaces for key personnel

## Technical Implementation

### Files Created/Modified
1. **`src/features/operationManager/JobCardManagement.tsx`** - Main component
2. **`src/utils/jobCardGenerator.ts`** - PDF generation utility
3. **`src/constants/operationManager/sideMenu.ts`** - Updated navigation
4. **`src/routes/OperationManagerRoutes.tsx`** - Added routing

### Dependencies Used
- `jspdf` - PDF generation
- `jspdf-autotable` - Table formatting in PDFs
- Material-UI components for the interface

### Production Stages
The system automatically calculates realistic timelines for:
1. Design Review (10% of project time)
2. Material Procurement (15% of project time)
3. Fabrication (30% of project time)
4. Assembly (25% of project time)
5. Quality Testing (10% of project time)
6. Final Inspection (5% of project time)
7. Packaging (5% of project time)

## Usage Instructions

### Accessing Job Cards
1. Login as an Operation Manager
2. Navigate to "Job Cards" in the left sidebar
3. View all orders in the data table

### Generating Individual Job Cards
1. Find the desired order in the table
2. Click the download icon (📥) in the Actions column
3. Job card PDF will be automatically downloaded

### Bulk Download
1. Use search and filters to narrow down orders
2. Click "Download All" button
3. Multiple job cards will be downloaded sequentially

### Customization
- Job card format follows company branding
- Production stages are automatically calculated based on project deadlines
- All client and order information is pulled from existing data

## File Naming Convention
Generated job cards follow the format:
`JobCard_[OrderID]_[Date].pdf`

Example: `JobCard_123_2025-01-15.pdf`

## Error Handling
- Graceful error handling for PDF generation failures
- User-friendly error messages
- Console logging for debugging

## Future Enhancements
- Customizable production stage templates
- Digital signature integration
- Progress tracking and status updates
- Email integration for job card distribution
- Mobile-responsive job card viewing

## Support
For technical issues or feature requests, please contact the development team.
