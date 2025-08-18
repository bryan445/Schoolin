# School Data Restructuring

This directory contains the restructured student data for all schools, organized by classes.

## Directory Structure

Each school has its own subdirectory containing JSON files for each class:
- `chisomo/` - Chisomo school data (primary school - uses grade files)
- `ekhaya/` - Ekhaya Academy school data (primary school - uses grade files)
- `ngoms/` - Ngoms school data (secondary school - uses form files)
- `soba/` - Soba school data (secondary school - uses form files)

Within each school's directory, there are JSON files for each class:
- Primary schools (Chisomo and Ekhaya):
  - `grade-1.json` - Grade 1 students
  - `grade-2.json` - Grade 2 students
  - `grade-3.json` - Grade 3 students
  - `grade-4.json` - Grade 4 students
  - `grade-7.json` - Grade 7 students (Ekhaya only)
- Secondary schools (Ngoms and Soba):
  - `form-1.json` - Form 1 students
  - `form-2.json` - Form 2 students
  - `form-3.json` - Form 3 students
  - `form-4.json` - Form 4 students

## Data Structure

Each JSON file contains an array of student objects with the following structure:

```json
[
  {
    "id": "student-id",
    "name": "Student Name",
    "class": "Grade 1",
    "guardian": "Guardian Name",
    "phone": "Phone Number",
    "email": "email@example.com",
    "address": "Student Address",
    "dateOfBirth": "YYYY-MM-DD",
    "admissionDate": "YYYY-MM-DD",
    "fees": {
      "totalOwed": 0,
      "totalPaid": 0,
      "balance": 0,
      "nextPaymentDue": "YYYY-MM-DD"
    },
    "results": {
      // Results structure varies by school
    }
  }
]
```

## Changes Made

1. **Soba School**: Previously had all students in a single file (`students-soba.json`) with a "students" array. Now separated into individual class files.

2. **Ekhaya Academy**: Previously organized by grades (Grade 1-8). Converted to grade structure where:
   - Grade 1 students are in `grade-1.json`
   - Grade 2 students are in `grade-2.json`
   - Grade 3 students are in `grade-3.json`
   - Grade 4 students are in `grade-4.json`
   - Grade 7 students are in `grade-7.json`

3. **Chisomo School**: Previously organized by forms but now uses grade structure:
   - Grade 1 students are in `grade-1.json`
   - Grade 2 students are in `grade-2.json`
   - Grade 3 students are in `grade-3.json`
   - Grade 4 students are in `grade-4.json`

4. **Ngoms School**: Already organized by forms and continues to use form structure.

## Usage

Applications should now read student data from the individual class files rather than the previous structure. For example, to get Grade 1 students for Chisomo school, read `public/schools/classes/chisomo/grade-1.json`.